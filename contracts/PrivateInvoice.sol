pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";

// Use original Ownable.sol
import "./lib/OwnableOriginal.sol";

// Storage
import "./storage/McModifier.sol";  /// McStorage.sol is inherited
import "./storage/McConstants.sol";



/***
 * @notice - This contract is that ...
 **/
contract PrivateInvoice is OwnableOriginal(msg.sender), McModifier, McConstants {

    IERC20 public dai;

    constructor(address _daiAddress) public {
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
