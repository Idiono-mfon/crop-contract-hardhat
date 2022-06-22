// SPDX-License-Identifier: Apache 2.0
// This is a test implementatio
pragma solidity ^0.8.0;

import "@etherisc/gif-interface/contracts/0.7/Product.sol";

// changed Acre to AcreLocal

contract AcreLocal is Product {

    bytes32 public constant NAME = "AcreAfrica";
    bytes32 public constant VERSION = "0.1.1";
    bytes32 public constant POLICY_FLOW = "PolicyFlowDefault";

    enum oracleAction { underwrite, payout }

    event LogRequestUnderwriting(
        bytes32 bpKey,
        uint256 requestId
    );

    event LogRequestPayout(
        bytes32 bpKey,
        uint256 policyId,
        uint256 claimId,
        uint256 payoutId,
        uint256 amount
    );

    event LogError(
        string error
    );

    event LogPolicyExpired(
        uint256 policyId,
        bytes32 bpKey
    );

    uint256 public acreOracleId;

    constructor(address _productController)
        public
        Product(_productController, NAME, POLICY_FLOW)
    {}


    function setOracleId(uint256 _id)
        public
        onlyOwner
    {
        acreOracleId = _id;
    }

    function applyForPolicy(bytes32 _bpKey, bytes memory _data)
        external
        onlyOwner
    {
        _newApplication(
            _bpKey,
            _data
        );
    }

    function checkUnderwrite(bytes32 _bpKey)
        external
        onlyOwner
    {
        // call Oracle
    }

    function underwrite(bytes32 _bpKey)
        external
        onlyOwner
    {
        _underwrite(_bpKey);
    }

    function newClaim(bytes32 _bpKey, bytes memory _data)
        external
        onlyOwner
    {
        uint256 claimId = _newClaim(_bpKey, _data);
        _confirmClaim(_bpKey, claimId, _data);
    }

    function checkClaim(bytes32 _bpKey)
        external
        onlyOwner
    {
        // call Oracle, set policyStatus
    }

    function payout(bytes32 _bpKey, uint256 _payoutId, bytes memory _data)
        external
        onlyOwner
    {
        _payout(_bpKey, _payoutId, true, _data);
    }



    function acreCallback(
        uint256 _requestId,
        bytes memory _response
    ) external onlyOracle {

    }

}
