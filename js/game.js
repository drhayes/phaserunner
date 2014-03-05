var JUMP_ACCEL = 80000;
var JUMP_CLAMP = 400;
var GRAVITY = 2400;

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
    this.cursors = game.input.keyboard.createCursorKeys();
    this.ground = game.add.group();
    var pieceOfGround = this.ground.create(0, game.world.height - 32, 'ground');
    pieceOfGround.body.immovable = true;
    pieceOfGround.scale.setTo(20, 1);

    this.boxes = game.add.group();
    for (var i = 0; i < 1; i++) {
      box = this.boxes.create(game.world.width - 40, 0, 'box');
      box.body.velocity.x = -100;
      box.body.gravity.y = GRAVITY;
      box.body.bounce.y = .2;
    }

    this.player = game.add.sprite(game.world.width / 6 - 16, 200, 'player');
    this.player.body.bounce.y = .1;
    this.player.body.gravity.y = GRAVITY;
    this.player.body.collideWorldBounds = true;
  },
  update: function() {
    game.physics.collide(this.player, this.ground);
    game.physics.collide(this.player, this.boxes);
    game.physics.collide(this.ground, this.boxes);

    this.player.body.acceleration.y = 0;
    if (!this.cursors.up.isDown && this.player.body.velocity.y < -JUMP_CLAMP) {
      this.player.body.velocity.y = -JUMP_CLAMP;
    }
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.isAboutToJump = true;
    }
    if (this.player.isAboutToJump) {
      game.sound.play('jump', 1);
      this.player.body.acceleration.y = -JUMP_ACCEL;
      this.player.isAboutToJump = false;
    }
  }
};
game.state.add('main', main_state);
game.state.start('main');
