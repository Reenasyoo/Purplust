function collides(a, b) {
    if (a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y) 
    {
        return true;
    };
}

var tileToPixelCord = function(tile, tilesize) 
{ 
	return tile*tilesize;
}
var pixelToTileCord = function(pixel, tilesize) 
{ 
	return Math.floor(pixel/tilesize);
}

function i2xy(index, mapWidth)
{
    var x = index % mapWidth;
    var y = Math.floor(index/mapWidth);
    return [x, y];
}
//atgriez vienu vertibu no 2 vertibam
function xy2i(x, y, mapWidth)
{
    return y * mapWidth + x;
}

// apvieno objectus
function merge(obj1, obj2){
    var obj3 = {};
    for(var attrname in obj1){ obj3[attrname] = obj1[attrname]; }
    for(var attrname in obj2){ obj3[attrname] = obj2[attrname]; }
    return obj3;
}

//iegut radio pogas vertibu
function getRadioValue(form, name) {

    //iegut formas elementus
    var radios = form.elements[name];

    //cikls kas parbauda kurs elements ir izvelets
    for (var i = 0; i < radios.length; i++) {
        //parbaude vai elements ir izvelets
        if (radios[i].checked) {
            var value = radios[i].value;
            break;
        };
        
    };
    //atgriez elementa vertibu
    return value;
}

function createHtmlElement(id, type, atributes) {
    var element = null;
    var body = document.getElementsByTagName("body")[0];
    if(typeof(id) == "string") {
        if(!body.hasAttribute(id)) { 
            element = document.createElement(type);
            element.setAtribute("id", id);   
            body.appendChild(element);
        } else {
            element = document.getElementById(id);
        }
    }else {
        console.log("Id is not string!");
    }

    return element;
}

function changeBoolVal(bool) {
    var newBool = !bool;

    return newBool;
}


/*

function lineToAngle(ctx, x1, y1, length, angle) {

    angle *= Math.PI / 180;
    
    var x2 = x1 + length * Math.cos(angle),
        y2 = y1 + length * Math.sin(angle);
    
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    return {x: x2, y: y2};
}
            ctx.beginPath();
            lineToAngle(ctx, x, y, length, angle);
            ctx.lineWidth = 10;
            ctx.stroke();

            angle += dlt;
            if (angle < -90 || angle > 0) dlt = -dlt;
*/