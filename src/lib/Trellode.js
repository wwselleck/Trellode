/** @module Trellode */

var Net = require('./net.js');
var Util = require('./util.js');

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
    this.apiVersion = '1';
    console.log(this.apiVersion);
    this.net = new Net('https://api.trello.com/' + this.apiVersion);
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
  getMemberByIdOrUsername(memberIdOrUsername, options, callback){
    let generatedParams = Util.generateOptionsAndCallback(options, callback);
    return this.net.request('GET', '/members/' + memberIdOrUsername, Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
  }

  //Shortcut for getting boards of member 'me'
  getBoards(options, callback){
    return this.getBoardsOfMember('me', options, callback);
  }

  getBoardsOfMember(memberId, options, callback){
    let generatedParams = Util.generateOptionsAndCallback(options, callback);
    return this.net.request('GET', '/members/' + memberId + '/boards', Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
  }

  //Shortcut for getting notifications of member 'me'
  getNotifications(options, callback){
    return this.getNotificationsOfMember('me', options, callback);
  }

  getNotificationsOfMember(memberIdOrUsername, options, callback){
    let generatedParams = Util.generateOptionsAndCallback(options, callback);
    return this.net.request('GET', '/members/' + memberIdOrUsername + '/notifications', Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
  }

  //Shortcut for getting boards of member 'me'
  getOrganizations(options, callback){
    return this.getOrganizationsOfMember('me', options, callback);
  }

  getOrganizationsOfMember(memberIdOrUsername, options, callback){
    let generatedParams = Util.generateOptionsAndCallback(options, callback);
    return this.net.request('GET', '/members/' + memberIdOrUsername + '/organizations', Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
  }

  createBoard(name, options, callback ){
    let generatedParams = Util.generateOptionsAndCallback(options, callback);
    generatedParams.options.name = name;
    return this.net.request('POST', '/boards', Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
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
    let generatedParams = Util.generateOptionsAndCallback(options, callback);
    return this.net.request('GET', '/boards/' + boardId + '/lists', Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
  }

  getCardsOfBoard(boardId, options, callback){
    let generatedParams = Util.generateOptionsAndCallback(options, callback);
    return this.net.request('GET', '/boards/' + boardId + '/cards', Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
  }

  getOpenCardsOnBoard(boardId, options, callback){
    return this.getCardsOfBoard(boardId, Util.mergeOptions(options, {filter: 'open'}), callback);
  }

  getClosedCardsOnBoard(boardId, options, callback){
    return this.getCardsOfBoard(boardId, Util.mergeOptions(options, {filter: 'closed'}), callback);
  }

  getMembersOfBoard(boardId, options, callback){
    let generatedParams = Util.generateOptionsAndCallback(options, callback);
    return this.net.request('GET', '/boards/' + boardId + '/members', Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
  }

  getLabelsOfBoard(boardId, options, callback){
    let generatedParams = Util.generateOptionsAndCallback(options, callback);
    return this.net.request('GET', '/boards/' + boardId + '/labels', Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
  }


  addListToBoard(boardId, name, options, callback){
    let generatedParams = Util.generateOptionsAndCallback(options, callback);
    generatedParams.options.name = name;
    return this.net.request('POST', '/boards/' + boardId + '/lists', Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
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
    let generatedParams = Util.generateOptionsAndCallback(options, callback);
    return this.net.request('GET', '/lists/' + listId, Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
  }

  getCardsOfList(listId, options, callback){
    let generatedParams = Util.generateOptionsAndCallback(options, callback);
    return this.net.request('GET', '/lists/' + listId + '/cards', Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
  }

  addCardToList(listId, name, options, callback){
    let generatedParams = Util.generateOptionsAndCallback(options, callback);
    generatedParams.options.name = name;
    if(!generatedParams.options.due){
      generatedParams.options.due = null;
    }
    return this.net.request('POST', '/lists/' + listId + '/cards', Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
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
    let generatedParams = Util.generateOptionsAndCallback(options, callback);
    return this.net.request('GET', '/cards/' + cardId, Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
  }

  getChecklistsOfCard(cardId, options, callback){
    let generatedParams = Util.generateOptionsAndCallback(options, callback);
    return this.net.request('GET', '/cards/' + cardId + '/checklists', Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
  }

  changeNameOfCard(cardId, name, options, callback){
    let generatedParams = Util.generateOptionsAndCallback(options, callback);
    generatedParams.options.value = name;
    let url = ['/cards/', cardId, '/name'].join('');
    var reqParams = Util.mergeOptions(this.queryOptions(), generatedParams.options);
    return this.net.request('PUT', url, reqParams, generatedParams.callback);
  }

  openCard(cardId, callback){
    let options = {value: false};
    return this.net.request('PUT', '/cards/' + cardId + '/closed', Util.mergeOptions(this.queryOptions(), options), callback);
  }

  closeCard(cardId, callback){
    let options = {value: true};
    return this.net.request('PUT', '/cards/' + cardId + '/closed', Util.mergeOptions(this.queryOptions(), options), callback);
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
    let generatedParams = Util.generateOptionsAndCallback(options, callback);
    return this.net.request('GET', '/checklists/' + checklistId, Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
  }

  // From what I can tell, Trello's API is a state of terrible where you need
  // to specify a cardId, listId, and checklistItemId to change the state
  // of a checklist item (https://trello.com/docs/api/card/index.html#put-1-cards-card-id-or-shortlink-checklist-idchecklist-checkitem-idcheckitem-state)
  // Opinion wanted: ordering of these parameters
  markChecklistItemAsComplete(checkItemId, checklistId, cardId, options, callback){
    let generatedParams = Util.generateOptionsAndCallback(options, callback);
    generatedParams.options.value = 'complete';
    return this.net.request('PUT', '/cards/' + cardId + '/checklist/' + checklistId + '/checkItem/' + checkItemId + '/state', Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
  }

  markChecklistItemAsIncomplete(checkItemId, checklistId, cardId, options, callback){
    let generatedParams = Util.generateOptionsAndCallback(options, callback);
    generatedParams.options.value = 'incomplete';
    return this.net.request('PUT', '/cards/' + cardId + '/checklist/' + checklistId + '/checkItem/' + checkItemId + '/state', Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
  }
}