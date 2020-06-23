"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = constructor;

var _devUtils = require("@aztec/dev-utils");

var _constants = require("../config/constants");

var _crypto = require("../crypto");

var _decrypt = _interopRequireDefault(require("./decrypt"));

/**
 * Encrypt the viewing key of the note with a specific users linkedPublicKey,
 * such that they are able to decrypt with their private key.
 *
 * @method constructor
 * @param {String} linkedPublicKey - publicKey used to encrypt the viewing key, such that the
 * designed user is able to decrypy the viewing key and gain view access to the note.
 *
 * It should be noted that this is not the Ethereum publicKey associated with a user's Ethereum address.
 * Instead, this linkedPublicKey is created when a user registers to use AZTEC
 *
 * @param {String} realViewingKey - viewing key of the note
 *
 * @returns {Object} An object with three methods:
 *      1) export() - encrypt the
 *      2) toHexString() - convert the encrypted viewing key into a hexadecimal string
 *      3) decrypt(privateKey) - decrypt the encrypted viewing key to a hexadecimal string, using the users
 *                               passed privateKey
 */
function constructor(linkedPublicKey, realViewingKey) {
  var formattedViewingKey = realViewingKey.replace(/^0x/, '');

  if (formattedViewingKey.length !== _constants.REAL_VIEWING_KEY_LENGTH) {
    (0, _devUtils.warnLog)('Wrong viewing key size.');
    return null;
  }

  var encrypted = (0, _crypto.encryptMessage)(linkedPublicKey, formattedViewingKey);

  encrypted.decrypt = function (privateKey) {
    return (0, _decrypt["default"])(privateKey, encrypted);
  };

  return encrypted;
}