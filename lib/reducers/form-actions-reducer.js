"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFormActionsReducer = createFormActionsReducer;
exports.default = void 0;

var _actionTypes = _interopRequireDefault(require("../action-types"));

var _updateField = _interopRequireWildcard(require("../utils/update-field"));

var _updateParentForms = _interopRequireDefault(require("../utils/update-parent-forms"));

var _updateSubFields = _interopRequireDefault(require("../utils/update-sub-fields"));

var _getFieldForm = _interopRequireDefault(require("../utils/get-field-form"));

var _isPristine = _interopRequireDefault(require("../form/is-pristine"));

var _map = _interopRequireDefault(require("../utils/map"));

var _isPlainObject = _interopRequireDefault(require("../utils/is-plain-object"));

var _mapValues = _interopRequireDefault(require("../utils/map-values"));

var _inverse = _interopRequireDefault(require("../utils/inverse"));

var _mergeValidity = _interopRequireDefault(require("../utils/merge-validity"));

var _isValid = _interopRequireWildcard(require("../form/is-valid"));

var _isValidityValid = _interopRequireDefault(require("../utils/is-validity-valid"));

var _isValidityInvalid = _interopRequireDefault(require("../utils/is-validity-invalid"));

var _fieldActions = _interopRequireDefault(require("../actions/field-actions"));

var _toPath = _interopRequireDefault(require("../utils/to-path"));

var _initialFieldState = _interopRequireDefault(require("../constants/initial-field-state"));

var _createField = require("../utils/create-field");

var _assocIn = _interopRequireDefault(require("../utils/assoc-in"));

