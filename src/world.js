//COLORS
var COLOR  = { BLACK: '#00000', YELLOW: '#ECD078', BRICK: '#D95B43', PINK: '#C02942', PURPLE: '#542437', GREY: '#333', SLATE: '#53777A' },
    COLORS = [ COLOR.PINK, COLOR.YELLOW, COLOR.BRICK, COLOR.BLACK, COLOR.PURPLE, COLOR.GREY ];

Tile = function(left, top, width, height, context,tileId){
		this.tileId= tileId;
		this.tileData = new Rectangle (left, top, width, height);
		this.colorData = 0;
		this.context = context;

		this.tileData.left = left * width;
		this.tileData.top = top * height;

		//How much tiles in tileset's image row
		this.tilePerRow = 5;
		this.tilePercol = 5;

	}

	Tile.prototype.setTile = function()
	{
		var destinationX = this.tileData.left ;
		var destinationY = this.tileData.top ;

		this.context.fillRect(destinationX, destinationY, this.tileData.width, this.tileData.height);
	}

	Tile.prototype.drawTile = function(tile, image, camera)
	{
		canvas = document.getElementById("canvas");

		var sourceX = tile % this.tilePerRow;
		var sourceY = Math.floor(tile / this.tilePerRow);

		var destinationX = this.tileData.left;
		var destinationY = this.tileData.top;

		
		this.context.drawImage(A.retrieve("assets/tileset2.png"), 
			sourceX * this.tileData.width, sourceY * this.tileData.height, this.tileData.width, this.tileData.height, 
			destinationX , destinationY , this.tileData.width, this.tileData.height);
	}

	Tile.prototype.setColor = function(colorData)
	{
		this.context.fillStyle =  colorData;
	}

   
	Map = function(mapData, context, width, height){


		this.width = width;
		this.height = height;

		this.map = mapData || console.log("Map hasn't been set");
		this.mapArray = this.map.mapArray;

		this.tileWidth = this.map.tileWidth;
		this.tileHeight = this.map.tileHeight || tileWidth;

		//this.image = image;
		//this.tilesize = null;
		//this.tileset = tileset || console.log("tileset hasn't been set");

		this.world = [];

		this.context = context;
		
	}

    Map.prototype.getMap = function(x , y){

    	return this.map.mapArray[x + (y * this.tileWidth)];
    }
    Map.prototype.makeWorld = function()
    {
    	for(var r = 0; r < this.tileWidth; r++)
    	{
			for(var c = 0; c < this.tileHeight; c++)
			{
				var context = document.getElementById("canvas");
				var tileId = this.getMap(r,c);
				var tile = new Tile(r, c, 32, 32, context, tileId);
				this.world.push(tile);

			}
		}
		return this.world;

    }
    Map.prototype.getCollisionMap = function(x , y){
    	
    	return this.map.mapArray[x + (y * this.tileWidth)];
    }

    Map.prototype.drawFromTileset = function(context)
    {
		for(var r = 0; r < this.tileWidth; r++){
			for(var c = 0; c < this.tileHeight; c++){

				var w = 32;
				var h = 32;

				var tile = this.getMap(r,c); //maybe some predef function after goten r/x c/y cords (in tiles)

				tempTile = new Tile(r, c, w, h, context);
				//tempTile.drawTile(tile, A.retrieve("assets/tileset2.png"), this.camera);
			}
		}
    }

    Map.prototype.drawFromColors = function(context)
    {
    	for(var r = 0; r < this.tileHeight; r++){
				for(var c = 0; c < this.tileWidth; c++){

               		var tile = this.getMap(c,r);

          			tempTile = new Tile(c , r, 32, 32, context);
          			tempTile.setColor(COLORS[tile]);
          			tempTile.setTile();

            	}
        	}
    }

	Map.prototype.draw = function()
	{
	/*
		!!!!!! get this working !!!!!!

		if(this.tileset !== null){
			this.drawFromTileset(context);
		} else
		
	*/
		this.drawFromColors(this.context);
		
    }