var Trellode = require('../index.js');
var Settings = require('./settings.json');

var trello = new Trellode(Settings.trello_key, Settings.trello_token);

trello.getBoards({filter: 'open'}).then(function(boards){
		trello.getListsOfBoard(boards[0].id).then(function(lists){
			trello.addCardToList(lists[0].id, 'TestCard1').then(function(card){
				console.log(card);
			})
		});
});