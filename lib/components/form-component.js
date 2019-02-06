"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFormClass = createFormClass;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _shallowEqual = _interopRequireDefault(require("../utils/shallow-equal"));

var _get2 = _interopRequireDefault(require("../utils/get"));

var _omit = _interopRequireDefault(require("../utils/omit"));

var _actions = _interopRequireDefault(require("../actions"));

var _getValidity = _interopRequireDefault(require("../utils/get-validity"));

var _invertValidators = _interopRequireDefault(require("../utils/invert-validators"));

var _isValidityInvalid = _interopRequireDefault(require("../utils/is-validity-invalid"));

var _isValid = _interopRequireDefault(require("../form/is-valid"));

var _getForm = _interopRequireWildcard(require("../utils/get-form"));

var _getModel = _interopRequireDefault(require("../utils/get-model"));

var _getField = _interopRequireDefault(require("../utils/get-field"));

var _deepCompareChildren = _interopRequireDefault(require("../utils/deep-compare-children"));

var _containsEvent = _interopRequireDefault(require("../utils/contains-event"));

var _mergeValidity = _interopRequireDefault(require("../utils/merge-validity"));

var _invariant = _interopRequireDefault(require("invariant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var propTypes = {
  component: _propTypes.default.any,
  validators: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func]),
  errors: _propTypes.default.object,
  validateOn: _propTypes.default.oneOf(['change', 'submit']),
  model: _propTypes.default.string.isRequired,
  modelValue: _propTypes.default.any,
  formValue: _propTypes.default.object,
  onSubmit: _propTypes.default.func,
  onSubmitFailed: _propTypes.default.func,
  dispatch: _propTypes.default.func,
  children: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.node]),
  store: _propTypes.default.shape({
    subscribe: _propTypes.default.func,
    dispatch: _propTypes.default.func,
    getState: _propTypes.default.func
  }),
  storeSubscription: _propTypes.default.any,
  onUpdate: _propTypes.default.func,
  onChange: _propTypes.default.func,
  getRef: _propTypes.default.func,
  getDispatch: _propTypes.default.func,
  onBeforeSubmit: _propTypes.default.func,
  hideNativeErrors: _propTypes.default.bool,
  // standard HTML attributes
  action: _propTypes.default.string,
  noValidate: _propTypes.default.bool
};
var htmlAttributes = ['action', 'noValidate'];
var disallowedPropTypeKeys = Object.keys(propTypes).filter(function (key) {
  return htmlAttributes.indexOf(key) === -1;
});
var defaultStrategy = {
  get: _get2.default,
  getForm: _getForm.default,
  actions: _actions.default
};

