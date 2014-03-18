
module.exports = function(game) {
  return {
    preload: function() {
      game.scale.minWidth = 640;
      game.scale.minHeight = 480;
      game.scale.maxWidth = 1280;
      game.scale.maxHeight = 960;
      game.scale.pageAlignHorizontally = true;
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.refresh();

      game.load.image('player', 'images/player.png');
      game.load.image('chunks', 'images/chunks.png');
      game.load.image('ground', 'images/ground.png');
      game.load.image('box', 'images/box.png');
      game.load.image('sky', 'images/sky.png');
      game.load.audio('jump', ['sounds/jump.mp3', 'sounds/jump.ogg']);
    },
    create: function() {
      game.state.start('main');
    }
  };
};
