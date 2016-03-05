	//need to make animation
	Entity.prototype.Anim = function(context)
	{
		var img = new Image();
		img.src = 'assets/dud.png';
		context.drawImage(img, 0, 0,  this.width, this.height, this.left, this.top, this.width, this.height);
	}