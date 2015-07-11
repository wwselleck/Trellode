var Trellode = require('../index.js');
var Settings = require('./settings.json');

var trello = new Trellode(Settings.trello_key, Settings.trello_token);
var assert = require("assert")

function getConstructorName(obj){
	return obj.constructor.name;
}

describe('Trellode', function() {
  describe('#getBoards(no callback)', function () {
    it('should return Promise when callback not defined', function () {
      assert.equal('Promise', getConstructorName(trello.getBoards('me')));
    });
  });
  describe('#getBoards(with callback)', function () {
    it('should return Promise when callback not defined', function () {
      assert.equal('undefined', getConstructorName(trello.getBoards('me', function(res){return res})));
    });
  });
});