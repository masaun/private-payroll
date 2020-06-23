const ACE = artifacts.require('./ACE.sol');
const ZkAsset = artifacts.require('./ZkAsset.sol');
const ZkAssetMintable = artifacts.require('./ZkAssetMintable.sol');
const TestERC20 = artifacts.require('./TestERC20.sol');

module.exports = async (deployer, network) => {
  await deployer.deploy(TestERC20);
  const testERC20 = await TestERC20.deployed();

  let aceContract;
  if (network === 'local') {
    aceContract = await ACE.deployed();
    // initialise the ZkAsset with an ERC20 equivilant
    await deployer.deploy(
      ZkAsset,
      aceContract.address,  /// _aceAddress
      testERC20.address,    /// _linkedTokenAddress
      1                     /// _scalingFactor
    );

    // initialise the private asset 
    await deployer.deploy(ZkAssetMintable,
      aceContract.address,                             /// _aceAddress
      '0x0000000000000000000000000000000000000000',    /// _linkedTokenAddress
      1,                                               /// _scalingFactor
      0,                                               /// _optionalMintProofId
      [],                                              /// _optionalInitialisationMint
    );
  }
};
