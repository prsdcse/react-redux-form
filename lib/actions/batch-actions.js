"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dispatchBatchIfNeeded = dispatchBatchIfNeeded;
exports.default = void 0;

var _actionTypes = _interopRequireDefault(require("../action-types"));

var _partition3 = _interopRequireDefault(require("../utils/partition"));

var _isPlainObject = _interopRequireDefault(require("../utils/is-plain-object"));

var _track = require("../utils/track");

var _nullAction = _interopRequireDefault(require("../constants/null-action"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var batch = (0, _track.trackable)(function (model, actions) {
  var dispatchableActions = actions.filter(function (action) {
    return !!action;
  });
  if (!dispatchableActions.length) return _nullAction.default;

  if (dispatchableActions.length && dispatchableActions.every(_isPlainObject.default)) {
    if (dispatchableActions.length === 1) {
      return dispatchableActions[0];
    }

    return {
      type: _actionTypes.default.BATCH,
      model: model,
      actions: dispatchableActions
    };
  }

  var _partition = (0, _partition3.default)(dispatchableActions, function (action) {
    return typeof action !== 'function';
  }),
      _partition2 = _slicedToArray(_partition, 2),
      plainActions = _partition2[0],
      actionThunks = _partition2[1];

  if (!actionThunks.length) {
    if (plainActions.length > 1) {
      return {
        type: _actionTypes.default.BATCH,
        model: model,
        actions: plainActions
      };
    } else if (plainActions.length === 1) {
      return plainActions[0];
    }
  }

  return function (dispatch) {
    if (plainActions.length > 1) {
      dispatch({
        type: _actionTypes.default.BATCH,
        model: model,
        actions: plainActions
      });
    } else if (plainActions.length === 1) {
      dispatch(plainActions[0]);
    }

    actionThunks.forEach(dispatch);
  };
});

function dispatchBatchIfNeeded(model, actions, dispatch) {
  if (!actions.length) return void 0;
  var dispatchableActions = actions.filter(function (action) {
    return !!action;
  });
  if (!dispatchableActions.length) return void 0;
  return dispatch(batch(model, dispatchableActions));
}

var _default = batch;
exports.default = _default;