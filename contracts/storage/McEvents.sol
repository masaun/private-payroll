pragma solidity ^0.5.16;

import "./McObjects.sol";


contract McEvents {

    event Something(
        uint figure,
        address indexed addr
    );

}
