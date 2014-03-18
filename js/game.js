
var constants = require('./constants');
var playerChunks = require('./playerChunks');
var player = require('./player');
var boxes = require('./boxes');

game = new Phaser.Game(640, 480, Phaser.AUTO, 'game_div');
var main_state = {
  preload: function() {
    game.load.image('player', 'images/player.png');
    game.load.image('chunks', 'images/chunks.png');
    game.load.image('ground', 'images/ground.png');
    game.load.image('box', 'images/box.png');
    game.load.image('sky', 'images/sky.png');
    game.load.audio('jump', ['sounds/jump.mp3', 'sounds/jump.ogg']);
  },
  create: function() {
    this.sky = game.add.sprite(0, 0, 'sky');
    this.ground = game.add.group();
    var pieceOfGround = this.ground.create(0, game.world.height - 32, 'ground');
    game.physics.enable(pieceOfGround, Phaser.Physics.ARCADE);
    pieceOfGround.body.immovable = true;
    pieceOfGround.scale.setTo(20, 1);

    this.boxes = boxes(game);
    this.playerChunks = playerChunks(game);
    this.player = player(game, this.playerChunks);
  },
  update: function() {
    game.physics.arcade.collide(this.player.sprite, this.ground);
    game.physics.arcade.collide(this.player.sprite, this.boxes.group);
    game.physics.arcade.collide(this.ground, this.boxes.group);
    game.physics.arcade.collide(this.playerChunks.emitter, this.ground);

    this.player.update();
    this.boxes.update();
  }
};
game.state.add('main', main_state);
game.state.start('main');
