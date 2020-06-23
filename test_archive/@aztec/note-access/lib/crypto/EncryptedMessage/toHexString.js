"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = toHexString;

function toHexString(encryptedData) {
  var ciphertext = encryptedData.ciphertext,
      ephemPublicKey = encryptedData.ephemPublicKey,
      nonce = encryptedData.nonce;
  return [nonce, ephemPublicKey.slice(2), ciphertext.slice(2)].join('');
}