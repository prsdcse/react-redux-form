"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateParentForms;

var _icepick = _interopRequireDefault(require("icepick"));

var _get = _interopRequireDefault(require("./get"));

var _assocIn = _interopRequireDefault(require("./assoc-in"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// import { updateFieldState } from './create-field';
function updateParentForms(state, localPath, updater) {
  var parentLocalPath = localPath.slice(0, -1);
  var value = parentLocalPath.length ? (0, _get.default)(state, parentLocalPath) : state;
  if (!value) return state;
  var form = value.$form;
  var updatedValue = typeof updater === 'function' ? updater(value) : updater; // const updatedForm = updateFieldState(form, updatedValue);

  var newState = (0, _assocIn.default)(state, [].concat(_toConsumableArray(parentLocalPath), ['$form']), _icepick.default.merge(form, updatedValue));
  if (!parentLocalPath.length) return newState;
  return updateParentForms(newState, parentLocalPath, updater);
}