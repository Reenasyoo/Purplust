Sprite = function(options)
{
	var that = {},
			frameIndex = 0,
			tickCount = 0,
			ticksPerFrame = options.ticksPerFrame || 0,
			numberOfFrames = options.numberOfFrames || 1;
		
		that.width = options.width;
		that.height = options.height;
		that.sprite = options.sprite;
		that.x = options.x;
		that.y = options.y;
		
		that.update = function () {

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
		
		that.draw = function (context) {
		  // Draw the animation
		  //this.update();
		  context.drawImage(
		    that.sprite,
		    frameIndex * that.width,
		    0,
		    that.width,
		    that.height,
		    that.x,
		    that.y,
		    that.width,
		    that.height);
		};
		
		return that;
}

	
