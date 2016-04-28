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
function lineToAngle(ctx, x1, y1, length, angle) {

    angle *= Math.PI / 180;
    
    var x2 = x1 + length * Math.cos(angle),
        y2 = y1 + length * Math.sin(angle);
    
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    return {x: x2, y: y2};
}

Entity = function(options)
{	
	var entity = this;

	entity.map = options.map;

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
	
	entity.draw = function(context, color) 
	{	
		//for debuging
		//context.fillStyle = color || "green";
		//context.fillRect(entity.x, entity.y , entity.width, entity.height);
		
		if(entity.moving)
		{
			if(entity.direction == 'left')
			{
				context.save();
				context.scale(-1,1);
				entity.sprite.drawAnimated(context, -entity.x - entity.width, entity.y, entity.width, entity.height);
				context.restore();
			}
			if( entity.direction == 'right')
			{
				context.save();
				entity.sprite.drawAnimated(context, entity.x, entity.y, entity.width, entity.height);
				context.restore();
			}
		}
		else
		{
			entity.sprite.draw(context, entity.x, entity.y, entity.width, entity.height);
		}
		
	};
	entity.update = function(dt)
	{	
		entity.y += entity.velocityY * dt;
		entity.x += entity.velocityX  * dt;
		entity.collision();
	};

	//working tilebased collision with gravity
	//have bugs:
	// #diognal collision
	entity.collision = function()
	{
		//COLLISION
				//Gravity check
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

	entity.tileCollide = function(cordX, cordY)
	{
		//entity.map.tilewidth - we should change entity
		// to some global variable from main game class maybe
		if( (cordX >= 0) && (cordX <= entity.map.tileWidth) &&
			(cordY >= 0) && (cordY <= entity.map.tileHeight))
		{	
			t = entity.map.getMapTileId(cordX , cordY ); 
 			entity.canMove = !(t == 0);
		}
		return entity.canMove;
	};

	entity.Jump = function()
	{
		entity.velocityY  -= entity.force;
		entity.jumping = true;
	};

	entity.Fall = function()
	{
		entity.velocityY += entity.tempGravity;
		entity.falling = true;

	};

}

Actor = function(options){

	var actor = this;
		actor.entity;
		//actor = actor.entity;
		actor.characterName = options.characterName;
		actor.stats = {
			health : 10, 
			agility : 10,
			power : 10,
		};
		actor.race = options.race;
		actor.clas = options.clas;
		actor.level = 69;
		actor.profession = "Woodcutter";

		actor.backpack = false;
		actor.wepon = false;

		
		//actor.atack

		actor.update = function(dt, keyboard, input)
		{
			actor.wepon = {
				x : actor.entity.x + 5,
				y : actor.entity.y + 25,
				width : 25,
				height : 4,
				degrees : -20,
			}
			
			actor.entity.y += actor.entity.velocityY * dt;
			actor.entity.x += actor.entity.velocityX  * dt;
			
			actor.move(dt, keyboard);
			actor.entity.collision();

			if(input.attack){
				actor.attack(actor.wepon);
				console.log("F");	
			}
		};

		actor.draw = function(context)
		{	
			if(actor.entity.direction == 'left')
			{
				context.save();
				context.scale(-1,1);
				drawRotatedRect(context, -actor.wepon.x - actor.wepon.width , actor.wepon.y, actor.wepon.width, actor.wepon.height, actor.wepon.degrees);
				context.restore();
			}
			if(actor.entity.direction == 'right')
			{
				context.save();
				drawRotatedRect(context, actor.wepon.x, actor.wepon.y, actor.wepon.width, actor.wepon.height, actor.wepon.degrees);		
				context.restore();
			}

			
			//context.fillStyle = "red";
			//context.fillRect(, actor.wepon.y,actor.wepon.width, actor.wepon.height);


		};
		//Should make it more generic
		//BUT HOW?
		actor.move = function(dt, keysDown)
		{
			//Jump
			if (32 in keysDown && !actor.entity.jumping && !actor.entity.falling)
			{
				actor.entity.Jump();
				actor.entity.moving = true;
			}
			
			//left
			if (65 in keysDown)
			{
				actor.entity.velocityX -= actor.entity.acceleration * dt;
				actor.entity.direction = 'left';
				actor.entity.moving = true;
				actor.entity.sprite.update();
			}

			//right
			if(68 in keysDown)
			{
				actor.entity.velocityX += actor.entity.acceleration * dt;
				actor.entity.direction = 'right';
				actor.entity.moving = true;
				actor.entity.sprite.update();
			}
			//console.log(entity.direction);
			//Friction for smooth slowing down
			actor.entity.velocityX -= actor.entity.velocityX * actor.entity.friction * dt;
	 
			//console.log(entity.x);

		};
		actor.attack = function(wepon){
			
			
			wepon.degrees = wepon.degrees + 30;
		};

}
/*
			ctx.beginPath();
    		lineToAngle(ctx, x, y, length, angle);
    		ctx.lineWidth = 10;
    		ctx.stroke();

		    angle += dlt;
		    if (angle < -90 || angle > 0) dlt = -dlt;
*/
