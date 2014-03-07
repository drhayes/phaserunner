var constants = require('./constants');

module.exports = function(game) {
  var boxes = game.add.group();
  var one = boxes.create(200, game.world.height - 164, 'box');
  one.scale.setTo(6, 1);
  one.body.immovable = true;
  one.body.rebound = false;
  var velocity = -50
  console.log(one);
  one.events.onOutOfBounds.add(function (face, thisBody, bodyThatHitMe){ 
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
