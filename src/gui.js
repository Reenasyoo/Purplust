GUI = function(context, label, x ,y, width, height, lenght)
{
	//assets =  {} ;
	var gui = this;
		gui.context = context;
		// should make constructor for another object
		gui.x = x;
		gui.y = y;
		gui.width = width;
		gui.height = height;

		gui.label = label;
		// for drawing bar's
		gui.currentLenght = lenght;

	gui.draw = function()
	{
		this.bar(gui.label, gui.x, gui.y, gui.width, gui.height, gui.currentLenght);
	}

}


GUI.prototype.bar = function(label, x ,y, width, height, lenght) {
	//width should make it full lenght not block
	//then we can calculate bloks from max lenght
	var maxLenght = 10;
	this.text(label,x, y);
	//this.context.save();
	//border of bar
	// need able to change color
	this.context.fillStyle = "white";
	this.context.rect(x, y , width * maxLenght, height);
	this.context.stroke();
		
	//progress bar
	this.context.fillStyle = "red";
	this.context.fillRect(x, y , width * lenght , height);
	//this.context.restore();

}

GUI.prototype.text = function(label, x, y)
{
	//this.context.save();
	// need able to change color
	// and font and size
	// and position
	this.context.font = '20px Arial';
	this.context.fillStyle = "black";
	this.context.fillText(label, x , y - 5 /* , maxTextWidth */);
	//this.context.restore();
}



