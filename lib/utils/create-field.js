"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fieldOrForm = fieldOrForm;
exports.getMeta = getMeta;
exports.updateFieldState = updateFieldState;
exports.default = createFieldState;
exports.createFormState = createFormState;

var _initialFieldState = _interopRequireDefault(require("../constants/initial-field-state"));

var _isPlainObject = _interopRequireDefault(require("./is-plain-object"));

var _mapValues = _interopRequireDefault(require("./map-values"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable no-use-before-define */
function fieldOrForm(model, value, customInitialFieldState) {
  // TODO: create toModel()
  var stringModel = Array.isArray(model) ? model.join('.') : model;

  if (Array.isArray(value) || (0, _isPlainObject.default)(value)) {
    return createFormState(stringModel, value, customInitialFieldState);
  }

  return createFieldState(stringModel, value, customInitialFieldState);
}
/* eslint-enable no-use-before-define */


function getMeta(fieldLike, prop) {
  if (fieldLike && fieldLike.$form) return fieldLike.$form[prop];
  return fieldLike[prop];
}

function getSubModelString(model, subModel) {
  if (!model) return subModel;
  return "".concat(model, ".").concat(subModel);
}

function updateFieldState(existingFieldState, updatedFieldState) {
  var newField = _objectSpread({}, existingFieldState, updatedFieldState);

  return newField;
}

function createFieldState(model, value, customInitialFieldState) {
  return _objectSpread({
    initialValue: value
  }, _initialFieldState.default, customInitialFieldState, {
    model: model,
    value: value
  });
}

function createFormState(model, values, customInitialFieldState) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  return _objectSpread({
    $form: createFieldState(model, values, customInitialFieldState, options)
  }, options.lazy ? undefined : (0, _mapValues.default)(values, function (value, key) {
    var subModel = getSubModelString(model, key);
    return fieldOrForm(subModel, value, customInitialFieldState);
  }));
}