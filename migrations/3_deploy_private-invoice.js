var PrivateInvoice = artifacts.require("PrivateInvoice");
var IERC20 = artifacts.require("IERC20");

//@dev - Import from exported file
var contractAddressList = require('./contractAddress/contractAddress.js');
var tokenAddressList = require('./tokenAddress/tokenAddress.js');
var walletAddressList = require('./walletAddress/walletAddress.js');

const daiAddress = tokenAddressList["Kovan"]["DAI"];                /// DAI address on Rinkeby

//const depositedAmount = web3.utils.toWei("0.15");    // 0.15 DAI which is deposited in deployed contract. 

module.exports = async function(deployer, network, accounts) {

    let ownerAddress = walletAddressList["WalletAddress1"];

    await deployer.deploy(PrivateInvoice, daiAddress)
                  .then(async function(privateInvoice) {
                      if(ownerAddress && ownerAddress!="") {
                          console.log(`=== Transfering ownership to address ${ownerAddress} ===`)
                          await privateInvoice.transferOwnership(ownerAddress);
                      }
                  }
    );

    //@dev - Transfer 2.1 DAI from deployer's address to contract address in advance
    // const TellorChainrunnerProject = await TellorChainrunnerProject.deployed();
    // const iERC20 = await IERC20.at(daiAddress);
    // await iERC20.transfer(tellorChainrunnerProject.address, depositedAmount);
};
