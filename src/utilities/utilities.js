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

function intersects(o1, o2){
    if ((o1.x < o2.x + o2.width) && (o1.x + o1.width > o2.x)
        && (o1.y < o2.y + o2.height) && (o1.y + o1.height > o2.y))
    {
        return(true);
    }
}