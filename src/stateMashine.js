var StateMashine = function() {
	
	var _stateMashine = this;

		//current state object
		_stateMashine.currentState;

		//preivos state object
		_stateMashine.prevState;

		//transition from one state to antoher
		_stateMashine.transition = 0;

		//array of all state mashine states
		_stateMashine.stateStack = [];

		//add state to state mashine
		_stateMashine.Add = function(id, state) {
			
			var addState = new State(id, state);
			console.log(addState);
			_stateMashine.stateStack.push(addState);
		}

		_stateMashine.setState = function(stateName){
			for (var i = 0; i < _stateMashine.stateStack.length; i++) {
				if (_stateMashine.stateStack[i].name = stateName) {
					_stateMashine.currentState = _stateMashine.stateStack[i];	
				};
			};	
		}
		_stateMashine.setDefaultState = function() {
			if( typeof _stateMashine.currentState == "undefined") {
				_stateMashine.currentState = _stateMashine.stateStack[0];
			}
		}

		_stateMashine.changeState = function( id , options) {
			
			for (var i = 0; i < _stateMashine.stateStack.length; i++) {
				if (_stateMashine.stateStack[i].name === id) {
					_stateMashine.prevState = _stateMashine.currentState;
					_stateMashine.currentState = null;
					_stateMashine.currentState = _stateMashine.stateStack[i];
					// # For later use
					//_stateMashine.currentState.SetOptions(options);
				}
			}
		}
		_stateMashine.downState = function() {
			console.log(_stateMashine.prevState);
			_stateMashine.currentState == _stateMashine.prevState; 
		}

		_stateMashine.draw = function(engine) {
			_stateMashine.setDefaultState();

			_stateMashine.currentState.draw(engine);
		}
		_stateMashine.update = function(deltaTime, engine) {
			_stateMashine.setDefaultState();

			_stateMashine.currentState.update(deltaTime, engine);

		}


}

// Single state object
var State = function(name, stateFunction) {

	var _state = this;

		_state.name = name;
		_state.stateFunction = stateFunction; 


		_state.draw = function(engine) {
			//console.log(_state.stateFunction);
			_state.stateFunction.draw(engine);
		}

		_state.update = function(deltaTime, engine) {
			_state.stateFunction.update(deltaTime, engine);
		}

		_state.handleInput = function(callback) {
			
		}

		_state.SetOptions = function(options) {
			
		}

		
}

