var constants = require('./constants');

module.exports = function(game) {
  var boxes = game.add.group();
  boxes.create(0, 0, 'box192', null, false);
  boxes.create(0, 0, 'box160', null, false);
  boxes.create(0, 0, 'box128', null, false);
  boxes.create(0, 0, 'box96', null, false);
  boxes.create(0, 0, 'box64', null, false);
 

  function addABox() {
    var one = boxes.getFirstDead();
    var width = one.key.replace(/box/, '');
    game.physics.enable(one, Phaser.Physics.ARCADE);
    one.body.immovable = true;
    one.checkWorldBounds = true;
    one.outOfBoundsKill = true;
    var height = ((Math.round(Math.random() * 6) + 2) * 32) + 1;
    one.reset(game.world.width - width, game.world.height - height, 1000);
  }

  addABox();

  return {
    group: boxes,
    update: function() {
      boxes.setAll('body.velocity.x', -100, true, false, 0);
    }
  };
};
