"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = encryptMessage;

var _devUtils = require("@aztec/dev-utils");

var _nacl = _interopRequireDefault(require("./nacl"));

var _toUint8Array = _interopRequireDefault(require("./toUint8Array"));

var _toHexString = _interopRequireDefault(require("./toHexString"));

var _EncryptedMessage = _interopRequireDefault(require("./EncryptedMessage"));

function encryptMessage(publicKey, message) {
  var ephemeralKeyPair = _nacl["default"].box.keyPair();

  var pubKeyUInt8Array;

  try {
    pubKeyUInt8Array = (0, _toUint8Array["default"])(publicKey);
  } catch (error) {
    (0, _devUtils.errorLog)('Bad public key', error);
    return null;
  }

  var msgParamsUInt8Array = _nacl["default"].util.decodeUTF8(message);

  var nonce = _nacl["default"].randomBytes(_nacl["default"].box.nonceLength);

  var encryptedMessage = _nacl["default"].box(msgParamsUInt8Array, nonce, pubKeyUInt8Array, ephemeralKeyPair.secretKey);

  return (0, _EncryptedMessage["default"])({
    nonce: (0, _toHexString["default"])(nonce),
    ephemPublicKey: (0, _toHexString["default"])(ephemeralKeyPair.publicKey),
    ciphertext: (0, _toHexString["default"])(encryptedMessage)
  });
}