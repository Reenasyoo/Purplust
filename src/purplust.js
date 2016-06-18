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

	// should make timer class
	// but first, simple things
	engine.time = new Date().getTime();
	engine.fps = 30;
	engine.interval = 1000/ engine.fps;
	engine.paused = false;

	engine.actor = false;
	engine.entities = [];
	engine.resources = [];
	engine.world = false;
	engine.gui = false;


	engine.input = {
		attack : false,
		keyboard : {
			keysDown : [],
		},
		mouse : {
			x : 50,
			y : 50,
			width : 1,
			height : 1,
			down : false,
			clicked : false,
			rightClick: false,
		}
	};

	//for now
	engine.inv = false;
	engine.hover = false;

	engine.debug = false;


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
			e.preventDefault()
    		engine.keysDown[e.keyCode] = true;
    		
    		if(e.keyCode == 70)
			{
				engine.input.attack = true;

			}
		});

		window.addEventListener('keyup', function(e) {
			//I
			if(e.keyCode == 73)
			{
				engine.inv = !engine.inv;
			}
			//76 - L
			if (e.keyCode == 76) {
				engine.debug = !engine.debug;
				//console.log(engine.debug);

			};
			//engine.input.attack = false;
			
    		delete engine.keysDown[e.keyCode];
		});
		//MOUSE
		window.addEventListener('mousemove', function(e){
			engine.input.mouse.x = e.clientX;
			engine.input.mouse.y = e.clientY;
		});

		window.addEventListener('mousedown', function(e){
			e.preventDefault();
			//engine.input.mouse.clicked = 
        	engine.input.mouse.down = !engine.input.mouse.down;
			
			if(e.witch === 2){
				engine.input.mouse.rightClick =  true;
				console.log(engine.input.mouse.rightClick);
			}

		});

		window.addEventListener('mouseup', function(e){
			engine.input.mouse.down = false;
        	engine.input.mouse.clicked = false;

		})
	

		//for resizing canvas
		engine.setCanvasDimentions();
		engine.loop();	
		

	};

	engine.loop = function()
	{
		// timing
        var now = new Date().getTime();
        var deltaTime = now - (engine.time || now);
        
        //if(deltaTime > engine.fps)
       // {
        	engine.time = now;
      //  }
        

        // update engine
		engine.update(deltaTime, engine.input.mouse);
		// render engine
		engine.render();

		if (!engine.paused) {
			window.requestAnimationFrame(engine.loop);
		};
		// request next frame
		


	}

	engine.update = function(deltaTime, input)
	{
		engine.actor.update(deltaTime, engine.keysDown, engine.input, engine.entities, engine);
		//console.log(engine.actor.x);


		for (var i = 0; i < engine.entities.length; i++) {
			engine.entities[i].update(deltaTime, engine.input, engine.debug, engine.actor);
			
		};
		if (engine.entities.length == 0) {

			engine.paused = true;
			var end = document.getElementById('end');
			end.style.display = "table";
		};
		//need to add input
		engine.gui.update(engine.input);
	}

	engine.render = function()
	{	
		

		engine.context.clearRect(0,0, engine.width, engine.height);

		engine.world.draw();
		
		for (var i = 0; i < engine.entities.length; i++) {
			engine.entities[i].draw(engine.context);
		};
		
		engine.gui.draw();
		//this is for wepon for now
		engine.actor.draw(engine.context);

		game.context.drawImage(game.resources['ui'].image, 5, game.height - 110, 400, 90);

		
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

		
		

