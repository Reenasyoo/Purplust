var ground = {
    	mapArray : [
        22 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,22,
        22 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,22,
        22 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,22,
        22 , 20, 20, 20, 20, 20, 20, 20, 20, 20, 0 , 20, 20, 0 , 0 , 20, 20, 20,22,
        22 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,22,
        22 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,22,
        22 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,22,
        22 , 22, 22, 22, 0 , 0 , 22, 22, 22, 0 , 22, 22, 22, 0 , 0 , 0 , 0 , 22,22,
        22 , 22, 22, 22, 0 , 0 , 22, 22, 22, 0 , 22, 22, 22, 0 , 0 , 0 , 22, 22,22,
        22 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 22, 22,22,
        22 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 22, 22,22,
        22 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 22, 22, 22,22,
        22 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 22, 22, 22,22,
        22 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 20, 20, 0 , 22, 22, 22,22,
        22 , 0 , 0 , 0 , 0 , 20, 20, 0 , 0 , 0 , 0 , 20, 21, 0 , 0 , 0 , 0 , 0 ,0 ,
        22 , 20, 20, 20, 20, 21, 21, 20, 20, 20, 20, 21, 21, 20, 20, 20, 20, 20,20 ,
        22 , 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22],

        tileWidth : 19,
        tileHeight : 17,
    }

var game = new Purpl("canvas");
game.initializeCanvas();

game.load(['sprite', 'player', 'tileset']);

var m = new Map(ground, game.context, game.resources['tileset'].image);
game.world = m;
gui = new GUI(game.context);

gui.setActor(game.actor);

var e = new Entity({
    x : 150,
    y : 32,
    width : 32,
    height : 32,
    map : m,
});

e.healthBar = new gui.Bar({
    label : "Health",
    x : e.x,
    y : e.y,
    width : 32,
    height : 10,
    fullLenght : 10,
    currentLenght : 5,
});

e.sprite = new Sprite({
            image : game.resources['sprite'].image,
            width: 32,
            height: 32,
            numberOfFrames : 3,
            ticksPerFrame : 6,
});
game.entities.push(e);

var e2 = new Entity({
    x : 500,
    y : 32,
    width : 32,
    height : 32,
    map : m,
});
e2.sprite = new Sprite({
            image : game.resources['sprite'].image,
            width: 32,
            height: 32,
            numberOfFrames : 3,
            ticksPerFrame : 6,
});
e2.healthBar = new gui.Bar({
   // label : "Health",
    x : e2.x,
    y : e2.y,
    width : 32,
    height : 10,
    fullLenght : 10,
    currentLenght : 5,
});

game.entities.push(e2);

var menu = new gui.Menu({
    x : canvas.width - 80,
    y : canvas.height / 2,
    width : 64,
    height : 192,
    items : 2,
    itemSize : 64,
    offsetX : 5,
    offsetY : 5,
});
gui.UIObjects.push(menu);

game.gui = gui;

