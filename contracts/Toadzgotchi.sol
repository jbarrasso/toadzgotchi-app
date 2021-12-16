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
        bool isDead;
    }

    mapping(address => ToadStats) public toadStats;

    constructor() {}

    function startVibing() public {
        require(toadStats[msg.sender].isVibing == false, "Toad is already vibing");

        toadStats[msg.sender].isVibing = true;
        toadStats[msg.sender].startVibingTime = block.number;
        toadStats[msg.sender].toadLevel = 1;

        toadStats[msg.sender].isFedValue = 100;
        toadStats[msg.sender].lastFeedBlock = block.number;   

        toadStats[msg.sender].isHappyValue = 100;
        toadStats[msg.sender].lastPlayBlock = block.number;

        toadStats[msg.sender].isRestedValue = 100;
        toadStats[msg.sender].lastSleepBlock = block.number;

        console.log("'%s' has started game at block number '%s'", msg.sender, toadStats[msg.sender].startVibingTime);
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
        return toadStats[msg.sender];
    }
    function returnMsgSender() public view returns (address) {
        return msg.sender;
    }
    function getminutes() public view returns (uint256) {
        uint256 minutesElapsed = (((block.number - toadStats[msg.sender].lastFeedBlock) * 15)/60);
        return minutesElapsed;
    }
    function calcDecayFeed() public view returns (uint256) {
        //1 Eth block every 15s
        //hoursElapsed = (block.number - lastFeedTime * 15)/360
        //decay rate = 2 pts per 1 hr (50hrs to drain from 100 to 0)
        //decayFed = (2 * hoursElapsed)"?

        //Rinkeby testing
        uint256 minutesElapsed = (((block.number - toadStats[msg.sender].lastFeedBlock) * 15)/60);
        uint256 decayBy = (2 * minutesElapsed);
        uint256 updatedFedValue;
        if (decayBy > toadStats[msg.sender].isFedValue) {
            updatedFedValue = 0;
        } else {
            updatedFedValue = toadStats[msg.sender].isFedValue - decayBy;
        }
        return updatedFedValue;
    }
    function calcDecayPlay() public view returns (uint256) {
        uint256 minutesElapsed = (((block.number - toadStats[msg.sender].lastPlayBlock) * 15)/60);
        uint256 decayBy = (2 * minutesElapsed);
        uint256 updatedHappyValue;
        if (decayBy > toadStats[msg.sender].isHappyValue) {
            updatedHappyValue = 0;
        } else {
            updatedHappyValue = toadStats[msg.sender].isHappyValue - decayBy;
        }
        return updatedHappyValue;
    }
    function calcDecaySleep() public view returns (uint256) {
        uint256 minutesElapsed = (((block.number - toadStats[msg.sender].lastSleepBlock) * 15)/60);
        uint256 decayBy = (2 * minutesElapsed);
        uint256 updatedRestedValue;
        if (decayBy > toadStats[msg.sender].isRestedValue) {
            updatedRestedValue = 0;
        } else {
            updatedRestedValue = toadStats[msg.sender].isRestedValue - decayBy;
        }
        return updatedRestedValue;
    }
    // function isFeedable() public view returns (bool) {
    //     return true;
    // }
    // function isPlayable() public view returns (bool) {
    //     return true;
    // }
    // function isSleepable() public view returns (bool) {
    //     return true;
    // }
    function feedToad() public {
        require(toadStats[msg.sender].isDead == false, "Toad is dead");
        require(calcDecayFeed() < 100, "Toad is full"); //does this have to return false
        if ((calcDecayFeed() == 0) && (calcDecayPlay() == 0) && (calcDecaySleep() == 0)) {
            toadStats[msg.sender].isDead = true;
            return;
        } else {
            toadStats[msg.sender].lastFeedBlock = block.number;
            grantXP(30);
        }
    }
    function playToad() public {
        require(toadStats[msg.sender].isDead == false, "Toad is dead");
        require(calcDecayPlay() < 100, "Toad is fully played");
        require(calcDecaySleep() > 50, "Toad can't play while sleepy");
        if ((calcDecayFeed() == 0) && (calcDecayPlay() == 0) && (calcDecaySleep() == 0)) {
            toadStats[msg.sender].isDead = true;
            return;
        } else {
            toadStats[msg.sender].lastPlayBlock = block.number;
            grantXP(70);
        }
    }
    function sleepToad() public {
        //handle when state is 10 but contract says 20 (use calcDecayFeed)
        require(toadStats[msg.sender].isDead == false, "Toad is dead");
        require(calcDecaySleep() < 100, "Toad is fully rested");
        require(calcDecayFeed() > 30, "Toad can't sleep while starving");
        if ((calcDecayFeed() == 0) && (calcDecayPlay() == 0) && (calcDecaySleep() == 0)) {
            toadStats[msg.sender].isDead = true;
            return;
        } else {
            toadStats[msg.sender].lastSleepBlock = block.number;
            grantXP(50);
        }
    }
}
