//math.js

Vector2 = function(x,y)
{
	this.x = x || 0;
	this.y = y || 0;
}


Rectangle = function(left, top, width, height)
{
	this.width = width || 0;
	this.height = height || 0;
	this.left = left || 0;
	this.top = top || 0;
	this.right = this.left + this.width;
	this.bottom = this.top + this.height;
}

Rectangle.prototype.set = function(left, top, width, height)
{
	this.left = left;
	this.top = top;
	this.right = (this.left + this.width);
	this.bottom = (this.top + this.height);
	this.width = width || this.width;
	this.height = height || this.height;
}

Rectangle.prototype.within = function(r)
{
	return (r.left <= this.left &&
			r.right >= this.right &&
			r.top <= this.top &&
			r.bottom >= this.bottom);
}
//should make this just AABB function from utility class
Rectangle.prototype.COLLISION = function(a){
	return (this.left < a.right &&
			a.left < this.right &&
			this.top < a.bottom &&
			a.top < this.bottom);
}