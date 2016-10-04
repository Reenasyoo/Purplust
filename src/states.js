var startGameState = function(options) {
	
	var _startGame = this;
		
		_startGame.x = options.x;
		_startGame.y = options.y;
		_startGame.width = options.width;
		_startGame.height = options.height;
		
		_startGame.items = options.items;
		_startGame.itemStack = [];

	_startGame.init = function() {

		var menuArray = ["New Game", "Controls"];
		for (var i = 0; i < _startGame.items; i++) {
			
			var iSize = _startGame.y + (i * _startGame.height);

			_startGame.itemStack[i] = new gui.Button({
				x: _startGame.x,
				y: iSize,

				width: _startGame.width,
				height: _startGame.height,

				offset_x: 5,
				offset_y: 5,

				text: menuArray[i],
			});
		};
	}

	_startGame.update = function(deltaTime, engine) {
		


		for (var i = 0; i < _startGame.items; i++) {
			_startGame.itemStack[i].update(engine);
		};

		if(_startGame.itemStack[0].clicked) {
				engine.stateMashine.changeState("nextState");
		};

		
		if(_startGame.itemStack[1].clicked) {
			engine.stateMashine.changeState("helpState");
		}
		//console.log(_startGame.itemStack[1].clicked);	
	}

	_startGame.draw = function(context) {
		for (var i = 0; i < _startGame.items; i++) {
			_startGame.itemStack[i].draw();
		};
		
	}	
	_startGame.init();

}

var runGameState = function(){

	var _runState = this;

	_runState.draw = function(engine) {
		
		if (typeof engine.world != "undefined") {
			engine.world.draw(engine.context);
		}
		
		for (var i = 0; i < engine.objects.length; i++) {
			engine.objects[i].draw(engine.context);
		};

		engine.gui.draw(engine.context);	
	}

	_runState.update = function(deltaTime, engine) {
		for (var i = 0; i < engine.objects.length; i++) {
			engine.objects[i].update(deltaTime, engine); 
		};

		engine.gui.update(engine);
	}
}

var helpGameState = function() {
	
	var _helpState = this;
	var back = new gui.Button({
			x: 10,
			y: 10,

			width: 100,
			height: 50,

			filledText : "back",
		});
		

	_helpState.draw = function(engine) {

		var controls = new gui.Text({
			x: 50,
			y: 50,
			textSize: 20,
			textArray : [ 
				"Kontroles",
				"Kusteties pa kreisi : A",
				"Kusteties pa labi : D",
				"Palekties : Spacebar",
				"Iedot pretiniekam pizdi : F",
			],
		});
		controls.draw();

		back.draw();

	}

	_helpState.update = function(deltaTime, engine) {
		back.update(engine);
		if (back.clicked) {
			engine.stateMashine.changeState("startState");
		};

	}
}