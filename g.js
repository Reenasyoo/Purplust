
	Game = function(canvas,width,height){
			this.canvasElement = canvas;
			this.canvas;

			this.canvas.width = width || window.innerWidth;
			this.canvas.height = height || window.innerHeight;
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
			
			return this.canvas;
		}

		//set canvas propperties
		Game.prototype.setCanvas = function(c, cString)
		{
			var canvas = c;
			//initialize cavas propertis
			canvas.setAttribute("id", cString);
			this.setCanvasDimentions();
			
		}	

		//set canvas dimentions
		Game.prototype.setCanvasDimentions = function()
		{
			this.canvas.width = width || window.innerWidth;
			this.canvas.height = height || window.innerHeight;
		}

		//Get canvas
		Game.prototype.getCanvas = function()
		{	
			//For now CONST element ID
			return this.canvas;
		}

		//get context
		Game.prototype.getContext = function(canvas)
		{
			return canvas.getContext('2d');
		}
