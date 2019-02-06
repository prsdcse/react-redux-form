"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFormCombiner = createFormCombiner;
exports.createForms = exports.default = void 0;

var _modeledEnhancer = _interopRequireDefault(require("../enhancers/modeled-enhancer"));

var _modelReducer = _interopRequireDefault(require("./model-reducer"));

var _formReducer = _interopRequireDefault(require("./form-reducer"));

var _redux = require("redux");

var _identity = _interopRequireDefault(require("../utils/identity"));

var _nullAction = _interopRequireDefault(require("../constants/null-action"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaults = {
  key: 'forms',
  plugins: []
};

function getSubModelString(model, subModel) {
  if (!model) return subModel;
  return "".concat(model, ".").concat(subModel);
}

var defaultStrategy = {
  modelReducer: _modelReducer.default,
  formReducer: _formReducer.default,
  modeled: _modeledEnhancer.default,
  toJS: _identity.default
};

function createFormCombiner() {
  var strategy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultStrategy;

  function createForms(forms) {
    var model = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var formKeys = Object.keys(forms);
    var modelReducers = {};
    var initialFormState = {};

    var optionsWithDefaults = _objectSpread({}, defaults, options);

    var key = optionsWithDefaults.key,
        plugins = optionsWithDefaults.plugins,
        formOptions = _objectWithoutProperties(optionsWithDefaults, ["key", "plugins"]);

    formKeys.forEach(function (formKey) {
      var formValue = forms[formKey];
      var subModel = getSubModelString(model, formKey);

      if (typeof formValue === 'function') {
        var initialState;

        try {
          initialState = formValue(undefined, _nullAction.default);
        } catch (error) {
          initialState = null;
        }

        modelReducers[formKey] = strategy.modeled(formValue, subModel);
        initialFormState[formKey] = strategy.toJS(initialState);
      } else {
        modelReducers[formKey] = strategy.modelReducer(subModel, formValue);
        initialFormState[formKey] = strategy.toJS(formValue);
      }
    });
    return _objectSpread({}, modelReducers, _defineProperty({}, key, function (state, action) {
      return strategy.formReducer(model, initialFormState, _objectSpread({
        plugins: plugins
      }, formOptions))(state, action);
    }));
  }

  function combineForms(forms) {
    var model = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var mappedReducers = createForms(forms, model, options);
    return (0, _redux.combineReducers)(mappedReducers);
  }

  return {
    createForms: createForms,
    combineForms: combineForms
  };
}

var _createFormCombiner = createFormCombiner(),
    defaultCombineForms = _createFormCombiner.combineForms,
    defaultCreateForms = _createFormCombiner.createForms;

exports.createForms = defaultCreateForms;
var _default = defaultCombineForms;
exports.default = _default;