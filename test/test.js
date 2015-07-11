var Trellode = require('../index.js');
var Settings = require('./settings.json');

var trello = new Trellode(Settings.trello_key, Settings.trello_token);

trello.getBoards('me').then(function(boards){
	console.log(boards);
});