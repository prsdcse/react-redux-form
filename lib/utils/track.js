"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTrack = createTrack;
exports.trackable = trackable;
exports.default = void 0;

var _findKey2 = _interopRequireDefault(require("../utils/find-key"));

var _get2 = _interopRequireDefault(require("../utils/get"));

var _iteratee = require("../utils/iteratee");

var _isMulti = _interopRequireDefault(require("../utils/is-multi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var defaultStrategy = {
  findKey: _findKey2.default,
  get: _get2.default
};

function createTrack() {
  var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultStrategy;
  var iteratee = (0, _iteratee.createIteratee)(s);
  return function track(model) {
    for (var _len = arguments.length, predicates = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      predicates[_key - 1] = arguments[_key];
    }

    var isPartial = model[0] === '.';
    return function (fullState, parentModel) {
      var childModel = isPartial ? model.slice(1) : model;
      var state = isPartial ? s.get(fullState, parentModel) : fullState;

      var _childModel$split = childModel.split(/\[\]\.?/),
          _childModel$split2 = _toArray(_childModel$split),
          parentModelPath = _childModel$split2[0],
          childModelPaths = _childModel$split2.slice(1);

      var fullPath = parentModelPath;
      var subState = s.get(state, fullPath);
      predicates.forEach(function (predicate, i) {
        var childModelPath = childModelPaths[i];
        var predicateIteratee = iteratee(predicate);
        var subPath = childModelPath ? "".concat(s.findKey(subState, predicateIteratee), ".").concat(childModelPath) : "".concat(s.findKey(subState, predicateIteratee));
        subState = s.get(subState, subPath);
        fullPath += ".".concat(subPath);
      });

      if ((0, _isMulti.default)(childModel) && predicates.length < childModelPaths.length) {
        fullPath += '[]';
      }

      return isPartial ? "".concat(parentModel, ".").concat(fullPath) : fullPath;
    };
  };
}

var track = createTrack();

function trackable(actionCreator) {
  return function (model) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    if (typeof model === 'function') {
      return function (dispatch, getState) {
        var modelPath = model(getState());
        dispatch(actionCreator.apply(void 0, [modelPath].concat(args)));
      };
    }

    return actionCreator.apply(void 0, [model].concat(args));
  };
}

var _default = track;
exports.default = _default;