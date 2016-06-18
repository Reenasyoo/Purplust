Actor = function(options){

	var actor = this;
		actor.entity;
		//actor = actor.entity;
		actor.characterName = options.characterName;
		actor.stats = {
			health : 10, 
			agility : 10,
			power : 10,
			level : 1,

		};
		actor.race = options.race;
		actor.klass = options.klass;
		actor.level = 69;
		actor.profession = "Woodcutter";

		actor.backpack = false;
		actor.wepon = false;
		actor.gotI = [];
		actor.healthBar;
		actor.Name;
		
		//saglabaa speletaja datus
		playerSettings.info[0].value = actor.characterName;
		playerSettings.info[1].value = actor.level;
		playerSettings.info[2].value = actor.race;
		playerSettings.info[3].value = actor.klass; 


		actor.update = function(dt, keyboard, input, entities, engine)
		{
					
			actor.Name.update(input);
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
				actor.attack(actor.wepon, dt);
				for (var i = 0; i < entities.length; i++) {
					var isColliding = collides(actor.entity, entities[i]);
					if(isColliding)
					{
	                	entities[i].health -= 3;
	                
	                	if (entities[i].health <= 0) {
	                		entities.splice(i, 1);
	                		i--;
	                	};
	                	
	                	//console.log(entities[i].health);
	                	//console.log("entities left: " + entities.length);
					}
				};
				
				//console.log("F");

			}
			input.attack = false;

			for (var i = 0; i < items.itemsList.length; i++) {
				
				//collision between player and item on map
				if (collides(actor.entity, items.itemsList[i])) {
					items.itemsList[i].visible = false;

					items.itemsList[i].location = "backpack";
					actor.gotI[i] = items.itemsList[i];


				}
			};
			actor.healthBar.update(actor.stats.health, actor.entity);

			if (actor.stats.health <= 0) {
				engine.paused = true;
				var end = document.getElementById('end');
				end.style.display = "table";
			};

		};

		actor.draw = function(context)
		{	
			actor.entity.draw(context);

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

			//console.log(actor.healthBar);
			actor.healthBar.draw();
			//actor.Name.draw();
			//console.log(actor.Name);
			
			
			//context.fillStyle = "red";
			//context.fillRect(, actor.wepon.y,actor.wepon.width, actor.wepon.height);


		};
		//Should make it more generic
		//BUT HOW?
		//aktiera kustibas funkcija
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
	

		};
		//aktiera uzbruksanas funkcija
		actor.attack = function(wepon, dt)
		{
			var speed = 2;
			var oldDeg = wepon.degrees;

			if (wepon.degrees < (oldDeg + 10)) {
				wepon.degrees += speed * dt;
			}
				
		}

}