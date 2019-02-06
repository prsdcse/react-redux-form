"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isValidityValid;

var _isPlainObject = _interopRequireDefault(require("./is-plain-object"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isValidityValid(validity) {
  if ((0, _isPlainObject.default)(validity)) {
    return Object.keys(validity).every(function (key) {
      return isValidityValid(validity[key]);
    });
  }

  return !!validity;
}