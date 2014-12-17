Meteor.subscribe('thePlayers');

var i = 1;

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
  }
});

Template.players.events({
  'click .player': function() {
    var playerId = this._id;
    Session.set('selectedPlayer', playerId);
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
  }
});

// Template.addPlayer.events({
//   'submit form': function(evt) {
//     evt.preventDefault();
//     var playerName = evt.target.playerName.value;
//     var playerHealth = evt.target.playerHealth.value;
//     var playerStrength = evt.target.playerStrength.value;
//     Meteor.call('insertPlayerData', playerName, playerHealth, playerStrength);
//   }
// });