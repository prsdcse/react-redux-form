"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = combineForms;

var _modeledEnhancer = _interopRequireDefault(require("./enhancers/modeled-enhancer"));

var _modelReducer = _interopRequireDefault(require("./reducers/model-reducer"));

var _formReducer = _interopRequireDefault(require("./reducers/form-reducer"));

var _redux = _interopRequireDefault(require("redux"));

var _nullAction = _interopRequireDefault(require("./constants/null-action"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function combineForms(forms) {
  var formReducerKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'forms';
  var formKeys = Object.keys(forms);
  var modelReducers = {};
  var initialFormState = {};
  formKeys.forEach(function (formKey) {
    var formValue = forms[formKey];

    if (typeof formValue === 'function') {
      var initialState;

      try {
        initialState = formValue(undefined, _nullAction.default);
      } catch (error) {
        initialState = null;
      }

      modelReducers[formKey] = (0, _modeledEnhancer.default)(formValue, formKey);
      initialFormState[formKey] = initialState;
    } else {
      modelReducers[formKey] = (0, _modelReducer.default)(formKey, formValue);
      initialFormState[formKey] = formValue;
    }
  });
  return (0, _redux.default)(_objectSpread({}, modelReducers, _defineProperty({}, formReducerKey, (0, _formReducer.default)('', initialFormState))));
}