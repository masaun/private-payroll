var PrivateInvoice = artifacts.require("PrivateInvoice");
var IERC20 = artifacts.require("IERC20");
const ZkAsset = artifacts.require('./ZkAsset.sol');
const ZkAssetMintable = artifacts.require('./ZkAssetMintable.sol');


//@dev - Import from exported file
var contractAddressList = require('./contractAddress/contractAddress.js');
var tokenAddressList = require('./tokenAddress/tokenAddress.js');
var walletAddressList = require('./walletAddress/walletAddress.js');

const daiAddress = tokenAddressList["Kovan"]["DAI"];                /// DAI address on Rinkeby
const _zkAsset = ZkAsset.address;
const _zkAssetMintable = ZkAssetMintable.address;

//const depositedAmount = web3.utils.toWei("0.15");    // 0.15 DAI which is deposited in deployed contract. 

module.exports = async function(deployer, network, accounts) {

    /***
     * @notice - Use for test only
     **/
    await deployer.deploy(PrivateInvoice, daiAddress, _zkAsset, _zkAssetMintable);


    /***
     * @notice - Use for deploying on testnet
     **/
    // let ownerAddress = walletAddressList["WalletAddress1"];

    // await deployer.deploy(PrivateInvoice, daiAddress, _zkAsset, _zkAssetMintable)
    //               .then(async function(privateInvoice) {
    //                   if(ownerAddress && ownerAddress!="") {
    //                       console.log(`=== Transfering ownership to address ${ownerAddress} ===`)
    //                       await privateInvoice.transferOwnership(ownerAddress);
    //                   }
    //               }
    // );

    //@dev - Transfer 2.1 DAI from deployer's address to contract address in advance
    // const TellorChainrunnerProject = await TellorChainrunnerProject.deployed();
    // const iERC20 = await IERC20.at(daiAddress);
    // await iERC20.transfer(tellorChainrunnerProject.address, depositedAmount);
};
