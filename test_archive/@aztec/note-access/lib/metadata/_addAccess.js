"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _addAccess;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _web3Utils = require("web3-utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _addAccess(metadata, access) {
  var noteAccess = Array.isArray(access) ? access : [access];
  var addresses = metadata.addresses,
      viewingKeys = metadata.viewingKeys;
  var newAddresses = [];
  var newViewingKeys = [];
  noteAccess.forEach(function (_ref) {
    var address = _ref.address,
        viewingKey = _ref.viewingKey;
    var formattedAddress = (0, _web3Utils.toChecksumAddress)(address);
    if (addresses.indexOf(formattedAddress) >= 0) return;
    newAddresses.push(formattedAddress);
    newViewingKeys.push(viewingKey);
  });
  return _objectSpread({}, metadata, {
    addresses: [].concat((0, _toConsumableArray2["default"])(addresses), newAddresses),
    viewingKeys: [].concat((0, _toConsumableArray2["default"])(viewingKeys), newViewingKeys)
  });
}