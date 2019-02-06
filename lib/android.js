"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "modelReducer", {
  enumerable: true,
  get: function get() {
    return _index.modelReducer;
  }
});
Object.defineProperty(exports, "formReducer", {
  enumerable: true,
  get: function get() {
    return _index.formReducer;
  }
});
Object.defineProperty(exports, "modeled", {
  enumerable: true,
  get: function get() {
    return _index.modeled;
  }
});
Object.defineProperty(exports, "actions", {
  enumerable: true,
  get: function get() {
    return _index.actions;
  }
});
Object.defineProperty(exports, "combineForms", {
  enumerable: true,
  get: function get() {
    return _index.combineForms;
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
Object.defineProperty(exports, "Control", {
  enumerable: true,
  get: function get() {
    return _index.Control;
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
Object.defineProperty(exports, "getField", {
  enumerable: true,
  get: function get() {
    return _index.getField;
  }
});
Object.defineProperty(exports, "track", {
  enumerable: true,
  get: function get() {
    return _index.track;
  }
});
exports.Fieldset = exports.Errors = exports.Form = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _index = require("./index");

var _omit = _interopRequireDefault(require("./utils/omit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getTextValue(value) {
  if (typeof value === 'string' || typeof value === 'number') {
    return "".concat(value);
  }

  return '';
}

var noop = function noop() {
  return undefined;
};

_index.Control.Picker = function (props) {
  return _react.default.createElement(_index.Control, _extends({
    component: _reactNative.Picker,
    mapProps: _objectSpread({
      onResponderGrant: function onResponderGrant(_ref) {
        var onFocus = _ref.onFocus;
        return onFocus;
      },
      onResponderRelease: function onResponderRelease(_ref2) {
        var onBlur = _ref2.onBlur;
        return onBlur;
      },
      selectedValue: function selectedValue(_ref3) {
        var modelValue = _ref3.modelValue;
        return modelValue;
      },
      onValueChange: function onValueChange(_ref4) {
        var onChange = _ref4.onChange;
        return onChange;
      },
      onChange: noop
    }, props.mapProps)
  }, (0, _omit.default)(props, 'mapProps')));
};

_index.Control.Switch = function (props) {
  return _react.default.createElement(_index.Control, _extends({
    component: _reactNative.Switch,
    mapProps: _objectSpread({
      onResponderGrant: function onResponderGrant(_ref5) {
        var onFocus = _ref5.onFocus;
        return onFocus;
      },
      onResponderRelease: function onResponderRelease(_ref6) {
        var onBlur = _ref6.onBlur;
        return onBlur;
      },
      value: function value(_ref7) {
        var modelValue = _ref7.modelValue;
        return !!modelValue;
      },
      onValueChange: function onValueChange(_ref8) {
        var onChange = _ref8.onChange;
        return onChange;
      },
      onChange: noop
    }, props.mapProps)
  }, (0, _omit.default)(props, 'mapProps')));
};

_index.Control.TextInput = function (props) {
  return _react.default.createElement(_index.Control, _extends({
    component: _reactNative.TextInput,
    mapProps: _objectSpread({
      onResponderGrant: function onResponderGrant(_ref9) {
        var onFocus = _ref9.onFocus;
        return onFocus;
      },
      value: function value(_props) {
        return !_props.defaultValue && !_props.hasOwnProperty('value') ? getTextValue(_props.viewValue) : _props.value;
      },
      onChangeText: function onChangeText(_ref10) {
        var onChange = _ref10.onChange;
        return onChange;
      },
      onChange: noop,
      onBlur: function onBlur(_ref11) {
        var _onBlur = _ref11.onBlur,
            viewValue = _ref11.viewValue;
        return function () {
          return _onBlur(viewValue);
        };
      },
      onFocus: function onFocus(_ref12) {
        var _onFocus = _ref12.onFocus;
        return _onFocus;
      }
    }, props.mapProps)
  }, (0, _omit.default)(props, 'mapProps')));
};

_index.Control.Slider = function (props) {
  return _react.default.createElement(_index.Control, _extends({
    component: _reactNative.Slider,
    mapProps: _objectSpread({
      value: function value(_ref13) {
        var modelValue = _ref13.modelValue;
        return modelValue;
      },
      onResponderGrant: function onResponderGrant(_ref14) {
        var onFocus = _ref14.onFocus;
        return onFocus;
      },
      onSlidingComplete: function onSlidingComplete(_ref15) {
        var onBlur = _ref15.onBlur;
        return onBlur;
      },
      onValueChange: function onValueChange(_ref16) {
        var onChange = _ref16.onChange;
        return onChange;
      },
      onChange: noop
    }, props.mapProps)
  }, (0, _omit.default)(props, 'mapProps')));
};

var NativeForm = function NativeForm(props) {
  return _react.default.createElement(_index.Form, _extends({
    component: _reactNative.View
  }, (0, _omit.default)(props, 'mapProps')));
};

exports.Form = NativeForm;

var NativeFieldset = function NativeFieldset(props) {
  return _react.default.createElement(_index.Fieldset, _extends({
    component: _reactNative.View
  }, (0, _omit.default)(props, 'mapProps')));
};

exports.Fieldset = NativeFieldset;

var NativeErrors = function NativeErrors(props) {
  return _react.default.createElement(_index.Errors, _extends({
    wrapper: _reactNative.View,
    component: _reactNative.Text
  }, props));
};

exports.Errors = NativeErrors;