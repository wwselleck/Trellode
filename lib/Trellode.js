var request = require('request').defaults({baseUrl: 'https://api.trello.com'});
var Promise = require('promise');


function sendRequest(endpoint, options){
	return new Promise((resolve, reject) => {
		request({
			uri: endpoint,
			method: options.method,
			qs: options.query,
			json: true
		}, function(err, response, body){
			if(err){ reject(err); }

			resolve(body);
		});
	});
}

export default class Trellode{
  constructor(key, token){
		this.key = key;
		this.token = token;
	}
  
  queryOptions(){
    return {key: this.key, token: this.token};
	}

	getBoards(memberId){
		let options = {method: 'GET', query: this.queryOptions()}
		return sendRequest('/1/members/' + memberId + '/boards', options);
	}

}
