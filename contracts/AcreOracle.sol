/**
 * @title FlightStatusesOracle is a contract which requests data from
 * the Chainlink network
 * @dev This contract is designed to work on multiple networks, including
 * local test networks
 *
 */

pragma solidity ^0.8.0;
// SPDX-License-Identifier: Apache-2.0


import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "./ChainlinkOracle.sol";

contract AcreOracle is ChainlinkOracle {
    using Chainlink for Chainlink.Request;

    bytes32 public constant ORACLETYPE = "AcreOracleType";
    bytes32 public constant NAME = "AcreOracle";

    mapping(bytes32 => bytes) public groupPolicyCache;
    mapping(uint256 => bytes32) public gifRequestIdToGroupPolicyId;

    event Request(bytes32 chainlinkRequestId, uint256 gifRequestId, string groupPolicyId);
    event CacheHit(uint256 gifRequestId, bytes data);
    event Fulfill(bool completed, uint256 deductible, uint256 hurdle, uint256 payout);

    constructor(
        address _link,
        address _chainLinkOracle,
        address _oracleService,
        address _oracleOwnerService,
        bytes32 _jobId,
        uint256 _payment
    )
    ChainlinkOracle(
        _link,
        _chainLinkOracle,
        _oracleService,
        _oracleOwnerService,
        ORACLETYPE,
        NAME,
        _jobId,
        _payment
    )
    // solhint-disable-next-line no-empty-blocks
    {}

    function request(uint256 _gifRequestId, bytes calldata _input)
    external override
    onlyQuery
    {
        (/* uint256 sumInsured */, string memory groupPolicyId) = abi.decode(_input, (uint256, string));
        bytes32 groupPolicyIdHashed = keccak256(abi.encodePacked(groupPolicyId));
        bytes memory data = groupPolicyCache[groupPolicyIdHashed];
        if (keccak256(data) != keccak256(abi.encodePacked(uint256(0)))) { // cache hit
            _respond(_gifRequestId, data);
            emit CacheHit(_gifRequestId, data);
        } else {
            Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
            req.add("groupPolicyId", groupPolicyId);
            bytes32 chainlinkRequestId = sendChainlinkRequest(req, payment);
            requests[chainlinkRequestId] = _gifRequestId;
            gifRequestIdToGroupPolicyId[_gifRequestId] = groupPolicyIdHashed;
            emit Request(
                chainlinkRequestId,
                _gifRequestId,
                groupPolicyId
            );
        }


        //  if (data != 0x0) { // cache hit
        //     _respond(_gifRequestId, data);
        //     emit CacheHit(_gifRequestId, data);
        // } else {
        //     Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        //     req.add("groupPolicyId", groupPolicyId);
        //     bytes32 chainlinkRequestId = sendChainlinkRequest(req, payment);
        //     requests[chainlinkRequestId] = _gifRequestId;
        //     gifRequestIdToGroupPolicyId[_gifRequestId] = groupPolicyIdHashed;
        //     emit Request(
        //         chainlinkRequestId,
        //         _gifRequestId,
        //         groupPolicyId
        //     );
        // }
    }


    function fulfill(bytes32 _chainlinkRequestId, bool completed, uint256 deductible, uint256 hurdle, uint256 payout)
    public
    recordChainlinkFulfillment(_chainlinkRequestId)
    {
        bytes memory data;
        uint256 gifRequestId = requests[_chainlinkRequestId];
        data = abi.encode(completed, deductible, hurdle, payout);
        // groupPolicyCache[gifRequestIdToGroupPolicyId[]] = data;
        groupPolicyCache[gifRequestIdToGroupPolicyId[gifRequestId]] = data; //modified to this
        
        _respond(gifRequestId, data);

        delete requests[_chainlinkRequestId];
        emit Fulfill(completed, deductible, hurdle, payout);
    }

}
