Meteor.publish('theEnemies', function() {
  return EnemyList.find()
});

Meteor.methods({
  'insertEnemyData': function(enemyName, enemyHealth, enemyStrength) {
    var health = parseInt(enemyHealth);
    var strength = parseInt(enemyStrength);
    EnemyList.insert({
      name: enemyName,
      health: health,
      strength: strength
    });
  },
  'removeEnemyData': function(selectedEnemy) {
    EnemyList.remove(selectedEnemy);
  },
  'modifyEnemyStat': function(selectedEnemy, selectedStat, amount) {
    var query = {};
    query[selectedStat] = amount;
    EnemyList.update(selectedEnemy, {$inc: query });
  }
});