"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getField;

var _isPlainObject = _interopRequireDefault(require("./is-plain-object"));

var _get = _interopRequireDefault(require("./get"));

var _initialFieldState = _interopRequireDefault(require("../constants/initial-field-state"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getField(state, path) {
  if (process.env.NODE_ENV !== 'production') {
    if (!(0, _isPlainObject.default)(state)) {
      throw new Error("Could not retrieve field '".concat(path, "' ") + 'from an invalid/empty form state.');
    }
  }

  var result = (0, _get.default)(state, path, _initialFieldState.default);
  if ('$form' in result) return result.$form;
  return result;
}