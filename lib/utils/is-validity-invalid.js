"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isValidityInvalid;

var _isPlainObject = _interopRequireDefault(require("./is-plain-object"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isValidityInvalid(errors) {
  if (Array.isArray(errors)) {
    return errors.some(isValidityInvalid);
  }

  if ((0, _isPlainObject.default)(errors)) {
    return Object.keys(errors).some(function (key) {
      return isValidityInvalid(errors[key]);
    });
  }

  return !!errors;
}