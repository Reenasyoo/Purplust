GUI = function(context)
{
	//assets =  {} ;

	this.context = context;
}

GUI.prototype.draw = function() {
	this.bar( 20, 20, 20, 20, 10, 10);
}


GUI.prototype.bar = function(label, x ,y, width, height, lenght,maxLenght) {
	var i;
	
	var maxTextWidth;
	this.text(label,x, y);
	//border of full bar
	this.context.fillStyle = "white";
	this.context.rect(x, y , width * maxLenght, height);

	this.context.stroke();
	
	for(i = 0;i < lenght +1; i++)
	{	
		//filled bar
		this.context.fillStyle = "red";
		this.context.fillRect(x, y , width * i , height);
	}
}

GUI.prototype.text = function(label, x, y)
{
	this.context.save();
	this.context.font = '20px Arial';
	this.context.fillStyle = "black";
	this.context.fillText(label, x , y - 5 /* , maxTextWidth */);
	this.context.restore();
}