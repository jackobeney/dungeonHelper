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
  'dungeonMaster': function() {
    console.log("hello");
    return this.Accounts.connection._userId == "ejXnEhiTn66HsAvkB";
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
  },
  'click .itemStats' : function(evt){
    if( $("#"+this._id+"Stats").is(":hidden") ) {
        $("#"+this._id+"Stats").slideDown("fast")
    } else {
      $("#"+this._id+"Stats").slideUp("fast");
    }
  }
});
