/**
 * Merges the properties of two objects into one
 * @private
 * @param  {object}
 * @param  {object}
 * @return {object}
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.mergeOptions = mergeOptions;
exports.generateOptionsAndCallback = generateOptionsAndCallback;

function mergeOptions(obj1, obj2) {
  var ret = {};
  for (var attrname in obj1) {
    ret[attrname] = obj1[attrname];
  }
  for (var attrname in obj2) {
    ret[attrname] = obj2[attrname];
  }
  return ret;
}

/**
 * @private
 * @param  {object}
 * @param  {Function}
 * @return {object} Object with properties (something, probably a JSDoc way to do this)
 */

function generateOptionsAndCallback(options, callback) {
  var ret = {};

  if (typeof options === 'object') {
    ret.options = options;
    if (callback) {
      ret.callback = callback;
    }
  } else {
    if (typeof options === 'function') {
      ret.callback = options;
    }
    ret.options = {};
  }
  return ret;
}