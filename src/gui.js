
// gui constructor
GUI = function(context, actor) {
	// gui this pointer
	var gui = this;
		// context object
		gui.context = context;

		// array of all ui objects that are created
		gui.UIObjects = [];

		//actor object to follow
		gui.actor = actor || false;

	//gui draw function
	gui.draw = function() {
		// every uiobject has his own draw function
		// so its easy to call them in loop
		// passing just context object
		for (var i = 0; i < gui.UIObjects.length; i++) {
			gui.UIObjects[i].draw();
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

		button.hovered = options.hover || false;
		button.clicked = false;

		//button.hover = false;

		//button.draw(button.context);

		//gui.UIObjects.push(this);



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
			//var collision = false;
			if(collides(this, input.mouse)) {	
				//collision = true;
				this.hovered = true;
				//console.log(this.hovered);
				
				if(input.mouse.clicked && this.hovered){
					this.clicked = true;
					//console.log(this.clicked);
				}
				else
				{
					this.clicked = false;
				}

			}
			else 
			{ 
				this.hovered = false;
				//collision = false;
			}
		};
}
GUI.prototype.Bar = function(options){

	var bar = this;
		bar.x = options.x - 10;
		bar.y = options.y;
		bar.width = options.width;
		bar.height = options.height;
		bar.label = options.label;
		bar.fullLenght = options.fullLenght;
		bar.currentLenght = options.currentLenght;
		bar.color = options.color || "red";
		bar.image = options.image;

		bar.draw = function()
		{



			if (typeof bar.label !== typeof undefined) {
				var text1 = new gui.Text({
					x : bar.x,
					y : bar.y - 3,
					textSize : 20,
					fillableText : bar.label,
				});
			};
			
			// need able to change color
			gui.context.save();

				gui.context.fillStyle = "black";
				gui.context.fillRect(bar.x, bar.y , bar.width, bar.height);
				//context.stroke();
					
				//progress bar
				gui.context.save();

					var width = ((bar.width / bar.fullLenght) * bar.currentLenght);
					
					gui.context.fillStyle = "red";
					gui.context.fillRect(bar.x, bar.y , width , bar.height);

				gui.context.restore();

			gui.context.restore();
		}

		bar.update = function(entity, object) {
			
			bar.x = entity.x ;
			bar.y = entity.y - 10;

			bar.currentLenght = object;
		}
}
GUI.prototype.Text = function(options)
{
	var	text = this;
		text.x = options.x;
		text.y = options.y;
		text.textSize = options.textSize
		text.filledText = options.fillableText;

	//gui.UIObjects.push(this);

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
				if(input.mouse.down){
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
	text.draw();
		
};

GUI.prototype.Menu = function(options) {

	var menu = this;
		menu.x = options.x;
		menu.y = options.y;
		menu.width = options.width;
		menu.height = options.height;
		menu.offsetX = options.offsetX;
		menu.offsetY = options.offsetY;

		menu.items = [];
		menu.itemsLength = options.items;
		menu.itemSize = options.itemSize;

		menu.inventory = false;

		menu.image = options.image;


		
		//gui.UIObjects.push(this);
		menu.initializeItems = function() {
			for (var i = 0; i < menu.itemsLength; i++) {
				// console.log(menu.itemsLength);
					
					var iSize = menu.y + (i  * menu.itemSize);
				
					menu.items[i] = new gui.Button({
							x: menu.x,
							y: iSize,

							width: menu.itemSize,
							height: menu.itemSize,

							offset_x: menu.offsetX,
							offset_y: menu.offsetY,
						});	
				};
				var inv = new menu.Inventory({ 
					x : menu.x - 400,
					y : menu.y - 10,
					itemSize : 64,
				});
				menu.inventory = inv;
		}
		menu.draw = function() {
			//draw menu background
			gui.context.save();
				//gui.context.translate(0, -menu.height/2);
				//here could be bacground image
				gui.context.fillStyle = "black";
				gui.context.fillRect(menu.x, menu.y, menu.width + menu.offsetX, menu.height + menu.offsetY);
				//gui.context.stroke();	
								
				gui.context.save();
					for (var i = 0; i < menu.items.length; i++) {
						menu.items[i].draw();
					};
					
				
				menu.inventory.draw();
				//not refactored
				//menu.Stats();
				gui.context.restore();

			gui.context.restore();


		}

		menu.update = function(input) {
			//console.log(input);
			var down = false;
			for (var i = 0; i < menu.items.length; i++) {
				menu.items[i].update(input);
				//console.log(input);
				menu.inventory.update(menu.items[0].clicked);
			};
		}

		menu.Inventory = function(options)
		{
			//x ,y w, h, bacground color
			//if(!this.hide){}

			var inventory = this;
				inventory.x = options.x;
				inventory.y = options.y;

				//items thats in backpack
				inventory.items = [];
				inventory.itemSize = options.itemSize;

				inventory.visible = false;

			//for now will leave this.
			var offsetX = 10;
			var offsetY = 10;

			//start bacground
			inventory.setupBag = function() {

				for (var i = 0; i < items.length; i++) {
					items[i];
				};
			}


			inventory.draw = function() {
				if (this.visible) {

					var itemWidth = (4 * inventory.itemSize) + (4 * 5) + 10;
					var itemHeight = (4 * inventory.itemSize) + (4 * 5) + 10;
					gui.context.save();
						gui.context.translate(0, -menu.height/2);
						//here could be bacground image
						gui.context.fillStyle = "brown";
						gui.context.fillRect(inventory.x, inventory.y , itemWidth, itemHeight);

						//start inventory grid
						gui.context.save();
							for(var r = 0; r < 4; r++){
								for(var c = 0; c < 4; c++){
									var gridY =  inventory.y + (r * inventory.itemSize) + offsetX;
									var gridX =  inventory.x + (c * inventory.itemSize) + offsetY;

									// here we need just to draw items and inventory
									gui.context.fillStyle = "red";
									gui.context.fillRect(gridX, gridY, inventory.itemSize - offsetX, inventory.itemSize - offsetY);
									var text1 = new gui.Text({
									    x : gridX + offsetX,
									    y : gridY + 70,
									    textSize : 10,
									    fillableText : "item",
									});
																		
								}
							}
							//restore inventory grid
						gui.context.restore();

						//restore bacground
					gui.context.restore();

				}
			
			};

			inventory.update = function(down) {

				if (down) {
					//console.log(down);
					inventory.visible = true;
				}
				else { inventory.visible = false};
				
			}
			
		};

		//needs to be refactored to constructor
		menu.Stats = function()
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
			gui.context.save();
			gui.context.translate(0, -this.height/2);
			//here could be bacground image
			gui.context.fillStyle = "#6600cc";
			gui.context.fillRect(x, y , 400, height );

				//start stats
				gui.context.save();
				
				var text1 = new gui.Text({
					x : x + 3,
					y : y + 20,
					textSize : 20,
					fillableText : "Stats" + Health,
				});
				var text1 = new gui.Text({
					x : x + 5,
					y : y + 40,
					textSize : 20,
					fillableText : "Health" + Health,
				});
				var text1 = new gui.Text({
					x : x + 5,
					y : y + 60,
					textSize : 20,
					fillableText : "Agility" + Health,
				});
				var text1 = new gui.Text({
					x : x + 5,
					y : y + 80,
					textSize : 20,
					fillableText : "Strength" + Health,
				});
			
				gui.context.restore();

			gui.context.restore();

		};
	menu.initializeItems();

}


