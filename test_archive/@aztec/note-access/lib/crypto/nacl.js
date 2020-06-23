"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _tweetnacl = _interopRequireDefault(require("tweetnacl"));

var _tweetnaclUtil = _interopRequireDefault(require("tweetnacl-util"));

_tweetnacl["default"].util = _tweetnaclUtil["default"];
var _default = _tweetnacl["default"];
exports["default"] = _default;