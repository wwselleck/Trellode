'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var request = require('request').defaults({ baseUrl: 'https://api.trello.com' });
var Promise = require('promise');

function sendRequest(endpoint, options) {
	return new Promise(function (resolve, reject) {
		request({
			uri: endpoint,
			method: options.method,
			qs: options.query,
			json: true
		}, function (err, response, body) {
			if (err) {
				reject(err);
			}

			resolve(body);
		});
	});
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
		value: function getBoards(memberId) {
			var options = { method: 'GET', query: this.queryOptions() };
			return sendRequest('/1/members/' + memberId + '/boards', options);
		}
	}]);

	return Trellode;
})();

exports['default'] = Trellode;
module.exports = exports['default'];