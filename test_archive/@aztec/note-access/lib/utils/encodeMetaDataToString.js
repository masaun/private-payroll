"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = encodeMetaDataToString;

var _constants = require("../config/constants");

var _ensureMinVarSize = _interopRequireDefault(require("./ensureMinVarSize"));

var _to32ByteOffset = _interopRequireDefault(require("./to32ByteOffset"));

/**
 * Encode metaData from object form into string form - the form which is stored on an
 * AZTEC note - according to a passed config.
 *
 * @method encodeMetaDataToString
 * @param {Object} metaDataObj - metaData of an AZTEC note, in object form
 * @param {Array} config - defines the schema of the object to which the metaData will be decoded
 * @param {Number} startOffset - JavaScript number representing the length of any prepended metaData which is
 * not encoded in this note-access package, for example the ephemeralKey associated data
 * @returns {String} metaData encoded as a string
 */
function encodeMetaDataToString(metaDataObj, config) {
  var startOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var variableOffsets = [];
  var variableData = [];
  var dynamicVarsOffset = startOffset + config.length * _constants.MIN_BYTES_VAR_LENGTH;
  var accumNumberOfDynamicData = 0;
  config.forEach(function (_ref) {
    var name = _ref.name,
        length = _ref.length,
        _toString = _ref._toString;
    var dynamicData = metaDataObj[name];
    var isDynamicArray = length !== undefined;
    var numberOfDynamicData = isDynamicArray ? dynamicData && dynamicData.length || 0 : dynamicData && 1 || 0;
    accumNumberOfDynamicData += numberOfDynamicData;
    variableOffsets.push((0, _to32ByteOffset["default"])(dynamicVarsOffset));
    variableData.push((0, _ensureMinVarSize["default"])(numberOfDynamicData));

    if (dynamicData) {
      var transformData = _toString ? function (data) {
        return (0, _ensureMinVarSize["default"])(_toString(data));
      } : _ensureMinVarSize["default"];

      if (isDynamicArray) {
        dynamicData.forEach(function (data) {
          variableData.push(transformData(data));
        });
      } else {
        variableData.push(transformData(dynamicData));
      }
    }

    dynamicVarsOffset += variableData.slice(-(numberOfDynamicData + 1)).reduce(function (accum, data) {
      return accum + data.length;
    }, 0);
  });

  if (!accumNumberOfDynamicData) {
    return '';
  }

  return ['0x', variableOffsets.join(''), variableData.join('')].join('');
}