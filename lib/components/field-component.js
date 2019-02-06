"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFieldClass = createFieldClass;
Object.defineProperty(exports, "controlPropsMap", {
  enumerable: true,
  get: function get() {
    return _controlPropsMap.default;
  }
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _get2 = _interopRequireDefault(require("../utils/get"));

var _identity = _interopRequireDefault(require("../utils/identity"));

var _omit = _interopRequireDefault(require("../utils/omit"));

var _isPlainObject = _interopRequireDefault(require("../utils/is-plain-object"));

var _pick = _interopRequireDefault(require("../utils/pick"));

var _reactRedux = require("react-redux");

var _invariant = _interopRequireDefault(require("invariant"));

var _actions = _interopRequireDefault(require("../actions"));

var _controlComponent = _interopRequireDefault(require("./control-component"));

var _controlPropsMap = _interopRequireDefault(require("../constants/control-props-map"));

var _deepCompareChildren = _interopRequireDefault(require("../utils/deep-compare-children"));

var _shallowCompareWithoutChildren = _interopRequireDefault(require("../utils/shallow-compare-without-children"));

var _getModel = _interopRequireDefault(require("../utils/get-model"));

var _getFieldFromState = _interopRequireDefault(require("../utils/get-field-from-state"));

var _resolveModel = _interopRequireDefault(require("../utils/resolve-model"));

var _getValue = require("../utils/get-value");

var _initialFieldState = _interopRequireDefault(require("../constants/initial-field-state"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fieldPropTypes = {
  model: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.string]).isRequired,
  component: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.string]),
  parser: _propTypes.default.func,
  formatter: _propTypes.default.func,
  updateOn: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.string), _propTypes.default.string]),
  changeAction: _propTypes.default.func,
  validators: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
  asyncValidators: _propTypes.default.object,
  validateOn: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.string), _propTypes.default.string]),
  asyncValidateOn: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.string), _propTypes.default.string]),
  errors: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
  mapProps: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
  componentMap: _propTypes.default.object,
  dynamic: _propTypes.default.bool,
  dispatch: _propTypes.default.func,
  getRef: _propTypes.default.func,
  // Calculated props
  fieldValue: _propTypes.default.object,
  store: _propTypes.default.shape({
    subscribe: _propTypes.default.func,
    dispatch: _propTypes.default.func,
    getState: _propTypes.default.func
  }),
  storeSubscription: _propTypes.default.any
};

function getControlType(control, props, options) {
  var _controlPropsMap = options.controlPropsMap;
  var controlDisplayNames = Object.keys(_controlPropsMap).filter(function (controlKey) {
    var propsMap = _controlPropsMap[controlKey];

    if ((0, _isPlainObject.default)(propsMap) && propsMap.component) {
      return control.type === propsMap.component;
    }

    return false;
  });
  if (controlDisplayNames.length) return controlDisplayNames[0];

  try {
    var controlDisplayName = control.constructor.displayName || control.type.displayName || control.type.name || control.type;

    if (controlDisplayName === 'input') {
      controlDisplayName = _controlPropsMap[control.props.type] ? control.props.type : 'text';
    }

    return _controlPropsMap[controlDisplayName] ? controlDisplayName : null;
  } catch (error) {
    return undefined;
  }
}

var defaultStrategy = {
  Control: _controlComponent.default,
  controlPropTypes: fieldPropTypes,
  getFieldFromState: _getFieldFromState.default,
  actions: _actions.default
};

function createFieldClass() {
  var customControlPropsMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var s = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultStrategy;
  // Use the fieldPropTypes if no controlProptypes have been defined to
  // maintain backwards compatibiltiy.
  var controlPropTypes = s.controlPropTypes || fieldPropTypes;

  function mapStateToProps(state, props) {
    var model = props.model;
    var modelString = (0, _getModel.default)(model, state);

    var fieldValue = s.getFieldFromState(state, modelString) || _initialFieldState.default;

    return {
      model: modelString,
      fieldValue: fieldValue
    };
  }

  var options = {
    controlPropsMap: _objectSpread({}, _controlPropsMap.default, customControlPropsMap)
  }; // TODO: refactor

  var defaultControlPropsMap = {
    checkbox: {
      changeAction: s.actions.checkWithValue,
      getValue: _getValue.getCheckboxValue,
      isToggle: true
    },
    radio: {
      isToggle: true
    }
  };

  var Field =
  /*#__PURE__*/
  function (_Component) {
    _inherits(Field, _Component);

    function Field() {
      _classCallCheck(this, Field);

      return _possibleConstructorReturn(this, _getPrototypeOf(Field).apply(this, arguments));
    }

    _createClass(Field, [{
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps, nextState) {
        var dynamic = this.props.dynamic;

        if (dynamic) {
          return (0, _deepCompareChildren.default)(this, nextProps, nextState);
        }

        return (0, _shallowCompareWithoutChildren.default)(this, nextProps);
      }
    }, {
      key: "createControlComponent",
      value: function createControlComponent(control) {
        var props = this.props;

        if (!control || !control.props || control instanceof _controlComponent.default) {
          return control;
        }

        var controlType = getControlType(control, props, options);
        var _props$mapProps = props.mapProps,
            mapProps = _props$mapProps === void 0 ? options.controlPropsMap[controlType] : _props$mapProps;
        var controlProps = (0, _pick.default)(props, Object.keys(controlPropTypes));

        if (!mapProps) {
          return _react.default.cloneElement(control, null, this.mapChildrenToControl(control.props.children));
        }

        return _react.default.createElement(s.Control, _objectSpread({}, controlProps, {
          control: control,
          controlProps: control.props,
          component: control.type,
          mapProps: mapProps
        }, defaultControlPropsMap[controlType] || {}));
      }
    }, {
      key: "mapChildrenToControl",
      value: function mapChildrenToControl(children) {
        var _this = this;

        if (_react.default.Children.count(children) > 1) {
          return _react.default.Children.map(children, function (child) {
            return _this.createControlComponent(child);
          });
        }

        return this.createControlComponent(children);
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            component = _this$props.component,
            children = _this$props.children,
            fieldValue = _this$props.fieldValue;
        var allowedProps = (0, _omit.default)(this.props, Object.keys(controlPropTypes));
        var renderableChildren = typeof children === 'function' ? children(fieldValue) : children;

        if (!component) {
          (0, _invariant.default)(_react.default.Children.count(renderableChildren) === 1, 'Empty wrapper components for <Field> are only possible' + 'when there is a single child. Please check the children' + "passed into <Field model=\"".concat(this.props.model, "\">."));
          return this.createControlComponent(renderableChildren);
        }

        return _react.default.createElement(component, allowedProps, this.mapChildrenToControl(renderableChildren));
      }
    }]);

    return Field;
  }(_react.Component);

  if (process.env.NODE_ENV !== 'production') {
    Field.propTypes = process.env.NODE_ENV !== "production" ? fieldPropTypes : {};
  }

  Field.defaultProps = {
    updateOn: 'change',
    asyncValidateOn: 'blur',
    parser: _identity.default,
    formatter: _identity.default,
    changeAction: _actions.default.change,
    dynamic: true,
    component: 'div'
  };
  return (0, _resolveModel.default)((0, _reactRedux.connect)(mapStateToProps)(Field));
}

var _default = createFieldClass(_controlPropsMap.default);

exports.default = _default;