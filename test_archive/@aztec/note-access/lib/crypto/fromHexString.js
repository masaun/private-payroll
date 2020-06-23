"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = fromHexString;

var _devUtils = require("@aztec/dev-utils");

var _EncryptedMessage = _interopRequireDefault(require("./EncryptedMessage"));

var _lengthConfig = _interopRequireDefault(require("./lengthConfig"));

function fromHexString(str) {
  var hash = str.replace(/^0x/, '');

  if (hash.length < 48 + 64) {
    (0, _devUtils.warnLog)('Wrong encrypted string length.', str);
    return null;
  }

  var encryptedData = {};
  var start = 0;
  Object.keys(_lengthConfig["default"]).forEach(function (key) {
    var len = _lengthConfig["default"][key];
    encryptedData[key] = "0x".concat(hash.substr(start, len));
    start += len;
  });
  encryptedData.ciphertext = "0x".concat(hash.substr(start));
  return (0, _EncryptedMessage["default"])(encryptedData);
}