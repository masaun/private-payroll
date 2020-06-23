"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = toHexString;

function toHexString(byteArray) {
  var s = '0x';
  byteArray.forEach(function (_byte) {
    s += "0".concat((_byte & 0xff).toString(16)).slice(-2); // eslint-disable-line no-bitwise
  });
  return s;
}