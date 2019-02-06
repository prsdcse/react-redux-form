"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMulti;

var _endsWith = _interopRequireDefault(require("./ends-with"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isMulti(model) {
  return (0, _endsWith.default)(model, '[]');
}