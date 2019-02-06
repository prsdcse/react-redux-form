"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFieldActions = createFieldActions;
exports.default = void 0;

var _get2 = _interopRequireDefault(require("../utils/get"));

var _mapValues = _interopRequireDefault(require("../utils/map-values"));

var _actionTypes = _interopRequireDefault(require("../action-types"));

var _batchActions = _interopRequireDefault(require("./batch-actions"));

var _getValidity = _interopRequireDefault(require("../utils/get-validity"));

var _isValidityValid = _interopRequireDefault(require("../utils/is-validity-valid"));

var _isValidityInvalid = _interopRequireDefault(require("../utils/is-validity-invalid"));

var _invertValidity = _interopRequireDefault(require("../utils/invert-validity"));

var _track = require("../utils/track");

var _getForm = _interopRequireDefault(require("../utils/get-form"));

var _getFieldFromState = _interopRequireDefault(require("../utils/get-field-from-state"));

var _nullAction = _interopRequireDefault(require("../constants/null-action"));

var _invariant = _interopRequireDefault(require("invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultStrategies = {
  get: _get2.default,
  getForm: _getForm.default,
  getFieldFromState: _getFieldFromState.default
};

function createFieldActions() {
  var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultStrategies;

  var addIntent = function addIntent(model, intent) {
    return {
      type: _actionTypes.default.ADD_INTENT,
      model: model,
      intent: intent
    };
  };

  var clearIntents = function clearIntents(model, intents) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return {
      type: _actionTypes.default.CLEAR_INTENTS,
      model: model,
      intents: intents,
      options: options
    };
  };

  var focus = function focus(model, value) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return _objectSpread({
      type: _actionTypes.default.FOCUS,
      model: model,
      value: value
    }, options);
  };

  var silentFocus = function silentFocus(model, value) {
    return focus(model, value, {
      silent: true
    });
  };

  var blur = function blur(model) {
    return {
      type: _actionTypes.default.BLUR,
      model: model
    };
  };

  var setPristine = function setPristine(model) {
    return {
      type: _actionTypes.default.SET_PRISTINE,
      model: model
    };
  };

  var setDirty = function setDirty(model) {
    return {
      type: _actionTypes.default.SET_DIRTY,
      model: model
    };
  };

  var setInitial = function setInitial(model) {
    return {
      type: _actionTypes.default.SET_INITIAL,
      model: model
    };
  };

  var setPending = function setPending(model) {
    var pending = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var options = arguments.length > 2 ? arguments[2] : undefined;
    return _objectSpread({
      type: _actionTypes.default.SET_PENDING,
      model: model,
      pending: pending
    }, options);
  };

  var setValidating = function setValidating(model) {
    var validating = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return {
      type: _actionTypes.default.SET_VALIDATING,
      model: model,
      validating: validating
    };
  };

  var setValidity = function setValidity(model, validity) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return _objectSpread({
      type: options.errors ? _actionTypes.default.SET_ERRORS : _actionTypes.default.SET_VALIDITY,
      model: model
    }, options, _defineProperty({}, options.errors ? 'errors' : 'validity', validity));
  };

  var resetValidity = function resetValidity(model) {
    var omitKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return {
      type: _actionTypes.default.RESET_VALIDITY,
      model: model,
      omitKeys: omitKeys
    };
  };

  var setFieldsValidity = function setFieldsValidity(model, fieldsValidity) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return {
      type: _actionTypes.default.SET_FIELDS_VALIDITY,
      model: model,
      fieldsValidity: fieldsValidity,
      options: options
    };
  };

  var setErrors = function setErrors(model, errors) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return setValidity(model, errors, _objectSpread({}, options, {
      errors: true
    }));
  };

  var setFieldsErrors = function setFieldsErrors(model, fieldsErrors, options) {
    return setFieldsValidity(model, fieldsErrors, _objectSpread({}, options, {
      errors: true
    }));
  };

  var resetErrors = resetValidity;

  var setTouched = function setTouched(model) {
    return {
      type: _actionTypes.default.SET_TOUCHED,
      model: model
    };
  };

  var setUntouched = function setUntouched(model) {
    return {
      type: _actionTypes.default.SET_UNTOUCHED,
      model: model
    };
  };

  var asyncSetValidity = function asyncSetValidity(model, validator) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return function (dispatch, getState) {
      var value = s.get(getState(), model);
      dispatch(setValidating(model, true));

      var done = function done(validity) {
        dispatch(setValidity(model, validity, _objectSpread({
          async: true
        }, options)));
      };

      var immediateResult = validator(value, done);

      if (typeof immediateResult !== 'undefined') {
        done(immediateResult);
      }
    };
  };

  var asyncSetErrors = function asyncSetErrors(model, validator) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return asyncSetValidity(model, validator, _objectSpread({
      errors: true
    }, options));
  };

  var setSubmitted = function setSubmitted(model) {
    var submitted = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return {
      type: _actionTypes.default.SET_SUBMITTED,
      model: model,
      submitted: submitted
    };
  };

  var setSubmitFailed = function setSubmitFailed(model) {
    var submitFailed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var options = arguments.length > 2 ? arguments[2] : undefined;
    return _objectSpread({
      type: _actionTypes.default.SET_SUBMIT_FAILED,
      model: model,
      submitFailed: submitFailed
    }, options);
  };

  var submit = function submit(model, promise) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (typeof promise === 'undefined') {
      return addIntent(model, {
        type: 'submit'
      });
    }

    return function (dispatch, getState) {
      if (options.validate) {
        var form = s.getForm(getState(), model);
        (0, _invariant.default)(form, 'Unable to submit form with validation. ' + 'Could not find form for "%s" in the store.', model);

        if (!form.$form.valid) {
          return dispatch(_nullAction.default);
        }

        dispatch(setPending(model, true));
      } else if (options.validators || options.errors) {
        var validators = options.validators || options.errors;
        var isErrors = options.errors;
        var value = s.get(getState(), model);
        var validity = (0, _getValidity.default)(validators, value);
        var valid = options.errors ? !(0, _isValidityInvalid.default)(validity) : (0, _isValidityValid.default)(validity);

        if (!valid) {
          return dispatch(isErrors ? setErrors(model, validity) : setValidity(model, validity));
        }

        dispatch((0, _batchActions.default)(model, [setValidity(model, isErrors ? (0, _invertValidity.default)(validity) : validity), setPending(model, true)]));
      } else {
        dispatch(setPending(model, true));
      }

      var errorsAction = options.fields ? setFieldsErrors : setErrors;
      promise.then(function (response) {
        dispatch((0, _batchActions.default)(model, [setSubmitted(model, true), setValidity(model, response)]));
      }).catch(function (rejection) {
        var error = rejection instanceof Error ? rejection.message : rejection;
        dispatch((0, _batchActions.default)(model, [setSubmitFailed(model), errorsAction(model, error, {
          async: true
        })]));
      });
      return promise;
    };
  };

  var submitFields = function submitFields(model, promise) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return submit(model, promise, _objectSpread({}, options, {
      fields: true
    }));
  };

  var validSubmit = function validSubmit(model, promise) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return submit(model, promise, _objectSpread({}, options, {
      validate: true
    }));
  };

  var validate = function validate(model, validators) {
    return function (dispatch, getState) {
      var value = s.get(getState(), model);
      var validity = (0, _getValidity.default)(validators, value);
      dispatch(setValidity(model, validity));
    };
  };

  var validateErrors = function validateErrors(model, errorValidators) {
    return function (dispatch, getState) {
      var value = s.get(getState(), model);
      var errors = (0, _getValidity.default)(errorValidators, value);
      dispatch(setValidity(model, errors, {
        errors: true
      }));
    };
  };

  var validateFields = function validateFields(model, fieldValidators) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return function (dispatch, getState) {
      var modelValue = s.get(getState(), model);
      var fieldsValidity = (0, _mapValues.default)(fieldValidators, function (validator, field) {
        var fieldValue = field ? s.get(modelValue, field) : modelValue;
        var fieldValidity = (0, _getValidity.default)(validator, fieldValue);
        return fieldValidity;
      });
      var fieldsValiditySetter = options.errors ? setFieldsErrors : setFieldsValidity;
      dispatch(fieldsValiditySetter(model, fieldsValidity));
    };
  };

  var validateFieldsErrors = function validateFieldsErrors(model, fieldErrorsValidators) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return validateFields(model, fieldErrorsValidators, _objectSpread({}, options, {
      errors: true
    }));
  };

  return (0, _mapValues.default)({
    blur: blur,
    focus: focus,
    silentFocus: silentFocus,
    submit: submit,
    submitFields: submitFields,
    validSubmit: validSubmit,
    setDirty: setDirty,
    setErrors: setErrors,
    setInitial: setInitial,
    setPending: setPending,
    setValidating: setValidating,
    setPristine: setPristine,
    setSubmitted: setSubmitted,
    setSubmitFailed: setSubmitFailed,
    setTouched: setTouched,
    setUntouched: setUntouched,
    setValidity: setValidity,
    setFieldsValidity: setFieldsValidity,
    setFieldsErrors: setFieldsErrors,
    resetValidity: resetValidity,
    resetErrors: resetErrors,
    validate: validate,
    validateErrors: validateErrors,
    validateFields: validateFields,
    validateFieldsErrors: validateFieldsErrors,
    asyncSetValidity: asyncSetValidity,
    asyncSetErrors: asyncSetErrors,
    addIntent: addIntent,
    clearIntents: clearIntents
  }, _track.trackable);
}

var _default = createFieldActions();

exports.default = _default;