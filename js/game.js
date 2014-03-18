
var boot = require('./boot');
var main = require('./main');

game = new Phaser.Game(640, 480, Phaser.AUTO, '');

var main_state = {
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
    game.load.image('box192', 'images/box192.png');
    game.load.image('box160', 'images/box160.png');
    game.load.image('box128', 'images/box128.png');
    game.load.image('box96', 'images/box96.png');
    game.load.image('box64', 'images/box64.png');
    game.load.image('sky', 'images/sky.png');
    game.load.audio('jump', ['sounds/jump.mp3', 'sounds/jump.ogg']);
  },
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
game.state.add('boot', boot(game), true);
game.state.add('main', main(game));
