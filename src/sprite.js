Sprite = function()
{
	//change everywere this with rectangle class
	//or triangle or circle class
	//x
	//y
	//width
	//height

	//sprite image source file
	this.sprite;
}


	//need to make animation
	Entity.prototype.Anim = function(context)
	{
		var img = new Image();
		img.src = 'assets/dud.png';
		context.drawImage(img, 0, 0,  this.width, this.height, this.left, this.top, this.width, this.height);
	}



	Sprite = function(asset, frames, animSpeed)
	{
		this.asset = asset;

		this.frames = frames; //frames in animation
		this.animationSpeed = animSpeed;

		this.counter = 0;
	}

	Sprite.prototype.update = function(dt)
	{
		this.counter += this.animationSpeed * dt;
	}

	Sprite.prototype.draw = function()
	{
		for (var i = 0; i < this.frames.length; i++) {
			
		}
	}