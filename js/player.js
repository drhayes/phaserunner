var constants = require('./constants');

module.exports = function(game) {
  var player = game.add.sprite(game.world.width / 6 - 16, 200, 'player');
  player.body.bounce.y = .1;
  player.body.gravity.y = constants.GRAVITY;
  player.body.collideWorldBounds = true;
  cursors = game.input.keyboard.createCursorKeys();

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
    }
  };
};
