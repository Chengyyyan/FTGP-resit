// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v4.9/contracts/security/ReentrancyGuard.sol";

interface IERC721 {
    function safeTransferFrom(address from, address to, uint tokenId) external;
    function approve(address spender, uint id) external;
    function transferFrom(address, address, uint) external;
}

enum AuctionStatus {Active, Ended}

contract EnglishAuctionERC721 is ReentrancyGuard{
    event AuctionStarted(address indexed contractAddress);
    event Bid(address indexed sender, uint amount);
    event Withdraw(address indexed bidder, uint amount);
    event End(address winner, uint amount);

    IERC721 public nft;
    uint public nftId;

    address payable public seller;
    uint public endAt;
    AuctionStatus public status;

    address public highestBidder;
    uint public highestBid;
    uint public minimumBid;
    mapping(address => uint) public bids;

    modifier onlyActive() {
        require(status == AuctionStatus.Active, "Auction is not active");
        _;
    }

    modifier onlyEnded() {
        require(status == AuctionStatus.Ended, "Auction has not ended");
        _;
    }

    modifier notSeller() {
        require(msg.sender != seller, "Seller cannot participate");
        _;
    }

    constructor(
        address payable _seller, 
        address _nft, 
        uint _nftId, 
        uint _startingBid, 
        uint _minimumBid, 
        uint _duration
        ) {
        nft = IERC721(_nft);
        nftId = _nftId;

        seller = _seller;
        highestBid = _startingBid;
        minimumBid = _minimumBid;
        endAt = block.timestamp + _duration * 60;

    }

    function start() public {
        nft.transferFrom(seller, address(this), nftId);
        status = AuctionStatus.Active;
        emit AuctionStarted(address(this));
    }

    function bid() external payable onlyActive nonReentrant notSeller {
        watcher();
        require(msg.value >= highestBid + minimumBid, "Invalid bid amount, must be higher than current bid plus minimum bid");
        require(msg.sender != highestBidder, "Cannot bid over yourself");

        if (highestBidder != address(0)) {
            bids[highestBidder] += highestBid;
        }

        highestBidder = msg.sender;
        highestBid = msg.value;

        if (endAt - block.timestamp <= 2 minutes) {
            endAt += 2 minutes;
        }

        emit Bid(msg.sender, msg.value);
    }

    function withdraw() external onlyEnded nonReentrant notSeller {
        uint bal = bids[msg.sender];
        bids[msg.sender] = 0;
        payable(msg.sender).transfer(bal);

        emit Withdraw(msg.sender, bal);
    }

    function watcher() internal onlyActive {
        if (block.timestamp >= endAt) {
            status = AuctionStatus.Ended;
            endAuction();
        }
    }

    function endAuction() internal onlyEnded{
        if (highestBidder != address(0)) {
            nft.safeTransferFrom(address(this), highestBidder, nftId);
            seller.transfer(highestBid);
        } else {
            nft.safeTransferFrom(address(this), seller, nftId);
        }

        emit End(highestBidder, highestBid);
    }
}
