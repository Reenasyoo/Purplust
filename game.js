//Shoud put this in main game class file - now - g.js
// that this woul work with game.gameloop function

// requestAnimationFrame polyfill
    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    (function(){
		var lastTime = 0;
		var currTime, timeToCall, id;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelAnimationFrame =
			  window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
		}
		if (!window.requestAnimationFrame)
		{
			window.requestAnimationFrame = function(callback, element) {
				currTime = Date.now();
				timeToCall = Math.max(0, 16 - (currTime - lastTime));
				id = window.setTimeout(function() { callback(currTime + timeToCall); },
				  timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};
		}
		if (!window.cancelAnimationFrame)
		{
			window.cancelAnimationFrame = function(id) {
				clearTimeout(id);
			};
		}
	})();

var map1 = {

    	mapArray : [ 
2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
1,0,1,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,0,1,1,0,0,1,0,1,1,0,0,0,1,1,1,1,1,1,1,1,0,1,1,0,1,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,0,1,
1,0,1,0,0,1,0,0,0,0,0,1,1,1,0,0,0,1,0,0,1,0,0,1,0,1,0,0,0,0,0,1,1,1,0,0,0,1,0,1,1,0,1,0,0,1,0,0,0,0,0,1,1,1,0,0,0,1,0,1,
1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,1,
1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,1,
1,0,1,0,0,0,0,0,5,5,0,0,0,3,3,0,0,4,0,1,1,0,1,0,0,0,0,0,5,5,0,0,0,3,3,0,0,4,0,1,1,0,1,0,0,0,0,0,5,5,0,0,0,3,3,0,0,4,0,1,
1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,3,0,4,0,1,1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,3,0,4,0,1,1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,3,0,4,0,1,
1,0,1,1,1,1,0,0,0,0,1,1,0,0,0,0,0,4,0,1,1,0,1,1,1,1,0,0,0,0,1,1,0,0,0,0,0,4,0,1,1,0,1,1,1,1,0,0,0,0,1,1,0,0,0,0,0,4,0,1,
1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
1,0,1,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,0,1,1,0,1,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,0,1,1,0,1,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,0,1,
1,0,1,0,0,1,0,0,0,0,0,1,1,1,0,0,0,1,0,1,1,0,1,0,0,1,0,0,0,0,0,1,1,1,0,0,0,1,0,1,1,0,1,0,0,1,0,0,0,0,0,1,1,1,0,0,0,1,0,1,
1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,1,
1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,1,
1,0,1,0,0,0,0,0,5,5,0,0,0,3,3,0,0,4,0,1,1,0,1,0,0,0,0,0,5,5,0,0,0,3,3,0,0,4,0,1,1,0,1,0,0,0,0,0,5,5,0,0,0,3,3,0,0,4,0,1,
1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,3,0,4,0,1,1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,3,0,4,0,1,1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,3,0,4,0,1,
1,0,1,1,1,1,0,0,0,0,1,1,0,0,0,0,0,4,0,1,1,0,1,1,1,1,0,0,0,0,1,1,0,0,0,0,0,4,0,1,1,0,1,1,1,1,0,0,0,0,1,1,0,0,0,0,0,4,0,1,
1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,
1,0,1,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,0,1,1,0,1,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,0,1,1,0,1,0,0,1,1,0,0,0,1,1,1,1,1,1,1,1,0,1,
1,0,1,0,0,1,0,0,0,0,0,1,1,1,0,0,0,1,0,1,1,0,1,0,0,1,0,0,0,0,0,1,1,1,0,0,0,1,0,1,1,0,1,0,0,1,0,0,0,0,0,1,1,1,0,0,0,1,0,1,
1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,1,
1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,1,
1,0,1,0,0,0,0,0,5,5,0,0,0,3,3,0,0,4,0,1,1,0,1,0,0,0,0,0,5,5,0,0,0,3,3,0,0,4,0,1,1,0,1,0,0,0,0,0,5,5,0,0,0,3,3,0,0,4,0,1,
1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,3,0,4,0,1,1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,3,0,4,0,1,1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,3,0,4,0,1,
1,0,1,1,1,1,0,0,0,0,1,1,0,0,0,0,0,4,0,1,1,0,1,1,1,1,0,0,0,0,1,1,0,0,0,0,0,4,0,1,1,0,1,1,1,1,0,0,0,0,1,1,0,0,0,0,0,4,0,1,
1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
],

		tileWidth : 60,
		tileHeight : 30,
	}



/*
lets cut this baby open and merge it together with that #input thing

document.addEventListener('keydown', function(ev) { return onkey(ev, ev.keyCode, true);  }, false);
document.addEventListener('keyup',   function(ev) { return onkey(ev, ev.keyCode, false); }, false);

function onkey(ev, key, down) {
  switch(key) {
    case KEY.LEFT:  player.left  = down; return false;
    case KEY.RIGHT: player.right = down; return false;
    case KEY.SPACE: player.jump  = down; return false;
  }
}

*/

//Input
var keysDown = {};

var canInput = false;

window.addEventListener('keydown', function(e) {
    keysDown[e.keyCode] = true;
    //console.log("true");
});
window.addEventListener('keyup', function(e) {
    delete keysDown[e.keyCode];
});



/*
update draw and gameloop functions should be in game class
so that they wouldnt be needed to redefine every time
in this case we need to make some entity arrays, resource arrays,
world and world layer arrays and add them to game.
example:

	#we make game object
	game = new Purpl.Game("canvas");
	#initialize settings
	game.Initialize();
	#run the game
	game.run();

		game.run/start/go ()
		{
			game.update(deltaTime);
			{
				this.delta time / maybe timer function hmm!??!
			}
			game.draw();
			{
				game.context blah blah
			}
			requestAnimationFrame(gameloop);
		}


*/
A = new ResourceManager();
A.load_Resource("image.png");
game = new Purpl.Game("canvas");
game.Initialize();

m = new Map(map1);
e = new Entity(20,20 , 32, 32);

g = new GUI(game.getContext());

var update = function(){

	//e.update();
}
var draw = function(ctx){
	
	//ctx.drawImage(A.get("image.png"), 0,0, 200, 200);
	m.draw(ctx);
	e.draw(ctx);

	ctx.fillStyle = "white";
	ctx.fillRect(0, game.canvas.height-100, game.canvas.width, 100);

	g.bar("Health", 20, game.canvas.height - 40, 40, 20, 5, 10);
	g.bar("Special", game.canvas.width - 420, game.canvas.height - 40, 40, 20, 6, 10)
}
var gameloop = function ()
{
	update();
	draw(game.getContext());
	requestAnimationFrame(gameloop);
}

A.loadAll(function() {
	gameloop();
});
gameloop();