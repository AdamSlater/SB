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
    if (!playing || coins < 20){
     stopStoreBG();
     return;
    }
	var offset = 0;
	var tmpPath = 0;
    path.forEach(function(e) {
    if(tmpPath < path.length-1){
        setTimeout(function() {
            yellow.pause();
            yellow.currentTime = 0;
            yellow.play();
            $("#" + e).addClass("path");//makes cell yellow
            setTimeout(function(){$("#" + e).removeClass("path");}, (250));//removes yellow
        }, 500 + offset);    
        offset += 500;
        tmpPath++;
        }
    });
    coins = coins - 20;
    $(".coins").html(coins+" coins");
    stopStoreBG();
    
    
    
    
}

/*display next correct tile*/
function hint() {
    if (!playing || coins < 10){
    	 stopStoreBG();
    	 return;
    }
    var hint = path[clickCount];
    setTimeout(function() {
        $("#" + hint).addClass("path");
        setTimeout(function(){$("#" + hint).removeClass("path");}, (250));
    }, 500);
    coins = coins - 10;
    $(".coins").html(coins+" coins");
    stopStoreBG();
       
}

function slowMo() {
     if (!playing || coins < 30){
    	 stopStoreBG();
    	 return;
    }
    var offset = 0;
	var tmpPath = 0;
    path.forEach(function(e) {
    if(tmpPath < path.length-1){
        setTimeout(function() {
            yellow.pause();
            yellow.currentTime = 0;
            yellow.play();
            $("#" + e).addClass("path");//makes cell yellow
            setTimeout(function(){$("#" + e).removeClass("path");}, (600));//removes yellow
        }, 1000 + offset);    
        offset += 1000;
        tmpPath++;
        }
    });
    coins = coins - 20;
    $(".coins").html(coins+" coins");
    stopStoreBG();
    
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

