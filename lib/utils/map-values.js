"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function mapValues(object, iteratee) {
  var result = {};
  Object.keys(object || {}).forEach(function (key) {
    result[key] = iteratee(object[key], key, object);
  });
  return result;
}

var _default = mapValues;
exports.default = _default;