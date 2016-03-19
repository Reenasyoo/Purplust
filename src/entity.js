Entity = function(options)
{	
	var entity = this;

	this.map = options.map;

	this.x = options.x; 
	this.y = options.y;
	this.width = options.width;
	this.height = options.height;

	//this is calculatinge now in update function
	//we should maybe calculate it from some were else
	//or we need t use Vector2 function
	this.velocityX = 0;
	this.velocityY = 0;

	this.direction = options.direction || 'right';

	//this is first speed
	//it eventualy will calculate itself from stats
	//this.speed = speed || 25;

	//this could be CONSTANT or we calcuate it and put it in pysic
	this.friction = 0.01;
	//we should calculate it from actor stats
	this.acceleration = 0.0018;

	this.force = 0.2; //jump acceleration for now

	//put this in world class and return it here or in specific class, or in pysics engine
	//witch works with world class and world class works with actor/entity class
	this.tempGravity = 0.01;

	this.jumping = false;
	this.falling = false;
	this.canMove = false;

	this.sprite;
	//this. spriteObj;
	//this.sprite = new Sprite(sprite,[1,2,3], 3, this.x, this.y, this.width, this.height);
	entity.draw = function(context, color) 
	{
		if(this.direction == 'left')
		{
			context.save();
			//context.translate(this.width/2, this.height/2);
			context.scale(-1,1);
			//context.fillStyle = color || "green";
			//context.fillRect(this.x, this.y , this.width, this.height);
			this.sprite.draw(context, -this.x - this.width, this.y, this.width, this.height);
			context.restore();
		}
		if( this.direction == 'right')
		{
			context.save();
			//context.translate(this.width/2, this.height/2);
			//context.fillStyle = color || "green";
			//context.fillRect(this.x, this.y , this.width, this.height);
			this.sprite.draw(context, this.x, this.y, this.width, this.height);
			context.restore();
		}
		
	};
	entity.update = function(dt, keysDown)
	{
		this.move(dt, keysDown);
		this.collision();
	};


	//Should make it more generic
	//BUT HOW?
	entity.move = function(dt, keysDown)
	{
		//Jump
		if (32 in keysDown && !this.jumping && !this.falling)
		{
			this.Jump();
		}
		
		//left
		if (65 in keysDown)
		{
			this.velocityX -= this.acceleration * dt;
			
			this.direction = 'left';
			this.sprite.update();
		}

		//right
		if(68 in keysDown)
		{
			this.velocityX += this.acceleration * dt;
			this.direction = 'right';
			this.sprite.update();
		}
		//console.log(this.direction);
		//Friction for smooth slowing down
		this.velocityX -= this.velocityX * this.friction * dt;

		//Update entity position from input
		this.y += this.velocityY * dt;
		this.x += this.velocityX  * dt;

		//console.log(this.x);

	};
	//working tilebased collision with gravity
	//have bugs:
	// #diognal collision
	entity.collision = function()
	{
		//COLLISION


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
	};

	entity.tileCollide = function(cordX, cordY)
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
	};

	entity.Jump = function()
	{
		this.velocityY  -= this.force;
		this.jumping = true;
	};

	entity.Fall = function()
	{
		this.velocityY += this.tempGravity;
		this.falling = true;
	};

}
