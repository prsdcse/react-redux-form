"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = invertValidators;

var _mapValues = _interopRequireDefault(require("./map-values"));

var _invertValidity = _interopRequireDefault(require("./invert-validity"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function invertValidators(validators) {
  if (typeof validators === 'function') {
    return function (val) {
      return (0, _invertValidity.default)(validators(val));
    };
  }

  return (0, _mapValues.default)(validators, invertValidators);
}