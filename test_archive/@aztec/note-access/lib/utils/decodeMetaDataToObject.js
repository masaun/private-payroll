"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = decodeMetaDataToObject;

var _constants = require("../config/constants");

var stripPrependedZeroes = function stripPrependedZeroes(str) {
  return str.replace(/^0{1,}/, '');
};
/**
 * Decode metaData from string format - the format as it is stored on a note - into
 * an object, according to a passed config.
 *
 * @method decodeMetaDataToObject
 * @param {String} metaDataStr - metaData of an AZTEC note, as a hexadecimal string
 * @param {Array} config - defines the schema of the object to which the metaData will be decoded
 * @param {Number} startOffset - JavaScript number representing the length of any prepended metaData which is
 * not encoded in this note-access package, for example the ephemeralKey associated data
 * @returns {Object} metaDataObj - metaData in object form
 */


function decodeMetaDataToObject(metaDataStr, config) {
  var startOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var formattedMetaDataStr = metaDataStr.startsWith('0x') ? metaDataStr.slice(2) : metaDataStr;
  var offsetOfDynamicDataMapping = [];
  config.forEach(function (_, idx) {
    var startOfVars = _constants.MIN_BYTES_VAR_LENGTH * idx;
    var dynamicVars = formattedMetaDataStr.substr(startOfVars, _constants.MIN_BYTES_VAR_LENGTH);
    offsetOfDynamicDataMapping.push(2 * parseInt(dynamicVars, 16) - startOffset);
  });
  var metaDataObj = {};
  config.forEach(function (_ref, i) {
    var name = _ref.name,
        length = _ref.length,
        _toString = _ref._toString;
    var data = [];
    var startOfDynamicData = offsetOfDynamicDataMapping[i];
    var endOfDynamicData = offsetOfDynamicDataMapping[i + 1] !== undefined ? offsetOfDynamicDataMapping[i + 1] : formattedMetaDataStr.length;
    var dataStr = formattedMetaDataStr.substring(startOfDynamicData, endOfDynamicData);
    var lengthOfDynamicData = length !== undefined ? Math.max(length, _constants.MIN_BYTES_VAR_LENGTH) : endOfDynamicData - startOfDynamicData - _constants.MIN_BYTES_VAR_LENGTH;
    var numberOfDynamicData = parseInt(dataStr.slice(0, _constants.MIN_BYTES_VAR_LENGTH), 10);

    for (var j = 0; j < numberOfDynamicData; j += 1) {
      var dynamicData = dataStr.substr(lengthOfDynamicData * j + _constants.MIN_BYTES_VAR_LENGTH, lengthOfDynamicData);
      var formattedData = length !== undefined ? dynamicData.slice(-length) : stripPrependedZeroes(dynamicData);

      if (_toString) {
        formattedData = _toString(formattedData).replace(/^0x/, '');
      }

      data.push("0x".concat(formattedData));
    }

    var isArrayData = length !== undefined;
    metaDataObj[name] = isArrayData ? data : data[0] || '';
  });
  return metaDataObj;
}