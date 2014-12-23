Meteor.subscribe('theItems');

// Template.items.helpers({

//  'item': function() {
//     return ItemList.find()
//   }

// });

Template.newItemModal.events({
  'submit form': function(evt) {
    evt.preventDefault();
    var itemName = evt.target.itemName.value;
    var itemDamage = evt.target.itemDamage.value;
    var itemBonus = evt.target.itemBonus.value;
    var buyValue = evt.target.buyValue.value;
    var sellValue = evt.target.sellValue.value;
    Meteor.call('insertItemData', itemName, itemDamage, itemBonus, buyValue, sellValue);
  }
});

// Template.newItemModal.events({
//   'submit form': function(evt) {
//     evt.preventDefault();
//     var enemyName = evt.target.enemyName.value;
//     var enemyHealth = evt.target.enemyHealth.value;
//     var enemyStrength = evt.target.enemyStrength.value;
//     Meteor.call('insertEnemyData', enemyName, enemyHealth, enemyStrength);
//   }
// });