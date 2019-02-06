"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getValidity;

var _getValue = _interopRequireDefault(require("./get-value"));

var _mapValues = _interopRequireDefault(require("./map-values"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getValidity(validators, value) {
  var modelValue = (0, _getValue.default)(value);

  if (typeof validators === 'function') {
    return validators(modelValue);
  }

  return (0, _mapValues.default)(validators, function (validator) {
    return getValidity(validator, modelValue);
  });
}