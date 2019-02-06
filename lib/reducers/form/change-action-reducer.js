"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = changeActionReducer;

var _actionTypes = _interopRequireDefault(require("../../action-types"));

var _icepick = _interopRequireDefault(require("icepick"));

var _get = _interopRequireDefault(require("../../utils/get"));

var _shallowEqual = _interopRequireDefault(require("../../utils/shallow-equal"));

var _isPlainObject = _interopRequireDefault(require("../../utils/is-plain-object"));

var _mapValues = _interopRequireDefault(require("../../utils/map-values"));

var _formReducer = require("../form-reducer");

var _initialFieldState = _interopRequireDefault(require("../../constants/initial-field-state"));

var _assocIn = _interopRequireDefault(require("../../utils/assoc-in"));

var _getFormValue = _interopRequireDefault(require("../../utils/get-form-value"));

var _invariant = _interopRequireDefault(require("invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function updateFieldValue(field, action) {
  var parentModel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var value = action.value,
      removeKeys = action.removeKeys,
      silent = action.silent,
      load = action.load,
      model = action.model,
      external = action.external;
  var fieldState = field && field.$form ? field.$form : field;
  var changedFieldProps = {
    validated: false,
    retouched: fieldState.submitted ? true : fieldState.retouched,
    // If change originated from Control component (not externally),
    // then there is no need to remind Control to validate itself.
    intents: external ? [{
      type: 'validate'
    }] : [],
    pristine: silent ? fieldState.pristine : false,
    value: value,
    loadedValue: load ? value : fieldState.loadedValue
  };

  if ((0, _shallowEqual.default)(field.value, value)) {
    return _icepick.default.merge(field, changedFieldProps);
  }

  if (removeKeys) {
    (0, _invariant.default)(field && field.$form, 'Unable to remove keys. ' + 'Field for "%s" in store is not an array/object.', model);
    var valueIsArray = Array.isArray(field.$form.value);
    var removeKeysArray = Array.isArray(removeKeys) ? removeKeys : [removeKeys];
    var result;

    if (valueIsArray) {
      result = [];
      Object.keys(field).forEach(function (key) {
        if (!!~removeKeysArray.indexOf(+key) || key === '$form') return;
        result[key] = _objectSpread({}, field[key]);
      });

      var finalResult = _objectSpread({}, result.filter(function (f) {
        return f;
      }).map(function (subField, index) {
        return _objectSpread({}, subField, {
          model: "".concat(model, ".").concat(index)
        });
      }));

      finalResult.$form = field.$form;
      return finalResult;
    }

    result = _objectSpread({}, field);
    Object.keys(field).forEach(function (key) {
      if (!!~removeKeysArray.indexOf(key)) {
        delete result["".concat(key)];
      }
    });
    return result;
  }

  if (!Array.isArray(value) && !(0, _isPlainObject.default)(value)) {
    return _icepick.default.merge(field, _icepick.default.set(changedFieldProps, 'value', value));
  }

  var updatedField = (0, _mapValues.default)(value, function (subValue, index) {
    // TODO: refactor
    var subField = field[index] || (0, _formReducer.createInitialState)("".concat("".concat(parentModel ? "".concat(parentModel, ".") : '').concat(model), ".", index), subValue);

    if (Object.hasOwnProperty.call(subField, '$form')) {
      return updateFieldValue(subField, {
        model: index,
        value: subValue,
        external: external,
        silent: silent,
        load: load
      }, parentModel ? "".concat(parentModel, ".").concat(model) : model);
    }

    if ((0, _shallowEqual.default)(subValue, subField.value)) {
      return subField;
    }

    return _icepick.default.merge(subField, _icepick.default.assign(changedFieldProps, {
      value: subValue,
      loadedValue: load ? subValue : subField.loadedValue
    }));
  });

  var dirtyFormState = _icepick.default.merge(field.$form || _initialFieldState.default, _icepick.default.set(changedFieldProps, 'retouched', field.submitted || field.$form && field.$form.retouched));

  return _icepick.default.set(updatedField, '$form', dirtyFormState);
}

function changeActionReducer(state, action, localPath) {
  if (action.type !== _actionTypes.default.CHANGE) return state;
  var field = (0, _get.default)(state, localPath, (0, _formReducer.createInitialState)(action.model, action.value));
  var updatedField = updateFieldValue(field, action);
  if (!localPath.length) return updatedField;
  var updatedState = (0, _assocIn.default)(state, localPath, updatedField, function (form) {
    if (!form.$form) return form;
    var formValue = (0, _getFormValue.default)(form);

    var formUpdates = _objectSpread({}, form.$form, {
      value: formValue
    });

    if (action.silent) {
      formUpdates.loadedValue = formValue;
    } else {
      formUpdates.pristine = false;
    }

    return _objectSpread({}, form, {
      $form: formUpdates
    });
  });
  return updatedState;
}