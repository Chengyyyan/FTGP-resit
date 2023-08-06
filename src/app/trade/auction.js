
const abi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "seller",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "campaign",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "auctionType",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "itemType",
                "type": "string"
            }
        ],
        "name": "AuctionCreated",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "auctionAddresses",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_nft",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_nftId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_startingBid",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_minimumBid",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_duration",
                "type": "uint256"
            }
        ],
        "name": "createEnglishAuctionERC721",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

import { ethers } from "ethers"; 


const contractAddress = "0xb15675635445a4F60Cc5DCF65aCA7B2f64e066Fd";

export function connectToMetaMask() {
    try {
      // Check if the MetaMask extension is installed
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed.');
      }
  
      // Request the user's permission to connect to their MetaMask wallet
    window.ethereum.request({ method: 'eth_requestAccounts' });
  
      // You are now connected to the user's MetaMask wallet!
      // You can access their account address and interact with the blockchain using window.ethereum.
  
      // Example: Get the selected account address
      const accounts = window.ethereum.request({ method: 'eth_accounts' });
      const selectedAccount = accounts[0];
      console.log('Connected account address:', selectedAccount);
    } catch (error) {
      console.error('Error connecting to MetaMask:', error.message);
    }
  }
  
