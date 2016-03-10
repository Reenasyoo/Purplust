Entity = function(x, y, width, height, speed)
{
	this.x = x; 
	this.y = y;
	this.width = width;
	this.height = height;

	//this is calculatinge now in update function
	//we should maybe calculate it from some were else
	//or we need t use Vector2 function
	this.velocityX = 0;
	this.velocityY = 0;

	//this is first speed
	//it eventualy will calculate itself from stats
	this.speed = speed || 25;

	//this could be CONSTANT or we calcuate it and put it in pysic
	this.friction = 1.5;
	this.maxSpeed = 200; // temp 

	//we should calculate it from actor stats
	this.acceleration = 200;

	this.force = 220; //jump acceleration for now

	//put this in world class and return it here or in specific class, or in pysics engine
	//witch works with world class and world class works with actor/entity class
	this.tempGravity = 10;

	this.jumping = false;
	this.falling = false;
	this.canMove = false;

	this.sprite;
}

	Entity.prototype.setSprite = function(sprite)
	{
		this.sprite = sprite;
		return this.sprite;
	}

	//Should make it more generic
	//BUT HOW?
	Entity.prototype.move = function()
	{	
		//should do smth about this
		//and move.left, right ..
		var move;

		if(move.left)
		{
			this.velocityX -= this.acceleration * step;
		}

		if(move.right)
		{
			this.velocityX += this.acceleration * step;
		}

		if(move.up)
		{
			this.velocityY -= this.acceleration * step;
		}
		if(move.down)
		{
			this.velocityY += this.acceleration * step;
		}
		if(move.jump)
		{
			Jump();
		}

		//Friction for smooth slowing down
		this.velocityX -= this.velocityX * this.friction * step;

		//Update entity position from input
		this.x += this.velocityY * step;
		this.y += this.velocityX * step;
	}

	Entity.prototype.Jump = function()
	{
		this.velocityY  -= this.force;
		this.jumping = true;
	}

	Entity.prototype.draw = function(context, color) 
	{
		context.fillStyle = color || "green";
		context.fillRect(this.x, this.y , this.width, this.height);
	}

Purpl.Entity = Entity; 
