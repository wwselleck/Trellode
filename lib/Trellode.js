/** @module Trellode */
var request = require('request').defaults({baseUrl: 'https://api.trello.com'});
var Promise = require('promise');

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
    sendRequest(method, endpoint, options).then(callback);
  }
  else{
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
function mergeOptions(obj1, obj2){
  var ret = {};
  for (let attrname in obj1) { ret[attrname] = obj1[attrname]; }
  for (let attrname in obj2) { ret[attrname] = obj2[attrname]; }
  return ret;
}

/**
 * @private
 * @param  {object}
 * @param  {Function}
 * @return {object} Object with properties (something, probably a JSDoc way to do this)
 */
function generateOptionsAndCallback(options, callback){
  let ret = {};

  if(typeof options === 'object'){
    ret.options = options;
    if(callback){
      ret.callback = callback;
    }
  }
  else{
    if(typeof options === 'function'){
      ret.callback = options;
    }
    ret.options = {};
  }
  return ret;
}


export default class Trellode{
  /**
   * @module  Trellode
   * @constructs Trellode
   * @param  {string} key - Trello API key
   * @param  {string} token - Access token
   * @return {Trellode}
   */
  constructor(key, token){
    this.key = key;
    this.token = token;
  }

  queryOptions(){
    return {key: this.key, token: this.token};
  }

  /*///////////////////////////////////////////////////
          __  __                _                   
         |  \/  |              | |                  
         | \  / | ___ _ __ ___ | |__   ___ _ __ ___ 
         | |\/| |/ _ \ '_ ` _ \| '_ \ / _ \ '__/ __|
         | |  | |  __/ | | | | | |_) |  __/ |  \__ \
         |_|  |_|\___|_| |_| |_|_.__/ \___|_|  |___/
                                  
   *///////////////////////////////////////////////////
  
  /**
   * @memberof Trellode
   * @function getMemberByIdOrUsername
   * @param  {string} idOrUsername - The ID or Username of the member
   * @param  {object} [options]
   * @param  {Function} [callback]
   * @return {Promise|undefined}
   */
  getMemberByIdOrUsername(idOrUsername, options, callback){
    let generatedParams = generateOptionsAndCallback(options, callback);
    return wrapRequest('GET', '/1/members/' + idOrUsername, mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
  }

  getBoards(options, callback){
    return this.getBoardsOfMember('me', options, callback);
  }

  getBoardsOfMember(memberId, options, callback){
    let generatedParams = generateOptionsAndCallback(options, callback);
    return wrapRequest('GET', '/1/members/' + memberId + '/boards', mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
  }

  createBoard(name, options, callback ){
    let generatedParams = generateOptionsAndCallback(options, callback);
    generatedParams.options.name = name;
    return wrapRequest('POST', '/1/boards', mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
  }

  /*///////////////////////////////////////////////////
          ____                      _     
         |  _ \                    | |    
         | |_) | ___   __ _ _ __ __| |___ 
         |  _ < / _ \ / _` | '__/ _` / __|
         | |_) | (_) | (_| | | | (_| \__ \
         |____/ \___/ \__,_|_|  \__,_|___/
                                  
   *///////////////////////////////////////////////////

  getListsOfBoard(boardId, options, callback){
    let generatedParams = generateOptionsAndCallback(options, callback);
    return wrapRequest('GET', '/1/boards/' + boardId + '/lists', mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
  }

  getCardsOfBoard(boardId, options, callback){
    let generatedParams = generateOptionsAndCallback(options, callback);
    return wrapRequest('GET', '/1/boards/' + boardId + '/cards', mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
  }

  getMembersOfBoard(boardId, options, callback){
    let generatedParams = generateOptionsAndCallback(options, callback);
    return wrapRequest('GET', '/1/boards/' + boardId + '/members', mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
  }

  getLabelsOfBoard(boardId, options, callback){
    let generatedParams = generateOptionsAndCallback(options, callback);
    return wrapRequest('GET', '/1/boards/' + boardId + '/labels', mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
  }


  addListToBoard(boardId, name, options, callback){
    let generatedParams = generateOptionsAndCallback(options, callback);
    generatedParams.options.name = name;
    return wrapRequest('POST', '/1/boards/' + boardId + '/lists', mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
  }

  /*///////////////////////////////////////////////////
              _      _     _       
             | |    (_)   | |      
             | |     _ ___| |_ ___ 
             | |    | / __| __/ __|
             | |____| \__ \ |_\__ \
             |______|_|___/\__|___/
                                  
   *///////////////////////////////////////////////////
  
  getListById(listId, options, callback){
    let generatedParams = generateOptionsAndCallback(options, callback);
    return wrapRequest('GET', '/1/lists/' + listId, mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
  }

  getCardsOfList(listId, options, callback){
    let generatedParams = generateOptionsAndCallback(options, callback);
    return wrapRequest('GET', '/1/lists/' + listId + '/cards', mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
  }

  addCardToList(listId, name, options, callback){
    let generatedParams = generateOptionsAndCallback(options, callback);
    generatedParams.options.name = name;
    if(!generatedParams.options.due){
      generatedParams.options.due = null;
    }
    return wrapRequest('POST', '/1/lists/' + listId + '/cards', mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
  }
  
  /*///////////////////////////////////////////////////
               _____              _     
              / ____|            | |    
             | |     __ _ _ __ __| |___ 
             | |    / _` | '__/ _` / __|
             | |___| (_| | | | (_| \__ \
              \_____\__,_|_|  \__,_|___/
                                                                          
   *///////////////////////////////////////////////////
  
  getCardById(cardId, options, callback){
    let generatedParams = generateOptionsAndCallback(options, callback);
    return wrapRequest('GET', '/1/cards/' + cardId, mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
  }

  getChecklistsOnCard(cardId, options, callback){
    let generatedParams = generateOptionsAndCallback(options, callback);
    return wrapRequest('GET', '/1/cards/' + cardId + '/checklists', mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
  }

  openCard(cardId, callback){
    let options = {value: false};
    return wrapRequest('PUT', '/1/cards/' + cardId + '/closed', mergeOptions(this.queryOptions(), options), callback);
  }

  closeCard(cardId, callback){
    let options = {value: true};
    return wrapRequest('PUT', '/1/cards/' + cardId + '/closed', mergeOptions(this.queryOptions(), options), callback);
  }

    /*///////////////////////////////////////////////////
       _____ _               _    _ _     _       
      / ____| |             | |  | (_)   | |      
     | |    | |__   ___  ___| | _| |_ ___| |_ ___ 
     | |    | '_ \ / _ \/ __| |/ / | / __| __/ __|
     | |____| | | |  __/ (__|   <| | \__ \ |_\__ \
      \_____|_| |_|\___|\___|_|\_\_|_|___/\__|___/
                                                                                                                               
   *///////////////////////////////////////////////////
  
  getChecklistById(checklistId, options, callback){    
    let generatedParams = generateOptionsAndCallback(options, callback);
    return wrapRequest('GET', '/1/checklists/' + checklistId, mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
  }

}
