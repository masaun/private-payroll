pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";

// Use original Ownable.sol
import "./lib/OwnableOriginal.sol";

// Storage
import "./storage/McModifier.sol";  /// McStorage.sol is inherited
import "./storage/McConstants.sol";

/// Aztec
import "@aztec/protocol/contracts/interfaces/IZkAsset.sol";
import "@aztec/protocol/contracts/ERC1724/ZkAssetMintable.sol";


/***
 * @notice - This contract is that Private Salary Distributing System 
 **/
contract PrivateInvoice is ZkAssetMintable, OwnableOriginal(msg.sender), McModifier, McConstants {

    IZkAsset public zkAsset;
    //ZkAssetMintable public zkAssetMintable;
    IERC20 public dai;

    constructor(
        address _daiAddress, 
        address _aceAddress, 
        uint24 _optionalMintProofId,
        bytes memory _optionalInitialisationMint,
        address _zkAsset
    ) public ZkAssetMintable(_aceAddress, address(0), 1, _optionalMintProofId, _optionalInitialisationMint) {
        zkAsset = IZkAsset(_zkAsset);
        //zkAssetMintable = ZkAssetMintable(_zkAssetMintable);
        dai = IERC20(_daiAddress);
    }


    function depositSalary() public returns (bool) {
        
    }

    function transferSalary() public returns (bool) {
        
    }
    



    // function _confidentialMint(uint24 _proof, bytes memory _proofData) public {
    //     zkAssetMintable.confidentialMint(_proof, _proofData);
    // }

    // function _confidentialTransfer(uint24 _proofId, bytes memory _proofData, bytes memory _signatures) public {
    //     zkAssetMintable.confidentialTransfer(_proofId, _proofData, _signatures);
    // }



    /***
     * @notice - Getter Function
     **/
    function balanceOfContract() public view returns (uint balanceOfContract_DAI, uint balanceOfContract_ETH) {
        return (dai.balanceOf(address(this)), address(this).balance);
    }

}
