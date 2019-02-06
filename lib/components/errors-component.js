"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createErrorsClass = createErrorsClass;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _get2 = _interopRequireDefault(require("../utils/get"));

var _map = _interopRequireDefault(require("../utils/map"));

var _iteratee = _interopRequireDefault(require("../utils/iteratee"));

var _isPlainObject = _interopRequireDefault(require("../utils/is-plain-object"));

var _omit = _interopRequireDefault(require("../utils/omit"));

var _getForm = _interopRequireDefault(require("../utils/get-form"));

var _getFieldFromState = _interopRequireDefault(require("../utils/get-field-from-state"));

var _getModel = _interopRequireDefault(require("../utils/get-model"));

var _isValid = _interopRequireDefault(require("../form/is-valid"));

var _resolveModel = _interopRequireDefault(require("../utils/resolve-model"));

var _initialFieldState = _interopRequireDefault(require("../constants/initial-field-state"));

var _shallowEqual = _interopRequireDefault(require("../utils/shallow-equal"));

var _invariant = _interopRequireDefault(require("invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var defaultStrategy = {
  get: _get2.default,
  getForm: _getForm.default,
  getFieldFromState: _getFieldFromState.default
};
var propTypes = {
  // Computed props
  modelValue: _propTypes.default.any,
  formValue: _propTypes.default.object,
  fieldValue: _propTypes.default.object,
  // Provided props
  model: _propTypes.default.string.isRequired,
  messages: _propTypes.default.objectOf(_propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func, _propTypes.default.bool])),
  show: _propTypes.default.any,
  wrapper: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func, _propTypes.default.element, _propTypes.default.object]),
  component: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.func, _propTypes.default.element]),
  dispatch: _propTypes.default.func,
  dynamic: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.arrayOf(_propTypes.default.string)]),
  store: _propTypes.default.shape({
    subscribe: _propTypes.default.func,
    dispatch: _propTypes.default.func,
    getState: _propTypes.default.func
  }),
  storeSubscription: _propTypes.default.any
};

function showErrors(field, form) {
  var show = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (typeof show === 'function') {
    return show(field, form);
  }

  if (!Array.isArray(show) && _typeof(show) !== 'object' && typeof show !== 'string') {
    return !!show;
  }

  return (0, _iteratee.default)(show)(field);
}

function createErrorsClass() {
  var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultStrategy;

  var Errors =
  /*#__PURE__*/
  function (_Component) {
    _inherits(Errors, _Component);

    function Errors() {
      _classCallCheck(this, Errors);

      return _possibleConstructorReturn(this, _getPrototypeOf(Errors).apply(this, arguments));
    }

    _createClass(Errors, [{
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps) {
        var fieldValue = nextProps.fieldValue,
            formValue = nextProps.formValue;
        var dynamic = this.props.dynamic;

        if (dynamic) {
          return !(0, _shallowEqual.default)(this.props, nextProps);
        }

        return fieldValue !== this.props.fieldValue || formValue !== this.props.formValue;
      }
    }, {
      key: "mapErrorMessages",
      value: function mapErrorMessages(errors) {
        var _this = this;

        var messages = this.props.messages;

        if (typeof errors === 'string') {
          return this.renderError(errors, 'error');
        }

        if (!errors) return null;
        return (0, _map.default)(errors, function (error, key) {
          var message = messages[key];

          if (error) {
            if (message || typeof error === 'string') {
              return _this.renderError(message || error, key);
            } else if ((0, _isPlainObject.default)(error)) {
              return _this.mapErrorMessages(error);
            }
          }

          return false;
        }).reduce(function (a, b) {
          return b ? a.concat(b) : a;
        }, []);
      }
    }, {
      key: "renderError",
      value: function renderError(message, key) {
        var _this$props = this.props,
            component = _this$props.component,
            model = _this$props.model,
            modelValue = _this$props.modelValue,
            fieldValue = _this$props.fieldValue,
            errors = _this$props.fieldValue.errors;
        var errorProps = {
          key: key,
          model: model,
          modelValue: modelValue,
          fieldValue: fieldValue
        };
        var messageString = typeof message === 'function' ? message(modelValue, errors[key]) : message;
        if (!messageString) return null;
        var allowedProps = typeof component === 'function' ? errorProps : {
          key: key
        };
        return _react.default.createElement(component, allowedProps, messageString);
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props2 = this.props,
            fieldValue = _this$props2.fieldValue,
            formValue = _this$props2.formValue,
            show = _this$props2.show,
            wrapper = _this$props2.wrapper;
        var allowedProps = typeof wrapper === 'function' ? this.props : (0, _omit.default)(this.props, Object.keys(propTypes));

        if (!showErrors(fieldValue, formValue, show)) {
          return null;
        }

        var errorMessages = (0, _isValid.default)(fieldValue) ? null : this.mapErrorMessages(fieldValue.errors);
        if (!errorMessages) return null;
        return _react.default.createElement(wrapper, allowedProps, errorMessages);
      }
    }]);

    return Errors;
  }(_react.Component);

  Errors.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
  Errors.defaultProps = {
    wrapper: 'div',
    component: 'span',
    messages: {},
    show: true,
    dynamic: true
  };

  function mapStateToProps(state, _ref) {
    var model = _ref.model;
    var modelString = (0, _getModel.default)(model, state);
    var form = s.getForm(state, modelString);
    (0, _invariant.default)(form, 'Unable to retrieve errors. ' + 'Could not find form for "%s" in the store.', modelString);
    var formValue = form.$form;

    var fieldValue = s.getFieldFromState(state, modelString) || _initialFieldState.default;

    return {
      model: modelString,
      modelValue: s.get(state, modelString),
      formValue: formValue,
      fieldValue: fieldValue
    };
  }

  return (0, _resolveModel.default)((0, _reactRedux.connect)(mapStateToProps)(Errors));
}

var _default = createErrorsClass();

exports.default = _default;