"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _formComponent = _interopRequireDefault(require("./form-component"));

var _formsReducer = _interopRequireDefault(require("../reducers/forms-reducer"));

var _redux = require("redux");

var _omit = _interopRequireDefault(require("../utils/omit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var LocalForm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LocalForm, _React$Component);

  function LocalForm(props) {
    var _this;

    _classCallCheck(this, LocalForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LocalForm).call(this, props));
    _this.store = props.store || (0, _redux.createStore)((0, _formsReducer.default)(_defineProperty({}, props.model, props.initialState)));

    _this.dispatch = function (action) {
      if (typeof action === 'function') {
        return action(_this.store.dispatch, _this.store.getState);
      }

      return _this.store.dispatch(action);
    };

    return _this;
  }

  _createClass(LocalForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.getDispatch) {
        this.props.getDispatch(this.dispatch);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var allowedProps = (0, _omit.default)(this.props, ['store', 'initialState']);
      return _react.default.createElement(_formComponent.default, _extends({
        store: this.store
      }, allowedProps));
    }
  }]);

  return LocalForm;
}(_react.default.Component);

LocalForm.displayName = 'LocalForm';
LocalForm.propTypes = process.env.NODE_ENV !== "production" ? {
  store: _propTypes.default.shape({
    subscribe: _propTypes.default.func,
    dispatch: _propTypes.default.func,
    getState: _propTypes.default.func
  }),
  // provided props
  initialState: _propTypes.default.any,
  model: _propTypes.default.string.isRequired,
  getDispatch: _propTypes.default.func
} : {};
LocalForm.defaultProps = {
  initialState: {},
  model: 'local'
};
var _default = LocalForm;
exports.default = _default;