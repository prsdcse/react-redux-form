"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createModeler = createModeler;
exports.default = void 0;

var _get2 = _interopRequireDefault(require("../utils/get"));

var _icepick = _interopRequireDefault(require("icepick"));

var _arraysEqual = _interopRequireDefault(require("../utils/arrays-equal"));

var _toPath = _interopRequireDefault(require("../utils/to-path"));

var _actionTypes = _interopRequireDefault(require("../action-types"));

var _batchedEnhancer = _interopRequireDefault(require("../enhancers/batched-enhancer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function icepickSet(state, path, value) {
  return _icepick.default.setIn(state, path, value);
}

var defaultStrategy = {
  get: _get2.default,
  set: icepickSet,
  object: {}
};

function createModeler() {
  var strategy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultStrategy;
  var getter = strategy.get,
      setter = strategy.set,
      object = strategy.object;
  return function _createModelReducer(model) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : object;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var modelPath = (0, _toPath.default)(model);

    var modelReducer = function modelReducer() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
      var action = arguments.length > 1 ? arguments[1] : undefined;

      if (!action.model) {
        return state;
      }

      var path = (0, _toPath.default)(action.model);

      if (!(0, _arraysEqual.default)(path.slice(0, modelPath.length), modelPath)) {
        return state;
      }

      var localPath = path.slice(modelPath.length);

      switch (action.type) {
        case _actionTypes.default.CHANGE:
          if (!localPath.length) {
            return action.value;
          }

          if (getter(state, localPath) === action.value) {
            return state;
          }

          return setter(state, localPath, action.value);

        case _actionTypes.default.RESET:
          if (!localPath.length) {
            return initialState;
          }

          if (getter(state, localPath) === getter(initialState, localPath)) {
            return state;
          }

          return setter(state, localPath, getter(initialState, localPath));

        default:
          return state;
      }
    };

    return (0, _batchedEnhancer.default)(modelReducer, initialState, options);
  };
}

var modelReducer = createModeler();
var _default = modelReducer;
exports.default = _default;