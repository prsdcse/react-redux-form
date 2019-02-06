"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createControlClass = createControlClass;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _redux = require("redux");

var _identity = _interopRequireDefault(require("../utils/identity"));

var _shallowEqual = _interopRequireDefault(require("../utils/shallow-equal"));

var _get2 = _interopRequireDefault(require("../utils/get"));

var _merge = _interopRequireDefault(require("../utils/merge"));

var _mapValues = _interopRequireDefault(require("../utils/map-values"));

var _isPlainObject = _interopRequireWildcard(require("../utils/is-plain-object"));

var _icepick = _interopRequireDefault(require("icepick"));

var _omit = _interopRequireDefault(require("../utils/omit"));

var _actionTypes = _interopRequireDefault(require("../action-types"));

var _debounce = _interopRequireDefault(require("../utils/debounce"));

var _getValue2 = _interopRequireWildcard(require("../utils/get-value"));

var _getValidity = _interopRequireDefault(require("../utils/get-validity"));

var _invertValidity = _interopRequireDefault(require("../utils/invert-validity"));

var _getModel = _interopRequireDefault(require("../utils/get-model"));

var _persistEventWithCallback = _interopRequireDefault(require("../utils/persist-event-with-callback"));

var _actions = _interopRequireDefault(require("../actions"));

var _controlPropsMap = _interopRequireDefault(require("../constants/control-props-map"));

var _validityKeys = _interopRequireDefault(require("../constants/validity-keys"));

var _batchActions = require("../actions/batch-actions");

var _resolveModel = _interopRequireDefault(require("../utils/resolve-model"));

var _isNative = _interopRequireDefault(require("../utils/is-native"));

var _initialFieldState = _interopRequireDefault(require("../constants/initial-field-state"));

var _containsEvent = _interopRequireDefault(require("../utils/contains-event"));

var _controlStripDefaultsComponent = _interopRequireDefault(require("./control-strip-defaults-component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var disallowedProps = ['changeAction', 'getFieldFromState', 'store'];

function mergeOrSetErrors(model, errors, options) {
  return _actions.default.setErrors(model, errors, _objectSpread({
    merge: (0, _isPlainObject.isObjectLike)(errors)
  }, options));
}

var propTypes = {
  model: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.string]).isRequired,
  modelValue: _propTypes.default.any,
  viewValue: _propTypes.default.any,
  defaultValue: _propTypes.default.any,
  control: _propTypes.default.any,
  onLoad: _propTypes.default.func,
  onSubmit: _propTypes.default.func,
  fieldValue: _propTypes.default.object,
  mapProps: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
  changeAction: _propTypes.default.func,
  updateOn: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.string), _propTypes.default.string]),
  validateOn: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.string), _propTypes.default.string]),
  validators: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
  asyncValidateOn: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.string), _propTypes.default.string]),
  asyncValidators: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
  errors: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
  controlProps: _propTypes.default.object,
  component: _propTypes.default.any,
  dispatch: _propTypes.default.func,
  parser: _propTypes.default.func,
  formatter: _propTypes.default.func,
  ignore: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.string), _propTypes.default.string]),
  dynamic: _propTypes.default.bool,
  store: _propTypes.default.shape({
    subscribe: _propTypes.default.func,
    dispatch: _propTypes.default.func,
    getState: _propTypes.default.func
  }),
  getRef: _propTypes.default.func,
  withField: _propTypes.default.bool,
  debounce: _propTypes.default.number,
  persist: _propTypes.default.bool,
  getValue: _propTypes.default.func,
  isToggle: _propTypes.default.bool,
  updateOnEnter: _propTypes.default.bool,
  render: _propTypes.default.func,
  // HTML5 attributes
  formNoValidate: _propTypes.default.bool
};
var htmlAttributes = ['formNoValidate'];
var disallowedPropTypeKeys = Object.keys(propTypes).filter(function (key) {
  return htmlAttributes.indexOf(key) === -1;
});

