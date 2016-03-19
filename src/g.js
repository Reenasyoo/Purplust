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


Purpl = function(canvas, width, height)
{
	var engine = this;
	engine.canvasElement = canvas;
	engine.canvas;
	engine.context;
	engine.width = width || window.innerWidth;
	engine.height = height || window.innerHeight;

	engine.keysDown = [];

	engine.time = false;

	engine.entities = [];
	engine.world = [];
	engine.resources = [];

	

	engine.initializeCanvas = function()
	{	
		var body = document.getElementsByTagName("body")[0];
		if(typeof(engine.canvasElement) == "string")
		{
			if(!body.hasAttribute(engine.canvasElement))
			{	
				engine.canvas = document.createElement(engine.canvasElement);
				engine.setCanvas(engine.canvas, engine.canvasElement);
				body.appendChild(engine.canvas);
			}
			else 
			{
			engine.canvas = document.getElementById(engine.canvasElement);
			}
			engine.setContext(engine.canvas);	
		}
		else 
		{ 
			console.log("Canvas Id is not string"); 
		}

	}

	engine.Run = function()
	{
		

		window.addEventListener('resize', engine.setCanvasDimentions, false);

		window.addEventListener('keydown', function(e) {
    	engine.keysDown[e.keyCode] = true;
		});

		window.addEventListener('keyup', function(e) {
    	delete engine.keysDown[e.keyCode];
		});

		engine.setCanvasDimentions();

		engine.loop();
	};

	engine.loop = function()
	{
		// timing
        var now = new Date().getTime();
        var deltaTime = now - (game.time || now);
        engine.time = now;

        // update engine
		engine.update(deltaTime);
		// render engine
		engine.render();
		// request next frame
		window.requestAnimationFrame(engine.loop);
	}

	engine.update = function(dt)
	{
		//for (var i = 0; i < engine.entities.length; i++) {
			engine.entities[0].update(dt, engine.keysDown	);
		//};
	}

	engine.render = function()
	{
		engine.context.clearRect(0,0, engine.width, canvas.height);

		for (var i = 0; i < engine.world.length; i++) {
			engine.world[i].draw();
		};

		for (var i = 0; i < engine.entities.length; i++) {
			engine.entities[i].draw(engine.context);

		};
	}
	//set canvas propperties
	engine.setCanvas = function(canvas, cString)
	{
		//initialize cavas propertis
		canvas.setAttribute("id", cString);
		engine.setCanvasDimentions();
	};
	engine.setContext = function(canvas)
	{
		engine.context = canvas.getContext('2d');
	};
	//set canvas dimentions
	engine.setCanvasDimentions = function(width, height)
	{
		engine.canvas.width = width || window.innerWidth;
		engine.canvas.height = height || window.innerHeight;
		engine.width = width || window.innerWidth;
		engine.height = height || window.innerHeight;
	};
	//Get canvas
	engine.getCanvas = function()
	{	
		//For now CONST element ID
		return engine.canvas;
	};
	//get context
	engine.getContext = function()
	{	
		//chaneged this. from -  param =  canvas
		return engine.canvas.getContext('2d');
	};
	    // load images
    engine.load = function(images){
        
        // load image from url
        var loadFromUrl = function(url){
            var img = new Image();
            img.src = 'src/resources/images/' + url + '.png';
            game.resources[url] = { image: img, loaded: false };
            img.onload = function(){
                game.resources[url].loaded = true;
            };
        };
        
        // accept array or single resource
        if(images instanceof Array){
            for(var i = 0; i < images.length; i++){
                loadFromUrl(images[i]);
            }
        }
        else{
            loadFromUrl(images);
        }
        
    };

}

		
		

