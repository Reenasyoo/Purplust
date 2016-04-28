//COLORS
var COLOR  = { BLACK: '#00000', YELLOW: '#ECD078', BRICK: '#D95B43', PINK: '#C02942', PURPLE: '#542437', GREY: '#333', SLATE: '#53777A' },
    COLORS = [ COLOR.PINK, COLOR.YELLOW, COLOR.BRICK, COLOR.BLACK, COLOR.PURPLE, COLOR.GREY ];
   
	Map = function(mapData, context, sprite , width, height ){

		//this.width = width;
		//this.height = height;

		this.map = mapData || console.log("Map hasn't been set");
		this.mapArray = this.map.mapArray;

		this.tileWidth = this.map.tileWidth;
		this.tileHeight = this.map.tileHeight || tileWidth;

		//this.image = image;
		//this.tilesize = null;
		//this.tileset = tileset || console.log("tileset hasn't been set");

		this.tileset = true;
		this.context = context;
		this.sprite = sprite;
		
	}

	Map.prototype.draw = function()
	{
		if(this.tileset){
			this.drawFromTileset(this.context);
		}
		else
		{
			this.drawFromColors(this.context);
		}
    }

    Map.prototype.getMapTileId = function(x , y){

    	var tileId = this.map.mapArray[x + (y * this.tileWidth)];
    	return tileId;
    }
    Map.prototype.drawFromTileset = function(context)
    {
		for(var r = 0; r < this.tileWidth; r++){
			for(var c = 0; c < this.tileHeight; c++){
               	var tileWidth = this.tileSize;
               	var tileHeight = this.tileSize;
				var tile = this.getMapTileId(r,c); //maybe some predef function after goten r/x c/y cords (in tiles)

				tempTile = new Tile(r, c, 32, 32, context);
				tempTile.drawTile(tile, this.sprite);
			}
		}
    }

    Map.prototype.drawFromColors = function(context)
    {
    	for(var r = 0; r < this.tileHeight; r++){
			for(var c = 0; c < this.tileWidth; c++){

               	var tile = this.getMapTileId(c,r);
               	var tileWidth = this.tileSize;
               	var tileHeight = this.tileSize;
          		tempTile = new Tile(c , r, 32, 32, context);
          		tempTile.setColor(COLORS[tile]);
          		tempTile.setTile();
            }
        }
    }

Tile = function(left, top, width, height, context){
		this.tileData = new Rectangle (left, top, width, height);
		this.colorData = 0;
		this.context = context;

		this.tileData.left = left * width;
		this.tileData.top = top * height;

		//How much tiles in tileset's image row
		// should make it optional
		this.tilePerRow = 5;
		this.tilePercol = 5;
		//should make it optional
		this.tileSize = 32;

	}

	Tile.prototype.setTile = function()
	{
		this.context.rect(this.tileData.left, this.tileData.top, this.tileData.width, this.tileData.height);
	}

	Tile.prototype.setColor = function(colorData)
	{
		this.context.fillStyle =  colorData;
	}
	Tile.prototype.drawTile = function(tile, image)
	{
		canvas = document.getElementById("canvas");

		var sourceX = tile % this.tilePerRow;
		var sourceY = Math.floor(tile / this.tilePerRow);

		var destinationX = this.tileData.left;
		var destinationY = this.tileData.top;

		
		this.context.drawImage(image, 
			sourceX * this.tileData.width, sourceY * this.tileData.height, this.tileData.width, this.tileData.height, 
			destinationX , destinationY , this.tileData.width, this.tileData.height);
	}