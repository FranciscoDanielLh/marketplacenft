// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Marketplace is ReentrancyGuard {

    address payable public immutable feeAccount;
    uint public immutable feePercent;
    uint public itemCount;

    struct Item {
        uint itemId;
        IERC721 nft;
        uint tokenId;
        uint price;
        address payable seller;
        bool sold;
        address buyer;
        uint useLimit;
    }

    mapping(uint => Item) public items;
    mapping(uint => uint) private times;

    event Offered(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller
    );
    event Bought(
        uint itemId,
        address indexed nft,
        uint tokenId,
        uint price,
        address indexed seller,
        address indexed buyer
    );
    event Benefict(
        uint limit,
        address owner,
        bool status
    );

    constructor (uint _feePercent) {
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
    }

    function makeItem(IERC721 _nft, uint _tokenId, uint _price, uint _limit) external nonReentrant {
        require(_price > 0, "Price must be greater than zero");
        itemCount++;
        _nft.transferFrom(msg.sender, address(this), _tokenId);
        items[itemCount] = Item(
            itemCount,
            _nft,
            _tokenId,
            _price,
            payable(msg.sender),
            false,
            address(0x0),
            _limit
        );
        emit Offered(
            itemCount,
            address(_nft),
            _tokenId,
            _price,
            msg.sender
        );
    }

    function purchaseItem(uint _itemId) external payable nonReentrant {
        uint _totalPrice = getTotalPrice(_itemId);
        Item storage item = items[_itemId];
        require(_itemId > 0 && _itemId <= itemCount);
        require(msg.value >= _totalPrice);
        require(!item.sold);
        item.seller.transfer(item.price);
        feeAccount.transfer(_totalPrice - item.price);
        item.sold = true;
        item.buyer= msg.sender;
        item.nft.transferFrom(address(this), msg.sender, item.tokenId);
        times[_itemId] = block.timestamp;
        emit Bought(
            _itemId,
            address(item.nft),
            item.tokenId,
            item.price,
            item.seller,
            msg.sender
        );
    }

    function getTotalPrice(uint _itemId) view public returns(uint) {
        return ((items[_itemId].price*(100 + feePercent))/100);
    }

    
    function validation(address owner, uint _itemId) public returns (bool) {
        Item storage itemBenefict = items[_itemId];
        bool status = false;
        require(owner == itemBenefict.buyer, "Only the owner can see beneficts");
        uint limit= itemBenefict.useLimit;
        require (limit >0, "Beneficio ya cobrado");
        limit = limit-1;
        itemBenefict.useLimit = limit;
        status = true;
        emit Benefict(
            limit,
            msg.sender,
            status
        );
        return status ;
    }

}