var _getFormValue = _interopRequireDefault(require("../utils/get-form-value"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var resetFieldState = function resetFieldState(field, customInitialFieldState) {
  if (!(0, _isPlainObject.default)(field)) return field;
  var intents = [{
    type: 'reset'
  }];
  var resetValue = (0, _createField.getMeta)(field, 'initialValue');
  var loadedValue = (0, _createField.getMeta)(field, 'loadedValue');

  if (loadedValue && resetValue !== loadedValue) {
    intents.push({
      type: 'load'
    });
    resetValue = loadedValue;
  }

  return (0, _createField.fieldOrForm)((0, _createField.getMeta)(field, 'model'), resetValue, _objectSpread({}, customInitialFieldState, {
    intents: intents
  }));
};

var setInitialFieldState = function setInitialFieldState(customInitialFieldState) {
  return function (field) {
    if (!(0, _isPlainObject.default)(field)) return field;

    if (field.$form) {
      // eslint-disable-next-line arrow-body-style
      return (0, _mapValues.default)(field, function (fieldState, key) {
        return key === '$form' ? (0, _createField.updateFieldState)(customInitialFieldState, {
          value: field.value,
          model: field.model
        }) : resetFieldState(fieldState, customInitialFieldState);
      });
    }

    return (0, _createField.updateFieldState)(customInitialFieldState, {
      value: field.value,
      model: field.model
    });
  };
};

var addIntent = function addIntent(intents, newIntent) {
  if (!intents) return [newIntent];
  if (intents.some(function (intent) {
    return intent.type === newIntent.type;
  })) return intents;
  return intents.concat(newIntent);
};

var clearIntents = function clearIntents(intents, oldIntent) {
  if (!intents || typeof oldIntent === 'undefined') return [];
  return intents.filter(function (intent) {
    return intent.type !== oldIntent.type;
  });
};

var defaultOptions = {
  initialFieldState: _initialFieldState.default
};

function createFormActionsReducer(options) {
  var formOptions = options ? _objectSpread({}, defaultOptions, options, {
    initialFieldState: _objectSpread({}, defaultOptions.initialFieldState, options.initialFieldState)
  }) : defaultOptions;
  var customInitialFieldState = formOptions.initialFieldState;
  return function formActionsReducer(state, action, localPath) {
    var _getFieldAndForm = (0, _updateField.getFieldAndForm)(state, localPath),
        _getFieldAndForm2 = _slicedToArray(_getFieldAndForm, 1),
        field = _getFieldAndForm2[0];

    var fieldState = field && field.$form ? field.$form : field;
    var intents = fieldState.intents;
    var fieldUpdates = {};
    var subFieldUpdates = {};
    var parentFormUpdates;

    switch (action.type) {
      case _actionTypes.default.FOCUS:
        {
          fieldUpdates = {
            focus: true,
            intents: action.silent ? intents : addIntent(intents, action)
          };
          break;
        }

      case _actionTypes.default.BLUR:
      case _actionTypes.default.SET_TOUCHED:
        {
          var fieldForm = (0, _getFieldForm.default)(state, localPath).$form;
          fieldUpdates = {
            focus: action.type === _actionTypes.default.BLUR ? false : field.focus,
            touched: true,
            retouched: fieldForm ? !!(fieldForm.submitted || fieldForm.submitFailed) : false
          };
          parentFormUpdates = {
            touched: true,
            retouched: fieldUpdates.retouched
          };
          break;
        }

      case _actionTypes.default.SET_UNTOUCHED:
        {
          fieldUpdates = {
            focus: false,
            touched: false
          };
          break;
        }

      case _actionTypes.default.SET_PRISTINE:
      case _actionTypes.default.SET_DIRTY:
        {
          var pristine = action.type === _actionTypes.default.SET_PRISTINE;
          fieldUpdates = {
            pristine: pristine
          };
          subFieldUpdates = {
            pristine: pristine
          };

          parentFormUpdates = function parentFormUpdates(form) {
            return {
              pristine: (0, _isPristine.default)(form)
            };
          };

          break;
        }

      case _actionTypes.default.SET_VALIDATING:
        {
          fieldUpdates = {
            validating: action.validating,
            validated: !action.validating
          };
          break;
        }

      case _actionTypes.default.SET_VALIDITY:
      case _actionTypes.default.SET_ERRORS:
        {
          var _fieldUpdates;

          var isErrors = action.type === _actionTypes.default.SET_ERRORS;
          var validity;

          if (isErrors) {
            validity = action.merge ? (0, _mergeValidity.default)(fieldState.errors, action.errors) : action.errors;
          } else {
            validity = action.merge ? (0, _mergeValidity.default)(fieldState.validity, action.validity) : action.validity;
          }

          var inverseValidity = (0, _isPlainObject.default)(validity) ? (0, _mapValues.default)(validity, _inverse.default) : !validity; // If the field is a form, its validity is
          // also based on whether its fields are all valid.

          var areFieldsValid = field && field.$form ? (0, _isValid.fieldsValid)(field, {
            async: false
          }) : true;
          fieldUpdates = (_fieldUpdates = {}, _defineProperty(_fieldUpdates, isErrors ? 'errors' : 'validity', validity), _defineProperty(_fieldUpdates, isErrors ? 'validity' : 'errors', inverseValidity), _defineProperty(_fieldUpdates, "validating", false), _defineProperty(_fieldUpdates, "validated", true), _defineProperty(_fieldUpdates, "valid", areFieldsValid && (isErrors ? !(0, _isValidityInvalid.default)(validity) : (0, _isValidityValid.default)(validity))), _fieldUpdates);

          if (action.async) {
            var actionValidity = isErrors ? action.errors : action.validity;
            fieldUpdates.asyncKeys = (0, _isPlainObject.default)(actionValidity) || Array.isArray(actionValidity) ? Object.keys(actionValidity) : true;
          }

          parentFormUpdates = function parentFormUpdates(form) {
            return {
              valid: (0, _isValid.default)(form)
            };
          };

          break;
        }

      case _actionTypes.default.SET_FIELDS_VALIDITY:
        {
          return (0, _map.default)(action.fieldsValidity, function (fieldValidity, subField) {
            return _fieldActions.default.setValidity(subField, fieldValidity, action.options);
          }).reduce(function (accState, subAction) {
            return formActionsReducer(accState, subAction, localPath.concat((0, _toPath.default)(subAction.model)));
          }, state);
        }

      case _actionTypes.default.RESET_VALIDITY:
        {
          var _validity = _objectSpread({}, fieldState.validity);

          var errors;
          var valid;

          if (action.omitKeys && typeof fieldState.errors !== 'string') {
            errors = _objectSpread({}, fieldState.errors);
            action.omitKeys.forEach(function (key) {
              delete _validity[key];
              delete errors[key];
            });
            valid = (0, _isValidityValid.default)(_validity);
          } else {
            _validity = customInitialFieldState.validity;
            errors = customInitialFieldState.errors;
            valid = customInitialFieldState.valid;
          }

          fieldUpdates = {
            valid: valid,
            validity: _validity,
            errors: errors
          };
          subFieldUpdates = {
            valid: customInitialFieldState.valid,
            validity: customInitialFieldState.validity,
            errors: customInitialFieldState.errors
          };
          break;
        }

      case _actionTypes.default.SET_PENDING:
        {
          fieldUpdates = {
            pending: action.pending,
            submitted: false,
            submitFailed: false,
            retouched: false
          };
          subFieldUpdates = {
            pending: action.pending,
            submitted: false,
            submitFailed: false,
            retouched: false
          };
          parentFormUpdates = {
            pending: action.pending
          };
          break;
        }

      case _actionTypes.default.SET_SUBMITTED:
        {
          var submitted = !!action.submitted;
          fieldUpdates = {
            pending: false,
            submitted: submitted,
            submitFailed: submitted ? false : fieldState && fieldState.submitFailed,
            touched: true,
            retouched: false
          };
          subFieldUpdates = {
            pending: false,
            submitted: submitted,
            submitFailed: submitted ? false : fieldUpdates.submitFailed,
            retouched: false
          };
          break;
        }

      case _actionTypes.default.SET_SUBMIT_FAILED:
        {
          fieldUpdates = {
            pending: false,
            submitted: fieldState.submitted && !action.submitFailed,
            submitFailed: !!action.submitFailed,
            touched: true,
            retouched: false
          };
          subFieldUpdates = {
            pending: false,
            submitted: !action.submitFailed,
            submitFailed: !!action.submitFailed,
            touched: true,
            retouched: false
          };
          break;
        }

      case _actionTypes.default.RESET:
        {
          return localPath.length ? (0, _assocIn.default)(state, localPath, resetFieldState(field, customInitialFieldState)) : resetFieldState(field, customInitialFieldState);
        }

      case _actionTypes.default.SET_INITIAL:
        {
          var setCustomInitialFieldState = setInitialFieldState(customInitialFieldState);
          return (0, _updateField.default)(state, localPath, setCustomInitialFieldState, setCustomInitialFieldState);
        }

      case _actionTypes.default.ADD_INTENT:
        {
          fieldUpdates = {
            intents: addIntent(intents, action.intent)
          };
          break;
        }

      case _actionTypes.default.CLEAR_INTENTS:
        {
          fieldUpdates = {
            intents: clearIntents(intents, action.intent)
          };
          break;
        }

      case _actionTypes.default.CHANGE:
        {
          return (0, _updateParentForms.default)(state, localPath, function (parentForm) {
            var formModelValue = (0, _getFormValue.default)(parentForm);

            if (!parentForm.$form) {
              return _objectSpread({}, customInitialFieldState, {
                value: formModelValue,
                initialValue: formModelValue
              });
            } // If the form is invalid (due to async validity)
            // but its fields are valid and the value has changed,
            // the form should be "valid" again.


            if ((!parentForm.$form.validity || typeof parentForm.$form.validity === 'boolean' || !Object.keys(parentForm.$form.validity).length) && !parentForm.$form.valid && (0, _isValid.default)(parentForm, {
              async: false
            })) {
              return {
                value: formModelValue,
                validity: true,
                errors: false,
                valid: true
              };
            }

            return {
              value: formModelValue
            };
          });
        }

      default:
        return state;
    }

    if (action.clearIntents) {
      fieldUpdates.intents = clearIntents(intents, action.clearIntents);
    }

    var updatedField = (0, _updateField.default)(state, localPath, fieldUpdates);
    var updatedSubFields = Object.keys(subFieldUpdates).length ? (0, _updateSubFields.default)(updatedField, localPath, subFieldUpdates) : updatedField;
    var updatedParentForms = parentFormUpdates ? (0, _updateParentForms.default)(updatedSubFields, localPath, parentFormUpdates) : updatedSubFields;
    return updatedParentForms;
  };
}

var _default = createFormActionsReducer();

exports.default = _default;