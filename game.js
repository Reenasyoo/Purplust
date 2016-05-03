
var ground = {
    	mapArray : [
        1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,2,
        1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,2,
        1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,2,
        1 , 2 , 2 , 2 , 2 , 2 , 2 , 2 , 2 , 2 , 0 , 2 , 2 , 0 , 0 , 2 , 2 , 2 ,1,
        1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,2,
        1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,2,
        1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,2,
        1 , 2 , 2 , 2 , 0 , 0 , 2 , 2 , 2 , 0 , 2 , 2 , 2 , 0 , 0 , 0 , 0 , 2 ,1,
        1 , 2 , 2 , 2 , 0 , 0 , 2 , 2 , 2 , 0 , 2 , 2 , 2 , 0 , 0 , 0 , 2 , 1 ,1,
        1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 2 , 1 ,1,
        1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 2 , 1 ,1,
        1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 2 , 2 , 2 ,1,
        1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 2 , 1 , 1 ,1,
        1 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 2 , 2 , 0 , 2 , 2 , 1 ,1,
        1 , 0 , 0 , 0 , 0 , 2 , 2 , 0 , 0 , 0 , 0 , 2 , 2 , 0 , 0 , 0 , 0 , 0 ,0,
        1 , 2 , 2 , 2 , 2 , 2 , 2 , 2 , 2 , 2 , 2 , 2 , 2 , 2 , 2 , 2 , 2 , 2 ,2,
        1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 ,1 , 1 , 1 , 1 , 1 , 1, 1],

        tileWidth : 19,
        tileHeight : 17,
    }

var game = new Purpl("canvas");
game.initializeCanvas();

game.load(['sprite', 'player', 'tileset']);

var m = new Map(ground, game.context, game.resources['tileset'].image);
game.world = m;

var e = new Entity({
    x : 150,
    y : 32,
    width : 32,
    height : 32,
    map : m,
});
e.sprite = new Sprite({
            image : game.resources['sprite'].image,
            width: 32,
            height: 32,
            numberOfFrames : 3,
            ticksPerFrame : 6,
});

game.entities.push(e);



var p = new Actor({
    race : "huuman",
});
p.entity = new Entity({
    x : 33,
    y : 33,
    width : 32,
    height : 32,
    map : m,
});
p.entity.sprite = new Sprite({
            image : game.resources['player'].image,
            width: 32,
            height: 32,
            numberOfFrames : 3,
            ticksPerFrame : 3,
});

var e2 = new Entity({
    x : 150,
    y : 150,
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

game.entities.push(e2);

game.actor = p;

gui = new GUI(game.context);

/*
var button = new gui.Button({
    x: 600,
    y: 400,

    width: 100,
    height: 100,

});
var button2 = new gui.Button({
    x: 400,
    y: 400,

    width: 100,
    height: 100,

});
*/

var text1 = new gui.Text({
    x: 100,
    y: 150,
    textSize : 24,
    fillableText : "my name is blah",
});

var menu = new gui.Menu({
    x : canvas.width - 64,
    y : canvas.height / 2,
    width : 64,
    height : 192,
    items : 3,
    itemSize : 64,
    offsetX : 10,
    offsetY : 10,
});

game.gui = gui;
//var health = new GUI("Health", 20, game.height - 40, 40, 20, p.stats.health);
//var spec = new GUI("Special", game.width - 420, game.height - 40, 40, 20, 6);
//var menu = new GUI("menu", canvas.width - 64, canvas.height /2 , 64, 192);

////health.draw(game.context);

//console.log(menu.Menu);
game.Run();
console.log(p.stats.health);
console.log(game.entities[0]);

