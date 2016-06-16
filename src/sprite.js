Sprite = function(options)
{
	var sprite = this;
		sprite.frameIndex = 0,
		sprite.tickCount = 0,
		sprite.ticksPerFrame = options.ticksPerFrame || 0,
		sprite.numberOfFrames = options.numberOfFrames || 1;
		
		sprite.width = options.width;
		sprite.height = options.height;
		sprite.image = options.image;
		sprite.x = options.x;
		sprite.y = options.y;
		
		sprite.update = function () {

			sprite.tickCount += 1;

            if (sprite.tickCount > sprite.ticksPerFrame) {

				sprite.tickCount = 0;
				
                // If the current frame index is in range
                if (sprite.frameIndex < sprite.numberOfFrames - 1) {	
                    // Go to the next frame
                    sprite.frameIndex += 1;
                } else {
                    sprite.frameIndex = 0;
                }
            }
        };
		
		sprite.drawAnimated = function(context, x, y, width, height) 
		{	
		  context.drawImage(
		    sprite.image,
		    sprite.frameIndex * sprite.width,
		    0,
		    sprite.width,
		    sprite.height,
		    x,
		    y,
		    width,
		    height);
		};
		
		sprite.draw = function (context, x, y, width, height) 
		{	
		  context.drawImage(
		    sprite.image,
		    0,
		    0,
		    sprite.width,
		    sprite.height,
		    x,
		    y,
		    width,
		    height);
		};
		
}

	
