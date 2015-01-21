Meteor.publish('theItems', function() {
  return ItemList.find()
});

Meteor.methods({
  // 'insertItemData': function(playerName, itemName, itemDamage, itemBonus, buyValue, sellValue) {
  //   ItemList.insert({
  //     player: playerName,
  //     name: itemName,
  //     damage: itemDamage,
  //     bonus: itemBonus,
  //     buy: parseInt(buyValue),
  //     sell: parseInt(sellValue)
  //   });
  // },
  'removeItemData': function(selectedItem) {
    ItemList.remove(selectedItem);
  },
  'modifyItemStat': function(selectedItem, selectedStat, amount) {
    var query = {};
    query[selectedStat] = amount;
    ItemList.update(selectedItem, {$inc: query });
  }
});