function createControlClass(s) {
  var emptyControlProps = {};
  var emptyMapProps = {};

  var Control =
  /*#__PURE__*/
  function (_Component) {
    _inherits(Control, _Component);

    function Control(props) {
      var _this;

      _classCallCheck(this, Control);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Control).call(this, props));
      _this.getChangeAction = _this.getChangeAction.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.getValidateAction = _this.getValidateAction.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleKeyPress = _this.handleKeyPress.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.createEventHandler = _this.createEventHandler.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleFocus = _this.createEventHandler('focus').bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleBlur = _this.createEventHandler('blur').bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleUpdate = _this.createEventHandler('change').bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.forceHandleUpdate = _this.createEventHandler('change', true).bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleLoad = _this.handleLoad.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.getMappedProps = _this.getMappedProps.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.getRenderProps = _this.getRenderProps.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.attachNode = _this.attachNode.bind(_assertThisInitialized(_assertThisInitialized(_this)));

      if (props.debounce) {
        _this.handleUpdate = (0, _debounce.default)(_this.handleUpdate, props.debounce);
        var oldHandleBlur = _this.handleBlur;

        _this.handleBlur = function () {
          _this.handleUpdate.flush();

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          oldHandleBlur.call.apply(oldHandleBlur, [_assertThisInitialized(_assertThisInitialized(_this))].concat(args));
        };
      }

      _this.willValidate = false;
      _this.state = {
        viewValue: _this.format(props.modelValue)
      };
      return _this;
    }

    _createClass(Control, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.attachNode();
        this.handleLoad();
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(_ref) {
        var modelValue = _ref.modelValue;

        if (modelValue !== this.props.modelValue) {
          this.setViewValue(modelValue);
        }
      }
    }, {
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps, nextState) {
        return !(0, _shallowEqual.default)(this.props, nextProps, {
          deepKeys: ['controlProps'],
          omitKeys: ['mapProps']
        }) || !(0, _shallowEqual.default)(this.state.viewValue, nextState.viewValue);
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        this.handleIntents();
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var _this$props = this.props,
            model = _this$props.model,
            fieldValue = _this$props.fieldValue,
            dispatch = _this$props.dispatch,
            _this$props$validator = _this$props.validators,
            validators = _this$props$validator === void 0 ? {} : _this$props$validator,
            _this$props$errors = _this$props.errors,
            errors = _this$props$errors === void 0 ? {} : _this$props$errors,
            persist = _this$props.persist;

        if (!persist && fieldValue && !fieldValue.valid) {
          var keys = Object.keys(validators).concat(Object.keys(errors), this.willValidate ? _validityKeys.default : []);
          dispatch(_actions.default.resetValidity(model, keys));
        } // flush debounced model changes


        if (this.handleUpdate.flush) {
          this.handleUpdate.flush();
        }
      }
    }, {
      key: "getRenderProps",
      value: function getRenderProps() {
        var props = this.props;
        var viewValue = this.state.viewValue;
        return {
          modelValue: props.modelValue,
          fieldValue: props.fieldValue,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          onChange: this.handleChange,
          onKeyPress: this.handleKeyPress,
          viewValue: viewValue
        };
      }
    }, {
      key: "getMappedProps",
      value: function getMappedProps() {
        var props = this.props;
        var mapProps = props.mapProps;
        var viewValue = this.state.viewValue;

        var originalProps = _objectSpread({}, props, props.controlProps, {
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          onChange: this.handleChange,
          onKeyPress: this.handleKeyPress,
          viewValue: viewValue
        });

        if ((0, _isPlainObject.default)(mapProps)) {
          return (0, _mapValues.default)(mapProps, function (value, key) {
            if (typeof value === 'function' && key !== 'component') {
              return value(originalProps);
            }

            return value;
          });
        } else if (typeof mapProps === 'function') {
          return mapProps(originalProps);
        }

        return emptyMapProps;
      }
    }, {
      key: "getChangeAction",
      value: function getChangeAction(event) {
        return this.props.changeAction(this.props.model, this.getValue(event), {
          currentValue: this.props.modelValue,
          external: false
        });
      }
    }, {
      key: "getValidateAction",
      value: function getValidateAction(value, eventName) {
        var forceUpdate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var _this$props2 = this.props,
            validators = _this$props2.validators,
            errors = _this$props2.errors,
            model = _this$props2.model,
            modelValue = _this$props2.modelValue,
            updateOn = _this$props2.updateOn,
            fieldValue = _this$props2.fieldValue;
        if (!validators && !errors && !this.willValidate) return false;
        var nodeErrors = this.getNodeErrors(); // If it is not a change event, use the model value.

        var valueToValidate = forceUpdate || (0, _containsEvent.default)(updateOn, eventName) ? value : modelValue;

        if (validators || errors) {
          var fieldValidity = (0, _getValidity.default)(validators, valueToValidate);
          var fieldErrors = (0, _merge.default)((0, _getValidity.default)(errors, valueToValidate), nodeErrors);
          var mergedErrors = validators ? (0, _merge.default)((0, _invertValidity.default)(fieldValidity), fieldErrors) : fieldErrors;

          if (!fieldValue || !(0, _shallowEqual.default)(mergedErrors, fieldValue.errors)) {
            return mergeOrSetErrors(model, mergedErrors);
          }
        } else if (nodeErrors && Object.keys(nodeErrors).length) {
          return mergeOrSetErrors(model, nodeErrors);
        }

        return false;
      }
    }, {
      key: "getAsyncValidateAction",
      value: function getAsyncValidateAction(value, eventName) {
        var _this2 = this;

        var _this$props3 = this.props,
            asyncValidators = _this$props3.asyncValidators,
            fieldValue = _this$props3.fieldValue,
            model = _this$props3.model,
            modelValue = _this$props3.modelValue,
            updateOn = _this$props3.updateOn,
            _this$props3$validate = _this$props3.validateOn,
            validateOn = _this$props3$validate === void 0 ? updateOn : _this$props3$validate,
            asyncValidateOn = _this$props3.asyncValidateOn,
            dispatch = _this$props3.dispatch,
            getValue = _this$props3.getValue; // If there are no async validators,
        // do not run async validation

        if (!asyncValidators) return false; // If it is not a change event, use the model value.

        var valueToValidate = (0, _containsEvent.default)(updateOn, eventName) ? value : modelValue; // If any sync validity is invalid,
        // do not run async validation
        // unless sync and async validation occur simultaneously

        if (validateOn !== asyncValidateOn) {
          var asyncValidatorKeys = Object.keys(asyncValidators);
          var syncValid = Object.keys(fieldValue.validity).every(function (key) {
            // If validity is based on async validator, skip
            if (!!~asyncValidatorKeys.indexOf(key)) return true;
            return fieldValue.validity[key];
          });
          if (!syncValid) return false;
        }

        dispatch(_actions.default.setValidating(model, true));
        (0, _mapValues.default)(asyncValidators, function (validator, key) {
          var outerDone = function outerDone(valid) {
            // get current fieldValue as another validator may have already been processed.
            var currentFieldValue = _this2.props.fieldValue;

            var validity = _icepick.default.merge(currentFieldValue.validity, _defineProperty({}, key, valid));

            dispatch(_actions.default.setValidity(model, validity));
          };

          validator(getValue(valueToValidate, _this2.props), outerDone);
        });
        return valueToValidate;
      }
    }, {
      key: "getNodeErrors",
      value: function getNodeErrors() {
        var node = this.node,
            _this$props4 = this.props,
            fieldValue = _this$props4.fieldValue,
            formNoValidate = _this$props4.formNoValidate;

        if (formNoValidate || !node || node && !node.willValidate) {
          this.willValidate = false;
          return null;
        }

        this.willValidate = true;
        var nodeErrors = {};

        _validityKeys.default.forEach(function (key) {
          var errorValidity = node.validity[key]; // If the key is invalid or they key was
          // previously invalid and is now valid,
          // set its validity

          if (errorValidity || fieldValue && fieldValue.errors[key]) {
            nodeErrors[key] = errorValidity;
          }
        });

        return nodeErrors;
      }
    }, {
      key: "setViewValue",
      value: function setViewValue(viewValue) {
        if (!this.props.isToggle) {
          if (this.props.formatter) {
            var parsedValue = this.parse(viewValue);
            this.setState({
              viewValue: this.format(parsedValue)
            });
          } else {
            this.setState({
              viewValue: this.parse(viewValue)
            });
          }
        }
      }
    }, {
      key: "getValue",
      value: function getValue(event) {
        return this.props.getValue(event, this.props);
      }
    }, {
      key: "handleIntents",
      value: function handleIntents() {
        var _this3 = this;

        var _this$props5 = this.props,
            model = _this$props5.model,
            modelValue = _this$props5.modelValue,
            fieldValue = _this$props5.fieldValue,
            intents = _this$props5.fieldValue.intents,
            controlProps = _this$props5.controlProps,
            dispatch = _this$props5.dispatch,
            updateOn = _this$props5.updateOn,
            _this$props5$validate = _this$props5.validateOn,
            validateOn = _this$props5$validate === void 0 ? updateOn : _this$props5$validate;
        if (!Array.isArray(intents) || !intents.length) return;
        intents.forEach(function (intent) {
          switch (intent.type) {
            case _actionTypes.default.FOCUS:
              {
                if (_isNative.default) return;
                var focused = fieldValue.focus;

                if (focused && _this3.node.focus && (!_this3.props.isToggle || typeof intent.value === 'undefined' || intent.value === controlProps.value)) {
                  _this3.node.focus();

                  dispatch(_actions.default.clearIntents(model, intent));
                }

                return;
              }

            case 'validate':
              if ((0, _containsEvent.default)(validateOn, 'change')) {
                _this3.validate({
                  clearIntents: intent
                });
              }

              return;

            case 'reset':
              _this3.setViewValue(modelValue);

              if (_this3.handleUpdate.cancel) {
                _this3.handleUpdate.cancel();
              }

              dispatch(_actions.default.clearIntents(model, intent));

              if ((0, _containsEvent.default)(validateOn, 'change')) {
                _this3.validate({});
              }

              return;

            case 'load':
              if (!(0, _shallowEqual.default)(modelValue, fieldValue.value)) {
                dispatch(_actions.default.load(model, fieldValue.value, {
                  clearIntents: intent
                }));
              }

              return;

            default:
              return;
          }
        });
      }
    }, {
      key: "parse",
      value: function parse(value) {
        return this.props.parser ? this.props.parser(value) : value;
      }
    }, {
      key: "format",
      value: function format(value) {
        return this.props.formatter ? this.props.formatter(value) : value;
      }
    }, {
      key: "handleChange",
      value: function handleChange(event) {
        if (event && event.persist) event.persist();
        this.setViewValue(this.getValue(event));
        this.handleUpdate(event);
      }
    }, {
      key: "handleKeyPress",
      value: function handleKeyPress(event) {
        var _this$props6 = this.props,
            onKeyPress = _this$props6.controlProps.onKeyPress,
            updateOnEnter = _this$props6.updateOnEnter;
        if (onKeyPress) onKeyPress(event);

        if (updateOnEnter && event.key === 'Enter') {
          this.forceHandleUpdate(event);
        }
      }
    }, {
      key: "handleLoad",
      value: function handleLoad() {
        var _this$props7 = this.props,
            model = _this$props7.model,
            modelValue = _this$props7.modelValue,
            fieldValue = _this$props7.fieldValue,
            controlProps = _this$props7.controlProps,
            onLoad = _this$props7.onLoad,
            dispatch = _this$props7.dispatch,
            changeAction = _this$props7.changeAction,
            parser = _this$props7.parser;
        var defaultValue = undefined;

        if (controlProps.hasOwnProperty('defaultValue')) {
          defaultValue = controlProps.defaultValue;
        } else if (controlProps.hasOwnProperty('defaultChecked')) {
          defaultValue = controlProps.defaultChecked;
        } else if (this.props.hasOwnProperty('defaultValue')) {
          defaultValue = this.props.defaultValue;
        }

        var loadActions = [this.getValidateAction(defaultValue)];

        if (typeof defaultValue !== 'undefined') {
          loadActions.push(changeAction(model, defaultValue));
        } else {
          if (parser) {
            var parsedValue = parser(modelValue);

            if (parsedValue !== modelValue) {
              loadActions.push(changeAction(model, parsedValue));
            }
          }
        }

        (0, _batchActions.dispatchBatchIfNeeded)(model, loadActions, dispatch);
        if (onLoad) onLoad(modelValue, fieldValue, this.node);
      }
    }, {
      key: "createEventHandler",
      value: function createEventHandler(eventName) {
        var _this4 = this;

        var forceUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var eventAction = {
          focus: _actions.default.silentFocus,
          blur: _actions.default.blur
        }[eventName];

        var dispatchBatchActions = function dispatchBatchActions(persistedEvent) {
          var _this4$props = _this4.props,
              dispatch = _this4$props.dispatch,
              model = _this4$props.model,
              updateOn = _this4$props.updateOn,
              _this4$props$validate = _this4$props.validateOn,
              validateOn = _this4$props$validate === void 0 ? updateOn : _this4$props$validate,
              asyncValidateOn = _this4$props.asyncValidateOn;
          var eventActions = [eventAction && eventAction(model), (forceUpdate || (0, _containsEvent.default)(validateOn, eventName)) && _this4.getValidateAction(persistedEvent, eventName, forceUpdate), (forceUpdate || (0, _containsEvent.default)(asyncValidateOn, eventName)) && _this4.getAsyncValidateAction(persistedEvent, eventName), (forceUpdate || (0, _containsEvent.default)(updateOn, eventName)) && _this4.getChangeAction(persistedEvent)];
          (0, _batchActions.dispatchBatchIfNeeded)(model, eventActions, dispatch);
          return persistedEvent;
        };

        return function (event) {
          var _this4$props2 = _this4.props,
              controlProps = _this4$props2.controlProps,
              parser = _this4$props2.parser,
              ignore = _this4$props2.ignore,
              withField = _this4$props2.withField,
              fieldValue = _this4$props2.fieldValue;
          var controlEventHandler = {
            focus: controlProps.onFocus,
            blur: controlProps.onBlur,
            change: controlProps.onChange
          }[eventName];

          if ((0, _containsEvent.default)(ignore, eventName)) {
            return controlEventHandler ? controlEventHandler(event) : event;
          }

          if (_this4.props.isToggle) {
            return (0, _redux.compose)(dispatchBatchActions, (0, _persistEventWithCallback.default)(controlEventHandler || _identity.default))(event);
          }

          return (0, _redux.compose)(dispatchBatchActions, parser, function (e) {
            return _this4.getValue(e);
          }, (0, _persistEventWithCallback.default)(controlEventHandler || _identity.default))(event, withField ? fieldValue : undefined);
        };
      }
    }, {
      key: "attachNode",
      value: function attachNode() {
        var node = s.findDOMNode && s.findDOMNode(this);

        if (node) {
          this.node = node;
          this.willValidate = node.willValidate;
        }
      }
    }, {
      key: "validate",
      value: function validate(options) {
        var _this$props8 = this.props,
            model = _this$props8.model,
            modelValue = _this$props8.modelValue,
            fieldValue = _this$props8.fieldValue,
            validators = _this$props8.validators,
            errorValidators = _this$props8.errors,
            dispatch = _this$props8.dispatch;

        if (!validators && !errorValidators && !this.willValidate || !fieldValue) {
          return;
        }

        var fieldValidity = (0, _getValidity.default)(validators, modelValue);
        var fieldErrors = (0, _getValidity.default)(errorValidators, modelValue);
        var nodeErrors = this.getNodeErrors();
        var errors = validators ? (0, _merge.default)((0, _invertValidity.default)(fieldValidity), fieldErrors) : fieldErrors;

        if (this.willValidate) {
          errors = (0, _merge.default)(errors, nodeErrors);
        }

        if (!(0, _shallowEqual.default)(errors, fieldValue.errors)) {
          dispatch(mergeOrSetErrors(model, errors, options));
        } else if (options.clearIntents) {
          dispatch(_actions.default.clearIntents(model, options.clearIntents));
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props9 = this.props,
            render = _this$props9.render,
            controlProps = _this$props9.controlProps,
            component = _this$props9.component,
            control = _this$props9.control,
            getRef = _this$props9.getRef,
            fieldValue = _this$props9.fieldValue;

        if (render) {
          return render(this.getRenderProps());
        }

        var mappedProps = (0, _omit.default)(this.getMappedProps(), disallowedProps);

        if (getRef) {
          mappedProps.getRef = getRef;
        }

        if (controlProps.withFieldValue) {
          mappedProps.fieldValue = fieldValue;
        } // If there is an existing control, clone it


        if (control) {
          return (0, _react.cloneElement)(control, _objectSpread({}, mappedProps, {
            defaultValue: undefined,
            defaultChecked: undefined
          }), controlProps.children);
        }

        return (0, _react.createElement)(_controlStripDefaultsComponent.default, _objectSpread({
          component: component
        }, controlProps, mappedProps));
      }
    }]);

    return Control;
  }(_react.Component);

  Control.displayName = 'Control';
  Control.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
  Control.defaultProps = {
    changeAction: s.actions.change,
    updateOn: 'change',
    asyncValidateOn: 'blur',
    parser: _identity.default,
    controlProps: emptyControlProps,
    ignore: [],
    dynamic: false,
    component: 'input',
    withField: true,
    persist: false,
    getValue: _getValue2.default,
    isToggle: false,
    updateOnEnter: true
  };

  function mapStateToProps(state, props) {
    var model = props.model,
        controlProps = props.controlProps;

    var finalControlProps = _objectSpread({}, controlProps, (0, _omit.default)(props, disallowedPropTypeKeys));

    var modelString = (0, _getModel.default)(model, state);

    var fieldValue = s.getFieldFromState(state, modelString) || _initialFieldState.default;

    var modelValue = s.get(state, modelString);
    return {
      model: modelString,
      modelValue: modelValue,
      fieldValue: fieldValue,
      controlProps: finalControlProps
    };
  }

  var ConnectedControl = (0, _resolveModel.default)((0, _reactRedux.connect)(mapStateToProps, null, null, {
    areOwnPropsEqual: function areOwnPropsEqual(nextOwnProps, ownProps) {
      return (0, _shallowEqual.default)(nextOwnProps, ownProps, {
        omitKeys: ['mapProps']
      });
    },
    areStatePropsEqual: function areStatePropsEqual(nextStateProps, stateProps) {
      return (0, _shallowEqual.default)(nextStateProps, stateProps, {
        deepKeys: ['controlProps']
      });
    }
  })(Control));
  /* eslint-disable react/prop-types */

  /* eslint-disable react/no-multi-comp */

  var DefaultConnectedControl =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(DefaultConnectedControl, _React$Component);

    function DefaultConnectedControl() {
      _classCallCheck(this, DefaultConnectedControl);

      return _possibleConstructorReturn(this, _getPrototypeOf(DefaultConnectedControl).apply(this, arguments));
    }

    _createClass(DefaultConnectedControl, [{
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !(0, _shallowEqual.default)(this.context, nextContext) || !(0, _shallowEqual.default)(this.props, nextProps, {
          deepKeys: ['controlProps'],
          omitKeys: ['mapProps']
        });
      }
    }, {
      key: "render",
      value: function render() {
        return _react.default.createElement(ConnectedControl, _extends({}, this.props, {
          mapProps: _objectSpread({}, _controlPropsMap.default.default, this.props.mapProps)
        }));
      }
    }]);

    return DefaultConnectedControl;
  }(_react.default.Component); // Copy the context types so that we can properly implement shouldComponentUpdate


  DefaultConnectedControl.contextTypes = ConnectedControl.contextTypes;
  DefaultConnectedControl.custom = ConnectedControl;

  var DefaultConnectedControlInput =
  /*#__PURE__*/
  function (_DefaultConnectedCont) {
    _inherits(DefaultConnectedControlInput, _DefaultConnectedCont);

    function DefaultConnectedControlInput() {
      _classCallCheck(this, DefaultConnectedControlInput);

      return _possibleConstructorReturn(this, _getPrototypeOf(DefaultConnectedControlInput).apply(this, arguments));
    }

    _createClass(DefaultConnectedControlInput, [{
      key: "render",
      value: function render() {
        return _react.default.createElement(ConnectedControl, _extends({
          component: "input"
        }, this.props, {
          mapProps: _objectSpread({}, _controlPropsMap.default.default, this.props.mapProps)
        }));
      }
    }]);

    return DefaultConnectedControlInput;
  }(DefaultConnectedControl);

  DefaultConnectedControl.input = DefaultConnectedControlInput;

  var DefaultConnectedControlText =
  /*#__PURE__*/
  function (_DefaultConnectedCont2) {
    _inherits(DefaultConnectedControlText, _DefaultConnectedCont2);

    function DefaultConnectedControlText() {
      _classCallCheck(this, DefaultConnectedControlText);

      return _possibleConstructorReturn(this, _getPrototypeOf(DefaultConnectedControlText).apply(this, arguments));
    }

    _createClass(DefaultConnectedControlText, [{
      key: "render",
      value: function render() {
        return _react.default.createElement(ConnectedControl, _extends({
          component: "input"
        }, this.props, {
          mapProps: _objectSpread({}, _controlPropsMap.default.text, {
            type: this.props.type || 'text'
          }, this.props.mapProps)
        }));
      }
    }]);

    return DefaultConnectedControlText;
  }(DefaultConnectedControl);

  DefaultConnectedControl.text = DefaultConnectedControlText;

  var DefaultConnectedControlPassword =
  /*#__PURE__*/
  function (_DefaultConnectedCont3) {
    _inherits(DefaultConnectedControlPassword, _DefaultConnectedCont3);

    function DefaultConnectedControlPassword() {
      _classCallCheck(this, DefaultConnectedControlPassword);

      return _possibleConstructorReturn(this, _getPrototypeOf(DefaultConnectedControlPassword).apply(this, arguments));
    }

    _createClass(DefaultConnectedControlPassword, [{
      key: "render",
      value: function render() {
        return _react.default.createElement(ConnectedControl, _extends({
          component: "input"
        }, this.props, {
          mapProps: _objectSpread({}, _controlPropsMap.default.text, {
            type: this.props.type || 'password'
          }, this.props.mapProps)
        }));
      }
    }]);

    return DefaultConnectedControlPassword;
  }(DefaultConnectedControl);

  DefaultConnectedControl.password = DefaultConnectedControlPassword;

  var DefaultConnectedControlTextArea =
  /*#__PURE__*/
  function (_DefaultConnectedCont4) {
    _inherits(DefaultConnectedControlTextArea, _DefaultConnectedCont4);

    function DefaultConnectedControlTextArea() {
      _classCallCheck(this, DefaultConnectedControlTextArea);

      return _possibleConstructorReturn(this, _getPrototypeOf(DefaultConnectedControlTextArea).apply(this, arguments));
    }

    _createClass(DefaultConnectedControlTextArea, [{
      key: "render",
      value: function render() {
        return _react.default.createElement(ConnectedControl, _extends({
          component: "textarea",
          updateOnEnter: false
        }, this.props, {
          mapProps: _objectSpread({}, _controlPropsMap.default.textarea, this.props.mapProps)
        }));
      }
    }]);

    return DefaultConnectedControlTextArea;
  }(DefaultConnectedControl);

  DefaultConnectedControl.textarea = DefaultConnectedControlTextArea;

  var DefaultConnectedControlRadio =
  /*#__PURE__*/
  function (_DefaultConnectedCont5) {
    _inherits(DefaultConnectedControlRadio, _DefaultConnectedCont5);

    function DefaultConnectedControlRadio() {
      _classCallCheck(this, DefaultConnectedControlRadio);

      return _possibleConstructorReturn(this, _getPrototypeOf(DefaultConnectedControlRadio).apply(this, arguments));
    }

    _createClass(DefaultConnectedControlRadio, [{
      key: "render",
      value: function render() {
        return _react.default.createElement(ConnectedControl, _extends({
          component: "input",
          type: "radio",
          isToggle: true
        }, this.props, {
          mapProps: _objectSpread({}, _controlPropsMap.default.radio, this.props.mapProps)
        }));
      }
    }]);

    return DefaultConnectedControlRadio;
  }(DefaultConnectedControl);

  DefaultConnectedControl.radio = DefaultConnectedControlRadio;

  var DefaultConnectedControlCheckbox =
  /*#__PURE__*/
  function (_DefaultConnectedCont6) {
    _inherits(DefaultConnectedControlCheckbox, _DefaultConnectedCont6);

    function DefaultConnectedControlCheckbox() {
      _classCallCheck(this, DefaultConnectedControlCheckbox);

      return _possibleConstructorReturn(this, _getPrototypeOf(DefaultConnectedControlCheckbox).apply(this, arguments));
    }

    _createClass(DefaultConnectedControlCheckbox, [{
      key: "render",
      value: function render() {
        return _react.default.createElement(ConnectedControl, _extends({
          component: "input",
          type: "checkbox",
          isToggle: true
        }, this.props, {
          mapProps: _objectSpread({}, _controlPropsMap.default.checkbox, this.props.mapProps),
          getValue: _getValue2.getCheckboxValue,
          changeAction: this.props.changeAction || s.actions.checkWithValue
        }));
      }
    }]);

    return DefaultConnectedControlCheckbox;
  }(DefaultConnectedControl);

  DefaultConnectedControl.checkbox = DefaultConnectedControlCheckbox;

  var DefaultConnectedControlFile =
  /*#__PURE__*/
  function (_DefaultConnectedCont7) {
    _inherits(DefaultConnectedControlFile, _DefaultConnectedCont7);

    function DefaultConnectedControlFile() {
      _classCallCheck(this, DefaultConnectedControlFile);

      return _possibleConstructorReturn(this, _getPrototypeOf(DefaultConnectedControlFile).apply(this, arguments));
    }

    _createClass(DefaultConnectedControlFile, [{
      key: "render",
      value: function render() {
        return _react.default.createElement(ConnectedControl, _extends({
          component: "input",
          type: "file"
        }, this.props, {
          mapProps: _objectSpread({}, _controlPropsMap.default.file, this.props.mapProps)
        }));
      }
    }]);

    return DefaultConnectedControlFile;
  }(DefaultConnectedControl);

  DefaultConnectedControl.file = DefaultConnectedControlFile;

  var DefaultConnectedControlSelect =
  /*#__PURE__*/
  function (_DefaultConnectedCont8) {
    _inherits(DefaultConnectedControlSelect, _DefaultConnectedCont8);

    function DefaultConnectedControlSelect() {
      _classCallCheck(this, DefaultConnectedControlSelect);

      return _possibleConstructorReturn(this, _getPrototypeOf(DefaultConnectedControlSelect).apply(this, arguments));
    }

    _createClass(DefaultConnectedControlSelect, [{
      key: "render",
      value: function render() {
        return _react.default.createElement(ConnectedControl, _extends({
          component: "select"
        }, this.props, {
          mapProps: _objectSpread({}, _controlPropsMap.default.select, this.props.mapProps)
        }));
      }
    }]);

    return DefaultConnectedControlSelect;
  }(DefaultConnectedControl);

  DefaultConnectedControl.select = DefaultConnectedControlSelect;

  var DefaultConnectedControlButton =
  /*#__PURE__*/
  function (_DefaultConnectedCont9) {
    _inherits(DefaultConnectedControlButton, _DefaultConnectedCont9);

    function DefaultConnectedControlButton() {
      _classCallCheck(this, DefaultConnectedControlButton);

      return _possibleConstructorReturn(this, _getPrototypeOf(DefaultConnectedControlButton).apply(this, arguments));
    }

    _createClass(DefaultConnectedControlButton, [{
      key: "render",
      value: function render() {
        return _react.default.createElement(ConnectedControl, _extends({
          component: "button"
        }, this.props, {
          mapProps: _objectSpread({}, _controlPropsMap.default.button, this.props.mapProps)
        }));
      }
    }]);

    return DefaultConnectedControlButton;
  }(DefaultConnectedControl);

  DefaultConnectedControl.button = DefaultConnectedControlButton;

  var DefaultConnectedControlReset =
  /*#__PURE__*/
  function (_DefaultConnectedCont10) {
    _inherits(DefaultConnectedControlReset, _DefaultConnectedCont10);

    function DefaultConnectedControlReset() {
      _classCallCheck(this, DefaultConnectedControlReset);

      return _possibleConstructorReturn(this, _getPrototypeOf(DefaultConnectedControlReset).apply(this, arguments));
    }

    _createClass(DefaultConnectedControlReset, [{
      key: "render",
      value: function render() {
        return _react.default.createElement(ConnectedControl, _extends({
          component: "button",
          type: "reset"
        }, this.props, {
          mapProps: _objectSpread({}, _controlPropsMap.default.reset, this.props.mapProps)
        }));
      }
    }]);

    return DefaultConnectedControlReset;
  }(DefaultConnectedControl);

  DefaultConnectedControl.reset = DefaultConnectedControlReset;
  return DefaultConnectedControl;
}

var _default = createControlClass;
exports.default = _default;