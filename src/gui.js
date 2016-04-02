GUI = function(label, x ,y, width, height, lenght)
{
	var gui = this;
		// should make constructor for another object
		gui.x = x;
		gui.y = y;
		gui.width = width;
		gui.height = height;

		gui.label = label;
		// for drawing bar's
		gui.currentLenght = lenght;

	//should change this
	// maybe by type???
	//
	gui.draw = function(context)
	{
		gui.bar(context, gui.label, gui.x, gui.y, gui.width, gui.height, gui.currentLenght);
	};

	gui.text = function(context, label, x, y, textsSize)
	{
		context.save();
		// need able to change color
		// and font and size
		// and position
		var fontSize = textsSize+ 'px Arial';
		context.font = fontSize
		context.fillStyle = "black";
		context.fillText(label, x , y);
		context.restore();
	};

	gui.Menu = function(context)
	{
		//what else we need
		//offset for items
		var offsetX = 5;
		var offsetY = 5;
		var size = 64
		var items = [3,2,3];
		//draw menu background
		context.save();
		context.translate(0, -gui.height/2);
		//here could be bacground image
		context.fillStyle = "black";
		context.fillRect(gui.x, gui.y, gui.width + offsetX, gui.height + offsetY);
		//context.stroke();
		
			//draw items
			//each item should be a button!!!!! 
			context.save();
			for (var i = 0; i < items.length; i++) {
				var iSize = gui.y + (i  * size);
				//here too should be some image
				//context.fillStyle = "red";
				//context.fillRect(gui.x + offsetX, iSize + offsetY , size - offsetX, size - offsetY);

				var tempButton = new gui.Button({
					x: gui.x,
					y: iSize,

					width: size,
					height: size,

					offset_x: offsetX,
					offset_y: offsetY,

					context : context,
				})
				tempButton.draw();

			};

			context.restore();	
		
			context.restore();
		

		gui.Inventory(context);
		//gui.Stats(context);

	};

	gui.Button = function(options)
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

		//button.draw(button.context);


		button.draw = function(context)
		{
			//context.drawImage(button.image, button.x, button.y, button.width , button.height);
			//if image is not set
			button.context.fillStyle = button.color;
			button.context.fillRect(button.x + button.offset_x, button.y + button.offset_y, button.width - button.offset_x, button.height - button.offset_y);
		};
	};
	gui.Inventory = function(context)
	{
		//x ,y w, h, bacground color
		//if(!this.hide){}

		var x = this.x - 400;
		var y = this.y - 10;
		var offsetX = 10;
		var offsetY = 10;
		var size = 64
		//start bacground
		context.save();
		context.translate(0, -this.height/2);
		//here could be bacground image
		context.fillStyle = "#6600cc";
		context.fillRect(x, y , 400, this.height + 15);

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

	gui.Stats = function(context, actor)
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

	


	//for everything make || asign to this..
	gui.bar = function(context,label, x ,y, width, height, lenght)
	{
	//width should make it full lenght not block
	//then we can calculate bloks from max lenght
	var maxLenght = 10;
	this.text(context, label,x, y-3, 20);
	context.save();
	//border of bar
	// need able to change color
	context.fillStyle = "black";
	context.fillRect(x, y , width * maxLenght, height);
	//context.stroke();
		
	//progress bar
	context.fillStyle = "red";
	context.fillRect(x, y , width * lenght , height);
	context.restore();

	};

}






/*
context.save();
context.beginPath();
context.rect(x, y, width * maxLenght, height);
context.fillStyle = "red";
context.fill();
context.strokeStyle = "black";
context.stroke();
context.restore();

*/

