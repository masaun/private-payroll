/* global artifacts */
/* eslint-disable no-await-in-loop */
//const settlementCurrencies = require('../config/settlementCurrencies').default;
const Dai = artifacts.require("Dai");
const PrivateInvoiceFactory = artifacts.require('./PrivateInvoiceFactory.sol');

//@dev - Import from exported file
var contractAddressList = require('./contractAddress/contractAddress.js');
var tokenAddressList = require('./tokenAddress/tokenAddress.js');
var walletAddressList = require('./walletAddress/walletAddress.js');

const daiAddress = Dai.address;

module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(PrivateInvoiceFactory, daiAddress);
};
