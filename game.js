// needs to be placed somewere else
var ground = {
    	mapArray : [
         22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,
         22,0 ,0 ,0 ,0 ,20,0 ,20,0 ,0 ,0 ,0 ,0 ,21,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,22,
         22,0 ,0 ,20,0 ,20,0 ,20,0 ,0 ,0 ,0 ,0 ,21,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,22,
         22,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,21,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,22,
         22,20,20,20,20,20,20,20,0 ,0 ,0 ,20,20,21,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,22,
         22,0 ,0 ,0 ,0 ,0 ,0 ,21,0 ,0 ,0 ,0 ,0 ,21,20,20,20,20,20,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,22,
         22,0 ,0 ,0 ,0 ,0 ,0 ,21,0 ,0 ,0 ,0 ,0 ,21,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,22,
         22,0 ,0 ,0 ,0 ,0 ,0 ,21,0 ,0 ,20,20,20,21,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,22,
         22,0 ,0 ,0 ,20,20,20,21,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,22,
         22,0 ,0 ,20,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,22,
         22,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,22,
         22,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,22,
         22,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,20,20,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,22,
         22,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,20,20,0 ,0 ,0 ,0 ,0 ,0 ,0 ,22,
         22,20,20,20,20,20,20,20,20,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,22,
         22,0 ,0 ,0 ,0 ,0 ,0 ,0 ,21 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,22,
         22,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,22,
         22,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,22,
         22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22],

        tileWidth : 28,
        tileHeight : 20,
    }


var game = new Purpl("canvas");
game.initializeCanvas();

game.load(['sprite', 'player', 'tileset', 'ui', 'inventory-bg','stats-bg']);

gui = new GUI(game.context);
game.gui = gui;

var sm = new StateMashine();


sm.Add("startState", new startGameState({
    x : game.width / 2,
    y : game.height / 2,
    width : 300,
    height : 100,

    items : 2,
}));

sm.Add("nextState", new runGameState());
sm.Add("helpState", new helpGameState());

game.stateMashine = sm;


var m = new Map(ground, game.resources['tileset'].image);

game.world = m;


var p = new Actor({
    race : "human",
    klass : "playerClass",
    characterName : "playerName",
});

//speletaja entitijas konstruktors
p.entity = new Entity({
    x : 33,
    y : 33,
    width : 32,
    height : 32,
    map : m,
    type : "player"
});

p.healthBar = new gui.Bar({
    label : "Health",
    x : 20,
    y : game.height - 50,
    width :200,
    height : 40,
    fullLenght : 10,
    currentLenght : 5,
});
p.entity.sprite = new Sprite({
    image : game.resources['player'].image,
    width: 32,
    height: 32,
    numberOfFrames : 3,
    ticksPerFrame : 3,
});

p.Name = new gui.Text({
    x : p.entity.x,
    y : p.entity.y - 3,
    textSize : 20,
    fillableText : p.characterName,
});
    
game.objects.push(p);
game.actor = p;
gui.setActor(game.actor);

var e = new Entity({
    x : 150,
    y : 32,
    width : 32,
    height : 32,
    map : m,
    type : "enemy",
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
//game.objects.push(e);

var e2 = new Entity({
    x : 470,
    y : 192,
    width : 32,
    height : 32,
    map : m,
    type : "enemy",
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

//game.objects.push(e2);

var menu = new gui.Menu({
    x : canvas.width - 80,
    y : canvas.height / 2,
    width : 64,
    height : 192,
    items : 2,
    itemSize : 64,
    offsetX : 5,
    offsetY : 5,
    image : [game.resources['inventory-bg'].image, game.resources['stats-bg'].image],
});
gui.UIObjects.push(menu);


