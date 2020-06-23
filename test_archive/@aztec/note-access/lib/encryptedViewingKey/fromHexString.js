"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = fromHexString;

var _devUtils = require("@aztec/dev-utils");

var _constants = require("../config/constants");

var _fromHexString = _interopRequireDefault(require("../crypto/fromHexString"));

var _decrypt = _interopRequireDefault(require("./decrypt"));

function fromHexString(str) {
  var bytes = str.replace(/^0x/, '');

  if (bytes.length !== _constants.VIEWING_KEY_LENGTH) {
    (0, _devUtils.warnLog)('Wrong viewing key string length.', str);
    return null;
  }

  var encrypted = (0, _fromHexString["default"])(str);

  encrypted.decrypt = function (privateKey) {
    return (0, _decrypt["default"])(privateKey, encrypted);
  };

  return encrypted;
}