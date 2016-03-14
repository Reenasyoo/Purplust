Purpl = {}

	Game = function(canvas,width,height){
			this.canvasElement = canvas;
			this.canvas;
			this.context;

			this.width = width || window.innerWidth;
			this.height = height || window.innerHeight;

			//calls funcion that initializes canvas
			this.Initialize();
			this.setContext(this.canvas);
		}

		//Create canvas
		Game.prototype.Initialize = function()
		{

			var canvasString = this.canvasElement;
			var body = document.getElementsByTagName("body")[0];

			if(typeof(canvasString) == "string")
			{
				if(!body.hasAttribute(canvasString))
				{	
					this.canvas = document.createElement(canvasString);

					this.setCanvas(this.canvas, canvasString);
					body.appendChild(this.canvas);
				}
				else 
				{
					this.canvas = document.getElementById(canvasString);
				}	
			}
			else 
			{ 
				console.log("Canvas Id is not string"); 
			}
			
			//return this.canvas;
		}
		//set canvas propperties
		Game.prototype.setCanvas = function(canvas, cString)
		{
			//initialize cavas propertis
			canvas.setAttribute("id", cString);
			this.setCanvasDimentions();
			
		}	
		//set canvas dimentions
		Game.prototype.setCanvasDimentions = function(width, height)
		{
			this.canvas.width = width || window.innerWidth;
			this.canvas.height = height || window.innerHeight;
		}
		//set context
		Game.prototype.setContext = function(canvas)
		{
			this.context = canvas.getContext('2d');
		}
		//Get canvas
		Game.prototype.getCanvas = function()
		{	
			//For now CONST element ID
			return this.canvas;
		}
		//get context
		//USE
		//g.getContext()
		Game.prototype.getContext = function()
		{	
			//chaneged this. from -  param =  canvas
			return this.canvas.getContext('2d');
		}

Purpl.Game = Game;
