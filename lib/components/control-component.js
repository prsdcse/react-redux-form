"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createControlClass", {
  enumerable: true,
  get: function get() {
    return _controlComponentFactory.default;
  }
});
exports.default = void 0;

var _actions = _interopRequireDefault(require("../actions"));

var _get2 = _interopRequireDefault(require("../utils/get"));

var _getFieldFromState = _interopRequireDefault(require("../utils/get-field-from-state"));

var _controlComponentFactory = _interopRequireDefault(require("./control-component-factory"));

var _reactDom = require("react-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultStrategy = {
  get: _get2.default,
  getFieldFromState: _getFieldFromState.default,
  actions: _actions.default,
  findDOMNode: _reactDom.findDOMNode
};

var _default = (0, _controlComponentFactory.default)(defaultStrategy);

exports.default = _default;