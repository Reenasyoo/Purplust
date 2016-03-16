/*
    TODO:
        #CECK IF RESOURCE NAME IS STRING OR SMTH WITH THAT IDEA
        #ADD AUDIO FILES
        #ADD VIDEO FILES
        #ADD MODELS ??
        #WHAT ELSE>?
        #ABILITY TO CHANGE RESOURCE PATH'S OR LOAD FROM SOME GAME SETTINGS??
*/
ResourceManager = function()
{
	this.downloadQueue = [];
	this.cache = {};
	this.successCount = 0;
    this.errorCount = 0;
    this.imageTypes = ['png', 'jpg'];
    this.audioTypes = [ 'wav', 'mp3'];
    this.audioPath = 'src/resources/audio';
    this.imagePath = 'src/resources/images';
}

ResourceManager.prototype.load_Resource = function(resourceName, path)
{	
//this should check the resource type and then select in witch
//queue put the resource
	if(path == null)
	{
		path = this.getPath(resourceName);
	}
	var link = path + "/" + resourceName;
	this.downloadQueue.push(link);
}

ResourceManager.prototype.getPath = function(resourceName)
{
    var path;
    var splited = resourceName.split('.');
    var name = splited[0];
    var type = splited[1];

    if(type.indexOf(this.imageTypes))
    {
        path = this.imagePath;
    }
    else if(type.indexOf(this.audioTypes))
    {
        path = this.audioPath;
    }
    else{ console.log("The file doesnt exist"); }

    return path;
}


// not mine now. refactoring this..
ResourceManager.prototype.isLoaded = function() {
    return (this.downloadQueue.length == this.successCount + this.errorCount);
}

ResourceManager.prototype.loadAll = function(callback) {
  if (this.downloadQueue.length === 0) {
      callback();
  }

    for (var i = 0; i < this.downloadQueue.length; i++) {
        var path = this.downloadQueue[i];
        var img = new Image();
        img.src = path;
        this.cache[path] = { image: img, loaded: false};

        var that = this;
        img.addEventListener("load", function() {
            this.successCount += 1;
            if (that.isLoaded()) {
        		this.cache[path].loaded = true;
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
        

        img.onload = function()
        {
            this.successCount += 1;
            if (that.isLoaded()) {
                callback();
            }
        }
        img.onerror = function()
        {
            this.errorCount += 1;
            if (that.isLoaded()) {
                callback();
            }
        }
    }
}

ResourceManager.prototype.get = function(resourceName) {

    //we should just enter name with type not full path
    path = this.getPath(resourceName);
    var link = path + "/" + resourceName;
    return this.cache[link];
}