"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createModelReducerEnhancer = createModelReducerEnhancer;
exports.default = void 0;

var _modelReducer = _interopRequireDefault(require("../reducers/model-reducer"));

var _nullAction = _interopRequireDefault(require("../constants/null-action"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createModelReducerEnhancer() {
  var modelReducerCreator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _modelReducer.default;
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function modelReducerEnhancer(reducer, model) {
    var initialState;

    try {
      initialState = reducer(undefined, _nullAction.default);
    } catch (error) {
      initialState = null;
    }

    var _modelReducer = modelReducerCreator(model, initialState, options);

    return function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
      var action = arguments.length > 1 ? arguments[1] : undefined;

      var updatedState = _modelReducer(state, action);

      return reducer(updatedState, action);
    };
  };
}

var modelReducerEnhancer = createModelReducerEnhancer(_modelReducer.default);
var _default = modelReducerEnhancer;
exports.default = _default;