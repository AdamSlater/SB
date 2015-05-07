function makeRed() {
    $("#game-page, #instruct-page, #store-page").css({"background": "#FF0000"});
}

function makeBlue() {
    $("#game-page, #instruct-page, #store-page").css({"background": "#0000FF"});
}
function makeGreen() {
    $("#game-page, #instruct-page, #store-page").css({"background": "#00FF00"});
}

function makeFire() {
    $("#game-page, #instruct-page, #store-page").css({
        "background-image" : "url('images/giphy 1.gif')",
        "background-position" : "center",
        "background-repeat" : "no-repeat",
        "background-size" : "cover"
    });
}

function repeat() {
    if (!playing) return;
	var offset = 0;
    path.forEach(function(e) {
      	setTimeout(function() {
            $("#" + e).addClass("path");
            setTimeout(function(){$("#" + e).removeClass("path");}, (250*speed));
        }, 500 + offset);    
        offset += 500;
    });
    resume();
}

function hint() {
    if (!playing) return;
	var hint = path[clickCount];
    setTimeout(function() {
        $("#" + hint).addClass("path");
        setTimeout(function(){$("#" + hint).removeClass("path");}, (250*speed));
    }, 500);
    resume();    
}

function slowMo() {
    if (!playing) return;
    if (!speedSet) {
        speed = 10;
        speedSet = true;
    }
    resume();
}