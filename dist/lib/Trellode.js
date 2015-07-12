/** @module Trellode */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var request = require('request').defaults({ baseUrl: 'https://api.trello.com' });
var Promise = require('promise');

/**
 * Send a request to the Trello API
 * @private
 * @param  {string} method - HTTP Method
 * @param  {string} endpoint - Endpoint for API
 * @param  {options} options - Options for request
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

/**
 * Wrap an http request to determine return value based on whether a callback is specified 
 * @param  {string} method - HTTP method
 * @param  {string} endpoint - Endpoint for API
 * @param  {object} options - Options for request
 * @param  {Function} [callback] - Callback
 * @return {Promise|undefined} Callback specifed: undefined, else: Promise
 */
function wrapRequest(method, endpoint, options, callback) {
  if (cb) {
    sendRequest(method, endpoint, options).then(callback);
  } else {
    return sendRequest(method, endpoint, options);
  }
}

/**
 * Merges the properties of two objects into one
 * @private
 * @param  {object}
 * @param  {object}
 * @return {object}
 */
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
    key: 'getBoards',

    /*///////////////////////////////////////////////////
            ____                      _     
           |  _ \                    | |    
           | |_) | ___   __ _ _ __ __| |___ 
           |  _ < / _ \ / _` | '__/ _` / __|
           | |_) | (_) | (_| | | | (_| \__ \
           |____/ \___/ \__,_|_|  \__,_|___/
                                    
     */ //////////////////////////////////////////////////

    value: function getBoards(memberId, options, callback) {
      var generatedParams = generateOptionsAndCallback(options, callback);
      return wrapRequest('GET', '/1/members/' + memberId + '/boards', mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
    }
  }, {
    key: 'getListsOfBoard',
    value: function getListsOfBoard(boardId, options, callback) {
      var generatedParams = generateOptionsAndCallback(options, callback);
      return wrapRequest('GET', '/1/boards/' + boardId + '/lists', mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
    }
  }, {
    key: 'getMembersOfBoard',
    value: function getMembersOfBoard(boardId, options, callback) {
      var generatedParams = generateOptionsAndCallback(options, callback);
      return wrapRequest('GET', '/1/boards/' + boardId + '/members', mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
    }
  }, {
    key: 'createBoard',
    value: function createBoard(name, options, callback) {
      var generatedParams = generateOptionsAndCallback(options, callback);
      generatedParams.options.name = name;
      return wrapRequest('POST', '/1/boards', mergeOptions(this.queryOptions, generatedParams.options), generatedParams.callback);
    }
  }]);

  return Trellode;
})();

exports['default'] = Trellode;
module.exports = exports['default'];