
// gui constructor
GUI = function(context) {
	// gui this pointer
	var gui = this;
		// context object
		gui.context = context;

		// array of all ui objects that are created
		gui.UIObjects = [];0

	//gui draw function
	gui.draw = function() {
		// every uiobject has his own draw function
		// so its easy to call them in loop
		// passing just context object
		for (var i = 0; i < gui.UIObjects.length; i++) {
			gui.UIObjects[i].draw(gui.context);
		};
	}
	// gui update function that will be inherited by every uiobject
	//could use some sort of merge or smth for every update funct and obj
	gui.update = function(input) {
	/// comments !!!!
		for (var i = 0; i < gui.UIObjects.length; i++) {
			gui.UIObjects[i].update(input);
		};
	}
}
GUI.prototype.Button = function(options)
	{
		var button = this;
		
		//mayebe rectangle class?
		button.x = options.x;
		button.y = options.y;
		button.width = options.width;
		button.height = options.height;

		button.offset_x = options.offset_x || 0;
		button.offset_y = options.offset_y || 0;

		button.color = options.color || "red";

		button.image = options.image;

		button.context = gui.context;

		button.hovered = false;
		button.clicked = false;

		//button.hover = false;

		//button.draw(button.context);

		gui.UIObjects.push(this);



		button.draw = function()
		{
			//context.drawImage(button.image, button.x, button.y, button.width , button.height);
			//if image is not set
			
			if(button.hovered){
				button.context.fillStyle = "brown";
				button.context.fillRect(button.x + button.offset_x, button.y + button.offset_y, button.width - button.offset_x, button.height - button.offset_y);
			}
			else{
				button.context.fillStyle = button.color;
				button.context.fillRect(button.x + button.offset_x, button.y + button.offset_y, button.width - button.offset_x, button.height - button.offset_y);
			}

		};

		button.update = function(input) {
			//console.log(input);
			if(collides(button, input.mouse)) {	
				
				button.hovered = true;
				if(input.mouse.cliked){
					button.clicked = true;
				}
			}
			else { 
				button.hovered = false;
			}
			if(!input.mouse.down){
				button.clicked = false;
			}
		}
	};

GUI.prototype.Text = function(options)
{
	var	text = this;
		text.x = options.x;
		text.y = options.y;
		text.textSize = options.textSize
		text.filledText = options.fillableText;

	gui.UIObjects.push(this);

	text.draw = function() {
		
		gui.context.save();
			// need able to change color
			// and font and size
			// and position
			var fontSize = text.textSize + 'px Arial';
			gui.context.font = fontSize;
			gui.context.fillStyle = "black";
			gui.context.fillText(text.filledText, text.x, text.y);
		gui.context.restore();
	}

		text.update = function(input) {
			//console.log(input);
			if(collides(this, input.mouse)) {	
				
				this.hovered = true;
				if(input.mouse.cliked){
					this.clicked = true;
				}
			}
			else { 
				this.hovered = false;
			}
			if(!input.mouse.down){
				this.clicked = false;
			}
		}
		
};

GUI.prototype.Menu = function(options) {

	var menu = this;
		menu.x = options.x;
		menu.y = options.y;
		menu.width = options.width;
		menu.height = options.height;
		menu.items = options.items;
		menu.itemSize = options.itemSize;
		menu.image = options.image;

		menu.offsetX = options.offsetX;
		menu.offsetY = options.offsetY;
		
		gui.UIObjects.push(this);

		menu.draw = function() {
			//draw menu background
			gui.context.save();
				gui.context.translate(0, -menu.height/2);
				//here could be bacground image
				gui.context.fillStyle = "black";
				gui.context.fillRect(menu.x, menu.y, menu.width + menu.offsetX, menu.height + menu.offsetY);
				//gui.context.stroke();
					
					//draw items
					//each item should be a button!!!!! 
				gui.context.save();
					for (var i = 0; i < menu.items; i++) {
						var iSize = menu.y + (i  * menu.itemSize);
						//here too should be some image
						//gui.context.fillStyle = "red";
						//gui.context.fillRect(menu.x + offsetX, iSize + offsetY , size - offsetX, size - offsetY);
						var tempButton = new gui.Button({
							x: menu.x,
							y: iSize,

							width: menu.itemSize,
							height: menu.itemSize,

							offset_x: menu.offsetX,
							offset_y: menu.offsetY,
						})
						tempButton.draw();

					};

				gui.context.restore();	
					
			gui.context.restore();
		}

		menu.update = function(input) {
			//console.log(input);
			if(collides(this, input.mouse)) {	
				
				this.hovered = true;
				if(input.mouse.cliked){
					this.clicked = true;
				}
			}
			else { 
				this.hovered = false;
			}
			if(!input.mouse.down){
				this.clicked = false;
			}
		}
/*
		if(menu.inventory) {
			menu.Inventory(context);
		}
		if (menu.Stats) {
			menu.Stats(context);	
		};
		
	menu.Inventory = function(context)
	{
		//x ,y w, h, bacground color
		//if(!this.hide){}

		var x = menu.x - 400;
		var y = menu.y - 10;
		var offsetX = 10;
		var offsetY = 10;menu
		var size = 64
		//start bacground
		context.save();
		context.translate(0, -menu.height/2);
		//here could be bacground image
		context.fillStyle = "#6600cc";
		context.fillRect(x, y , 400, menu.height + 15);

		//start inventory grid
		context.save();
		for(var r = 0; r < 3; r++){
			for(var c = 0; c < 6; c++){
				var gridY =  y + (r * size);
				var gridX =  x + (c * size);

				context.fillStyle = "red";
				context.fillRect(gridX + offsetX, gridY + offsetY , size - offsetX, size - offsetY);
				this.text(context, "item" , gridX + offsetX, gridY + 70, 10 );
			}
		}
		//restore inventory grid
		context.restore();

		//restore bacground
		context.restore();


	};

	menu.Stats = function(context, actor)
	{
		var x = this.x - 400;
		var y = this.y;
		var height = this.height + 15;
		var offsetX = 10;
		var offsetY = 10;
		var size = 64

	var Health = 10;
	var Agility = 10;
	var Strength = 10;

		//start bacground
		context.save();
		context.translate(0, -this.height/2);
		//here could be bacground image
		context.fillStyle = "#6600cc";
		context.fillRect(x, y , 400, height );

			//start stats
			context.save();
			this.text(context, "Stats" , x + 3, y + 20  , 20);
			this.text(context, "Health: " + Health, x + 5, y + 40  , 20);
			this.text(context, "Agility: " + Agility, x + 5, y + 60  , 20);
			this.text(context, "Strength: " + Strength, x + 5, y + 80  , 20);

			context.restore();

		context.restore();

	};
*/

}


