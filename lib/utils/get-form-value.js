"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getFormValue;

var _mapValues = _interopRequireDefault(require("./map-values"));

var _toArray = _interopRequireDefault(require("./to-array"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFormValue(form) {
  if (form && !form.$form) {
    return typeof form.loadedValue !== 'undefined' ? form.loadedValue : form.initialValue;
  }

  var result = (0, _mapValues.default)(form, function (field, key) {
    if (key === '$form') return undefined;
    return getFormValue(field);
  });
  delete result.$form;
  var isArray = form && form.$form && Array.isArray(form.$form.value);
  return isArray ? (0, _toArray.default)(result) : result;
}