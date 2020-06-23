pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";

// Use original Ownable.sol
import "./lib/OwnableOriginal.sol";

// Storage
import "./storage/McModifier.sol";  /// McStorage.sol is inherited
import "./storage/McConstants.sol";

/// Aztec
import "@aztec/protocol/contracts/ERC1724/ZkAsset.sol";
import "@aztec/protocol/contracts/ERC1724/ZkAssetMintable.sol";


/***
 * @notice - This contract is that ...
 **/
contract PrivateInvoice is OwnableOriginal(msg.sender), McModifier, McConstants {

    ZkAsset public zkAsset;
    ZkAssetMintable public zkAssetMintable;
    IERC20 public dai;

    constructor(address _daiAddress, address _zkAsset, address _zkAssetMintable) public {
        zkAsset = ZkAsset(_zkAsset);
        zkAssetMintable = ZkAssetMintable(_zkAssetMintable);
        dai = IERC20(_daiAddress);
    }


    function testFunc() public {}


    /***
     * @notice - Getter Function
     **/
    function balanceOfContract() public view returns (uint balanceOfContract_DAI, uint balanceOfContract_ETH) {
        return (dai.balanceOf(address(this)), address(this).balance);
    }

}
