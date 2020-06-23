"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateAccessMetaData;

var _addAccess = _interopRequireDefault(require("./metadata/addAccess"));

var _encryptedViewingKey = _interopRequireDefault(require("./encryptedViewingKey"));

/**
 * @method generateAccessMetaData - grant an Ethereum address view access to a note
 * @param {Array} access - mapping between an Ethereum address and the linked public key. The specified address
 * is being granted access to the note
 * @param {String} noteViewKey - viewing key of the note
 */
function generateAccessMetaData(access, noteViewKey) {
  var noteAccess = access.map(function (_ref) {
    var address = _ref.address,
        linkedPublicKey = _ref.linkedPublicKey;
    var viewingKey = (0, _encryptedViewingKey["default"])(linkedPublicKey, noteViewKey);
    return {
      address: address,
      viewingKey: viewingKey.toHexString()
    };
  });
  return (0, _addAccess["default"])('', noteAccess);
}