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

game = new Game("canvas");
game.Initialize();

	var update = function()
	{

	}

	var draw = function()
	{

	}

	var gameloop = function ()
	{
		update();
		draw();
		requestAnimationFrame(gameloop);
	}

	requestAnimationFrame(gameloop);