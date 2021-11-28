//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Toadzgotchi {

    struct ToadStats {
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

        toadStats[msg.sender].isFedValue = 50;
        toadStats[msg.sender].lastFeedBlock = block.number;   

        toadStats[msg.sender].isHappyValue = 50;
        toadStats[msg.sender].lastPlayBlock = block.number;

        toadStats[msg.sender].isRestedValue = 50;
        toadStats[msg.sender].lastSleepBlock = block.number;

        console.log("'%s' has started game at block number '%s'", msg.sender, toadStats[msg.sender].startVibingTime);
    }
    function grantXP(uint256 giveXP) public {
        uint256 leftoverXP = 0;
        toadStats[msg.sender].toadXP = toadStats[msg.sender].toadXP + giveXP;

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
    function calcDecayFeed() public view returns (uint256) {
        //1 Eth block every 15s
        //hoursElapsed = (block.number - lastFeedTime * 15)/360
        //decay rate = 2 pts per 1 hr (50hrs to drain from 100 to 0)
        //decayFed = (2 * hoursElapsed)"?

        uint256 timeElapsed = block.number - toadStats[msg.sender].lastFeedBlock;

        // uint256 timeElapsed; 
        // if (keccak256(bytes(action)) == keccak256("feed")) {
        //     timeElapsed = block.number - toadStats[msg.sender].lastFeedBlock;
        // } else if (keccak256(bytes(action)) == keccak256("play")) {
        //     timeElapsed = block.number - toadStats[msg.sender].lastPlayBlock;
        // } else if (keccak256(bytes(action)) == keccak256("sleep")) {
        //     timeElapsed = block.number - toadStats[msg.sender].lastFeedBlock;
        // } else {
        //     revert("Specify feed, play, or sleep");
        // }

        if (timeElapsed <= 1) {
            return 0;
        } else if (timeElapsed >= 2 && timeElapsed <= 4) {
            return 10;
        } else if (timeElapsed >= 5 && timeElapsed <= 7) {
            return 20;
        } else if (timeElapsed >= 8 && timeElapsed <= 10) {
            return 30;
        } else if (timeElapsed >= 11 && timeElapsed <= 13) {
            return 40;
        } else if (timeElapsed >= 14 && timeElapsed <= 16) {
            return 50;
        } else if (timeElapsed >= 17 && timeElapsed <= 19) {
            return 60;
        } else if (timeElapsed >= 20 && timeElapsed <= 22) {
            return 70;
        } else if (timeElapsed >= 23 && timeElapsed <= 25) {
            return 80;
        } else if (timeElapsed >= 26 && timeElapsed <= 28) {
            return 90;
        } else {
            return 110;
        }
    }
    function calcDecayPlay() public view returns (uint256) {
        //1 Eth block every 15s
        //hoursElapsed = (block.number - lastFeedTime * 15)/360
        //decay rate = 2 pts per 1 hr (50hrs to drain from 100 to 0)
        //decayFed = (2 * hoursElapsed)"?

        uint256 timeElapsed = block.number - toadStats[msg.sender].lastPlayBlock;

        // uint256 timeElapsed; 
        // if (keccak256(bytes(action)) == keccak256("feed")) {
        //     timeElapsed = block.number - toadStats[msg.sender].lastFeedBlock;
        // } else if (keccak256(bytes(action)) == keccak256("play")) {
        //     timeElapsed = block.number - toadStats[msg.sender].lastPlayBlock;
        // } else if (keccak256(bytes(action)) == keccak256("sleep")) {
        //     timeElapsed = block.number - toadStats[msg.sender].lastFeedBlock;
        // } else {
        //     revert("Specify feed, play, or sleep");
        // }

        if (timeElapsed <= 1) {
            return 0;
        } else if (timeElapsed >= 2 && timeElapsed <= 4) {
            return 10;
        } else if (timeElapsed >= 5 && timeElapsed <= 7) {
            return 20;
        } else if (timeElapsed >= 8 && timeElapsed <= 10) {
            return 30;
        } else if (timeElapsed >= 11 && timeElapsed <= 13) {
            return 40;
        } else if (timeElapsed >= 14 && timeElapsed <= 16) {
            return 50;
        } else if (timeElapsed >= 17 && timeElapsed <= 19) {
            return 60;
        } else if (timeElapsed >= 20 && timeElapsed <= 22) {
            return 70;
        } else if (timeElapsed >= 23 && timeElapsed <= 25) {
            return 80;
        } else if (timeElapsed >= 26 && timeElapsed <= 28) {
            return 90;
        } else {
            return 110;
        }
    }
    function calcDecaySleep() public view returns (uint256) {
        //1 Eth block every 15s
        //hoursElapsed = (block.number - lastFeedTime * 15)/360
        //decay rate = 2 pts per 1 hr (50hrs to drain from 100 to 0)
        //decayFed = (2 * hoursElapsed)"?

        uint256 timeElapsed = block.number - toadStats[msg.sender].lastSleepBlock;

        // uint256 timeElapsed; 
        // if (keccak256(bytes(action)) == keccak256("feed")) {
        //     timeElapsed = block.number - toadStats[msg.sender].lastFeedBlock;
        // } else if (keccak256(bytes(action)) == keccak256("play")) {
        //     timeElapsed = block.number - toadStats[msg.sender].lastPlayBlock;
        // } else if (keccak256(bytes(action)) == keccak256("sleep")) {
        //     timeElapsed = block.number - toadStats[msg.sender].lastFeedBlock;
        // } else {
        //     revert("Specify feed, play, or sleep");
        // }

        if (timeElapsed <= 1) {
            return 0;
        } else if (timeElapsed >= 2 && timeElapsed <= 4) {
            return 10;
        } else if (timeElapsed >= 5 && timeElapsed <= 7) {
            return 20;
        } else if (timeElapsed >= 8 && timeElapsed <= 10) {
            return 30;
        } else if (timeElapsed >= 11 && timeElapsed <= 13) {
            return 40;
        } else if (timeElapsed >= 14 && timeElapsed <= 16) {
            return 50;
        } else if (timeElapsed >= 17 && timeElapsed <= 19) {
            return 60;
        } else if (timeElapsed >= 20 && timeElapsed <= 22) {
            return 70;
        } else if (timeElapsed >= 23 && timeElapsed <= 25) {
            return 80;
        } else if (timeElapsed >= 26 && timeElapsed <= 28) {
            return 90;
        } else {
            return 110;
        }
    }
    function isFeedable() public view returns (bool) {
        require(toadStats[msg.sender].isDead == false, "Toad is dead");
        if (toadStats[msg.sender].isFedValue == 100) {
            require(calcDecayFeed() > 0, "Toad is full, cannot feed");
        }
        return true;
    }
    function isPlayable() public view returns (bool) {
        require(toadStats[msg.sender].isRestedValue >= 30, "Toad cannot play while sleepy");
        require(toadStats[msg.sender].isDead == false, "Toad is dead");
        if (toadStats[msg.sender].isHappyValue == 100) {
            require(calcDecayPlay() > 0, "Toad fully played, cannot play");
        }
        return true;
    }
    function isSleepable() public view returns (bool) {
        require(toadStats[msg.sender].isFedValue >= 20, "Toad cannot sleep while starving");
        require(toadStats[msg.sender].isDead == false, "Toad is dead");
        if (toadStats[msg.sender].isRestedValue == 100) {
            require(calcDecaySleep() > 0, "Toad is full, cannot feed");
        }
        return true;
    }
    function feedToad(uint256 feedValue) public {
        require(isFeedable(), "Toad is not feedable");

        uint256 decayBy = calcDecayFeed();
        uint256 decayedFed = toadStats[msg.sender].isFedValue - decayBy;
    
        console.log("Time since last feed: '%s' blocks. decaying by '%s'", (block.number - toadStats[msg.sender].lastFeedBlock), decayBy);
        console.log("Adding '%s' to isFedValue", feedValue);

        if (decayedFed < 0) {
            decayedFed = 0;
        }

        toadStats[msg.sender].isFedValue = decayedFed;
        toadStats[msg.sender].isFedValue = toadStats[msg.sender].isFedValue + feedValue;

        if (toadStats[msg.sender].isFedValue > 100) {
            toadStats[msg.sender].isFedValue = 100;
        }

        toadStats[msg.sender].lastFeedBlock = block.number;

        grantXP(15);
    }
    function playToad(uint256 playValue) public {
        //maybe split into its own function? isFeedable() returns bool
        require(isPlayable(), "Toad is not playable");

        uint256 decayBy = calcDecayPlay();
        uint256 decayedPlay = toadStats[msg.sender].isHappyValue - decayBy;
    
        console.log("Time since last feed: '%s' blocks. decaying by '%s'", (block.number - toadStats[msg.sender].lastPlayBlock), decayBy);
        console.log("Adding '%s' to isFedValue", playValue);

        if (decayedPlay < 0) {
            decayedPlay = 0;
        }

        toadStats[msg.sender].isHappyValue = decayedPlay;
        toadStats[msg.sender].isHappyValue = toadStats[msg.sender].isHappyValue + playValue;

        if (toadStats[msg.sender].isHappyValue > 100) {
            toadStats[msg.sender].isHappyValue = 100;
        }

        toadStats[msg.sender].lastPlayBlock = block.number;

        grantXP(40);
    }
    function sleepToad(uint256 sleepValue) public {
        //maybe split into its own function? isFeedable() returns bool
        require(isSleepable(), "Toad is not sleepable");

        uint256 decayBy = calcDecaySleep();
        uint256 decayedSleep = toadStats[msg.sender].isRestedValue - decayBy;
    
        console.log("Time since last feed: '%s' blocks. decaying by '%s'", (block.number - toadStats[msg.sender].lastSleepBlock), decayBy);
        console.log("Adding '%s' to isFedValue", sleepValue);

        if (decayedSleep < 0) {
            decayedSleep = 0;
        }

        toadStats[msg.sender].isRestedValue = decayedSleep;
        toadStats[msg.sender].isRestedValue = toadStats[msg.sender].isRestedValue + sleepValue;

        if (toadStats[msg.sender].isRestedValue > 100) {
            toadStats[msg.sender].isRestedValue = 100;
        }

        toadStats[msg.sender].lastSleepBlock = block.number;

        grantXP(25);
    }
}
