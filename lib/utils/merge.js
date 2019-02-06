"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mergeDeep;

var _icepick = _interopRequireDefault(require("icepick"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mergeDeep(target, source) {
  return _icepick.default.merge(target, source);
}