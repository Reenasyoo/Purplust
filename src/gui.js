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

	gui.draw = function(context)
	{
		this.bar(context, gui.label, gui.x, gui.y, gui.width, gui.height, gui.currentLenght);
	}

}


GUI.prototype.bar = function(context,label, x ,y, width, height, lenght) {
	//width should make it full lenght not block
	//then we can calculate bloks from max lenght
	var maxLenght = 10;
	this.text(context, label,x, y);
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

GUI.prototype.text = function(context, label, x, y)
{
	context.save();
	// need able to change color
	// and font and size
	// and position
	context.font = '20px Arial';
	context.fillStyle = "black";
	context.fillText(label, x , y - 5 /* , maxTextWidth */);
	context.restore();
}



