"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInitialState = createInitialState;
exports.default = createFormReducer;

var _get2 = _interopRequireDefault(require("../utils/get"));

var _arraysEqual = _interopRequireDefault(require("../utils/arrays-equal"));

var _isPlainObject = _interopRequireDefault(require("../utils/is-plain-object"));

var _toPath = _interopRequireDefault(require("../utils/to-path"));

var _composeReducers = _interopRequireDefault(require("../utils/compose-reducers"));

var _batchedEnhancer = _interopRequireDefault(require("../enhancers/batched-enhancer"));

var _changeActionReducer = _interopRequireDefault(require("./form/change-action-reducer"));

var _formActionsReducer = require("./form-actions-reducer");

var _createField = _interopRequireWildcard(require("../utils/create-field"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function createInitialState(model, state) {
  var customInitialFieldState = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (Array.isArray(state) || (0, _isPlainObject.default)(state)) {
    return (0, _createField.createFormState)(model, state, customInitialFieldState, options);
  }

  return (0, _createField.default)(model, state, customInitialFieldState, options);
}

function wrapFormReducer(plugin, modelPath, initialState) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;
    if (!action.model) return state;
    var path = (0, _toPath.default)(action.model);

    if (modelPath.length && !(0, _arraysEqual.default)(path.slice(0, modelPath.length), modelPath)) {
      return state;
    }

    var localPath = path.slice(modelPath.length);
    return plugin(state, action, localPath);
  };
}

function createFormReducer(model) {
  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _options$plugins = options.plugins,
      plugins = _options$plugins === void 0 ? [] : _options$plugins,
      customInitialFieldState = options.initialFieldState,
      _options$transformAct = options.transformAction,
      transformAction = _options$transformAct === void 0 ? null : _options$transformAct;
  var modelPath = (0, _toPath.default)(model);
  var initialFormState = createInitialState(model, initialState, customInitialFieldState, options);
  var defaultPlugins = [_changeActionReducer.default, (0, _formActionsReducer.createFormActionsReducer)({
    initialFieldState: customInitialFieldState
  })];
  var wrappedPlugins = plugins.concat(defaultPlugins).map(function (plugin) {
    return wrapFormReducer(plugin, modelPath, initialFormState);
  });
  return (0, _batchedEnhancer.default)(_composeReducers.default.apply(void 0, _toConsumableArray(wrappedPlugins)), undefined, {
    transformAction: transformAction
  });
}