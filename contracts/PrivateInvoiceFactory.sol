pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";

// Use original Ownable.sol
import "./lib/OwnableOriginal.sol";

// Storage
import "./storage/McModifier.sol";  /// McStorage.sol is inherited
import "./storage/McConstants.sol";

/// Aztec
//import "@aztec/protocol/contracts/interfaces/IZkAsset.sol";

/// Original
import "./PrivateInvoice.sol";



/***
 * @notice - This contract is that Private Salary Distributing System 
 **/
contract PrivateInvoiceFactory {

    address[] public invoices;

    uint24 MINT_PROOF = 66049;
    uint24 BILATERAL_SWAP_PROOF = 65794;

    IERC20 public dai;

    constructor(address _daiAddress) public {
        dai = IERC20(_daiAddress);
    }


    function _createInvoice(
        address _daiAddress, 
        address _aceAddress, 
        uint24 _optionalMintProofId,
        bytes memory _optionalInitialisationMint,
        address _zkAsset,
        bytes memory _proofData
    ) private returns (address) {
        PrivateInvoice newInvoice = new PrivateInvoice(_daiAddress,
                                                       _aceAddress,
                                                       _optionalMintProofId,
                                                       _optionalInitialisationMint,
                                                       _zkAsset);

        invoices.push(address(newInvoice));
        PrivateInvoice privateInvoice = PrivateInvoice(address(newInvoice));

        privateInvoice.setProofs(1, uint256(-1));
        privateInvoice.confidentialMint(MINT_PROOF, bytes(_proofData));

        return address(newInvoice);
    }


}
