"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFormStateKey = getFormStateKey;
exports.default = exports.clearGetFormCacheForModel = exports.clearGetFormCache = void 0;

var _get = _interopRequireDefault(require("../utils/get"));

var _isPlainObject = _interopRequireDefault(require("../utils/is-plain-object"));

var _pathStartsWith = _interopRequireWildcard(require("../utils/path-starts-with"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultStrategy = {
  get: _get.default,
  keys: function keys(state) {
    return Object.keys(state);
  },
  isObject: function isObject(state) {
    return (0, _isPlainObject.default)(state);
  }
};

function joinPaths() {
  for (var _len = arguments.length, paths = new Array(_len), _key = 0; _key < _len; _key++) {
    paths[_key] = arguments[_key];
  }

  return paths.filter(function (path) {
    return !!path && path.length;
  }).join('.');
}

function getFormStateKey(state, model) {
  var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultStrategy;
  var currentPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var deepCandidateKeys = [];
  var result = null;
  s.keys(state).some(function (key) {
    if (key === '') {
      console.warn('react-redux-form skipped over an empty property key: %s', currentPath); // eslint-disable-line no-console, max-len

      return false;
    }

    var subState = s.get(state, key);

    if (subState && s.get(subState, '$form')) {
      var subStateModel = s.get(subState, '$form.model');

      if ((0, _pathStartsWith.default)(model, subStateModel) || subStateModel === '') {
        var localPath = (0, _pathStartsWith.pathDifference)(model, subStateModel);
        var resultPath = [currentPath, key];
        var currentState = subState;
        localPath.every(function (segment) {
          if (s.get(currentState, segment) && s.get(currentState, "".concat(segment, ".$form"))) {
            currentState = s.get(currentState, segment);
            resultPath.push(segment);
            return true;
          }

          return false;
        });
        result = joinPaths.apply(void 0, resultPath);
        return true;
      }

      return false;
    }

    if (s.isObject(subState)) {
      deepCandidateKeys.push(key);
    }

    return false;
  });
  if (result) return result;
  deepCandidateKeys.some(function (key) {
    result = getFormStateKey(s.get(state, key), model, s, joinPaths(currentPath, key));
    return !!result;
  });
  if (result) return result;
  return null;
}

var formStateKeyCache = {};

var clearGetFormCache = function clearGetFormCache() {
  return formStateKeyCache = {};
}; // eslint-disable-line no-return-assign


exports.clearGetFormCache = clearGetFormCache;

var clearGetFormCacheForModel = // eslint-disable-next-line
function clearGetFormCacheForModel(modelString) {
  return delete formStateKeyCache[modelString];
};

exports.clearGetFormCacheForModel = clearGetFormCacheForModel;

var getFormStateKeyCached = function () {
  return function (state, modelString) {
    var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultStrategy;
    if (formStateKeyCache[modelString]) return formStateKeyCache[modelString];
    var result = getFormStateKey(state, modelString, s);
    formStateKeyCache[modelString] = result; // eslint-disable-line no-return-assign

    return result;
  };
}();

function getForm(state, modelString) {
  var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultStrategy;
  var formStateKey = getFormStateKeyCached(state, modelString, s);

  if (!formStateKey) {
    return null;
  }

  var form = s.get(state, formStateKey);
  return form;
}

var _default = getForm;
exports.default = _default;