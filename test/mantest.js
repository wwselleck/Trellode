var Trellode = require('../index.js');
var Settings = require('./settings.json');

var trello = new Trellode(Settings.trello_key, Settings.trello_token);

console.log('getBoards with no callback');
console.log(trello.getBoards('me').constructor.name);

console.log('getBoards with callback');
console.log(trello.getBoards('me', function(){}));