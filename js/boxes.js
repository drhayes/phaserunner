var constants = require('./constants');

module.exports = function(game) {
  var boxes = game.add.group();
  var box = boxes.create(game.world.width - 40, 0, 'box');
  box.body.velocity.x = -100;
  box.body.gravity.y = constants.GRAVITY;
  box.body.bounce.y = .2;

  return {
    group: boxes,
    update: function() {

    }
  };
};
