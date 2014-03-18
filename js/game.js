
var boot = require('./boot');
var main = require('./main');

game = new Phaser.Game(640, 480, Phaser.AUTO, '');
game.state.add('boot', boot(game), true);
game.state.add('main', main(game));
