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
game = new Purpl.Game("canvas");
game.Initialize();

var update = function(){}
var draw = function(){}
var gameloop = function ()
{
	update();
	draw();
	requestAnimationFrame(gameloop);
}
gameloop();