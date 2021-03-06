
// gui constructor
GUI = function(context) {
	// gui this pointer
	var gui = this;
		// context object
		gui.context = context;

		// array of all ui objects that are created
		gui.UIObjects = [];

		//actor object to follow
		gui.actor = false;

	//gui draw function
	gui.draw = function(con) {
		// every uiobject has his own draw function
		// so its easy to call them in loop
		// passing just context object
		for (var i = 0; i < gui.UIObjects.length; i++) {
			gui.UIObjects[i].draw(con);
		};
	}
	// gui update function that will be inherited by every uiobject
	gui.update = function(engine) {
		
		for (var i = 0; i < gui.UIObjects.length; i++) {
			gui.UIObjects[i].update(engine);
		};
	}
	gui.setActor = function(actor) {
		gui.actor = actor;
		//console.log(gui.actor);
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

		button.text = options.text;

		button.hovered = false;
		button.clicked = false;
		button.active = false;

		//button.draw(button.context);

		//gui.UIObjects.push(this);



		button.draw = function()
		{
			//context.drawImage(button.image, button.x, button.y, button.width , button.height);
			//if image is not set
			//console.log(button.image);
			if ( typeof button.image != "undefined") {
				button.context.drawImage(button.image, button.x + button.offset_x, button.y + button.offset_y, button.width - button.offset_x, button.height - button.offset_y);		
			}else {
				if(button.hovered){
					button.context.fillStyle = "brown";
					button.context.fillRect(button.x + button.offset_x, button.y + button.offset_y, button.width - button.offset_x, button.height - button.offset_y);
				}
				else{
					button.context.fillStyle = button.color;
					button.context.fillRect(button.x + button.offset_x, button.y + button.offset_y, button.width - button.offset_x, button.height - button.offset_y);
				}
			}

			if (typeof button.text != "undefined") {

				var buttonText = new gui.Text({
					x : button.x + (button.width / 4),
					y : button.y + (button.height/ 2),
					textSize: button.height / 4,
					fillableText : button.text,
				});
				buttonText.draw();
			};

		};

		button.update = function(engine) {
			
			this.clicked = false; 

			if (collides(this, engine.input.mouse)) {
	            this.hovered = true;
	            if (engine.input.mouse.clicked) {
	                this.clicked = true;
	                this.active = true;
	            }
	            else {
	            	this.active = false;
	            }

		    } else {
		        this.hovered = false;
		    }

		    if (!engine.input.mouse.clicked) {
		    	this.clicked = false;
		    }
	    }
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
				text1.draw();
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

		bar.update = function(object, entity) {
			if (entity.type != "player") {
				bar.x = entity.x ;
				bar.y = entity.y - 10;
			};
			
			
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
		text.fillTextValue = options.fillVal;
		text.textArray = options.textArray;

	//gui.UIObjects.push(this);

	text.draw = function() {
		
		gui.context.save();
			// need able to change color
			// and font and size
			// and position
			var fontSize = text.textSize + 'px Arial';
			gui.context.font = fontSize;
			gui.context.fillStyle = "black";
			if (typeof text.filledText != "undefined") {
				if ( typeof text.fillTextValue == "undefined") {
					gui.context.fillText(text.filledText, text.x, text.y);
				}
				else {
					gui.context.fillText(text.filledText + " : " + text.fillTextValue, text.x, text.y);
				}
			};
			if( typeof text.textArray != "undefined") {
				for (var i = 0; i < text.textArray.length; i++) {
					gui.context.fillText(text.textArray[i], text.x, text.y + (i * text.textSize));
				};
			}
			
		gui.context.restore();
	}

		text.update = function(engine) {
			//console.log(input);
			if(collides(this, engine.input.mouse)) {	
				
				this.hovered = true;
				if(engine.input.mouse.cliked){
					this.clicked = true;
				}
			}
			else { 
				this.hovered = false;
			}
			if(!engine.input.mouse.cliked){
				this.clicked = false;
			}
		}
	//text.draw();
		
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
		menu.stats = false;

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
							
							image : menu.image[i],
						});	
				};
				var inv = new menu.Inventory({ 
					x : menu.x - 500,
					y : menu.y - 10,
					itemSize : 64,
				});
				menu.inventory = inv;

				var sta = new menu.Stats({
					x : menu.x - 500,
					y : menu.y - 10,
					height : 200,
				});
				menu.stats = sta;
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
				menu.stats.draw();

				gui.context.restore();

			gui.context.restore();
		}

		menu.update = function(engine) {
			for (var i = 0; i < menu.items.length; i++) {
				menu.items[i].update(engine);
				//console.log(input);
				
			};

			menu.inventory.update(engine);
			menu.stats.update(engine);

			if (menu.items[0].clicked) {
				menu.inventory.visible = changeBoolVal(menu.inventory.visible);
				
			};
			
			if (menu.items[1].clicked) {
				menu.stats.visible = changeBoolVal(menu.stats.visible);
			};
			
			engine.input.mouse.clicked = false;
		}

		menu.slot = function(options) {
			var slot = this;
				slot.x = options.x;
				slot.y = options.y;
				slot.width = options.width;
				slot.height = options.height;

				slot.empty = true;
				slot.type = "item" || options.type,
				slot.color = "red" || options.color;
				slot.image;

				slot.slotItem;
		
				slot.draw = function()
				{	
					//slot bacground
					gui.context.fillStyle = slot.color;
					gui.context.fillRect(slot.x, slot.y + 5, slot.width, slot.height - 5);

					if (!slot.empty) {
						gui.context.fillStyle = slot.slotItem.color;
						gui.context.fillRect(slot.slotItem.x, slot.slotItem.y, slot.slotItem.width, slot.slotItem.height);
					};
				}
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
				inventory.backp = null;

				var cc = 0;

			//for now will leave this.
			var offsetX = 10;
			var offsetY = 10;


			//start bacground
			inventory.drawItems = function(x, y, id) {

				
				var itemWidth = (4 * inventory.itemSize) + (4 * 5) + 10;
				var itemHeight = (4 * inventory.itemSize) + (4 * 5) + 10;
				// item inventory
				//here could be bacground image
				//gui.context.fillStyle = "green";
				// gui.context.fillRect(inventory.x, inventory.y , itemWidth, itemHeight);
				// here we need just to draw items and inventory
				if (id.location = "backpack") {
					id.x = x;
					id.y = y;
					id.width = inventory.itemSize - 10;
					id.height = inventory.itemSize - 10;
					var col;

					if (id.hovered) {
						col = "grey";
					}
					else {
						col = id.color;

					}
					gui.context.fillStyle = col;

					gui.context.fillRect(x + 5, y + 5, id.width, id.height);
						
					var text1 = new gui.Text({
						x : x + offsetX +5,
						y : y + (inventory.itemSize/2 )+5,
						textSize : 10,
						fillableText : id.name,
					});
					text1.draw();
				};	
				
			}
			inventory.drawVisible = function() {
				if(!inventory.visible) {
					inventory.visible = true;
				}
				else {
					inventory.visible = false;
				}
				
			}


			inventory.draw = function() {
				//console.log(gui.actor);
				if (inventory.visible) {
					
					//inventory width
					var itemWidth = (4 * inventory.itemSize) + (4 * 5) + 5;
					var itemHeight = (4 * inventory.itemSize) + (4 * 5) + 5;
					var itemsInRow = 4;

					gui.context.save();
						//gui.context.translate(0, -menu.height/2);
						
						// full inventory background
						gui.context.fillStyle = "brown";
						gui.context.fillRect(inventory.x, inventory.y , itemWidth + 125, itemHeight);

						//start inventory grid
						gui.context.save();
							
							for(var r = 0; r < 4; r++){
								
								for(var c = 0; c < 4; c++){
									
									var gridX =  inventory.x + (r * inventory.itemSize) + offsetX;
									var gridY =  inventory.y + (c * inventory.itemSize) + offsetY;

								    // access to itemSlot array;

									for (var i = 0; i < inventory.backp.length; i++) {
										
									  	var itemSlotId = inventory.backp[r + (c * itemsInRow)];

										if(itemSlotId != 0 && (typeof itemSlotId != "undefined"))
								  		{	

								  			inventory.drawItems(gridX, gridY,itemSlotId);
									    }
									};   
								}

							}
							//restore inventory grid
						gui.context.restore();

						//start equipment 
						gui.context.save();

							for (var i = 0; i < 4; i++) {
							// console.log(menu.itemsLength);
					
								var iSize = inventory.y + (i  * inventory.itemSize);
					
								
								var equipment =  new menu.slot({
									x: inventory.x + itemWidth,
									y: iSize,

									width: inventory.itemSize,
									height: inventory.itemSize,

								});
								equipment.draw();
							};

						// restore equipment grid
						gui.context.restore();

						//restore bacground
					gui.context.restore();

				}
			
			};

			inventory.update = function(engine, down) {
				
				inventory.backp = gui.actor.gotI;

				for (item in inventory.backp) {
					if(collides(engine.input.mouse, inventory.backp[item])) {

						oldX = inventory.backp[item].x;
						oldY = inventory.backp[item].y;

						inventory.backp[item].hovered = true;

					}
					else inventory.backp[item].hovered = false;
				};
			}
			
		};

		//needs to be refactored to constructor
		menu.Stats = function(options)
		{
			var stats = this;
				stats.x = options.x;
				stats.y = options.y;
				stats.height = options.height;


				stats.visible = false;

			//var x = this.x - 400;
			//var y = this.y;


			var offsetX = 10;
			var offsetY = 10;

			stats.draw = function() {
				if (this.visible) {
					//start bacground
					gui.context.save();
					//gui.context.translate(0, -this.height/2);
					//here could be bacground image
					gui.context.fillStyle = "#6600cc";
					gui.context.fillRect(stats.x, stats.y , /*width*/ 400, stats.height );

						//start stats
						gui.context.save();
						for (var i = 0; i < playerSettings.info.length; i++) {
							var text = new gui.Text({
								x : stats.x + 3,
								y : stats.y + 20 + (i * 20),
								textSize : 20,
								fillableText : playerSettings.info[i].name,
								fillVal : playerSettings.info[i].value,
							});
							text.draw();
						};
						for (var i = 0; i < playerSettings.stats.length; i++) {
							// gui.actor.settings.stats[i]
							var text = new gui.Text({
							x : stats.x + 200,
							y : stats.y + 20 + (i * 20),
							textSize : 20,
							fillableText : playerSettings.stats[i].name,
							fillVal : playerSettings.stats[i].value,
							});
							text.draw();
							
						};
					
						gui.context.restore();
					gui.context.restore();
				}
			}
			stats.update = function(engine, down) {

				if (down) {
					stats.visible = !stats.visible;
				}
			}

		};
	menu.initializeItems();
}


