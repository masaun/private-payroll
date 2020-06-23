"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = addAccess;

var _constructor = _interopRequireDefault(require("./constructor"));

var _toString = _interopRequireDefault(require("./toString"));

var _addAccess2 = _interopRequireDefault(require("./_addAccess"));

/**
 * Generate the new metaData for a note, which contains the encrypted viewing keys to grant addresses
 * specified in 'access' view access to a note
 *
 * @method addAccess
 * @param {String} prevMetadata - any previously existing metaData, to which additional metaData
 * is being added
 * @param {Array} access - array of objects, where each object contains an Ethereum address and the
 * linkedPublicKey
 * @returns {String} newMetaData, including both the previous and additional metaData
 */
function addAccess(prevMetadata, access) {
  var isString = typeof prevMetadata === 'string';
  var metadata = isString ? (0, _constructor["default"])(prevMetadata) : prevMetadata;
  var newMetaData = (0, _addAccess2["default"])(metadata, access);
  return isString ? (0, _toString["default"])(newMetaData) : newMetaData;
}