//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Toadzgotchi {

    struct ToadStats {
        bool isInSwamp;
        uint256 hungerValue;
        uint256 playValue;
        uint256 sleepValue;
    }

    mapping(address => ToadStats) public toadStats;

    constructor() {}

    // function logMsgSender(_address) public view returns (address) {
    //     return ;
    // }

    function readToadHunger() public view returns (uint256) {
        return toadStats[msg.sender].hungerValue;
    }
    function readToadPlay() public view returns (uint256) {
        return toadStats[msg.sender].playValue;
    }
    function readToadSleep() public view returns (uint256) {
        return toadStats[msg.sender].sleepValue;
    }
    function readToadStats() public view returns (ToadStats memory) {
        //from 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 (hardhat acc 0 provider)
        return toadStats[msg.sender];
    }
    function returnMsgSender() public view returns (address) {
        return msg.sender;
        //returns 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 (hardhat acc 0 provider)
    }

    function feedToad(uint256 newHungerValue) public {
        //from 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 (hardhat acc 1 provider.signer)
        console.log("Changing hungerValue from '%s' to '%s'", toadStats[msg.sender].hungerValue, newHungerValue);
        toadStats[msg.sender].hungerValue = newHungerValue;
    }
    function startGame() public {
        toadStats[msg.sender].isInSwamp = true;
        console.log("'%s' has started game. '%s'", msg.sender, toadStats[msg.sender].isInSwamp);
    }
}

//     string private greeting;

//     constructor(string memory _greeting) {
//         console.log("Deploying a Greeter with greeting:", _greeting);
//         greeting = _greeting;
//     }

//     function greet() public view returns (string memory) {
//         return greeting;
//     }

//     function setGreeting(string memory _greeting) public {
//         console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
//         greeting = _greeting;
//     }
