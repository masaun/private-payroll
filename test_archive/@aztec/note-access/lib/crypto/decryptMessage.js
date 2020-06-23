"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = decryptMessage;

var _devUtils = require("@aztec/dev-utils");

var _nacl = _interopRequireDefault(require("./nacl"));

var _toUint8Array = _interopRequireDefault(require("./toUint8Array"));

function decryptMessage(privateKey, encryptedData) {
  if (typeof encryptedData === 'string') {
    (0, _devUtils.errorLog)('Please provide an EncryptedMessage object as the second parameter.');
    return '';
  }

  var privateKeyHash = privateKey.replace(/^0x/, '');
  var output;

  try {
    var privateKeyBase64 = Buffer.from(privateKeyHash, 'hex').toString('base64');

    var privateKeyUint8Array = _nacl["default"].util.decodeBase64(privateKeyBase64);

    var recieverEncryptionPrivateKey = _nacl["default"].box.keyPair.fromSecretKey(privateKeyUint8Array).secretKey;

    var encryptedMessage = 'export' in encryptedData ? encryptedData["export"]() : encryptedData;
    var nonce = (0, _toUint8Array["default"])(encryptedMessage.nonce);
    var ciphertext = (0, _toUint8Array["default"])(encryptedMessage.ciphertext);
    var ephemPublicKey = (0, _toUint8Array["default"])(encryptedMessage.ephemPublicKey);

    var decryptedMessage = _nacl["default"].box.open(ciphertext, nonce, ephemPublicKey, recieverEncryptionPrivateKey);

    if (decryptedMessage) {
      output = _nacl["default"].util.encodeUTF8(decryptedMessage);
    }
  } catch (error) {
    (0, _devUtils.errorLog)('Decryption failed.', error);
  }

  return output || '';
}