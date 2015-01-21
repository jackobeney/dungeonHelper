Meteor.subscribe('theEnemies');

Template.enemies.helpers({
  'enemy': function() {
    return EnemyList.find()
  },
  'selectedEnemyClass': function() {
    var enemyId = this._id;
    var selectedEnemy = Session.get('selectedEnemy');
    if(enemyId == selectedEnemy) {
      return "selected"
    }
  },
  'showEnemyModifiers' : function() {
    var enemyId = this._id;
    var selectedEnemy = Session.get('selectedEnemy');
    return enemyId == selectedEnemy
  },
  'showSelectedEnemy': function() {
    var selectedEnemy = Session.get('selectedEnemy');
    return EnemyList.findOne(selectedEnemy)
  }
});

Template.enemies.events({
  'click .enemy': function() {
    var enemyId = this._id;
    Session.set('selectedEnemy', enemyId);
  },
  'click .enemyIncrement': function(evt) {
    var selectedEnemy = Session.get('selectedEnemy');
    var selectedStat = evt.target.value;
    Meteor.call('modifyEnemyStat', selectedEnemy , selectedStat, 1);
  },
  'click .enemyDecrement': function(evt) {
    var selectedEnemy = Session.get('selectedEnemy');
    var selectedStat = evt.target.value;
    Meteor.call('modifyEnemyStat', selectedEnemy, selectedStat, -1);

    //Remove enemy once health is 0
    if(EnemyList.findOne(selectedEnemy).health == 0) {
      Meteor.call('removeEnemyData', selectedEnemy);
    }
  },
  'click .remove': function() {
    var selectedEnemy = Session.get('selectedEnemy');
    Meteor.call('removeEnemyData', selectedEnemy);
  }
});

Template.enemyMenu.events({
  'submit form': function(evt) {
    evt.preventDefault();
    var enemyName = evt.target.enemyName.value;
    var enemyHealth = evt.target.enemyHealth.value;
    var enemyStrength = evt.target.enemyStrength.value;
    Meteor.call('insertEnemyData', enemyName, enemyHealth, enemyStrength);
  }
});

Template.newEnemyModal.events({
  'submit form': function(evt) {
    evt.preventDefault();
    var enemyName = evt.target.enemyName.value;
    var enemyHealth = evt.target.enemyHealth.value;
    var enemyStrength = evt.target.enemyStrength.value;
    Meteor.call('insertEnemyData', enemyName, enemyHealth, enemyStrength);
  }
});