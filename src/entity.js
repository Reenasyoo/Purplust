function drawRotatedRect(ctx, x, y, width, height, degrees) {

			    // first save the untranslated/unrotated context
			    ctx.save();

			    ctx.beginPath();
			    // move the rotation point to the center of the rect
			    ctx.translate(x + width/2, y+ height/2);
			    // rotate the rect
			    ctx.rotate(degrees * Math.PI / 180);

			    // draw the rect on the transformed context
			    // Note: after transforming [0,0] is visually [x,y]
			    //       so the rect needs to be offset accordingly when drawn
			    ctx.rect(0, -height, width, height);

			    ctx.fillStyle = "gold";
			    ctx.fill();

			    // restore the context to its untranslated/unrotated state
			    ctx.restore();

			}

Entity = function(options)
{	
	var entity = this;

	entity.map = options.map;
	entity.type = options.type;

	entity.x = options.x; 
	entity.y = options.y;
	entity.width = options.width;
	entity.height = options.height;

	//entity is calculatinge now in update function
	//we should maybe calculate it from some were else
	//or we need t use Vector2 function
	entity.velocityX = 0;
	entity.velocityY = 0;

	entity.direction = options.direction || 'right';

	//entity is first speed
	//it eventualy will calculate itself from stats
	//entity.speed = speed || 25;

	//entity could be CONSTANT or we calcuate it and put it in pysic
	entity.friction = 0.01;
	//we should calculate it from actor stats
	entity.acceleration = 0.0018;

	entity.force = 0.2; //jump acceleration for now

	//put entity in world class and return it here or in specific class, or in pysics engine
	//witch works with world class and world class works with actor/entity class
	entity.tempGravity = 0.01;

	entity.jumping = false;
	entity.falling = false;
	entity.canMove = false;
	entity.moving = false;

	entity.sprite;
	entity.healthBar;

	entity.health = 10;
	entity.wepon = false;

	
	
	entity.draw = function(context) 
	{	
		
		if(entity.moving)
		{
			if(entity.direction == 'left')
			{
				context.save();
				context.scale(-1,1);
				entity.sprite.drawAnimated(context, -entity.x - entity.width, entity.y, entity.width, entity.height);
				drawRotatedRect(context, -entity.wepon.x - entity.wepon.width , entity.wepon.y, entity.wepon.width, entity.wepon.height, entity.wepon.degrees);
				context.restore();
			}
			if( entity.direction == 'right')
			{
				context.save();
				entity.sprite.drawAnimated(context, entity.x, entity.y, entity.width, entity.height);
				drawRotatedRect(context, entity.wepon.x, entity.wepon.y, entity.wepon.width, entity.wepon.height, entity.wepon.degrees);
				context.restore();
			}
		}
		else
		{
			entity.sprite.draw(context, entity.x, entity.y, entity.width, entity.height);
		}

		if (typeof entity.healthBar != "undefined" ) {
			entity.healthBar.draw();
		}
		
	};
	entity.update = function(dt, engine)
	{	
		entity.wepon = {
				x : entity.x + 5,
				y : entity.y + 25,
				width : 25,
				height : 4,
				degrees : -20,
			}
		
		
		entity.y += entity.velocityY * dt;
		entity.x += entity.velocityX * dt;
		

		if (entity.type == "enemy") {
			entity.AI(engine.actor, dt);

		};
		
		entity.collision();
		
		
		//console.log(entity);
		entity.healthBar.update(entity.health, entity);
	};

	//working tilebased collision with gravity
	//have bugs:
	// #diognal collision
	//entitijas kolizijas metode
	entity.collision = function()
	{
		//COLLISION
		//Gravity check
		//gravitacijas parbaude
		entity.Fall();

		var tileLeft 	= pixelToTileCord(entity.x, 32);
		var tileTop 	= pixelToTileCord(entity.y, 32);

		/*
		var block 		= entity.tileCollide(entity.x, entity.y);
		var right 		= entity.tileCollide(entity.x + entity.width, entity.y);
		var down 		= entity.tileCollide(entity.x, entity.y + entity.height);
		var diag 		= entity.tileCollide(entity.x + entity.width, entity.y + entity.height);
		*/

		var block 		= entity.tileCollide(tileLeft, tileTop);
		var right 		= entity.tileCollide(tileLeft + 1, tileTop);
		var down 		= entity.tileCollide(tileLeft, tileTop + 1);
		var diag 		= entity.tileCollide(tileLeft + 1, tileTop + 1);
		var overlapX 	= entity.x % 32;
		var overlapY 	= entity.y % 32;
	
		// Ceiling
		if(entity.velocityY < 0){
			if ((block && !down) || (right && !diag && overlapX))
			{
				entity.y 	= tileToPixelCord(tileTop + 1, 32);
				entity.velocityY 	= 0;
				block 		= down;
				right 		= diag;
				overlapY 	= 0;
			}
		}
			//ground
			if (entity.velocityY > 0){
				if((down && !block) || (diag && !right && overlapX))
				{
					entity.y = tileToPixelCord(tileTop, 32);
					entity.velocityY = 0;
					entity.falling = false;
					entity.jumping = false;
					overlapY = 0;
				}
			}
			//Left
			if(entity.velocityX < 0){
				if ((block && !right) || ( down && !diag && overlapY))
				{
					entity.x = tileToPixelCord(tileLeft +1, 32);
					entity.velocityX = 0;
				}
			}
			// Right
			if(entity.velocityX > 0){
				if ((right && !block) || ( !down && diag && overlapY))
				{
					entity.x = tileToPixelCord(tileLeft , 32);
					entity.velocityX = 0;
				}
			}
	};
	//parbaude ar kartes koliziju
	entity.tileCollide = function(cordX, cordY)
	{
		//entity.map.tilewidth - we should change entity
		// to some global variable from main game class maybe
		if( (cordX >= 0) && (cordX <= entity.map.tileWidth) &&
			(cordY >= 0) && (cordY <= entity.map.tileHeight))
		{	
			t = entity.map.getMapTileId(cordX , cordY); 
 			entity.canMove = !(t == 0);
		}
		return entity.canMove;
	};

	//entitijas leksanas funkcija
	entity.Jump = function()
	{
		entity.velocityY  -= entity.force;
		entity.jumping = true;
	};

	//entitijas krisanas funkcija
	entity.Fall = function()
	{	
		entity.velocityY += entity.tempGravity;
		entity.falling = true;

	};

	entity.attack = function(wepon, dt)
		{
			var speed = 2;
			var oldDeg = wepon.degrees;

			if (wepon.degrees < (oldDeg + 10)) {
				wepon.degrees += speed * dt;
			}
				
		}

	entity.AI = function(target, dt) {

		var hasTarget = false;
		var inFightingRange;

		entity.friction = 0.01;
	//we should calculate it from actor stats
		entity.acceleration = 0.001;

		//atalums no merka X kordinatas
		var disttanceFromTargetX = target.entity.x - entity.x;
		//atalums no merka X kordinatas
		var attalumsFromTargetY = target.entity.y - entity.y;

		//console.log(attalumsFromTargetX);

		var attacking;

		if ((disttanceFromTargetX < 100 && disttanceFromTargetX > 1) || (disttanceFromTargetX > -100 && disttanceFromTargetX < -1)) {
			hasTarget = true;
			

		}
		else {
			hasTarget = false;
			
		}
			
		if (hasTarget) {
			if (disttanceFromTargetX >= 30) {

			entity.velocityX += entity.acceleration * dt;
			entity.direction = 'right';
			entity.moving = true;
			entity.sprite.update();	
			}
			
			if (disttanceFromTargetX <= -30)  
			{
				entity.velocityX -= entity.acceleration * dt;
				entity.direction = 'left';
				entity.moving = true;
				entity.sprite.update();
			}	

		var isColliding = collides(entity.wepon, target.entity);
				if(isColliding)
				{
		           	target.stats.health -= 1 /dt;
		           	console.log(target.stats.health);   
				}		
		
		};
		
		

		entity.velocityX -= entity.velocityX * entity.friction * dt;
		//console.log(attalumsFromTargetX);
		
	}

}


/*

var setAttack = function(){
				entity.attack(entity.wepon, dt);
				
				//var at = setTimeout(setAttack, 1000);
								
			}

			if(actor.entity.x - entity.x <= 42 && actor.entity.x - entity.x >= -32){
				var att = setTimeout(setAttack, 2000);
			}	

*/