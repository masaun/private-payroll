"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = constructor;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _metadata = _interopRequireWildcard(require("../config/metadata"));

var _decodeMetaDataToObject = _interopRequireDefault(require("../utils/decodeMetaDataToObject"));

var _addAccess3 = _interopRequireDefault(require("./_addAccess"));

var _getAccess2 = _interopRequireDefault(require("./_getAccess"));

var _toString2 = _interopRequireDefault(require("./toString"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Construct a metaData object, with key methods to manipulate the metaData such as by adding
 * view key access for a third party and converting the metaData object to a string
 *
 * @method constructor
 * @param {String} metaDataStr - metaData in string form, the form as it is stored on
 * the AZTEC note
 * @returns {Object} metaData object together with associated method for commonly performed
 * actions
 */
function constructor(metaDataStr) {
  var metadata = (0, _decodeMetaDataToObject["default"])(metaDataStr, _metadata["default"], _metadata.START_OFFSET);
  var addresses = metadata.addresses,
      viewingKeys = metadata.viewingKeys;
  return _objectSpread({}, metadata, {
    addAccess: function addAccess(access) {
      var _addAccess2 = (0, _addAccess3["default"])(metadata, access),
          newAddresses = _addAccess2.addresses,
          newViewingKeys = _addAccess2.viewingKeys;

      newAddresses.forEach(function (a, i) {
        if (addresses.indexOf(a) >= 0) return;
        addresses.push(a);
        viewingKeys.push(newViewingKeys[i]);
      });
    },
    getAccess: function getAccess(address) {
      return (0, _getAccess2["default"])(metadata, address);
    },
    toString: function toString() {
      return (0, _toString2["default"])(metadata);
    }
  });
}