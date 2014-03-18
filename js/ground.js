
module.exports = function(game) {
  var ground = game.add.sprite(0, game.world.height - 32, 'ground');
  game.physics.enable(ground, Phaser.Physics.ARCADE);
  ground.body.immovable = true;

  return {
    sprite: ground
  };
};
