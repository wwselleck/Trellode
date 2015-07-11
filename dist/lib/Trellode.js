/** @module Trellode */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var request = require('request').defaults({ baseUrl: 'https://api.trello.com' });
var Promise = require('promise');

/**
 * @param  {string} method - HTTP Method
 * @param  {string} endpoint - Endpoint for API
 * @param  {options} options - Optional options for request
 * @return {Promise} 
 */
function sendRequest(method, endpoint, options) {
  return new Promise(function (resolve, reject) {
    request({
      uri: endpoint,
      method: method,
      qs: options,
      json: true
    }, function (err, response, body) {
      if (err) {
        reject(err);
      }
      resolve(body);
    });
  });
}

function wrapRequest(method, endpoint, options, cb) {
  if (cb) {
    sendRequest(method, endpoint, options).then(cb);
  } else {
    return sendRequest(method, endpoint, options);
  }
}

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

function generateOptionsAndCallback(options, callback) {
  var ret = {};

  if (typeof options === 'object') {
    ret.options = options;
    if (cb) {
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

/** @class  */

var Trellode = (function () {
  function Trellode(key, token) {
    _classCallCheck(this, Trellode);

    this.key = key;
    this.token = token;
  }

  _createClass(Trellode, [{
    key: 'queryOptions',
    value: function queryOptions() {
      return { key: this.key, token: this.token };
    }
  }, {
    key: 'createBoard',
    value: function createBoard(name, options, callback) {}
  }, {
    key: 'getBoards',
    value: function getBoards(memberId, options, callback) {
      var generatedParams = generateOptionsAndCallback(options, callback);
      return wrapRequest('GET', '/1/members/' + memberId + '/boards', mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
    }
  }]);

  return Trellode;
})();

module.exports = Trellode;