/***
 * @notice - To test only
 **/
var Dai = artifacts.require("Dai");

const chainId_ = 1;

module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(Dai, chainId_);
};
