"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.START_OFFSET = void 0;

var _web3Utils = require("web3-utils");

var _constants = require("./constants");

var START_OFFSET = _constants.METADATA_AZTEC_DATA_LENGTH;
exports.START_OFFSET = START_OFFSET;
var _default = [{
  name: 'addresses',
  length: _constants.ADDRESS_LENGTH,
  _toString: _web3Utils.toChecksumAddress
}, {
  name: 'viewingKeys',
  length: _constants.VIEWING_KEY_LENGTH
}, {
  name: 'appData'
}];
exports["default"] = _default;