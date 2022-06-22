// SPDX-License-Identifier: Apache 2.0
pragma solidity ^0.8.0;

import "@etherisc/gif-interface/contracts/0.7/Product.sol";

contract Acre is Product {

    bytes32 public constant NAME = "AcreAfrica";
    bytes32 public constant VERSION = "0.1.2";
    bytes32 public constant POLICY_FLOW = "PolicyFlowDefault";

    uint256 public acreOracleId;
    bytes32 public acreOracleType;
    string public constant ACRE_CALLBACK = "acreCallback";
    uint256 public scaleFactor = 10 ** 6;

    event LogRequestAcreStatus(uint256 requestId, bytes data);

    constructor(address _productController, bytes32 _acreOracleType, uint256 _acreOracleId)
        Product(_productController, NAME, POLICY_FLOW)
    {
        acreOracleId = _acreOracleId;
        acreOracleType = _acreOracleType;
    }

    function setOracleId(bytes32 _acreOracleType, uint256 _acreOracleId)
        external
        onlyOwner
    {
        acreOracleId = _acreOracleId;
        acreOracleType = _acreOracleType;
    }

    function applyForPolicy(bytes32 _bpKey, bytes memory _data)
        external
        onlyOwner
    {
        // _data = abi.encode(uint256 _sumInsured, bytes32 _groupPolicyId);

        _newApplication(
            _bpKey,
            _data
        );
        _underwrite(_bpKey);

    }

    function checkClaim(bytes32 _bpKey)
        external
        onlyOwner
    {
        bytes memory data = _getApplicationData(_bpKey);
        uint256 requestId = _request(
            _bpKey,
            data,
            ACRE_CALLBACK,
            acreOracleType,
            acreOracleId
        );

        // Now everything is prepared
        // address(RiskPool).transfer(premium);

        emit LogRequestAcreStatus(
            requestId,
            data
        );
    }

    function acreCallback(uint256 /* _requestId */, bytes32 _bpKey, bytes calldata _response)
    external
    onlyOracle
    {
        (uint256 sumInsured, /* bytes32 groupPolicyId */) =
            abi.decode(_getApplicationData(_bpKey), (uint256, bytes32));
        (bool completed, /* uint256 deductible */, /* uint256 hurdle */, uint256 payout) =
            abi.decode(_response, (bool, uint256, uint256, uint256));
        if (completed) {
            uint256 payoutAmount = sumInsured * payout / scaleFactor;
            bytes memory data = abi.encode(payout, payoutAmount);
            uint256 claimId = _newClaim(_bpKey, data);
            uint256 payoutId = _confirmClaim(_bpKey, claimId, data);
            _payout(_bpKey, payoutId, true, data);
            _expire(_bpKey);
        }
    }

}
