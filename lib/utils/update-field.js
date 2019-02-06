"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFieldAndForm = getFieldAndForm;
exports.default = updateField;

var _icepick = _interopRequireDefault(require("icepick"));

var _get = _interopRequireDefault(require("./get"));

var _mapValues = _interopRequireDefault(require("./map-values"));

var _formReducer = require("../reducers/form-reducer");

var _createField = require("./create-field");

var _assocIn = _interopRequireDefault(require("./assoc-in"));

var _invariant = _interopRequireDefault(require("invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function tempInitialState(path) {
  var initialValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  if (path.length === 1) return _defineProperty({}, path[0], initialValue);
  return _defineProperty({}, path[0], tempInitialState(path.slice(1), initialValue));
}

function getFieldAndForm(formState, modelPath) {
  var field = (0, _get.default)(formState, modelPath);
  var form = formState;
  (0, _invariant.default)(form, 'Could not find form for "%s" in the store.', modelPath);

  if (!field) {
    var initialValue = (0, _get.default)(formState.$form.initialValue, modelPath);
    form = _icepick.default.merge((0, _formReducer.createInitialState)(formState.$form.model, tempInitialState(modelPath, initialValue)), formState);
    field = (0, _get.default)(form, modelPath);
  }

  return [field, form];
}

function updateField(state, path, newState, newSubState, updater) {
  var _getFieldAndForm = getFieldAndForm(state, path),
      _getFieldAndForm2 = _slicedToArray(_getFieldAndForm, 2),
      field = _getFieldAndForm2[0],
      fullState = _getFieldAndForm2[1];

  if (!field) return state;
  var isForm = field.hasOwnProperty('$form');
  var fieldPath = isForm ? [].concat(_toConsumableArray(path), ['$form']) : path;
  var fieldState = isForm ? field.$form : field;
  var updatedFieldState = typeof newState === 'function' ? newState(fieldState) : newState;

  if (isForm && newSubState) {
    var formState = (0, _mapValues.default)(field, function (subState, key) {
      if (key === '$form') {
        return (0, _createField.updateFieldState)(fieldState, updatedFieldState);
      }

      var updatedSubState = typeof newSubState === 'function' ? newSubState(subState, updatedFieldState) : newSubState;
      return (0, _createField.updateFieldState)(subState, updatedSubState);
    });
    if (!path.length) return formState;
    return (0, _assocIn.default)(fullState, path, formState, updater);
  }

  return (0, _assocIn.default)(fullState, fieldPath, (0, _createField.updateFieldState)(fieldState, updatedFieldState), updater);
}