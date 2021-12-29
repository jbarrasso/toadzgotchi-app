// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract OwnableDelegateProxy {
}

contract ProxyRegistry {
    mapping(address => OwnableDelegateProxy) public proxies;
}

interface ToadzInterface {
    function ownerOf(uint256 tokenId) external view returns (address owner);
}

contract ToadzgotchiNFT is ERC721PresetMinterPauserAutoId, Ownable {
    using Strings for string;

    bool public _isMintingAllowed = false;
    bool public _toadzOnly = true;
    uint256 public _mintPrice = 5000000000000000;
    uint256 public _maxSupply = 6969;
    address _proxyRegistryAddress = 0xa5409ec958C83C3f309868babACA7c86DCB077c1;
    address public _crypToadzContractAddress = 0x1CB1A5e65610AEFF2551A50f76a87a7d3fB649C6;
    string internal _baseTokenUri;
    mapping(uint256 => bool) public ineligibleToadz;

    ToadzInterface internal toadzContract = ToadzInterface(_crypToadzContractAddress);

    event Minted(address indexed account, uint256 toadId);
    event Received(address indexed account, uint256 value);

    constructor() ERC721PresetMinterPauserAutoId("ToadzgotchiNFT", "TOADZGOTCHI", "") {}

    // function mint(uint256 toadId) public payable /*nonReentrant*/ {
    //     require(_isMintingAllowed, "Minting is not allowed");
    //     require(totalSupply() < _maxSupply, "All Toadzgotchi claimed");
    //     require(toadId > 0, "Please enter valid toadId");
    //     require(toadId <= _maxSupply, "Please enter valid toadId");
    //     require(msg.value >= _mintPrice, "Insufficient ETH amount");

    //     if (_toadzOnly) {
    //         require(toadzContract.ownerOf(toadId) == msg.sender, "Not Your Toad");
    //     }
    //     require(!_exists(toadId), "Choad already minted");

    //     _safeMint(_msgSender(), toadId);
    //     emit Minted(_msgSender(), toadId);
    // }

    function tryMint(uint256[] memory toadIds) public payable {
        require(_isMintingAllowed, "Minting is not allowed");
        require(totalSupply() < _maxSupply, "All Toadzgotchi claimed");
        require((msg.value == _mintPrice * toadIds.length), "Insufficient ETH amount");

        for (uint256 i = 0; i < toadIds.length; i++) {
            if (_toadzOnly) {
                require(toadzContract.ownerOf(toadIds[i]) == msg.sender, "Not your toad");
            }
            require(toadIds[i] > 0, "Please enter valid toadId");
            require(toadIds[i] <= _maxSupply, "Please enter valid toadId");
            require(!_exists(toadIds[i]), "Toadzgotchi already claimed");
            _safeMint(_msgSender(), toadIds[i]);
            emit Minted(_msgSender(), toadIds[i]);
        }
    }

    receive() external payable {
        emit Received(_msgSender(), msg.value);
    }

    function reserve(uint256 toadzgotchi) public onlyOwner {
        require(!_exists(toadzgotchi), "Toadzgotchi already minted");
        _safeMint(_msgSender(), toadzgotchi);
        emit Minted(_msgSender(), toadzgotchi);
    }

    function toadzgotchisOwned(address _owner) external view returns (uint256[] memory) {
        uint256 numberOwned = balanceOf(_owner);
        if (numberOwned == 0) {
            return new uint256[](0);
        } else {
            uint256[] memory result = new uint256[](numberOwned);
            uint256 i;
            for (i = 0; i < numberOwned; i++) {
                result[i] = tokenOfOwnerByIndex(_owner, i);
            }
            //console.log("toadz owned '%s'", result);
            return result;
        }
    }

    function setBaseURI(string memory baseUri) external onlyOwner {
        _baseTokenUri = baseUri;
    }

    function setMintPrice(uint256 price) external onlyOwner {
        _mintPrice = price;
    }

    function flipMintState() public onlyOwner {
        _isMintingAllowed = !_isMintingAllowed;
    }

    function flipPrivateSale() public onlyOwner {
        _toadzOnly = !_toadzOnly;
    }

    function pause() public virtual override onlyOwner {
        _pause();
    }

    function unpause() public virtual override onlyOwner {
        _unpause();
    }

    function withdraw() public payable onlyOwner {
        require(payable(_msgSender()).send(address(this).balance), "Unable to withdraw ETH");
    }

    function _burn(uint256 tokenId) internal override(ERC721) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 _toadzgotchiId) public view override(ERC721) returns (string memory) {
        require(_exists(_toadzgotchiId), "Toadzgotchi Doesn't Exist");
        return string(abi.encodePacked(_baseTokenUri, "/", uint2str(_toadzgotchiId)));
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721PresetMinterPauserAutoId) whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721PresetMinterPauserAutoId) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function isApprovedForAll(address owner, address operator) public view override returns (bool) {
        ProxyRegistry proxyRegistry = ProxyRegistry(_proxyRegistryAddress);

        if (address(proxyRegistry.proxies(owner)) == operator) {
            return true;
        }
        return super.isApprovedForAll(owner, operator);
    }

    function uint2str(uint256 _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
}