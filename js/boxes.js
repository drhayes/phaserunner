var constants = require('./constants');

module.exports = function(game) {
  var boxes = game.add.group();
  boxes.create(0, 0, 'box192', null, false);
  boxes.create(0, 0, 'box160', null, false);
  boxes.create(0, 0, 'box128', null, false);
  boxes.create(0, 0, 'box96', null, false);
  boxes.create(0, 0, 'box64', null, false);
  boxes.forEach(function(box) {
    box.events.onOutOfBounds.add(function() {
      console.log('out of bounds');
      addABox();
    });
  });

  function addABox() {
    var one = boxes.getFirstDead();
    var width = one.key.replace(/box/, '');
    game.physics.enable(one, Phaser.Physics.ARCADE);
    one.body.immovable = true;
    one.checkWorldBounds = true;
    one.outOfBoundsKill = true;
    var height = game.world.randomY * 0.6;
    one.reset(game.world.width - 1, height, 1000);
  }

  addABox();

  return {
    group: boxes,
    update: function() {
      boxes.setAll('body.velocity.x', -100, true, false, 0);
    }
  };
};
