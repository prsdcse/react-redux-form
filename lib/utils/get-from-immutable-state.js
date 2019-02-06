"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = immutableGetFromState;

var _toPath = _interopRequireDefault(require("./to-path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function immutableGetFromState(state, modelString) {
  var path = (0, _toPath.default)(modelString);
  return path.reduce(function (subState, subPath) {
    if (!subState || typeof subState === 'string') return subState; // Current subState is immutable

    if (_typeof(subState) === 'object' && 'get' in subState) {
      return subState.get(subPath);
    } // Current subState is a plain object/array


    return subState[subPath];
  }, state);
}