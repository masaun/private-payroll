"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = toUint8Array;

function toUint8Array(hexString) {
  var typedArr = (hexString.substr(2).match(/.{1,2}/g) || []).map(function (_byte) {
    return parseInt(_byte, 16);
  });
  return new Uint8Array(typedArr);
}