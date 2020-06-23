"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "metadata", {
  enumerable: true,
  get: function get() {
    return _metadata["default"];
  }
});
Object.defineProperty(exports, "generateAccessMetaData", {
  enumerable: true,
  get: function get() {
    return _generateAccessMetaData["default"];
  }
});
exports.constants = void 0;

var _constants = require("./config/constants");

var _metadata = _interopRequireDefault(require("./metadata"));

var _generateAccessMetaData = _interopRequireDefault(require("./generateAccessMetaData"));

var constants = {
  AZTEC_JS_METADATA_PREFIX_LENGTH: _constants.AZTEC_JS_METADATA_PREFIX_LENGTH,
  VIEWING_KEY_LENGTH: _constants.VIEWING_KEY_LENGTH
};
exports.constants = constants;