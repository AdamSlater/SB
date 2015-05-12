function makePeach() {
    $("#game-page, #instruct-page, #store-page").css({"background": "#FF9966"});
}

function makeDefault() {
    $("#game-page, #instruct-page, #store-page").css({"background": "#A5F1FF"});
}
function makePuke() {
    $("#game-page, #instruct-page, #store-page").css({"background": "#CCCC00 "});
}

function makeFire() {
    $("#game-page, #instruct-page, #store-page").css({
        "background-image" : "url('images/giphy 1.gif')",
        "background-position" : "center",
        "background-repeat" : "no-repeat",
        "background-size" : "cover"
    });
}

function makeFood() {
    $("#game-page, #instruct-page, #store-page").css({
        "background-image" : "url('images/food.jpg')",
        "background-position" : "center",
        "background-repeat" : "no-repeat",
        "background-size" : "cover"
    });
}

function makeCat() {
    $("#game-page, #instruct-page, #store-page").css({
        "background-image" : "url('images/cat.gif')",
        "background-position" : "center",
        "background-repeat" : "no-repeat",
        "background-size" : "cover"
    });
}

function makeMatrix() {
    $("#game-page, #instruct-page, #store-page").css({
        "background-image" : "url('images/matrix.gif')",
        "background-position" : "center",
        "background-repeat" : "no-repeat",
        "background-size" : "cover"
    });
}

function makeRainbow() {
    $("#game-page, #instruct-page, #store-page").css({
        "background-image" : "url('images/rainbow.gif')",
        "background-position" : "center",
        "background-repeat" : "no-repeat",
        "background-size" : "cover"
    });
}

/*repeats pattern*/
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
    stopStoreBG();
    resume();
}

/*display next correct tile*/
function hint() {
    if (!playing) return;
	var hint = path[clickCount];
    setTimeout(function() {
        $("#" + hint).addClass("path");
        setTimeout(function(){$("#" + hint).removeClass("path");}, (250*speed));
    }, 500);
    stopStoreBG();
    resume();    
}

function slowMo() {
    if (!playing) return;
    if (!speedSet) {
        speed = 10;
        speedSet = true;
    }
    stopStoreBG();
    resume();
}

/*store music*/
function playStoreBG(){
    var storeBG = document.getElementById("BGmusic");
    storeBG.volume = 0.2;
    storeBG.play();
}

function stopStoreBG(){
    var storeBG = document.getElementById("BGmusic");
        storeBG.pause();    
}