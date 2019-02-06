"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getFieldForm;

var _get = _interopRequireDefault(require("./get"));

var _invariant = _interopRequireDefault(require("invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFieldForm(state, path) {
  var formPath = path.slice(0, -1);
  if (!formPath.length) return state;
  var form = (0, _get.default)(state, formPath);
  (0, _invariant.default)(form, 'Could not find form for "%s" in the store.', formPath.join('.'));
  return form;
}