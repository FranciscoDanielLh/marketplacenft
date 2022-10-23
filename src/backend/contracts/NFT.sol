// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {

    uint public tokenCount;
    constructor() ERC721("DApp NFT", "DAPP"){}
    struct Collection{
        string collection_name;
        uint256 exist;
        uint256 token_id;
        string description;
    }
    Collection [] public collections;
    function mint(string memory _name, uint32 _exist, string memory _description ,string memory _tokenURI ) external returns (uint) {
        tokenCount++;
        Collection memory nft = Collection(_name,_exist,tokenCount,_description);
            collections.push(nft);
        _safeMint(msg.sender, tokenCount);
        _setTokenURI(tokenCount, _tokenURI);
        return tokenCount;
    }
   
    function getSize() public view returns (uint size){
        return collections.length;
        }

    function getName(uint _id) public view returns (string memory name){
        return collections[_id].collection_name;
    }

}