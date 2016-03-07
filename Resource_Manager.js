ResourceManager = function()
{
	this.downloadQueue = [];
	this.cache = {};
	this.successCount = 0;
    this.errorCount = 0;
    this.types = ['png', 'jpg'];
    this.path = 'images';
}

ResourceManager.prototype.load_Resource = function(image, path)
{	

	if(path == null)
	{
		var splited = image.split('.');
		var name = splited[O];
		var type = splited[1];
	}

	if(type.indexOf(this.types))
	{
		var path = this.path;
	}
	else
	{
		console.log("no such file type");
	}

	var link = path + "/" + name + '.' + type;
	this.downloadQueue.push(link);
	
}

// not mine now. refactoring this..
ResourceManager.prototype.isLoaded = function() {
    return (this.downloadQueue.length == this.successCount + this.errorCount);
}

ResourceManager.prototype.LoadAll = function(callback) {
  if (this.downloadQueue.length === 0) {
      callback();
  }

    for (var i = 0; i < this.downloadQueue.length; i++) {
        var path = this.downloadQueue[i];
        var img = new Image();
        var that = this;
        img.addEventListener("load", function() {
            this.successCount += 1;
            if (that.isLoaded()) {
        		callback();
    		}
        }, false);
        img.addEventListener("error", function() {
        	this.errorCount += 1;
        	if (that.isLoaded()) {
		        callback();
		    }
    	}, false);
        //type is used for path determination if pat is not declareted in resource loder
        //img.src = path + name + type
        img.src = ;
        this.cache[path] = img;
    }
}

ResourceManager.prototype.get = function(path) {
    return this.cache[path];
}

//USAGE
var ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.load_Resource('img/earth.png');
ASSET_MANAGER.downloadAll(function() {
    var sprite = ASSET_MANAGER.getAsset('img/earth.png');
    ctx.drawImage(sprite, x - sprite.width/2, y - sprite.height/2);
});
