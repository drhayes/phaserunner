var constants = require('./constants');
var playerChunks = require('./playerChunks');
var player = require('./player');
var boxes = require('./boxes');
var ground = require('./ground');

module.exports = function(game) {
  return {
    create: function() {
      this.sky = game.add.sprite(0, 0, 'sky');
      this.boxes = boxes(game);
      this.playerChunks = playerChunks(game);
      this.player = player(game, this.playerChunks);
      this.ground = ground(game);
    },
    update: function() {
      game.physics.arcade.collide(this.player.sprite, this.ground.sprite);
      game.physics.arcade.collide(this.player.sprite, this.boxes.group);
      game.physics.arcade.collide(this.ground, this.boxes.group);
      game.physics.arcade.collide(this.playerChunks.emitter, this.ground.sprite);
      game.physics.arcade.collide(this.playerChunks.emitter, this.boxes.group);

      this.player.update();
      this.boxes.update();
    }
  };
};
