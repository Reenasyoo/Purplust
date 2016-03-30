GUI = function(label, x ,y, width, height, lenght)
{
	//assets =  {} ;
	var gui = this;
		//gui.context = context;
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
		this.bar(context, gui.label, gui.x, gui.y, gui.width, gui.height, gui.currentLenght);
	}

}


GUI.prototype.bar = function(context,label, x ,y, width, height, lenght) {
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

}

GUI.prototype.text = function(context, label, x, y, textsSize)
{
	context.save();
	// need able to change color
	// and font and size
	// and position
	var fontSize = textsSize+ 'px Arial';
	context.font = fontSize
	context.fillStyle = "black";
	context.fillText(label, x , y /* , maxTextWidth */);
	context.restore();
}

GUI.prototype.optionBar = function(context, x, y, width, height)
{
	//what else we need
	//offset for items
	var offsetX = 5;
	var offsetY = 5;
	var size = 64
	var items = [3,2,3];
	//draw menu background
	context.save();
	context.translate(0, -this.height/2);
	//here could be bacground image
	context.fillStyle = "black";
	context.fillRect(this.x, this.y , this.width + offsetX, this.height + offsetY);
	//context.stroke();
	
		//draw items
		context.save();
		//here could be bacground image
		for (var i = 0; i < items.length; i++) {
			//console.log(items.length);
			var y =  this.y + (i * size);
			//here too should be some image
			context.fillStyle = "red";
			context.fillRect(this.x + offsetX, y + offsetY , size - offsetX, size - offsetY);

		};
		
		context.restore();

	context.restore();

	//this.Inventory(context);
	this.Stats(context);
	/*
	//x y width height
	//color
	// options = {
		inventory
		stats
		smth
	}


	*/

}
GUI.prototype.Inventory = function(context)
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

GUI.prototype.Stats = function(context, actor)
{
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
	context.restore();
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