function createFormClass() {
  var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultStrategy;

  var Form =
  /*#__PURE__*/
  function (_Component) {
    _inherits(Form, _Component);

    function Form(props) {
      var _this;

      _classCallCheck(this, Form);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Form).call(this, props));
      _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleReset = _this.handleReset.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleValidSubmit = _this.handleValidSubmit.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.handleInvalidSubmit = _this.handleInvalidSubmit.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.attachNode = _this.attachNode.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this.state = {
        lastSubmitEvent: null
      };
      return _this;
    }

    _createClass(Form, [{
      key: "getChildContext",
      value: function getChildContext() {
        return {
          model: this.props.model,
          localStore: this.props.store
        };
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        if ((0, _containsEvent.default)(this.props.validateOn, 'change')) {
          this.validate(this.props, true);
        }

        if (this.props.getDispatch) {
          this.props.getDispatch(this.props.dispatch);
        }
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        if ((0, _containsEvent.default)(nextProps.validateOn, 'change')) {
          this.validate(nextProps);
        }
      }
    }, {
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps, nextState) {
        return (0, _deepCompareChildren.default)(this, nextProps, nextState);
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        this.handleIntents();

        if (!(0, _shallowEqual.default)(prevProps.formValue, this.props.formValue)) {
          this.handleUpdate();
        }

        if (!(0, _shallowEqual.default)(prevProps.modelValue, this.props.modelValue)) {
          this.handleChange();
        }
      }
    }, {
      key: "handleUpdate",
      value: function handleUpdate() {
        if (this.props.onUpdate) {
          this.props.onUpdate(this.props.formValue);
        }
      }
    }, {
      key: "handleChange",
      value: function handleChange() {
        if (this.props.onChange) {
          this.props.onChange(this.props.modelValue);
        }
      }
    }, {
      key: "attachNode",
      value: function attachNode(node) {
        if (!node) return;
        this._node = node;
        this._node.submit = this.handleSubmit;
        if (this.props.getRef) this.props.getRef(node);
      }
    }, {
      key: "validate",
      value: function validate(nextProps) {
        var _this2 = this;

        var initial = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var submit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var _this$props = this.props,
            model = _this$props.model,
            dispatch = _this$props.dispatch,
            formValue = _this$props.formValue,
            modelValue = _this$props.modelValue;
        var validators = nextProps.validators,
            errors = nextProps.errors;
        if (!formValue) return;

        if (!validators && !errors && modelValue !== nextProps.modelValue) {
          return;
        }

        var validatorsChanged = validators !== this.props.validators || errors !== this.props.errors;
        var fieldKeys = (validators ? Object.keys(validators) : []).concat(errors ? Object.keys(errors) : []);
        var fieldsErrors = {};
        var validityChanged = false;
        var keysToValidate = [];
        fieldKeys.forEach(function (key) {
          if (!!~keysToValidate.indexOf(key)) return;
          var valuesChanged = key === '' ? modelValue !== nextProps.modelValue : s.get(modelValue, key) !== s.get(nextProps.modelValue, key);

          if (submit || initial || valuesChanged || validators && _this2.props.validators[key] !== validators[key] || errors && _this2.props.errors[key] !== errors[key] || !!~key.indexOf('[]')) {
            keysToValidate.push(key);
          }
        });

        var validateField = function validateField(field, errorValidator) {
          if (!!~field.indexOf('[]')) {
            var _field$split = field.split('[]'),
                _field$split2 = _slicedToArray(_field$split, 2),
                parentModel = _field$split2[0],
                childModel = _field$split2[1];

            var nextValue = parentModel ? s.get(nextProps.modelValue, parentModel) : nextProps.modelValue;
            nextValue.forEach(function (subValue, index) {
              validateField("".concat(parentModel, "[").concat(index, "]").concat(childModel), errorValidator);
            });
          } else {
            var _nextValue = field ? s.get(nextProps.modelValue, field) : nextProps.modelValue;

            var currentErrors = (0, _getField.default)(formValue, field).errors;
            var fieldErrors = (0, _getValidity.default)(errorValidator, _nextValue);

            if (!validityChanged && !(0, _shallowEqual.default)(fieldErrors, currentErrors)) {
              validityChanged = true;
            }

            fieldsErrors[field] = (0, _mergeValidity.default)(fieldsErrors[field], fieldErrors);
          }
        };

        keysToValidate.forEach(function (field) {
          if (validators && validators[field]) {
            validateField(field, (0, _invertValidators.default)(validators[field]));
          }

          if (errors && errors[field]) {
            validateField(field, errors[field]);
          }
        });

        if (typeof validators === 'function') {
          var nextValue = nextProps.modelValue;
          var currentValue = modelValue;

          if (!submit && !initial && !validatorsChanged && nextValue === currentValue) {
            // If neither the validators nor the values have changed,
            // the validity didn't change.
            return;
          }

          var multiFieldErrors = (0, _getValidity.default)(validators, nextValue);

          if (multiFieldErrors) {
            Object.keys(multiFieldErrors).forEach(function (key) {
              // key will be the model value to apply errors to.
              var fieldErrors = multiFieldErrors[key];
              var currentErrors = (0, _getField.default)(formValue, key).errors; // Invert validators

              Object.keys(fieldErrors).forEach(function (validationName) {
                fieldErrors[validationName] = !fieldErrors[validationName];
              });

              if (!validityChanged && !(0, _shallowEqual.default)(fieldErrors, currentErrors)) {
                validityChanged = true;
              }

              fieldsErrors[key] = (0, _mergeValidity.default)(fieldsErrors[key], fieldErrors);
            });
          }
        } // Compute form-level validity


        if (!fieldsErrors.hasOwnProperty('') && !~fieldKeys.indexOf('')) {
          fieldsErrors[''] = false;
          validityChanged = validityChanged || (0, _isValidityInvalid.default)(formValue.$form.errors);
        }

        if (validityChanged) {
          dispatch(s.actions.setFieldsErrors(model, fieldsErrors, {
            merge: true
          }));
        }

        if (submit) {
          dispatch(s.actions.addIntent(model, {
            type: 'submit'
          }));
        }
      }
    }, {
      key: "handleValidSubmit",
      value: function handleValidSubmit(options) {
        var _this$props2 = this.props,
            dispatch = _this$props2.dispatch,
            model = _this$props2.model,
            modelValue = _this$props2.modelValue,
            onSubmit = _this$props2.onSubmit;
        dispatch(s.actions.setPending(model, true, options));
        if (onSubmit) onSubmit(modelValue, this.state.lastSubmitEvent);
      }
    }, {
      key: "handleInvalidSubmit",
      value: function handleInvalidSubmit(options) {
        var _this$props3 = this.props,
            onSubmitFailed = _this$props3.onSubmitFailed,
            formValue = _this$props3.formValue,
            dispatch = _this$props3.dispatch;

        if (onSubmitFailed) {
          onSubmitFailed(formValue);
        }

        dispatch(s.actions.setSubmitFailed(this.props.model, true, options));
      }
    }, {
      key: "handleReset",
      value: function handleReset(e) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }

        this.props.dispatch(s.actions.reset(this.props.model));
      }
    }, {
      key: "handleIntents",
      value: function handleIntents() {
        var _this3 = this;

        var _this$props4 = this.props,
            formValue = _this$props4.formValue,
            noValidate = _this$props4.noValidate;
        formValue.$form.intents.forEach(function (intent) {
          switch (intent.type) {
            case 'submit':
              {
                if (noValidate || (0, _isValid.default)(formValue, {
                  async: false
                })) {
                  _this3.handleValidSubmit({
                    clearIntents: intent
                  });
                } else {
                  _this3.handleInvalidSubmit({
                    clearIntents: intent
                  });
                }

                return;
              }

            default:
              return;
          }
        });
      }
    }, {
      key: "handleSubmit",
      value: function handleSubmit(e) {
        if (e) {
          if (!this.props.action) e.preventDefault();
          e.stopPropagation();
        }

        if (e && e.persist) e.persist();
        var _this$props5 = this.props,
            modelValue = _this$props5.modelValue,
            formValue = _this$props5.formValue,
            onSubmit = _this$props5.onSubmit,
            validators = _this$props5.validators,
            onBeforeSubmit = _this$props5.onBeforeSubmit;
        if (onBeforeSubmit) onBeforeSubmit(e);
        var formValid = formValue ? formValue.$form.valid : true;

        if (!validators && onSubmit && formValid) {
          onSubmit(modelValue, e);
          return modelValue;
        }

        this.setState({
          lastSubmitEvent: e
        });
        this.validate(this.props, false, true);
        return modelValue;
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props6 = this.props,
            component = _this$props6.component,
            children = _this$props6.children,
            formValue = _this$props6.formValue,
            hideNativeErrors = _this$props6.hideNativeErrors,
            noValidate = _this$props6.noValidate;
        var allowedProps = (0, _omit.default)(this.props, disallowedPropTypeKeys);
        var renderableChildren = typeof children === 'function' ? children(formValue) : children;
        return _react.default.createElement(component, _objectSpread({}, allowedProps, {
          onSubmit: this.handleSubmit,
          onReset: this.handleReset,
          ref: this.attachNode,
          noValidate: hideNativeErrors || noValidate
        }), renderableChildren);
      }
    }]);

    return Form;
  }(_react.Component);

  Form.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};
  Form.defaultProps = {
    validateOn: 'change',
    component: 'form'
  };
  Form.childContextTypes = {
    model: _propTypes.default.any,
    localStore: _propTypes.default.shape({
      subscribe: _propTypes.default.func,
      dispatch: _propTypes.default.func,
      getState: _propTypes.default.func
    })
  };

  function mapStateToProps(state, _ref) {
    var model = _ref.model;
    var modelString = (0, _getModel.default)(model, state);
    (0, _getForm.clearGetFormCacheForModel)(modelString);
    var form = s.getForm(state, modelString);
    (0, _invariant.default)(form, 'Unable to create Form component. ' + 'Could not find form for "%s" in the store.', modelString);
    return {
      model: modelString,
      modelValue: s.get(state, modelString),
      formValue: form
    };
  }

  return (0, _reactRedux.connect)(mapStateToProps)(Form);
}

var _default = createFormClass();

exports.default = _default;