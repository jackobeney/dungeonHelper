Meteor.publish('theEnemies', function() {
  return EnemyList.find()
});

Meteor.methods({
  'insertEnemyData': function(enemyName, enemyHealth, enemyStrength) {
    EnemyList.insert({
      name: enemyName,
      health: parseInt(enemyHealth),
      strength: parseInt(enemyStrength)
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