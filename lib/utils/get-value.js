"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getValue;
exports.getCheckboxValue = getCheckboxValue;

var _isMulti = _interopRequireDefault(require("./is-multi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function isEvent(event) {
  return !!(event && event.stopPropagation && event.preventDefault);
}

function getEventValue(event) {
  var target = event.target;

  if (!target) {
    if (!event.nativeEvent) {
      return undefined;
    }

    return event.nativeEvent.text;
  }

  if (target.type === 'file') {
    return _toConsumableArray(target.files) || target.dataTransfer && _toConsumableArray(target.dataTransfer.files);
  }

  if (target.multiple) {
    return _toConsumableArray(target.selectedOptions).map(function (option) {
      return option.value;
    });
  }

  return target.value;
}

function getValue(value) {
  return isEvent(value) ? getEventValue(value) : value;
}

function getCheckboxValue(_, props) {
  var controlProps = props.controlProps;

  if ((0, _isMulti.default)(props.model)) {
    return controlProps.value;
  }

  return !props.modelValue;
}