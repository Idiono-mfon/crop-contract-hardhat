// SPDX-License-Identifier: Apache 2.0
pragma solidity ^0.8.0;

contract Migrations {
    address public owner;
    uint256 public last_completed_migration; // solhint-disable-line

    modifier restricted() {
        if (msg.sender == owner) _;
    }

    constructor() public {
        owner = msg.sender;
    }

    function setCompleted(uint256 _completed) public restricted {
        last_completed_migration = _completed;
    }

    function upgrade(address _newAddress) public restricted {
        Migrations upgraded = Migrations(_newAddress);
        upgraded.setCompleted(last_completed_migration);
    }
}
