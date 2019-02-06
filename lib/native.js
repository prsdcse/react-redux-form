"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "modelReducer", {
  enumerable: true,
  get: function get() {
    return _modelReducer.default;
  }
});
Object.defineProperty(exports, "formReducer", {
  enumerable: true,
  get: function get() {
    return _formReducer.default;
  }
});
Object.defineProperty(exports, "modeled", {
  enumerable: true,
  get: function get() {
    return _modeledEnhancer.default;
  }
});
Object.defineProperty(exports, "actions", {
  enumerable: true,
  get: function get() {
    return _actions.default;
  }
});
Object.defineProperty(exports, "combineForms", {
  enumerable: true,
  get: function get() {
    return _formsReducer.default;
  }
});
Object.defineProperty(exports, "createForms", {
  enumerable: true,
  get: function get() {
    return _formsReducer.createForms;
  }
});
Object.defineProperty(exports, "initialFieldState", {
  enumerable: true,
  get: function get() {
    return _initialFieldState.default;
  }
});
Object.defineProperty(exports, "actionTypes", {
  enumerable: true,
  get: function get() {
    return _actionTypes.default;
  }
});
Object.defineProperty(exports, "batched", {
  enumerable: true,
  get: function get() {
    return _batchedEnhancer.default;
  }
});
Object.defineProperty(exports, "form", {
  enumerable: true,
  get: function get() {
    return _form.default;
  }
});
Object.defineProperty(exports, "track", {
  enumerable: true,
  get: function get() {
    return _track.default;
  }
});
Object.defineProperty(exports, "getField", {
  enumerable: true,
  get: function get() {
    return _getFieldFromState.default;
  }
});
exports.Fieldset = exports.Errors = exports.Form = exports.Control = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _reactNativeSegmentedControlTab = _interopRequireDefault(require("react-native-segmented-control-tab"));

var _modelReducer = _interopRequireDefault(require("./reducers/model-reducer"));

var _formReducer = _interopRequireDefault(require("./reducers/form-reducer"));

var _modeledEnhancer = _interopRequireDefault(require("./enhancers/modeled-enhancer"));

var _actions = _interopRequireDefault(require("./actions"));

var _formsReducer = _interopRequireWildcard(require("./reducers/forms-reducer"));

var _initialFieldState = _interopRequireDefault(require("./constants/initial-field-state"));

var _actionTypes = _interopRequireDefault(require("./action-types"));

var _formComponent = _interopRequireDefault(require("./components/form-component"));

var _fieldsetComponent = _interopRequireDefault(require("./components/fieldset-component"));

var _errorsComponent = _interopRequireDefault(require("./components/errors-component"));

var _batchedEnhancer = _interopRequireDefault(require("./enhancers/batched-enhancer"));

var _form = _interopRequireDefault(require("./form"));

var _track = _interopRequireDefault(require("./utils/track"));

var _omit = _interopRequireDefault(require("./utils/omit"));

var _get2 = _interopRequireDefault(require("./utils/get"));

var _getFieldFromState = _interopRequireDefault(require("./utils/get-field-from-state"));

