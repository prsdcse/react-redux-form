"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _actionTypes = _interopRequireDefault(require("../action-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createBatchReducer(reducer, initialState) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var transformAction = options.transformAction;
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;
    var transformedAction = transformAction ? transformAction(action) : action;

    if (transformedAction.type === _actionTypes.default.BATCH) {
      return transformedAction.actions.reduce(reducer, state);
    }

    return reducer(state, transformedAction);
  };
}

var _default = createBatchReducer;
exports.default = _default;