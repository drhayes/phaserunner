var constants = require('./constants');

module.exports = function(game) {
  var chunks = game.add.emitter(0, 0, 200);
  chunks.makeParticles('chunks', [0]);
  chunks.setXSpeed(-200, 200);
  chunks.setYSpeed(-400, 100);
  chunks.gravity = constants.GRAVITY / 2;

  Object.defineProperty(chunks, 'bounce', {
    get: function() {
      return {
        x: 0,
        y: Math.random() * 0.7
      }
    }
  });

  var oldUpdate = chunks.update;
  chunks.update = function() {
    oldUpdate.call(chunks);
    chunks.forEachAlive(function(chunk) {
      chunk.alpha = game.math.clamp(chunk.lifespan / 1000, 0, 1)
    });
  };

  return {
    emitter: chunks,
    blowChunks: function(player) {
      chunks.x = player.body.x;
      chunks.y = player.body.y;
      chunks.width = player.body.width;
      chunks.height = player.body.height;
      chunks.start(true, 2000, 0, 400);
    }
  };

};
