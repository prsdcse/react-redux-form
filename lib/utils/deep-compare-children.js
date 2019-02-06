"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compareChildren = compareChildren;
exports.default = deepCompareChildren;

var _react = _interopRequireDefault(require("react"));

var _shallowCompare = _interopRequireDefault(require("shallow-compare"));

var _shallowEqual = _interopRequireDefault(require("./shallow-equal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function compareChildren(props, nextProps) {
  var children = props.children;
  var nextChildren = nextProps.children; // If the number of children changed, then children are different.
  // If there are no children, use shallowCompare in parent function
  // to determine if component should update (false && true == false)

  if (_react.default.Children.count(children) !== _react.default.Children.count(nextChildren) || !_react.default.Children.count(children) || !_react.default.Children.count(nextChildren)) {
    return true;
  }

  var childrenArray = _react.default.Children.toArray(children);

  var nextChildrenArray = _react.default.Children.toArray(nextChildren); // React.Children.toArray strip's `false` children so lengths
  // can change


  if (childrenArray.length !== nextChildrenArray.length) {
    return false;
  }

  return [].concat(childrenArray).some(function (child, i) {
    var nextChild = nextChildrenArray[i];

    if (!child.props || !nextChild.props) {
      return !(0, _shallowEqual.default)(child, nextChild);
    }
    /* eslint-disable no-use-before-define */


    return deepCompareChildren(child, nextChild.props, nextChild.state);
  });
}

function deepCompareChildren(instance, nextProps, nextState) {
  if (!instance.props.children) return (0, _shallowCompare.default)(instance, nextProps, nextState);
  return (0, _shallowCompare.default)(instance, nextProps, nextState) || compareChildren(instance.props, nextProps);
}