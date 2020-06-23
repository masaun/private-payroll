"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ensureMinVarSize;

var _web3Utils = require("web3-utils");

var _constants = require("../config/constants");

function ensureMinVarSize(val) {
  var str = "".concat(val);
  return (0, _web3Utils.padLeft)(str.match(/^0x/i) ? str.slice(2) : str, _constants.MIN_BYTES_VAR_LENGTH);
}