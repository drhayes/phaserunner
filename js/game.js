
var constants = require('./constants');
var playerChunks = require('./playerChunks');
var player = require('./player');
var boxes = require('./boxes');
var ground = require('./ground');

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
    game.load.image('box1', 'images/box1.png');
    game.load.image('box2', 'images/box2.png');
    game.load.image('box3', 'images/box3.png');
    game.load.image('box4', 'images/box4.png');
    game.load.image('box5', 'images/box5.png');
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
game.state.add('main', main_state);
game.state.start('main');
