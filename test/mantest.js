var Trellode = require('../index.js');
var Settings = require('./settings.json');

var trello = new Trellode(Settings.trello_key, Settings.test_trello_token);


trello.getBoards({filter: 'open'}).then(function(boards){
		trello.getListsOfBoard(boards[0].id).then(function(lists){
			var list = lists[1];
			console.log(list);
			trello.getCardsOfList(list.id).then(function(cards){
				console.log(cards);
				var card = cards[0];
				console.log(card.id);
				trello.changeNameOfCard(card.id, 'TEST NAME CHANGE', function(res){
					console.log(res);
				});
			});
		});
});

/* mark item as complete
trello.getBoards({filter: 'open'}).then(function(boards){
		trello.getListsOfBoard(boards[0].id).then(function(lists){
			var list = lists[1];
			trello.getCardsOfList(list.id).then(function(cards){
				var card = cards[0];
				trello.getChecklistsOfCard(card.id).then(function(checklists){
					var checklist = checklists[0];
					console.log(card);
					console.log(checklist);
					console.log(checklist.checkItems[0].id);
					trello.completeChecklistItem(checklist.checkItems[0].id, checklist.id, card.id).then(function(res){
						console.log(res);
					});
				});	
			});
		});
});
*/