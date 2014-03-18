var constants = require('./constants');

module.exports = function(game) {
  var boxes = game.add.group();
  var one = boxes.create(200, game.world.height - 164, 'box');
  game.physics.enable(one, Phaser.Physics.ARCADE);
  one.body.immovable = true;
  one.body.rebound = false;
  var velocity = -50
  one.checkWorldBounds = true;
  one.events.onOutOfBounds.add(function (face, thisBody, bodyThatHitMe){
    console.log("I'm out of bounds");
    velocity = -velocity;
  });

  one.body.collideCallback = function() {
    console.log("hit!");
  }

  return {
    group: boxes,
    update: function() {
      one.body.velocity.x = velocity;
    }
  };
};
