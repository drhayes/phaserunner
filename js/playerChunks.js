var constants = require('./constants');

module.exports = function(game) {
  var chunks = game.add.emitter(0, 0, 200);
  chunks.makeParticles('chunks', [0]);
  chunks.minParticleSpeed.setTo(-200, 100);
  chunks.maxParticleSpeed.setTo(200, -400);
  chunks.gravity = constants.GRAVITY / 2;
  chunks.bounce.setTo(0.5, 0.5);
  chunks.angularDrag = 30;

  return {
    emitter: chunks,
    blowChunks: function(player) {
      chunks.x = player.center.x;
      chunks.y = player.center.y;
      chunks.start(true, 1500, 15, 40);
    }
  };

};
