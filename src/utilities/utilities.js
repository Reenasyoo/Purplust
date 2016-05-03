function collides(a, b) {
    return 
    	a.x < b.x + b.width &&
    	a.x + a.width > b.x &&
   		a.y < b.y + b.height &&
    	a.y + a.height > b.y;
}

var tileToPixelCord = function(tile, tilesize) 
{ 
	return tile*tilesize;
}
var pixelToTileCord = function(pixel, tilesize) 
{ 
	return Math.floor(pixel/tilesize);
}

function i2xy(index, mapWidth)
{
    var x = index % mapWidth;
    var y = Math.floor(index/mapWidth);
    return [x, y];
}

function xy2i(x, y, mapWidth)
{
    return y * mapWidth + x;
}

// merge objects
function merge(obj1, obj2){
    var obj3 = {};
    for(var attrname in obj1){ obj3[attrname] = obj1[attrname]; }
    for(var attrname in obj2){ obj3[attrname] = obj2[attrname]; }
    return obj3;
}
