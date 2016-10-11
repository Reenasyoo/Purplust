// DOM gui
var gui2v = function() {
	var gui2v = this;
		gui2v.wrapper = {};
		gui2v.engine = engine;
		gui2v.uiObjects = [];

		gui2v.actor = null;

		gui2v.setActor = function(actor) {
		gui2v.actor = actor;
		//console.log(gui.actor);
	},

}

gui2v.prototype = {
	
	// Creates gui wrapper
	createWrapper = function() {
		gui2v.wrapper = createHtmlElement("guiWrapper", "div");
	}

	createButton = function(options) {
		var button = this;
			button.x = options.x;
			button.y = options.y;
			button.width = options.width;
			button.height = options.height;

			button.offset_x = options.offset_x || 0;
			button.offset_y = options.offset_y || 0;

			button.color = options.color || "red";

			button.image = options.image;

			button.text = options.text;

			button.hovered = false;
			button.clicked = false;

	}
}