"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formSelector;
Object.defineProperty(exports, "isValid", {
  enumerable: true,
  get: function get() {
    return _isValid.default;
  }
});
Object.defineProperty(exports, "isPending", {
  enumerable: true,
  get: function get() {
    return _isPending.default;
  }
});
Object.defineProperty(exports, "isTouched", {
  enumerable: true,
  get: function get() {
    return _isTouched.default;
  }
});
Object.defineProperty(exports, "isRetouched", {
  enumerable: true,
  get: function get() {
    return _isRetouched.default;
  }
});

var _isValid = _interopRequireDefault(require("./is-valid"));

var _isPending = _interopRequireDefault(require("./is-pending"));

var _isTouched = _interopRequireDefault(require("./is-touched"));

var _isRetouched = _interopRequireDefault(require("./is-retouched"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function formSelector(formState) {
  return _objectSpread({}, formState, {
    get valid() {
      return (0, _isValid.default)(formState);
    },

    get pending() {
      return (0, _isPending.default)(formState);
    },

    get touched() {
      return (0, _isTouched.default)(formState);
    },

    get retouched() {
      return (0, _isRetouched.default)(formState);
    }

  });
}