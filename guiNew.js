
// gui constructor
GUI = function(context) {
	// gui this pointer
	var gui = this;
		// context object
		gui.context = context;

		// array of all ui objects that are created
		gui.UIObjects = [];0


}
//gui draw function
GUI.prototype.draw = function() {
	// every uiobject has his own draw function
	// so its easy to call them in loop
	// passing just context object
	for (var i = 0; i < gui.UIObjects.length; i++) {
		gui.UIObjects[i].draw(gui.context);
	};
}
// gui update function that will be inherited by every uiobject
GUI.prototype.update = function(input) {
/// comments !!!!
	if(collides(this, input.mouse)) {	
		
		this.hovered = true;
		if(mouse.cliked){
			this.clicked = true;
		}
	}
	else { 
		this.hovered = false;
	}
	if(!mouse.down){

		this.clicked = false;
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

		button.offset_x = options.offset_x;
		button.offset_y = options.offset_y;

		button.color = options.color || "red";

		button.image = options.image;

		button.context = options.context;

		button.hovered = false;

		//button.hover = false;

		//button.draw(button.context);



		button.draw = function(hover)
		{
			//context.drawImage(button.image, button.x, button.y, button.width , button.height);
			//if image is not set
			button.hovered = hover;
			if(button.hovered){
				button.context.fillStyle = "brown";
				button.context.fillRect(button.x + button.offset_x, button.y + button.offset_y, button.width - button.offset_x, button.height - button.offset_y);
			}
			else{
				button.context.fillStyle = button.color;
				button.context.fillRect(button.x + button.offset_x, button.y + button.offset_y, button.width - button.offset_x, button.height - button.offset_y);
			}

		};
	};
	Button.prototype = merge(Button.prototype, GUI.prototype.update);

