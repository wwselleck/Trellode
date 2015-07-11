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

function wrapRequest(endpoint, options, cb){
  if(cb){
    sendRequest(endpoint, options).then(res => {
      cb(res);
    });
  }
  else{
    return sendRequest(endpoint, options);
  }
}

export default class Trellode{
  constructor(key, token){
    this.key = key;
    this.token = token;
  }
  
  queryOptions(){
    return {key: this.key, token: this.token};
  }

  getBoards(memberId, cb){
    let options = {method: 'GET', query: this.queryOptions()}
    return wrapRequest('/1/members/' + memberId + '/boards', options, cb);
  }

}
