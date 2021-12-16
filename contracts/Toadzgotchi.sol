//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Toadzgotchi {

    struct ToadStats {
        //only need is____Value if introducing variable feed/play/sleep params that don't fully restore to 100
        bool isVibing;
        uint256 startVibingTime;
        uint256 isFedValue;
        uint256 lastFeedBlock;
        uint256 isHappyValue;
        uint256 lastPlayBlock;
        uint256 isRestedValue;
        uint256 lastSleepBlock;
        uint256 toadXP;
        uint256 toadLevel;
    }

    mapping(address => ToadStats) public toadStats;

    constructor() {}

    function startVibing() public {
        require(toadStats[msg.sender].isVibing == false, "Toad is already vibing");

        toadStats[msg.sender].isVibing = true;
        toadStats[msg.sender].startVibingTime = block.number;
        toadStats[msg.sender].toadLevel = 1;

        toadStats[msg.sender].isFedValue = 3;
        toadStats[msg.sender].lastFeedBlock = block.number;   

        toadStats[msg.sender].isHappyValue = 3;
        toadStats[msg.sender].lastPlayBlock = block.number;

        toadStats[msg.sender].isRestedValue = 3;
        toadStats[msg.sender].lastSleepBlock = block.number;

        console.log("'%s' has started game at block number '%s'", msg.sender, toadStats[msg.sender].startVibingTime);
    }
    
    function readToadStats() public view returns (ToadStats memory) {return toadStats[msg.sender];}

    // function readToadHunger() public view returns (uint256) {return toadStats[msg.sender].isFedValue;}
    // function readToadPlay() public view returns (uint256) {return toadStats[msg.sender].isHappyValue;}
    // function readToadSleep() public view returns (uint256) {return toadStats[msg.sender].isRestedValue;}
    // function returnMsgSender() public view returns (address) {return msg.sender;}

    function getminutes() public view returns (uint256) {
        uint256 minutesElapsed = (((block.number - toadStats[msg.sender].lastFeedBlock) * 15)/60);
        return minutesElapsed;
    }
    function calcDecay(uint256 lastActionValue) public view returns (uint256) {
        //1 Eth block every 15s
        uint256 hoursElapsed = (((block.number - lastActionValue) * 15)/60);
        uint256 decayBy = (2 * hoursElapsed);
        uint256 updatedValue;
        if (decayBy > lastActionValue) {
            updatedValue = 0;
        } else {
            updatedValue = lastActionValue - decayBy;
        }
        return updatedValue;
    }
    function feedToad() public {
        require(calcDecay(toadStats[msg.sender].isFedValue) < 100, "Toad is full");
        require(((calcDecay(toadStats[msg.sender].isFedValue) != 0) &&
                (calcDecay(toadStats[msg.sender].isHappyValue) != 0) &&
                (calcDecay(toadStats[msg.sender].isRestedValue) != 0)), "Toad is Dead");

        toadStats[msg.sender].lastFeedBlock = block.number;
        grantXP(30);
    }
    function playToad() public {
        require(calcDecay(toadStats[msg.sender].isHappyValue) < 100, "Toad is fully played");
        require(calcDecay(toadStats[msg.sender].isRestedValue) > 50, "Toad can't play while sleepy");
        if ((calcDecay(toadStats[msg.sender].isFedValue) == 0) &&
            (calcDecay(toadStats[msg.sender].isHappyValue) == 0) &&
            (calcDecay(toadStats[msg.sender].isRestedValue) == 0)) {
            return;
        } else {
            toadStats[msg.sender].lastPlayBlock = block.number;
            grantXP(70);
        }
    }
    function sleepToad() public {
        require(calcDecay(toadStats[msg.sender].isRestedValue) < 100, "Toad is fully rested");
        require(calcDecay(toadStats[msg.sender].isFedValue) > 30, "Toad can't sleep while starving");
        if ((calcDecay(toadStats[msg.sender].isFedValue) == 0) &&
            (calcDecay(toadStats[msg.sender].isHappyValue) == 0) &&
            (calcDecay(toadStats[msg.sender].isRestedValue) == 0)) {
            return;
        } else {
            toadStats[msg.sender].lastSleepBlock = block.number;
            grantXP(50);
        }
    }
    function grantXP(uint256 giveXP) public {
        uint256 leftoverXP = 0;
        uint256 xpPenalty = giveXP / toadStats[msg.sender].toadLevel;
        toadStats[msg.sender].toadXP = toadStats[msg.sender].toadXP + xpPenalty;

        if (toadStats[msg.sender].toadXP >= 100) {
            if (toadStats[msg.sender].toadXP > 100) {
                leftoverXP = toadStats[msg.sender].toadXP - 100;
            }
            toadStats[msg.sender].toadLevel = toadStats[msg.sender].toadLevel + 1;
            toadStats[msg.sender].toadXP = 0 + leftoverXP;
        }
    }
}
