"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formReducer = immutableFormReducer;
exports.getField = immutableGetFieldFromState;
exports.getForm = immutableGetForm;
exports.getFormStateKey = immutableGetFormStateKey;
Object.defineProperty(exports, "controls", {
  enumerable: true,
  get: function get() {
    return _controlPropsMap.default;
  }
});
Object.defineProperty(exports, "Fieldset", {
  enumerable: true,
  get: function get() {
    return _fieldsetComponent.default;
  }
});
Object.defineProperty(exports, "initialFieldState", {
  enumerable: true,
  get: function get() {
    return _index.initialFieldState;
  }
});
Object.defineProperty(exports, "actionTypes", {
  enumerable: true,
  get: function get() {
    return _index.actionTypes;
  }
});
Object.defineProperty(exports, "createFieldClass", {
  enumerable: true,
  get: function get() {
    return _index.createFieldClass;
  }
});
Object.defineProperty(exports, "batched", {
  enumerable: true,
  get: function get() {
    return _index.batched;
  }
});
Object.defineProperty(exports, "form", {
  enumerable: true,
  get: function get() {
    return _index.form;
  }
});
exports.track = exports.modeled = exports.Errors = exports.Form = exports.Control = exports.Field = exports.actions = exports.createForms = exports.combineForms = exports.modelReducer = void 0;

var _modelReducer = require("./reducers/model-reducer");

var _formReducer = _interopRequireDefault(require("./reducers/form-reducer"));

var _modeledEnhancer = require("./enhancers/modeled-enhancer");

var _modelActions = require("./actions/model-actions");

var _controlPropsMap = _interopRequireDefault(require("./constants/control-props-map"));

var _formsReducer = require("./reducers/forms-reducer");

var _errorsComponent = require("./components/errors-component");

var _controlComponent = require("./components/control-component");

var _formComponent = require("./components/form-component");

var _fieldActions = require("./actions/field-actions");

var _track = require("./utils/track");

var _fieldsetComponent = _interopRequireDefault(require("./components/fieldset-component"));

var _batchActions = _interopRequireDefault(require("./actions/batch-actions"));

var _getValue = _interopRequireDefault(require("./utils/get-value"));

var _getFromImmutableState = _interopRequireDefault(require("./utils/get-from-immutable-state"));

var _getForm = _interopRequireWildcard(require("./utils/get-form"));

var _isPlainObject = _interopRequireDefault(require("./utils/is-plain-object"));

var _findKeyImmutable = _interopRequireDefault(require("./utils/find-key-immutable"));

var _immutable = _interopRequireDefault(require("immutable"));

var _reactDom = require("react-dom");

var _index = require("./index");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function immutableSet(state, path, value) {
  try {
    return state.setIn(path, value);
  } catch (error) {
    throw new Error("Unable to set path '".concat(path.join('.'), "' in state. Please make sure that state is an Immutable instance."));
  }
}

function immutableKeys(state) {
  if (_immutable.default.Map.isMap(state)) {
    return state.keySeq();
  }

  return Object.keys(state);
}

var baseStrategy = {
  get: _getFromImmutableState.default,
  set: immutableSet,
  getValue: _getValue.default,
  keys: immutableKeys,
  splice: function splice(list) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return list.splice.apply(list, args);
  },
  merge: function merge(map) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    return map.merge.apply(map, args);
  },
  remove: function remove(map) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }

    return map.remove.apply(map, args);
  },
  push: function push(list) {
    for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }

    return list.push.apply(list, args);
  },
  length: function length(list) {
    return list.size;
  },
  object: new _immutable.default.Map(),
  array: new _immutable.default.List(),
  isObject: function isObject(state) {
    return (0, _isPlainObject.default)(state) || _immutable.default.Map.isMap(state);
  }
};

function immutableGetForm(state, modelString) {
  return (0, _getForm.default)(state, modelString, baseStrategy);
}

function immutableGetFormStateKey(state, model) {
  return (0, _getForm.getFormStateKey)(state, model, baseStrategy);
}

function immutableGetFieldFromState(state, modelString) {
  return (0, _index.getField)(state, modelString, {
    getForm: immutableGetForm
  });
}

var immutableStrategy = _objectSpread({}, baseStrategy, {
  getForm: immutableGetForm,
  getFieldFromState: immutableGetFieldFromState,
  findKey: _findKeyImmutable.default
});

function transformAction(action) {
  if (action.value && action.value.toJS) {
    return _objectSpread({}, action, {
      value: action.value.toJS()
    });
  }

  if (action.actions) {
    return _objectSpread({}, action, {
      actions: action.actions.map(transformAction)
    });
  }

  return action;
}

function immutableFormReducer(model) {
  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _immutable.default.Map();
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _initialState = initialState && initialState.toJS ? initialState.toJS() : initialState;

  return (0, _formReducer.default)(model, _initialState, _objectSpread({}, options, {
    transformAction: transformAction
  }));
}

var immutableModelActions = (0, _modelActions.createModelActions)(immutableStrategy);
var immutableFieldActions = (0, _fieldActions.createFieldActions)(immutableStrategy);

var immutableActions = _objectSpread({}, immutableModelActions, immutableFieldActions, {
  batch: _batchActions.default
});

exports.actions = immutableActions;
var immutableModelReducer = (0, _modelReducer.createModeler)(immutableStrategy);
exports.modelReducer = immutableModelReducer;
var immutableModelReducerEnhancer = (0, _modeledEnhancer.createModelReducerEnhancer)(immutableModelReducer);
exports.modeled = immutableModelReducerEnhancer;
var ImmutableControl = (0, _controlComponent.createControlClass)({
  get: _getFromImmutableState.default,
  getFieldFromState: immutableGetFieldFromState,
  actions: immutableModelActions,
  findDOMNode: _reactDom.findDOMNode
});
exports.Control = ImmutableControl;
var ImmutableField = (0, _index.createFieldClass)(_controlPropsMap.default, {
  Control: ImmutableControl,
  getter: _getFromImmutableState.default,
  getFieldFromState: immutableGetFieldFromState,
  changeAction: immutableModelActions.change,
  actions: immutableModelActions
});
exports.Field = ImmutableField;
var ImmutableErrors = (0, _errorsComponent.createErrorsClass)(immutableStrategy);
exports.Errors = ImmutableErrors;
var ImmutableForm = (0, _formComponent.createFormClass)(_objectSpread({}, immutableStrategy, {
  actions: immutableActions
}));
exports.Form = ImmutableForm;
var immutableFormCombiner = (0, _formsReducer.createFormCombiner)({
  modelReducer: immutableModelReducer,
  formReducer: immutableFormReducer,
  modeled: immutableModelReducerEnhancer,
  toJS: function toJS(val) {
    return val && val.toJS ? val.toJS() : val;
  }
});
var immutableCombineForms = immutableFormCombiner.combineForms;
exports.combineForms = immutableCombineForms;
var immutableCreateForms = immutableFormCombiner.createForms;
exports.createForms = immutableCreateForms;
var immutableTrack = (0, _track.createTrack)(immutableStrategy);
exports.track = immutableTrack;