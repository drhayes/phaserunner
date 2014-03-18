var constants = require('./constants');

module.exports = function(game) {
  var boxes = game.add.group();
  boxes.create(0, 0, 'box1', null, false);
  boxes.create(0, 0, 'box2', null, false);
  boxes.create(0, 0, 'box3', null, false);
  boxes.create(0, 0, 'box4', null, false);
  boxes.create(0, 0, 'box5', null, false);
 

  function addABox() {
    var one = boxes.getFirstDead();
    var width = one.key.replace(/box/, '') * 32;
    game.physics.enable(one, Phaser.Physics.ARCADE);
    one.exists = true;
    one.body.immovable = true;
    one.body.rebound = false;
    one.checkWorldBounds = true;
    one.outOfBoundsKill = true;
    var height = ((Math.round(Math.random() * 6) + 2) * 32) + 1;
    one.reset(game.world.width - width, game.world.height - height, 1000);
    one.events.onOutOfBounds.add(function (){ addABox(); });
  }

  addABox();

  return {
    group: boxes,
    update: function() {
      boxes.setAll('body.velocity.x', -100, true, false, 0);
    }
  };
};