var _controlComponentFactory = _interopRequireDefault(require("./components/control-component-factory"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function getTextValue(value) {
  if (typeof value === 'string' || typeof value === 'number') {
    return "".concat(value);
  }

  return '';
}

var DatePickerAndroid = function DatePickerAndroid() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return {
    open: function () {
      var _open = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _ref, action, year, month, day, dismissed;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _reactNative.DatePickerAndroid.open.apply(_reactNative.DatePickerAndroid, args);

              case 2:
                _ref = _context.sent;
                action = _ref.action;
                year = _ref.year;
                month = _ref.month;
                day = _ref.day;
                dismissed = action === _reactNative.DatePickerAndroid.dismissedAction;
                return _context.abrupt("return", {
                  dismissed: dismissed,
                  action: action,
                  year: year,
                  month: month,
                  day: day
                });

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function open() {
        return _open.apply(this, arguments);
      }

      return open;
    }()
  };
};

var noop = function noop() {
  return undefined;
};

var Control = (0, _controlComponentFactory.default)({
  get: _get2.default,
  getFieldFromState: _getFieldFromState.default,
  actions: _actions.default
});
exports.Control = Control;

Control.MapView = function (props) {
  return _react.default.createElement(Control, _extends({
    component: _reactNative.MapView,
    updateOn: "blur",
    mapProps: _objectSpread({
      onResponderGrant: function onResponderGrant(_ref2) {
        var onFocus = _ref2.onFocus;
        return onFocus;
      },
      onRegionChange: function onRegionChange(_ref3) {
        var onChange = _ref3.onChange;
        return onChange;
      },
      onRegionChangeComplete: function onRegionChangeComplete(_ref4) {
        var onBlur = _ref4.onBlur;
        return onBlur;
      },
      region: function region(_ref5) {
        var modelValue = _ref5.modelValue;
        return modelValue;
      }
    }, props.mapProps)
  }, (0, _omit.default)(props, 'mapProps')));
};

Control.Picker = function (props) {
  return _react.default.createElement(Control, _extends({
    component: _reactNative.Picker,
    mapProps: _objectSpread({
      onResponderGrant: function onResponderGrant(_ref6) {
        var onFocus = _ref6.onFocus;
        return onFocus;
      },
      onResponderRelease: function onResponderRelease(_ref7) {
        var onBlur = _ref7.onBlur;
        return onBlur;
      },
      selectedValue: function selectedValue(_ref8) {
        var modelValue = _ref8.modelValue;
        return modelValue;
      },
      onValueChange: function onValueChange(_ref9) {
        var onChange = _ref9.onChange;
        return onChange;
      },
      onChange: noop
    }, props.mapProps)
  }, (0, _omit.default)(props, 'mapProps')));
};

Control.Switch = function (props) {
  return _react.default.createElement(Control, _extends({
    component: _reactNative.Switch,
    mapProps: _objectSpread({
      onResponderGrant: function onResponderGrant(_ref10) {
        var onFocus = _ref10.onFocus;
        return onFocus;
      },
      onResponderRelease: function onResponderRelease(_ref11) {
        var onBlur = _ref11.onBlur;
        return onBlur;
      },
      value: function value(_ref12) {
        var modelValue = _ref12.modelValue;
        return !!modelValue;
      },
      onValueChange: function onValueChange(_ref13) {
        var onChange = _ref13.onChange;
        return onChange;
      },
      onChange: noop
    }, props.mapProps)
  }, (0, _omit.default)(props, 'mapProps')));
};

Control.TextInput = function (props) {
  return _react.default.createElement(Control, _extends({
    component: _reactNative.TextInput,
    mapProps: _objectSpread({
      onResponderGrant: function onResponderGrant(_ref14) {
        var onFocus = _ref14.onFocus;
        return onFocus;
      },
      value: function value(_props) {
        return !_props.defaultValue && !_props.hasOwnProperty('value') ? getTextValue(_props.viewValue) : _props.value;
      },
      onChangeText: function onChangeText(_ref15) {
        var onChange = _ref15.onChange;
        return onChange;
      },
      onChange: noop,
      onBlur: function onBlur(_ref16) {
        var _onBlur = _ref16.onBlur,
            viewValue = _ref16.viewValue;
        return function () {
          return _onBlur(viewValue);
        };
      },
      onFocus: function onFocus(_ref17) {
        var _onFocus = _ref17.onFocus;
        return _onFocus;
      }
    }, props.mapProps)
  }, (0, _omit.default)(props, 'mapProps')));
};

Control.DatePickerIOS = function (props) {
  return _react.default.createElement(Control, _extends({
    component: _reactNative.DatePickerIOS,
    mapProps: _objectSpread({
      onResponderGrant: function onResponderGrant(_ref18) {
        var onFocus = _ref18.onFocus;
        return onFocus;
      },
      onResponderRelease: function onResponderRelease(_ref19) {
        var onBlur = _ref19.onBlur;
        return onBlur;
      },
      date: function date(_ref20) {
        var modelValue = _ref20.modelValue;
        return modelValue;
      },
      onDateChange: function onDateChange(_ref21) {
        var onChange = _ref21.onChange;
        return onChange;
      },
      onChange: noop
    }, props.mapProps)
  }, (0, _omit.default)(props, 'mapProps')));
};

Control.DatePickerAndroid = DatePickerAndroid;

Control.SegmentedControlIOS = function (props) {
  return _react.default.createElement(Control, _extends({
    component: _reactNative.SegmentedControlIOS,
    mapProps: _objectSpread({
      onResponderGrant: function onResponderGrant(_ref22) {
        var onFocus = _ref22.onFocus;
        return onFocus;
      },
      selectedIndex: function selectedIndex(_ref23) {
        var values = _ref23.values,
            modelValue = _ref23.modelValue;
        return values.indexOf(modelValue);
      },
      onValueChange: function onValueChange(_ref24) {
        var onChange = _ref24.onChange;
        return onChange;
      },
      onChange: noop
    }, props.mapProps)
  }, (0, _omit.default)(props, 'mapProps')));
};

Control.SegmentedControlAndroid = function (props) {
  return _react.default.createElement(Control, _extends({
    component: _reactNativeSegmentedControlTab.default,
    mapProps: _objectSpread({
      onResponderGrant: function onResponderGrant(_ref25) {
        var onFocus = _ref25.onFocus;
        return onFocus;
      },
      selectedIndex: function selectedIndex(_ref26) {
        var values = _ref26.values,
            modelValue = _ref26.modelValue;
        return values.indexOf(modelValue);
      },
      onValueChange: function onValueChange(_ref27) {
        var onChange = _ref27.onChange;
        return onChange;
      },
      onChange: noop
    }, props.mapProps)
  }, (0, _omit.default)(props, 'mapProps')));
};

Control.Slider = function (props) {
  return _react.default.createElement(Control, _extends({
    component: _reactNative.Slider,
    mapProps: _objectSpread({
      value: function value(_ref28) {
        var modelValue = _ref28.modelValue;
        return modelValue;
      },
      onResponderGrant: function onResponderGrant(_ref29) {
        var onFocus = _ref29.onFocus;
        return onFocus;
      },
      onSlidingComplete: function onSlidingComplete(_ref30) {
        var onBlur = _ref30.onBlur;
        return onBlur;
      },
      onValueChange: function onValueChange(_ref31) {
        var onChange = _ref31.onChange;
        return onChange;
      },
      onChange: noop
    }, props.mapProps)
  }, (0, _omit.default)(props, 'mapProps')));
};

var NativeForm = function NativeForm(props) {
  return _react.default.createElement(_formComponent.default, _extends({
    component: _reactNative.View
  }, (0, _omit.default)(props, 'mapProps')));
};

exports.Form = NativeForm;

var NativeFieldset = function NativeFieldset(props) {
  return _react.default.createElement(_fieldsetComponent.default, _extends({
    component: _reactNative.View
  }, (0, _omit.default)(props, 'mapProps')));
};

exports.Fieldset = NativeFieldset;

var NativeErrors = function NativeErrors(props) {
  return _react.default.createElement(_errorsComponent.default, _extends({
    wrapper: _reactNative.View,
    component: _reactNative.Text
  }, props));
};

exports.Errors = NativeErrors;