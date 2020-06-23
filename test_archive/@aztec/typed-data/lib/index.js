"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Module to construct ECDSA messages for structured data,
 * following the [EIP712]{@link https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md} standard
 *
 * @module sign.signer
 */
var ethAbi = require('ethereumjs-abi');

var ethUtil = require('ethereumjs-util');

var AbiCoder = require('web3-eth-abi');

var _require = require('web3-utils'),
    keccak256 = _require.keccak256;

var signer = {};

function sliceKeccak256(data) {
  return keccak256(data).slice(2);
}
/**
 * Recursively encode a struct's data into a unique string
 *
 * @method encodeMessageData
 * @param {Object} types set of all types encompassed by struct
 * @param {string} types.name name
 * @param {string} types.type type
 * @param {string} primaryType the top-level type of the struct
 * @param {Object} message the struct instance's data
 * @returns {string} encoded message data string
 */


signer.encodeMessageData = function encodeMessageData(types, primaryType, message) {
  return types[primaryType].reduce(function (acc, _ref) {
    var name = _ref.name,
        type = _ref.type;

    if (types[type]) {
      return "".concat(acc).concat(sliceKeccak256("0x".concat(encodeMessageData(types, type, message[name]))));
    }

    if (type === 'string' || type === 'bytes') {
      return "".concat(acc).concat(sliceKeccak256(message[name]));
    }

    if (type.includes('[')) {
      var arrayRawEncoding = signer.encodeArray(type, message[name]);
      return "".concat(acc).concat(arrayRawEncoding);
    }

    return "".concat(acc).concat(AbiCoder.encodeParameters([type], [message[name]]).slice(2));
  }, sliceKeccak256(signer.encodeStruct(primaryType, types)));
};
/**
 * Encode an array, according to the method used by MetaMask. Code adapted from MetaMask's
 * encodeData() method in the eth-sig-util module - https://github.com/MetaMask/eth-sig-util/blob/master/index.js
 *
 * @method encodeArray
 * @param {String} type - type of the data structure to be encoded
 * @param {Array} data - array data to be encoded
 */


signer.encodeArray = function encodeArray(type, data) {
  var arrayElementAtomicType = type.slice(0, type.lastIndexOf('['));
  var typeValuePairs = data.map(function (item) {
    return [arrayElementAtomicType, item];
  });
  var arrayElementTypes = typeValuePairs.map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 1),
        individualType = _ref3[0];

    return individualType;
  });
  var arrayValueTypes = typeValuePairs.map(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
        value = _ref5[1];

    return value;
  });
  return ethUtil.sha3(ethAbi.rawEncode(arrayElementTypes, arrayValueTypes)).toString('hex');
};
/**
 * Create 'type' component of a struct
 *
 * @method encodeStruct
 * @param {string} primaryType the top-level type of the struct
 * @param {Object} types set of all types encompassed by struct
 * @param {string} types.name name
 * @param {string} types.type type
 * @returns {string} encoded type string
 */


signer.encodeStruct = function (primaryType, types) {
  var findTypes = function findTypes(type) {
    return [type].concat(types[type].reduce(function (acc, _ref6) {
      var typeKey = _ref6.type;

      if (types[typeKey] && acc.indexOf(typeKey) === -1) {
        return [].concat(_toConsumableArray(acc), _toConsumableArray(findTypes(typeKey)));
      }

      return acc;
    }, []));
  };

  return [primaryType].concat(findTypes(primaryType).sort(function (a, b) {
    return a.localeCompare(b);
  }).filter(function (a) {
    return a !== primaryType;
  })).reduce(function (acc, key) {
    return "".concat(acc).concat(key, "(").concat(types[key].reduce(function (iacc, _ref7) {
      var name = _ref7.name,
          type = _ref7.type;
      return "".concat(iacc).concat(type, " ").concat(name, ",");
    }, '').slice(0, -1), ")");
  }, '');
};
/**
 * Construct ECDSA signature message for structured data. For why we use 0x1901 as the prefix, check out the link below:
 * @see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-191.md
 *
 * @method encodeTypedData
 * @param {Object} typedData the EIP712 struct object
 * @returns {string} encoded message string
 */


signer.encodeTypedData = function (typedData) {
  var domainHash = sliceKeccak256("0x".concat(signer.encodeMessageData(typedData.types, 'EIP712Domain', typedData.domain)));
  var structHash = sliceKeccak256("0x".concat(signer.encodeMessageData(typedData.types, typedData.primaryType, typedData.message)));
  return keccak256("0x1901".concat(domainHash).concat(structHash));
};

module.exports = signer;