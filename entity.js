Entity = function(x, y, width, height, speed)
{
	this.x = x; 
	this.y = y;
	this.width = width;
	this.height = height;

	//this is first speed
	//it eventualy will calculate itself from stats
	this.speed = speed || 25;

	this.sprite;
}

	Entity.prototype.setSprite = function(sprite)
	{
		this.sprite = sprite;
		return this.sprite;
	}

	Entity.prototype.move = function()
	{
		
	}



Purpl.Entity = Entity; 

Actor = function(x, y, width, height, speed){
		
		this.entity = new Purpl.Entity(x, y, width, height, speed);
		

		this.jumping = false;
		this.falling = false;
		this.canMove = false;

		//this is calculatinge now in update function
		//we should maybe calculate it from some were else
		//or we need t use Vector2 function
		this.velocityX = 0;
		this.velocityY = 0;
/*
		race = {
			human
			beast
			fat_chick
		}

		job = {
			//tailor
			//smithing
		}

		//put this in server maybe
		stats = {
			agility : 10;
			power : 10;
			//etc...
		}
*/

		//this could be CONSTANT or we calcuate it and put it in pysic
		this.friction = 1.5;
		this.maxSpeed = 200; // temp 

		//we should calculate it from actor stats
		this.acceleration = 200;

		this.force = 220; //jump acceleration for now

		//put this in world class and return it here or in specific class, or in pysics engine
		//witch works with world class and world class works with actor/entity class
		this.tempGravity = 10;


		//fix: change were map is called in map call or smth
		this.map = map;

		//fix: change cameras wiewport in map generation proces or smth
		this.camera = camera;


	}


	//refactor this!!!
	Actor.prototype.draw = function(context) 
	{
		
		context.fillStyle = "green";
		context.fillRect(this.left, this.top , this.width, this.height);
		
	}

	//refacator this!!!
	Actor.prototype.tileCollide = function(cordX, cordY)
	{

		var tileCordLeft =  pixelToTileCord(cordX, 32);
		var tileCordTop =	 pixelToTileCord(cordY, 32);

		if(( tileCordLeft >= 0) && (tileCordLeft <= this.map.tileWidth) &&
			 (tileCordTop >= 0) && (tileCordTop <= this.map.tileHeight))
		{	

			t = this.map.getMap(tileCordLeft , tileCordTop ); 
 			this.canMove = !(t == 0);
		}
		return this.canMove;
	}

	Actor.prototype.Jump = function()
	{
		this.velocityY  -= this.force;
		this.jumping = true;
		//this.falling = true;
	}

	Actor.prototype.Fall = function()
	{
		this.velocityY += this.tempGravity;
		
		//this.jumping = false;
	}

	//thiw propably we dont need here
	Actor.prototype.set = function(left, top, width, height, speed)
	{
		this.left = left;
		this.top = top;
		this.width = width;
		this.height = height;
		this.speed = speed;
	}

	Actor.prototype.move = function(step)
	{
		//Jump
		if (32 in keysDown && !this.jumping && !this.falling)
		{
			this.Jump();
		}

		//left
		if (65 in keysDown)
		{
			this.velocityX -= this.acceleration * step;
		}

		//Right
		if(68 in keysDown)
		{
			this.velocityX += this.acceleration * step;
		}

		this.velocityX -= this.velocityX * this.friction * step;

		this.top += this.velocityY * step;
		this.left += this.velocityX * step;

	}
	//refactor this
	Actor.prototype.update = function(step)
	{
		
		//mby change this
		this.move(step);

		//COLLISION
		/*
			maybe we should change moust of this
			
		*/

		var cX = pixelToTileCord(this.camera.viewportX, 32);
		var cY = pixelToTileCord(this.camera.viewportY, 32);
		var cxx = this.camera.viewportX;
		var cyy = this.camera.viewportY;
		
		var nextTop 	= this.velocityY * step;
		var nextLeft 	= this.velocityX * step;
		var block 		= this.tileCollide(this.left, this.top);
		var right 		= this.tileCollide(this.left + this.width, this.top);
		var down 		= this.tileCollide(this.left, this.top + this.height);
		var diag 		= this.tileCollide(this.left + this.width, this.top + this.height);
		var overlapX 	= this.left % 32;
		var overlapY 	= this.top % 32;
		var tileLeft 	= pixelToTileCord(this.left, 32);
		var tileTop 	= pixelToTileCord(this.top, 32);

		//Gravity check
		this.Fall();

		// Ceiling
		if(this.velocityY < 0){
			if ((block && !down) || (right && !diag && overlapX))
			{
				this.top 	= tileToPixelCord(tileTop + 1, 32);
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
				this.top = tileToPixelCord(tileTop, 32);
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
				this.left = tileToPixelCord(tileLeft +1, 32);
				this.velocityX = 0;
				this.jumping = false;
			}
		}

		// Right
		if(this.velocityX > 0){
			if ((right && !block) || ( !down && diag && overlapY))
			{
				this.left = tileToPixelCord(tileLeft , 32);
				this.velocityX = 0;
				this.jumping = false;
			}
		}

	}