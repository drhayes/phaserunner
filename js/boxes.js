var constants = require('./constants');

module.exports = function(game) {
  var boxes = game.add.group();
  var one = boxes.create(200, game.world.height - 164, 'box');
  one.scale.setTo(6, 1);
  one.body.immovable = true;
  one.body.velocity.x = -60;
  console.log(one);
  one.events.onOutOfBounds.add(function (face, thisBody, bodyThatHitMe){ 
          one.body.velocity.x = - (one.body.velocity.x);
  });

  return {
    group: boxes,
    update: function() {

    }
  };
};
