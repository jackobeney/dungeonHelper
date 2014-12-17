Meteor.publish('thePlayers', function() {
  return PlayerList.find()
});

Meteor.methods({
  'insertPlayerData': function(playerName, playerHealth, playerStrength) {
    var health = parseInt(playerHealth);
    var strength = parseInt(playerStrength);
    PlayerList.insert({
      name: playerName,
      health: health,
      strength: strength
    });
  },
  'removePlayerData': function(selectedPlayer) {
    PlayerList.remove(selectedPlayer);
  },
  'modifyPlayerStat': function(selectedPlayer, selectedStat, amount) {
    var query = {};
    query[selectedStat] = amount;
    PlayerList.update(selectedPlayer, {$inc: query });
  }
});