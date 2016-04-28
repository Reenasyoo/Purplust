Actor = function(options){

	var actor = this;
		actor.entity;
		actor.stats = {
			health : 10, 
			agility : 10,
			power : 10,
		};
		actor.race = options.race;

		actor.update = function(dt, keysDown)
		{
			actor.entity.y += actor.entity.velocityY * dt;
			actor.entity.x += actor.entity.velocityX  * dt;
			actor.move(dt, keysDown);
			actor.entity.collision();
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

}