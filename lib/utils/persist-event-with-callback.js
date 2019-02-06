"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = persistEventWithCallback;

function persistEventWithCallback(callback) {
  return function (event) {
    if (event && event.persist) {
      event.persist();
    }

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    callback.apply(void 0, [event].concat(args));
    return event;
  };
}