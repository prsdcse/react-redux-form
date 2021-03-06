"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isObjectLike = isObjectLike;
exports.default = isPlainObject;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Adapted from https://github.com/jonschlinkert/is-plain-object
function isObjectLike(val) {
  return val != null && _typeof(val) === 'object';
}

function isObject(val) {
  return isObjectLike(val) && Array.isArray(val) === false;
}

function isObjectObject(o) {
  return isObject(o) === true && Object.prototype.toString.call(o) === '[object Object]';
}

function isPlainObject(o) {
  if (isObjectObject(o) === false) return false; // If has modified constructor

  var ctor = o.constructor;
  if (typeof ctor !== 'function') return false; // If has modified prototype

  var prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false; // If constructor does not have an Object-specific method

  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  } // Most likely a plain Object


  return true;
}