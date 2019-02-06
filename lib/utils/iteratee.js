"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createIteratee = createIteratee;
exports.iterateeValue = iterateeValue;
exports.default = void 0;

var _identity = _interopRequireDefault(require("./identity"));

var _get2 = _interopRequireDefault(require("../utils/get"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var defaultStrategy = {
  get: _get2.default
};

function createIteratee() {
  var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultStrategy;

  function matcher(object) {
    return function (compareObject) {
      if (compareObject === object) return true;
      return Object.keys(object).every(function (key) {
        return s.get(object, key) === s.get(compareObject, key);
      });
    };
  }

  function propChecker(prop) {
    return function (object) {
      return object && !!s.get(object, prop);
    };
  }

  return function (value) {
    if (typeof value === 'function') {
      return value;
    }

    if (value === null) {
      return _identity.default;
    }

    if (_typeof(value) === 'object') {
      return matcher(value);
    }

    return propChecker(value);
  };
}

var iteratee = createIteratee();

function iterateeValue(data, value) {
  if (typeof value === 'function') {
    return value(data);
  }

  if (!Array.isArray(value) && _typeof(value) !== 'object' && typeof value !== 'string') {
    return !!value;
  }

  return iteratee(value)(data);
}

var _default = iteratee;
exports.default = _default;