

Sprite = function(options)
{
	var sprite = this;
		frameIndex = 0,
		tickCount = 0,
		ticksPerFrame = options.ticksPerFrame || 0,
		numberOfFrames = options.numberOfFrames || 1;
		
		sprite.width = options.width;
		sprite.height = options.height;
		sprite.image = options.image;
		sprite.x = options.x;
		sprite.y = options.y;
		
		sprite.update = function () {

			tickCount += 1;

            if (tickCount > ticksPerFrame) {

				tickCount = 0;
				
                // If the current frame index is in range
                if (frameIndex < numberOfFrames - 1) {	
                    // Go to the next frame
                    frameIndex += 1;
                } else {
                    frameIndex = 0;
                }
            }
        };
		
		sprite.drawAnimated = function(context, x, y, width, height) 
		{	
		  context.drawImage(
		    sprite.image,
		    frameIndex * sprite.width,
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

	
