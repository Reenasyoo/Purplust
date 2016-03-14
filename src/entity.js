Entity = function(x, y, width, height, map, sprite)
{	
	this.map = map;

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
	//this.speed = speed || 25;

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

	this. sprite;
	//this. spriteObj;
	//this.sprite = new Sprite(sprite,[1,2,3], 3, this.x, this.y, this.width, this.height);
}

	Entity.prototype.setSprite = function(sprite)
	{
		//this.sprite = sprite;
		this.sprite = Sprite({
			sprite :sprite,
			x: this.x, 
			y: this.y,
			width: this.width,
			height: this.height,
			numberOfFrames : 3,
			ticksPerFrame : 1
		});
	}
	Entity.prototype.draw = function(context, color) 
	{
	/*
		context.fillStyle = color || "green";
		context.fillRect(this.x, this.y , this.width, this.height);
	*/	
		this.sprite.draw(context);
		
		//context.drawImage(this.sprite, 0, 0, this.width, this.height, this.x, this.y, this.width,this.height);
	}
	Entity.prototype.update = function()
	{
		this.move(dt);
		this.collision(dt);
		this.sprite.update();
	}


	//Should make it more generic
	//BUT HOW?
	Entity.prototype.move = function(dt)
	{
		



		/*
		//should do smth about this
		//and move.left, right ..
		var move;

		if(move.left)
		{
			this.velocityX -= this.acceleration * dt;
		}

		if(move.right)
		{
			this.velocityX += this.acceleration * dt;
		}

		if(move.up)
		{
			this.velocityY -= this.acceleration * dt;
		}
		if(move.down)
		{
			this.velocityY += this.acceleration * dt;
		}
		if(move.jump)
		{
			Jump();
		}
	*/	
		//Jump
		if (32 in keysDown && !this.jumping && !this.falling)
		{
			this.Jump();
		}
		
		//left
		if (65 in keysDown)
		{
			this.velocityX -= this.acceleration * dt;
			this.sprite.update();
		}

		//Right
		if(68 in keysDown)
		{
			this.velocityX += this.acceleration * dt;
			this.sprite.update();
		}

		//Friction for smooth slowing down
		this.velocityX -= this.velocityX * this.friction * dt;

		//Update entity position from input
		this.y += this.velocityY * dt;
		this.x += this.velocityX * dt;

	}
	//working tilebased collision with gravity
	//have bugs:
	// #diognal collision
	Entity.prototype.collision = function(dt)
	{
		//COLLISION

		var nextTop 	= this.velocityY * dt;
		var nextLeft 	= this.velocityX * dt;
		var tileLeft 	= pixelToTileCord(this.x, 32);
		var tileTop 	= pixelToTileCord(this.y, 32);

		/*
		var block 		= this.tileCollide(this.x, this.y);
		var right 		= this.tileCollide(this.x + this.width, this.y);
		var down 		= this.tileCollide(this.x, this.y + this.height);
		var diag 		= this.tileCollide(this.x + this.width, this.y + this.height);
		*/

		var block 		= this.tileCollide(tileLeft, tileTop);
		var right 		= this.tileCollide(tileLeft + 1, tileTop);
		var down 		= this.tileCollide(tileLeft, tileTop + 1);
		var diag 		= this.tileCollide(tileLeft + 1, tileTop + 1);

		var overlapX 	= this.x % 32;
		var overlapY 	= this.y % 32;


		//Gravity check
		this.Fall();

		// Ceiling
		if(this.velocityY < 0){
			if ((block && !down) || (right && !diag && overlapX))
			{
				this.y 	= tileToPixelCord(tileTop + 1, 32);
				this.velocityY 	= 0;
				block 		= down;
				right 		= diag;
				overlapY 	= 0;
			}
		}

		//ground
		if (this.velocityY > 0){
			if((down && !block) || (diag && !right && overlapX))
			{
				this.y = tileToPixelCord(tileTop, 32);
				this.velocityY = 0;
				this.falling = false;
				this.jumping = false;
				overlapY = 0;
			}
		}

		//Left
		if(this.velocityX < 0){
			if ((block && !right) || ( down && !diag && overlapY))
			{
				this.x = tileToPixelCord(tileLeft +1, 32);
				this.velocityX = 0;
			}
		}

		// Right
		if(this.velocityX > 0){
			if ((right && !block) || ( !down && diag && overlapY))
			{
				this.x = tileToPixelCord(tileLeft , 32);
				this.velocityX = 0;
			}
		}
	}

	Entity.prototype.tileCollide = function(cordX, cordY)
	{
		//this.map.tilewidth - we should change this
		// to some global variable from main game class maybe
		if( (cordX >= 0) && (cordX <= this.map.tileWidth) &&
			(cordY >= 0) && (cordY <= this.map.tileHeight))
		{	
			t = this.map.getMap(cordX , cordY ); 
 			this.canMove = !(t == 0);
		}
		return this.canMove;
	}

	Entity.prototype.Jump = function()
	{
		this.velocityY  -= this.force;
		this.jumping = true;
	}

	Entity.prototype.Fall = function()
	{
		this.velocityY += this.tempGravity;
		this.falling = true;
	}

	

//Purpl.Entity = Entity; 
