"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _web3Utils = require("web3-utils");

var _ensureMinVarSize = _interopRequireDefault(require("./ensureMinVarSize"));

var to32ByteOffset = function to32ByteOffset(offset) {
  return (0, _ensureMinVarSize["default"])("".concat((0, _web3Utils.toHex)(offset / 2).slice(2)));
};

var _default = to32ByteOffset;
exports["default"] = _default;