"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EncryptedMessage;

var _decryptMessage = _interopRequireDefault(require("../decryptMessage"));

var _toHexString2 = _interopRequireDefault(require("./toHexString"));

function EncryptedMessage(data) {
  return {
    "export": function _export() {
      return data;
    },
    toHexString: function toHexString() {
      return (0, _toHexString2["default"])(data);
    },
    decrypt: function decrypt(privateKey) {
      return (0, _decryptMessage["default"])(privateKey, data);
    }
  };
}