/*
lets cut this baby open and merge it together with that #input thing

document.addEventListener('keydown', function(ev) { return onkey(ev, ev.keyCode, true);  }, false);
document.addEventListener('keyup',   function(ev) { return onkey(ev, ev.keyCode, false); }, false);

function onkey(ev, key, down) {
switch(key) {
case KEY.LEFT:  player.left  = down; return false;
case KEY.RIGHT: player.right = down; return false;
case KEY.SPACE: player.jump  = down; return false;
  }
}

*/


//Input
var keysDown = {};

var canInput = false;

window.addEventListener('keydown', function(e){
	keysDown[e.keyCode] = true;
//console.log(e.keycode + "true");
});
window.addEventListener('keyup', function(e){
	if(e.keyCode == 73){
		engine.inv = !engine.inv;
	}
	delete keysDown[e.keyCode];
});

window.addEventListener('onmousemove', function(e){
	var mX = e.clientX;
	var mY = e.clientY;
});