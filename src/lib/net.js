//Net Library

var request = require('request');

/**
 * Send a request to the Trello API
 * @private
 * @param  {string} method - HTTP Method
 * @param  {string} endpoint - Endpoint for API
 * @param  {options} options - Options for request
 * @return {Promise} 
 */
function sendRequest(method, endpoint, options){
  return new Promise((resolve, reject) => {
    request({
    uri: endpoint,
    method: method,
    qs: options,
    json: true
  }, function(err, response, body){
    if(err){ reject(err); }
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
function wrapRequest(method, endpoint, options, callback){
  if(callback){
    sendRequest(method, endpoint, options).then((res) => {
      callback(null, res);
    }).catch(error => {
    	console.log(error);
    });
  }
  else{
    return sendRequest(method, endpoint, options);
  }
}

export default class Net{

	constructor(baseUrl){
		this.baseUrl = baseUrl;
		request = request.defaults({baseUrl: baseUrl});
	}

	request(method, endpoint, options, callback){
		return wrapRequest(method, endpoint, options, callback);
	}

}