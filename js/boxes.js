var constants = require('./constants');

module.exports = function(game) {
  var boxes = game.add.group();
  boxes.createMultiple(60, 'box');
  function addABox (x, y){
    var box = boxes.getFirstDead();
    box.body.velocity.x = -100;
    box.body.immovable = true;
    box.outOfBoundsKill = true;
    box.reset(x, y);
  };
  function addBoxes() {  
      var hole = Math.floor(Math.random()*5)+1;
      for (var i = 0; i < 8; i++)
          if (i != hole && i != hole +1) 
              addABox(608, game.world.height - (i*32+10));   
  };
  var timer = game.time.events.loop(1500, addBoxes, this);

  return {
    group: boxes,
    update: function() {
        boxes.setAll('body.velocity.x', -100);
    }
  };
};
