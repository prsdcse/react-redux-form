"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = omit;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function omit(object, props) {
  if (object == null) {
    return {};
  }

  var newObject = _objectSpread({}, object);

  if (typeof props === 'string') {
    delete newObject[props];
  } else {
    props.forEach(function (prop) {
      delete newObject[prop];
    });
  }

  return newObject;
}