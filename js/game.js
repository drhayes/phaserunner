
var constants = require('./constants');
var player = require('./player');

game = new Phaser.Game(640, 480, Phaser.AUTO, 'game_div');
var main_state = {
  preload: function() {
    game.load.image('player', 'images/player.png');
    game.load.image('ground', 'images/ground.png');
    game.load.image('box', 'images/box.png');
    game.load.image('sky', 'images/sky.png');
    game.load.audio('jump', ['sounds/jump.mp3', 'sounds/jump.ogg']);
  },
  create: function() {
    this.sky = game.add.sprite(0, 0, 'sky');
    this.ground = game.add.group();
    var pieceOfGround = this.ground.create(0, game.world.height - 32, 'ground');
    pieceOfGround.body.immovable = true;
    pieceOfGround.scale.setTo(20, 1);

    this.boxes = game.add.group();
    for (var i = 0; i < 1; i++) {
      box = this.boxes.create(game.world.width - 40, 0, 'box');
      box.body.velocity.x = -100;
      box.body.gravity.y = constants.GRAVITY;
      box.body.bounce.y = .2;
    }
    this.player = player(game);
  },
  update: function() {
    game.physics.collide(this.player.sprite, this.ground);
    game.physics.collide(this.player.sprite, this.boxes);
    game.physics.collide(this.ground, this.boxes);

    this.player.update();
  }
};
game.state.add('main', main_state);
game.state.start('main');
