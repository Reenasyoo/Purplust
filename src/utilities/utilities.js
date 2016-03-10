function collides(a, b) {
    return 
    	a.left < b.left + b.width &&
    	a.left + a.width > b.left &&
   		a.top < b.top + b.height &&
    	a.top + a.height > b.top;
}

var tileToPixelCord = function(tile, tilesize) 
{ 
	return tile*tilesize;
}
var pixelToTileCord = function(pixel, tilesize) 
{ 
	return Math.floor(pixel/tilesize);
}