"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _getAccess;

var _web3Utils = require("web3-utils");

function _getAccess(metadata, address) {
  var addresses = metadata.addresses,
      viewingKeys = metadata.viewingKeys;
  var idx = addresses.findIndex(function (a) {
    return a === (0, _web3Utils.toChecksumAddress)(address);
  });

  if (idx < 0) {
    return null;
  }

  return {
    address: addresses[idx],
    viewingKey: viewingKeys[idx]
  };
}