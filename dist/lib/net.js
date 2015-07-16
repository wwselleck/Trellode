//Net Library

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var request = require('request');

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
  if (callback) {
    sendRequest(method, endpoint, options).then(function (res) {
      callback(null, res);
    })['catch'](function (error) {
      console.log(error);
    });
  } else {
    return sendRequest(method, endpoint, options);
  }
}

var Net = (function () {
  function Net(baseUrl) {
    _classCallCheck(this, Net);

    this.baseUrl = baseUrl;
    request = request.defaults({ baseUrl: baseUrl });
  }

  _createClass(Net, [{
    key: 'request',
    value: function request(method, endpoint, options, callback) {
      return wrapRequest(method, endpoint, options, callback);
    }
  }]);

  return Net;
})();

exports['default'] = Net;
module.exports = exports['default'];