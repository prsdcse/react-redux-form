"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getFieldFromState;

var _get = _interopRequireDefault(require("./get"));

var _toPath = _interopRequireDefault(require("./to-path"));

var _getForm = _interopRequireDefault(require("./get-form"));

var _isPlainObject = _interopRequireDefault(require("./is-plain-object"));

var _invariant = _interopRequireDefault(require("invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultStrategy = {
  getForm: _getForm.default
};

function getFieldFromState(state, modelString) {
  var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultStrategy;
  var form = state && '$form' in state ? state : s.getForm(state, modelString);
  if (!form || !form.$form) return null;
  if (!modelString.length) return form;
  (0, _invariant.default)(form, 'Could not find form for "%s" in the store.', modelString);
  var formPath = (0, _toPath.default)(form.$form.model);
  var fieldPath = (0, _toPath.default)(modelString).slice(formPath.length);
  var field = (0, _get.default)(form, fieldPath);
  if (!field) return null;
  if ((0, _isPlainObject.default)(field) && '$form' in field) return field.$form;
  return field;
}