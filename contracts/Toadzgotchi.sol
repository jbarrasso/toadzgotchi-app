//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

interface ToadzgotchiNFTInterface {
    function toadzgotchisOwned(address _owner) external view returns (uint256[] memory);
    function balanceOf(address owner) external view returns (uint256);
}

contract Toadzgotchi {
    //using Strings for string;

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
    }

    uint256[] public toadz;
    address public _toadzgotchiNFTContractAddress = 0x5f5Cc7BC9BFe1e6319BDE9E30d883ECE36D00cAd;

    ToadzgotchiNFTInterface internal toadzgotchiNFTContract = ToadzgotchiNFTInterface(_toadzgotchiNFTContractAddress);

    mapping(uint256 => ToadStats) public toadStats;

    constructor() {}

    // function startVibing() public {
    //     require(toadStats[msg.sender].isVibing == false, "Toad is already vibing");

    //     toadStats[msg.sender].isVibing = true;
    //     toadStats[msg.sender].startVibingTime = block.number;
    //     toadStats[msg.sender].toadLevel = 1;

    //     toadStats[msg.sender].isFedValue = 96;
    //     toadStats[msg.sender].lastFeedBlock = block.number;   

    //     toadStats[msg.sender].isHappyValue = 96;
    //     toadStats[msg.sender].lastPlayBlock = block.number;

    //     toadStats[msg.sender].isRestedValue = 96;
    //     toadStats[msg.sender].lastSleepBlock = block.number;

    //     console.log("'%s' has started game at block number '%s'", msg.sender, toadStats[msg.sender].startVibingTime);
    // }
    // function grantXP(uint256 giveXP) public {
    //     uint256 leftoverXP = 0;
    //     uint256 xpPenalty = giveXP / toadStats[toadz[0]].toadLevel;
    //     toadStats[toadz[0]].toadXP = toadStats[toadz[0]].toadXP + xpPenalty;

    //     if (toadStats[toadz[0]].toadXP >= 100) {
    //         if (toadStats[toadz[0]].toadXP > 100) {
    //             leftoverXP = toadStats[toadz[0]].toadXP - 100;
    //         }
    //         toadStats[toadz[0]].toadLevel = toadStats[toadz[0]].toadLevel + 1;
    //         toadStats[toadz[0]].toadXP = 0 + leftoverXP;
    //     }
    // }
    // function readToadHunger() public view returns (int256) {
    //     return toadStats[toadz[0]].isFedValue;
    // }
    // function readToadPlay() public view returns (int256) {
    //     return toadStats[toadz[0]].isHappyValue;
    // }
    // function readToadSleep() public view returns (int256) {
    //     return toadStats[toadz[0]].isRestedValue;
    // }
    function ownsToadzgotchis() public view returns (bool) {
        if (toadzgotchiNFTContract.toadzgotchisOwned(msg.sender).length > 0) {
            return true;
        } else {
            return false;
        }
    }
    function fetchToadStats() public view returns (ToadStats[] memory) {
        require(ownsToadzgotchis() == true, "Sender doesn't own Toadzgotchis");
        uint256[] memory toadzOwned = toadzgotchiNFTContract.toadzgotchisOwned(msg.sender);
        ToadStats[] memory results = new ToadStats[](toadzOwned.length);
        for (uint256 i = 0; i < toadzOwned.length; i++ ) {
            results[i] = toadStats[toadzOwned[i]];
        }
        return results;
    }
    function toadzgotchiIdsOwned() public view returns (uint256[] memory) {
        require(ownsToadzgotchis() == true, "Sender doesn't own Toadzgotchis");
        return toadzgotchiNFTContract.toadzgotchisOwned(msg.sender);
    }
    function returnMsgSender() public view returns (address) {
        return msg.sender;
    }
    // function calcDecayFeed() public view returns (int256) {
    //     //1 Eth block every 15s
    //     //hoursElapsed = (block.number - lastFeedTime * 15)/360
    //     //decay rate = 2 pts per 1 hr (50hrs to drain from 100 to 0)
    //     //decayFed = (2 * hoursElapsed)"?

    //     int256 decayBy;
    //     uint256 timeElapsed = block.number - toadStats[msg.sender].lastFeedBlock;

    //     // uint256 timeElapsed; 
    //     // if (keccak256(bytes(action)) == keccak256("feed")) {
    //     //     timeElapsed = block.number - toadStats[msg.sender].lastFeedBlock;
    //     // } else if (keccak256(bytes(action)) == keccak256("play")) {
    //     //     timeElapsed = block.number - toadStats[msg.sender].lastPlayBlock;
    //     // } else if (keccak256(bytes(action)) == keccak256("sleep")) {
    //     //     timeElapsed = block.number - toadStats[msg.sender].lastFeedBlock;
    //     // } else {
    //     //     revert("Specify feed, play, or sleep");
    //     // }

    //     if (timeElapsed <= 1) {
    //         decayBy = 0;
    //     } else if (timeElapsed >= 2 && timeElapsed <= 4) {
    //         decayBy = 10;
    //     } else if (timeElapsed >= 5 && timeElapsed <= 7) {
    //         decayBy = 20;
    //     } else if (timeElapsed >= 8 && timeElapsed <= 10) {
    //         decayBy = 30;
    //     } else if (timeElapsed >= 11 && timeElapsed <= 13) {
    //         decayBy = 40;
    //     } else if (timeElapsed >= 14 && timeElapsed <= 16) {
    //         decayBy = 50;
    //     } else if (timeElapsed >= 17 && timeElapsed <= 19) {
    //         decayBy = 60;
    //     } else if (timeElapsed >= 20 && timeElapsed <= 22) {
    //         decayBy = 70;
    //     } else if (timeElapsed >= 23 && timeElapsed <= 25) {
    //         decayBy = 80;
    //     } else if (timeElapsed >= 26 && timeElapsed <= 28) {
    //         decayBy = 90;
    //     } else {
    //         decayBy = 110;
    //     }
    //     int256 decayedFeed = toadStats[msg.sender].isFedValue - decayBy;
    //      if (decayedFeed < 0) {
    //         decayedFeed = 0;
    //     }
    //     return decayedFeed;
    // }
    // function calcDecayPlay() public view returns (int256) {
    //     //1 Eth block every 15s
    //     //hoursElapsed = ((block.number - lastPlayBlock) * 15)/360
    //     //decay rate = 2 pts per 1 hr (50hrs to drain from 100 to 0)
    //     //decayFed = (2 * hoursElapsed)"?

    //     int256 decayBy;
    //     uint256 timeElapsed = block.number - toadStats[msg.sender].lastPlayBlock;

    //     // uint256 timeElapsed; 
    //     // if (keccak256(bytes(action)) == keccak256("feed")) {
    //     //     timeElapsed = block.number - toadStats[msg.sender].lastFeedBlock;
    //     // } else if (keccak256(bytes(action)) == keccak256("play")) {
    //     //     timeElapsed = block.number - toadStats[msg.sender].lastPlayBlock;
    //     // } else if (keccak256(bytes(action)) == keccak256("sleep")) {
    //     //     timeElapsed = block.number - toadStats[msg.sender].lastFeedBlock;
    //     // } else {
    //     //     revert("Specify feed, play, or sleep");
    //     // }

    //     if (timeElapsed <= 1) {
    //         decayBy = 0;
    //     } else if (timeElapsed >= 2 && timeElapsed <= 4) {
    //         decayBy = 10;
    //     } else if (timeElapsed >= 5 && timeElapsed <= 7) {
    //         decayBy = 20;
    //     } else if (timeElapsed >= 8 && timeElapsed <= 10) {
    //         decayBy = 30;
    //     } else if (timeElapsed >= 11 && timeElapsed <= 13) {
    //         decayBy = 40;
    //     } else if (timeElapsed >= 14 && timeElapsed <= 16) {
    //         decayBy = 50;
    //     } else if (timeElapsed >= 17 && timeElapsed <= 19) {
    //         decayBy = 60;
    //     } else if (timeElapsed >= 20 && timeElapsed <= 22) {
    //         decayBy = 70;
    //     } else if (timeElapsed >= 23 && timeElapsed <= 25) {
    //         decayBy = 80;
    //     } else if (timeElapsed >= 26 && timeElapsed <= 28) {
    //         decayBy = 90;
    //     } else {
    //         decayBy = 110;
    //     }
    //     int256 decayedPlay = toadStats[msg.sender].isHappyValue - decayBy;
    //      if (decayedPlay < 0) {
    //         decayedPlay = 0;
    //     }
    //     return decayedPlay;
    // }
    // function calcDecaySleep() public view returns (int256) {
    //     //1 Eth block every 15s
    //     //hoursElapsed = (block.number - lastFeedTime * 15)/360
    //     //decay rate = 2 pts per 1 hr (50hrs to drain from 100 to 0)
    //     //decayFed = (2 * hoursElapsed)"?

    //     int256 decayBy;
    //     uint256 timeElapsed = block.number - toadStats[msg.sender].lastSleepBlock;

    //     // uint256 timeElapsed; 
    //     // if (keccak256(bytes(action)) == keccak256("feed")) {
    //     //     timeElapsed = block.number - toadStats[msg.sender].lastFeedBlock;
    //     // } else if (keccak256(bytes(action)) == keccak256("play")) {
    //     //     timeElapsed = block.number - toadStats[msg.sender].lastPlayBlock;
    //     // } else if (keccak256(bytes(action)) == keccak256("sleep")) {
    //     //     timeElapsed = block.number - toadStats[msg.sender].lastFeedBlock;
    //     // } else {
    //     //     revert("Specify feed, play, or sleep");
    //     // }

    //     if (timeElapsed <= 1) {
    //         decayBy = 0;
    //     } else if (timeElapsed >= 2 && timeElapsed <= 4) {
    //         decayBy = 10;
    //     } else if (timeElapsed >= 5 && timeElapsed <= 7) {
    //         decayBy = 20;
    //     } else if (timeElapsed >= 8 && timeElapsed <= 10) {
    //         decayBy = 30;
    //     } else if (timeElapsed >= 11 && timeElapsed <= 13) {
    //         decayBy = 40;
    //     } else if (timeElapsed >= 14 && timeElapsed <= 16) {
    //         decayBy = 50;
    //     } else if (timeElapsed >= 17 && timeElapsed <= 19) {
    //         decayBy = 60;
    //     } else if (timeElapsed >= 20 && timeElapsed <= 22) {
    //         decayBy = 70;
    //     } else if (timeElapsed >= 23 && timeElapsed <= 25) {
    //         decayBy = 80;
    //     } else if (timeElapsed >= 26 && timeElapsed <= 28) {
    //         decayBy = 90;
    //     } else {
    //         decayBy = 110;
    //     }
    //     int256 decayedSleep = toadStats[msg.sender].isRestedValue - decayBy;
    //     if (decayedSleep < 0) {
    //         decayedSleep = 0;
    //     }
    //     return decayedSleep;
    // }
    // function isFeedable() public view returns (bool) {
    //     require(toadStats[msg.sender].isDead == false, "Toad is dead");
    //     require(calcDecayFeed() < 100, "Toad is full");
    //     return true;
    // }
    // function isPlayable() public view returns (bool) {
    //     require(toadStats[msg.sender].isRestedValue >= 30, "Toad cannot play while sleepy");
    //     require(toadStats[msg.sender].isDead == false, "Toad is dead");
    //     require(calcDecayPlay() < 100, "Toad is fully played");
    //     return true;
    // }
    // function isSleepable() public view returns (bool) {
    //     //handle when state is 10 but contract says 20 (use calcDecayFeed)
    //     require(toadStats[msg.sender].isFedValue >= 20, "Toad cannot sleep while starving");
    //     require(toadStats[msg.sender].isDead == false, "Toad is dead");
    //     require(calcDecaySleep() < 100, "Toad is fully rested");
    //     return true;
    // }
    // function feedToad(int256 feedValue) public {
    //     require(isFeedable(), "Toad is not feedable");

    //     //console.log("Time since last feed: '%s' blocks. decaying by '%s'", (block.number - toadStats[msg.sender].lastFeedBlock), decayBy);
    //     //console.log("Adding '%s' to isFedValue", feedValue);

    //     toadStats[msg.sender].isFedValue = calcDecayFeed();
    //     toadStats[msg.sender].isFedValue = (toadStats[msg.sender].isFedValue + feedValue);

    //     if (toadStats[msg.sender].isFedValue > 100) {
    //         toadStats[msg.sender].isFedValue = 100;
    //     }

    //     toadStats[msg.sender].lastFeedBlock = block.number;

    //     grantXP(30);
    // }
    // function playToad(int256 playValue) public {
    //     //maybe split into its own function? isFeedable() returns bool
    //     require(isPlayable(), "Toad is not playable");

    //     //console.log("Time since last feed: '%s' blocks. decaying by '%s'", (block.number - toadStats[msg.sender].lastPlayBlock), decayBy);
    //     //console.log("Adding '%s' to isFedValue", playValue);

    //     toadStats[msg.sender].isHappyValue = calcDecayPlay();
    //     toadStats[msg.sender].isHappyValue = toadStats[msg.sender].isHappyValue + playValue;

    //     if (toadStats[msg.sender].isHappyValue > 100) {
    //         toadStats[msg.sender].isHappyValue = 100;
    //     }

    //     toadStats[msg.sender].lastPlayBlock = block.number;

    //     grantXP(70);
    // }
    // function sleepToad(int256 sleepValue) public {
    //     //maybe split into its own function? isFeedable() returns bool
    //     require(isSleepable(), "Toad is not sleepable");
    
    //     //console.log("Time since last feed: '%s' blocks. decaying by '%s'", (block.number - toadStats[msg.sender].lastSleepBlock), decayBy);
    //     //console.log("Adding '%s' to isFedValue", sleepValue);

    //     toadStats[msg.sender].isRestedValue = calcDecaySleep();
    //     toadStats[msg.sender].isRestedValue = toadStats[msg.sender].isRestedValue + sleepValue;

    //     if (toadStats[msg.sender].isRestedValue > 100) {
    //         toadStats[msg.sender].isRestedValue = 100;
    //     }

    //     toadStats[msg.sender].lastSleepBlock = block.number;

    //     grantXP(50);
    // }
}
