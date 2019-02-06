"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = invertValidity;

var _isPlainObject = _interopRequireDefault(require("./is-plain-object"));

var _mapValues = _interopRequireDefault(require("./map-values"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function invertValidity(validity) {
  if ((0, _isPlainObject.default)(validity)) {
    return (0, _mapValues.default)(validity, invertValidity);
  }

  return !validity;
}