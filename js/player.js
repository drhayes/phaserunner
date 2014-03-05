var constants = require('./constants');

module.exports = function(game) {
  var player = game.add.sprite(game.world.width / 6 - 16, 200, 'player');
  player.body.bounce.y = .1;
  player.body.gravity.y = constants.GRAVITY;
  player.body.collideWorldBounds = true;
  cursors = game.input.keyboard.createCursorKeys();

  deathChunksEmitter = game.add.emitter(player.x, player.y, 200);
  deathChunksEmitter.makeParticles('chunks', [0]);
  deathChunksEmitter.minParticleSpeed.setTo(-200, 100);
  deathChunksEmitter.maxParticleSpeed.setTo(200, -400);
  deathChunksEmitter.gravity = constants.GRAVITY / 2;
  deathChunksEmitter.bounce.setTo(0.5, 0.5);
  deathChunksEmitter.angularDrag = 30;

  player.events.onKilled.add(function() {
    deathChunksEmitter.x = player.center.x;
    deathChunksEmitter.y = player.center.y;
    deathChunksEmitter.start(true, 1500, 15, 40);
  });

  return {
    sprite: player,
    update: function() {
      this.sprite.body.acceleration.y = 0;
      if (!cursors.up.isDown && this.sprite.body.velocity.y < -constants.JUMP_CLAMP) {
        this.sprite.body.velocity.y = -constants.JUMP_CLAMP;
      }
      if (cursors.up.isDown && this.sprite.body.touching.down) {
        this.sprite.isAboutToJump = true;
      }
      if (this.sprite.isAboutToJump) {
        game.sound.play('jump', 1);
        this.sprite.body.acceleration.y = -constants.JUMP_ACCEL;
        this.sprite.isAboutToJump = false;
      }

      if (cursors.down.isDown) {
        this.sprite.damage(5000);
      }
    }
  };
};
