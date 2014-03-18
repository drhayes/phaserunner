var constants = require('./constants');

module.exports = function(game, chunks) {
  var player = game.add.sprite(game.world.width / 6 - 16, 200, 'player');
  game.physics.enable(player, Phaser.Physics.ARCADE);
  player.body.bounce.y = .1;
  player.body.gravity.y = constants.GRAVITY;
  player.body.collideWorldBounds = true;
  cursors = game.input.keyboard.createCursorKeys();

  player.events.onKilled.add(chunks.blowChunks.bind(chunks));

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
      if (cursors.left.isDown) {
        this.sprite.body.velocity.x = -100
      } else if (cursors.right.isDown) {
        this.sprite.body.velocity.x = 100
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
