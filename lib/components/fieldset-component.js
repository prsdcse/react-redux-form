"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _getModel = _interopRequireDefault(require("../utils/get-model"));

var _omit = _interopRequireDefault(require("../utils/omit"));

var _resolveModel = _interopRequireDefault(require("../utils/resolve-model"));

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

var propTypes = {
  model: _propTypes.default.string.isRequired,
  component: _propTypes.default.any,
  dispatch: _propTypes.default.func,
  store: _propTypes.default.shape({
    subscribe: _propTypes.default.func,
    dispatch: _propTypes.default.func,
    getState: _propTypes.default.func
  }),
  storeSubscription: _propTypes.default.any
};

var Fieldset =
/*#__PURE__*/
function (_Component) {
  _inherits(Fieldset, _Component);

  function Fieldset() {
    _classCallCheck(this, Fieldset);

    return _possibleConstructorReturn(this, _getPrototypeOf(Fieldset).apply(this, arguments));
  }

  _createClass(Fieldset, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        model: this.props.model
      };
    }
  }, {
    key: "render",
    value: function render() {
      var component = this.props.component;
      var allowedProps = (0, _omit.default)(this.props, Object.keys(propTypes));
      return _react.default.createElement(component, allowedProps);
    }
  }]);

  return Fieldset;
}(_react.Component);

Fieldset.displayName = 'Fieldset';
Fieldset.childContextTypes = {
  model: _propTypes.default.any
};
Fieldset.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
Fieldset.defaultProps = {
  component: 'div'
};

function mapStateToProps(state, _ref) {
  var model = _ref.model;
  var modelString = (0, _getModel.default)(model, state);
  return {
    model: modelString
  };
}

var _default = (0, _resolveModel.default)((0, _reactRedux.connect)(mapStateToProps)(Fieldset));

exports.default = _default;