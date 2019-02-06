"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toPath;

var _lodash = _interopRequireDefault(require("lodash.topath"));

var _endsWith = _interopRequireDefault(require("./ends-with"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toPath(value) {
  var path = value;

  if ((0, _endsWith.default)(path, '.')) {
    path = path.slice(0, -1);
  } else if ((0, _endsWith.default)(path, '[]')) {
    path = path.slice(0, -2);
  }

  return (0, _lodash.default)(path);
}