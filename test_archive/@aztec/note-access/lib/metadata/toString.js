"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = toString;

var _metadata = _interopRequireWildcard(require("../config/metadata"));

var _encodeMetaDataToString = _interopRequireDefault(require("../utils/encodeMetaDataToString"));

function toString(metaDataObj) {
  return (0, _encodeMetaDataToString["default"])(metaDataObj, _metadata["default"], _metadata.START_OFFSET);
}