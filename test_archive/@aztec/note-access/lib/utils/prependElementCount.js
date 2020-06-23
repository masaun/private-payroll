"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = prependElementCount;

var _constants = require("../config/constants");

var _to32ByteOffset = _interopRequireDefault(require("./to32ByteOffset"));

function prependElementCount(data, length) {
  var dataLength = length ? data.length : Math.min(_constants.MIN_BYTES_VAR_LENGTH, data.length);
  var count = Math.round(dataLength / Math.max(length || 0, _constants.MIN_BYTES_VAR_LENGTH));
  return "".concat((0, _to32ByteOffset["default"])(count)).concat(data);
}