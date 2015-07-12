var Trellode = require('../index.js');
var Settings = require('./settings.json');

var trello = new Trellode(Settings.trello_key, Settings.trello_token);

console.log('getBoards with no callback');
console.log('Return type: ' + trello.getBoards('me').constructor.name);
console.log();

console.log('getBoards with callback');
console.log('Return type: ' + trello.getBoards('me', function(){}));
trello.getBoards('me', function(boards){
	console.log(boards);
});
console.log();

console.log('createBoard');
console.log('Return type: ' + trello.createBoard);