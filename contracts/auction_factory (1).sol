// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./english_auction_erc721.sol";
// import "./ERC721.sol";

contract AuctionFactory{
    address[] public auctionAddresses;

    event AuctionCreated(address indexed seller, address campaign, string auctionType, string itemType);

    function createEnglishAuctionERC721(
        address _nft,
        uint _nftId,
        uint _startingBid,
        uint _minimumBid,
        uint _duration
    ) public {
        EnglishAuctionERC721 newEnglishAuctionERC721 = new EnglishAuctionERC721(
            payable(msg.sender),
            _nft,
            _nftId,
            _startingBid,
            _minimumBid,
            _duration
        );
        auctionAddresses.push(address(newEnglishAuctionERC721));
        emit AuctionCreated(msg.sender, address(newEnglishAuctionERC721), "English", "NFT");
    }
}

