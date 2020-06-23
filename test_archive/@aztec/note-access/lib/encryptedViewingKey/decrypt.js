"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = decrypt;

var _devUtils = require("@aztec/dev-utils");

var _crypto = require("../crypto");

var _lengthConfig = _interopRequireDefault(require("./lengthConfig"));

function decrypt(privateKey, encrypted) {
  var encryptedData = 'export' in encrypted ? encrypted["export"]() : encrypted;
  var wrongKey = Object.keys(encryptedData).find(function (key) {
    return encryptedData[key].length !== _lengthConfig["default"][key] + 2;
  });

  if (wrongKey) {
    (0, _devUtils.warnLog)('Wrong encrypted viewing key format.', "'".concat(wrongKey, "' should have length ").concat(_lengthConfig["default"][wrongKey], " but got ").concat(encryptedData[wrongKey].length));
    return null;
  }

  var bytes = (0, _crypto.decryptMessage)(privateKey, encryptedData);

  if (!bytes) {
    return '';
  }

  return "0x".concat(bytes);
}