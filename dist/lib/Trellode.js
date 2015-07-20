/** @module Trellode */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Net = require('./net.js');
var Util = require('./util.js');

var Trellode = (function () {
  /**
   * @module  Trellode
   * @constructs Trellode
   * @param  {string} key - Trello API key
   * @param  {string} token - Access token
   * @return {Trellode}
   */

  function Trellode(key, token) {
    _classCallCheck(this, Trellode);

    this.key = key;
    this.token = token;
    this.apiVersion = '1';
    console.log(this.apiVersion);
    this.net = new Net('https://api.trello.com/' + this.apiVersion);
  }

  _createClass(Trellode, [{
    key: 'queryOptions',
    value: function queryOptions() {
      return { key: this.key, token: this.token };
    }
  }, {
    key: 'getMemberByIdOrUsername',

    /*///////////////////////////////////////////////////
            __  __                _                   
           |  \/  |              | |                  
           | \  / | ___ _ __ ___ | |__   ___ _ __ ___ 
           | |\/| |/ _ \ '_ ` _ \| '_ \ / _ \ '__/ __|
           | |  | |  __/ | | | | | |_) |  __/ |  \__ \
           |_|  |_|\___|_| |_| |_|_.__/ \___|_|  |___/
                                    
     */ //////////////////////////////////////////////////

    /**
     * @memberof Trellode
     * @function getMemberByIdOrUsername
     * @param  {string} idOrUsername - The ID or Username of the member
     * @param  {object} [options]
     * @param  {Function} [callback]
     * @return {Promise|undefined}
     */
    value: function getMemberByIdOrUsername(memberIdOrUsername, options, callback) {
      var generatedParams = Util.generateOptionsAndCallback(options, callback);
      return this.net.request('GET', '/members/' + memberIdOrUsername, Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
    }
  }, {
    key: 'getBoards',

    //Shortcut for getting boards of member 'me'
    value: function getBoards(options, callback) {
      return this.getBoardsOfMember('me', options, callback);
    }
  }, {
    key: 'getBoardsOfMember',
    value: function getBoardsOfMember(memberId, options, callback) {
      var generatedParams = Util.generateOptionsAndCallback(options, callback);
      return this.net.request('GET', '/members/' + memberId + '/boards', Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
    }
  }, {
    key: 'getNotifications',

    //Shortcut for getting notifications of member 'me'
    value: function getNotifications(options, callback) {
      return this.getNotificationsOfMember('me', options, callback);
    }
  }, {
    key: 'getNotificationsOfMember',
    value: function getNotificationsOfMember(memberIdOrUsername, options, callback) {
      var generatedParams = Util.generateOptionsAndCallback(options, callback);
      return this.net.request('GET', '/members/' + memberIdOrUsername + '/notifications', Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
    }
  }, {
    key: 'getOrganizations',

    //Shortcut for getting boards of member 'me'
    value: function getOrganizations(options, callback) {
      return this.getOrganizationsOfMember('me', options, callback);
    }
  }, {
    key: 'getOrganizationsOfMember',
    value: function getOrganizationsOfMember(memberIdOrUsername, options, callback) {
      var generatedParams = Util.generateOptionsAndCallback(options, callback);
      return this.net.request('GET', '/members/' + memberIdOrUsername + '/organizations', Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
    }
  }, {
    key: 'createBoard',
    value: function createBoard(name, options, callback) {
      var generatedParams = Util.generateOptionsAndCallback(options, callback);
      generatedParams.options.name = name;
      return this.net.request('POST', '/boards', Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
    }
  }, {
    key: 'getListsOfBoard',

    /*///////////////////////////////////////////////////
            ____                      _     
           |  _ \                    | |    
           | |_) | ___   __ _ _ __ __| |___ 
           |  _ < / _ \ / _` | '__/ _` / __|
           | |_) | (_) | (_| | | | (_| \__ \
           |____/ \___/ \__,_|_|  \__,_|___/
                                    
     */ //////////////////////////////////////////////////

    value: function getListsOfBoard(boardId, options, callback) {
      var generatedParams = Util.generateOptionsAndCallback(options, callback);
      return this.net.request('GET', '/boards/' + boardId + '/lists', Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
    }
  }, {
    key: 'getCardsOfBoard',
    value: function getCardsOfBoard(boardId, options, callback) {
      var generatedParams = Util.generateOptionsAndCallback(options, callback);
      return this.net.request('GET', '/boards/' + boardId + '/cards', Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
    }
  }, {
    key: 'getOpenCardsOnBoard',
    value: function getOpenCardsOnBoard(boardId, options, callback) {
      return this.getCardsOfBoard(boardId, Util.mergeOptions(options, { filter: 'open' }), callback);
    }
  }, {
    key: 'getClosedCardsOnBoard',
    value: function getClosedCardsOnBoard(boardId, options, callback) {
      return this.getCardsOfBoard(boardId, Util.mergeOptions(options, { filter: 'closed' }), callback);
    }
  }, {
    key: 'getMembersOfBoard',
    value: function getMembersOfBoard(boardId, options, callback) {
      var generatedParams = Util.generateOptionsAndCallback(options, callback);
      return this.net.request('GET', '/boards/' + boardId + '/members', Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
    }
  }, {
    key: 'getLabelsOfBoard',
    value: function getLabelsOfBoard(boardId, options, callback) {
      var generatedParams = Util.generateOptionsAndCallback(options, callback);
      return this.net.request('GET', '/boards/' + boardId + '/labels', Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
    }
  }, {
    key: 'addListToBoard',
    value: function addListToBoard(boardId, name, options, callback) {
      var generatedParams = Util.generateOptionsAndCallback(options, callback);
      generatedParams.options.name = name;
      return this.net.request('POST', '/boards/' + boardId + '/lists', Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
    }
  }, {
    key: 'getListById',

    /*///////////////////////////////////////////////////
                _      _     _       
               | |    (_)   | |      
               | |     _ ___| |_ ___ 
               | |    | / __| __/ __|
               | |____| \__ \ |_\__ \
               |______|_|___/\__|___/
                                    
     */ //////////////////////////////////////////////////

    value: function getListById(listId, options, callback) {
      var generatedParams = Util.generateOptionsAndCallback(options, callback);
      return this.net.request('GET', '/lists/' + listId, Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
    }
  }, {
    key: 'getCardsOfList',
    value: function getCardsOfList(listId, options, callback) {
      var generatedParams = Util.generateOptionsAndCallback(options, callback);
      return this.net.request('GET', '/lists/' + listId + '/cards', Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
    }
  }, {
    key: 'addCardToList',
    value: function addCardToList(listId, name, options, callback) {
      var generatedParams = Util.generateOptionsAndCallback(options, callback);
      generatedParams.options.name = name;
      if (!generatedParams.options.due) {
        generatedParams.options.due = null;
      }
      return this.net.request('POST', '/lists/' + listId + '/cards', Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
    }
  }, {
    key: 'getCardById',

    /*///////////////////////////////////////////////////
                 _____              _     
                / ____|            | |    
               | |     __ _ _ __ __| |___ 
               | |    / _` | '__/ _` / __|
               | |___| (_| | | | (_| \__ \
                \_____\__,_|_|  \__,_|___/
                                                                            
     */ //////////////////////////////////////////////////

    value: function getCardById(cardId, options, callback) {
      var generatedParams = Util.generateOptionsAndCallback(options, callback);
      return this.net.request('GET', '/cards/' + cardId, Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
    }
  }, {
    key: 'getChecklistsOfCard',
    value: function getChecklistsOfCard(cardId, options, callback) {
      var generatedParams = Util.generateOptionsAndCallback(options, callback);
      return this.net.request('GET', '/cards/' + cardId + '/checklists', Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
    }
  }, {
    key: 'changeNameOfCard',
    value: function changeNameOfCard(cardId, name, options, callback) {
      var generatedParams = Util.generateOptionsAndCallback(options, callback);
      generatedParams.options.value = name;
      var url = ['/cards/', cardId, '/name'].join('');
      var reqParams = Util.mergeOptions(this.queryOptions(), generatedParams.options);
      return this.net.request('PUT', url, reqParams, generatedParams.callback);
    }
  }, {
    key: 'openCard',
    value: function openCard(cardId, callback) {
      var options = { value: false };
      return this.net.request('PUT', '/cards/' + cardId + '/closed', Util.mergeOptions(this.queryOptions(), options), callback);
    }
  }, {
    key: 'closeCard',
    value: function closeCard(cardId, callback) {
      var options = { value: true };
      return this.net.request('PUT', '/cards/' + cardId + '/closed', Util.mergeOptions(this.queryOptions(), options), callback);
    }
  }, {
    key: 'getChecklistById',

    /*///////////////////////////////////////////////////
       _____ _               _    _ _     _       
      / ____| |             | |  | (_)   | |      
     | |    | |__   ___  ___| | _| |_ ___| |_ ___ 
     | |    | '_ \ / _ \/ __| |/ / | / __| __/ __|
     | |____| | | |  __/ (__|   <| | \__ \ |_\__ \
      \_____|_| |_|\___|\___|_|\_\_|_|___/\__|___/
                                                                                                                               
    */ //////////////////////////////////////////////////

    value: function getChecklistById(checklistId, options, callback) {
      var generatedParams = Util.generateOptionsAndCallback(options, callback);
      return this.net.request('GET', '/checklists/' + checklistId, Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
    }
  }, {
    key: 'markChecklistItemAsComplete',

    // From what I can tell, Trello's API is a state of terrible where you need
    // to specify a cardId, listId, and checklistItemId to change the state
    // of a checklist item (https://trello.com/docs/api/card/index.html#put-1-cards-card-id-or-shortlink-checklist-idchecklist-checkitem-idcheckitem-state)
    // Opinion wanted: ordering of these parameters
    value: function markChecklistItemAsComplete(checkItemId, checklistId, cardId, options, callback) {
      var generatedParams = Util.generateOptionsAndCallback(options, callback);
      generatedParams.options.value = 'complete';
      return this.net.request('PUT', '/cards/' + cardId + '/checklist/' + checklistId + '/checkItem/' + checkItemId + '/state', Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
    }
  }, {
    key: 'markChecklistItemAsIncomplete',
    value: function markChecklistItemAsIncomplete(checkItemId, checklistId, cardId, options, callback) {
      var generatedParams = Util.generateOptionsAndCallback(options, callback);
      generatedParams.options.value = 'incomplete';
      return this.net.request('PUT', '/cards/' + cardId + '/checklist/' + checklistId + '/checkItem/' + checkItemId + '/state', Util.mergeOptions(this.queryOptions(), generatedParams.options), generatedParams.callback);
    }
  }]);

  return Trellode;
})();

exports['default'] = Trellode;
module.exports = exports['default'];