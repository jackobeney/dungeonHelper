Meteor.subscribe('thePlayers');

Template.players.helpers({

  'player': function() {
    return PlayerList.find({}, {sort: {name: 1} })
  },
  'selectedPlayerClass': function() {
    var playerId = this._id;
    var selectedPlayer = Session.get('selectedPlayer');
    if(playerId == selectedPlayer) {
      return "selected"
    }
  },
  'showPlayerModifiers' : function() {
    var playerId = this._id;
    var selectedPlayer = Session.get('selectedPlayer');
    return playerId == selectedPlayer
  },
  'showSelectedPlayer': function() {
    var selectedPlayer = Session.get('selectedPlayer');
    return PlayerList.findOne(selectedPlayer)
  },
  'showItemModifiers' : function() {
    var itemId = this._id;
    var selectedItem = Session.get('selectedItem');
    return itemId == selectedItem
  },
  'dungeonMaster': function() {
    console.log(window.Accounts.connection._userId);
    // return this.Accounts.connection._userId == "ejXnEhiTn66HsAvkB";
  }
});

Template.existingItemModal.helpers({
  'player': function() {
    return PlayerList.find({}, {sort: {name: 1} })
  }
});

Template.players.events({

  'click .player': function() {
    var playerId = this._id;
    Session.set('selectedPlayer', playerId);
  },
  'click .item': function() {
    var itemId = this._id;
    var itemValue = this.sell;
    Session.set('selectedItem', itemId);
    Session.set('selectedItemValue', itemValue);
  },
  'click .playerIncrement': function(evt) {
    var selectedPlayer = Session.get('selectedPlayer');
    var selectedStat = evt.target.value;
    Meteor.call('modifyPlayerStat', selectedPlayer, selectedStat, 1);
  },
  'click .playerDecrement': function(evt) {
    var selectedPlayer = Session.get('selectedPlayer');
    var selectedStat = evt.target.value;
    Meteor.call('modifyPlayerStat', selectedPlayer, selectedStat, -1);
  },
  'click .remove': function() {
    var selectedItem = Session.get('selectedItem');
    var selectedPlayer = Session.get('selectedPlayer');
    Meteor.call('removeItemData', selectedItem, selectedPlayer);
  },
  'click .sellItem': function() {
    var selectedItem = Session.get('selectedItem');
    var selectedItemValue = Session.get('selectedItemValue');
    var selectedPlayer = Session.get('selectedPlayer');
    Meteor.call('sellItem', selectedItem, selectedItemValue, selectedPlayer);
  }
});

Template.newItemModal.events({
  'submit form': function(evt) {
    evt.preventDefault();
    var playerName = evt.target.playerName.value;
    var itemId = evt.target.itemId.value;
    var itemName = evt.target.itemName.value;
    var itemDamage = evt.target.itemDamage.value;
    var itemBonus = evt.target.itemBonus.value;
    var buyValue = evt.target.buyValue.value;
    var sellValue = evt.target.sellValue.value;
    Meteor.call('insertItemData', playerName, itemId, itemName, itemDamage, itemBonus, buyValue, sellValue);
  }
});

Template.existingItemModal.events({
  'submit form': function(evt) {
    evt.preventDefault();
    var playerName = evt.target.playerName.value;
    var itemId = evt.target.itemId.value;
    var itemName = evt.target.itemName.value;
    var itemDamage = evt.target.itemDamage.value;
    var itemBonus = evt.target.itemBonus.value;
    var buyValue = evt.target.buyValue.value;
    var sellValue = evt.target.sellValue.value;
    Meteor.call('insertItemData', playerName, itemId, itemName, itemDamage, itemBonus, buyValue, sellValue);
  }
});
