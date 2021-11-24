//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Toadzgotchi {

    struct ToadStats {
        bool isVibing;
        uint256 isFedValue;
        uint256 isHappyValue;
        uint256 isRestedValue;
        uint256 toadLevel;
    }

    mapping(address => ToadStats) public toadStats;

    constructor() {}

    function startVibing() public {
        if (toadStats[msg.sender].isVibing = true) {
            return;
        } else {
            console.log("'%s' has started game. '%s'", msg.sender, toadStats[msg.sender].isVibing);
            toadStats[msg.sender].isVibing = true;
        }
    }
    function readToadHunger() public view returns (uint256) {
        return toadStats[msg.sender].isFedValue;
    }
    function readToadPlay() public view returns (uint256) {
        return toadStats[msg.sender].isHappyValue;
    }
    function readToadSleep() public view returns (uint256) {
        return toadStats[msg.sender].isRestedValue;
    }
    function readToadStats() public view returns (ToadStats memory) {
        //from 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 (hardhat acc 0 provider)
        return toadStats[msg.sender];
    }
    function returnMsgSender() public view returns (address) {
        return msg.sender;
        //returns 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 (hardhat acc 0 provider)
    }

    function feedToad(uint256 feedValue) public {
        //from 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 (hardhat acc 1 provider.signer)
        console.log("Adding '%s' to isFedValue", feedValue);
        if (toadStats[msg.sender].isFedValue >= 100) {
            toadStats[msg.sender].isFedValue = 0;
        }
        toadStats[msg.sender].isFedValue = toadStats[msg.sender].isFedValue + feedValue;
    }
    function playToad(uint256 playValue) public {
        //from 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 (hardhat acc 1 provider.signer)
        console.log("Adding '%s' to isHappyValue", playValue);
        if (toadStats[msg.sender].isHappyValue >= 100) {
            toadStats[msg.sender].isHappyValue = 0;
        }
        toadStats[msg.sender].isHappyValue = toadStats[msg.sender].isHappyValue + playValue;
    }
    function sleepToad(uint256 sleepValue) public {
        //from 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 (hardhat acc 1 provider.signer)
        console.log("Adding '%s' to isRestedValue", sleepValue);
        if (toadStats[msg.sender].isRestedValue >= 100) {
            toadStats[msg.sender].isRestedValue = 0;
        }
        toadStats[msg.sender].isRestedValue = toadStats[msg.sender].isRestedValue + sleepValue;
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
