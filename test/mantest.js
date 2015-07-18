var Trellode = require('../index.js');
var Settings = require('./settings.json');

var trello = new Trellode(Settings.trello_key, Settings.trello_token);

trello.getBoards(function(err, data){
	console.log(err);
	console.log(data);
});

trello.getBoards({filter: 'open'}).then(function(boards){
		trello.getListsOfBoard(boards[0].id).then(function(lists){
			trello.addCardToList(lists[0].id, 'TestCard1').then(function(card){
				console.log(card);
			});
		});
});

trello.checkItemOfChecklist('Salsa', '559c1d05776922c6b99e70e6').then(function(res){
    console.log(res);
});