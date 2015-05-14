var randomSk = false;

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


/*display next correct tile*/
function hint() {
    if(checkCash(10)){
        window.location.href = '#game-page';
        var hint = path[clickCount];
        yellow.muted = muteSound;
        setTimeout(function() {
            yellow.pause();
            yellow.currentTime = 0;
            yellow.play();
            $("#" + hint).addClass("path");
            setTimeout(function(){$("#" + hint).removeClass("path");}, (250));
        }, 500);
        coins = coins - 10;
        $(".coins").html(coins+" COINS");
        stopStoreBG();
        playGameMusic();
    }
}

/*repeats pattern*/
function repeat() {
    if(checkCash(20)){
        window.location.href = '#game-page';
        var offset = 0;
        var tmpPath = 0;
        yellow.muted = muteSound;
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
        $(".coins").html(coins+" COINS");
        stopStoreBG();
        playGameMusic();
    }
}

function slowMo() {
    if(checkCash(30)){
        window.location.href = '#game-page';
        var offset = 0;
        var tmpPath = 0;
        yellow.muted = muteSound;
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
        coins = coins - 30;
        $(".coins").html(coins+" COINS");
        stopStoreBG();
        playGameMusic();
    }
}

function stopTimer(){
    if(checkCash(50)){
        window.location.href = '#game-page';
        clearInterval(timer);
        timer = true;
        firstClick = true;
        coins = coins - 50;
            $(".coins").html(coins+" COINS");
        stopStoreBG();
        playGameMusic();
    }
}


function skip(){
    if(checkCash(60)){
        window.location.href = '#game-page';
        xp += pathLength++;
        $(".xp").html(xp+" XP");
        coins = coins - 60;
    	$(".coins").html(coins+" COINS");
    	
    	setTimeout(function() {
            roundDelay();
        }, 500);
		pause();
        setTimeout(function() {
            init(rows, cols);
			reset();
        }, 3000); 
        setTimeout(function() {
            enableUserChoice();
        }, (3000 + (543 * pathLength))); //delay of audio before click
        gridChange();
    	
        stopStoreBG();
        playGameMusic();
    }
}

function oneUp(){
    if(checkCash(70)){
	console.log("life added");
	$(".lives").html(++lives+ " <img src='images/donkey.png' alt='LIVES'/>");
	$("#lives2").css({"color": "#ffcc0b"});
    setTimeout(function(){$("#lives2").css({"color": "#00ff00"});}, (250));
	coins = coins - 70;
    $(".coins").html(coins+" COINS");
    playGameMusic();
    }
}

function randomSkill(){
    var rand;
    if(checkCash(40)){
    	randomSk = true;
    	coins = coins - 40;
    	$(".coins").html(coins+" COINS");
        rand = Math.floor((Math.random() * 6) + 1);
        console.log(rand);
        if(rand == 1)
            hint();
        if(rand == 2)
            repeat();
        if(rand == 3)
            slowMo();
        if(rand == 4)
            stopTimer();
        if(rand == 5)
            skip();
        if(rand == 6)
            oneUp();
    }
}

function dubCash(){
    if(checkCash(10)){
        window.location.href = '#game-page';
        money = 30;
        coins = coins - 10;
    	$(".coins").html(coins+" COINS");
        playGameMusic();
    }
}

function dubXP(){
    if(checkCash(20)){
        window.location.href = '#game-page';
        exp = 2;
        coins = coins - 20;
    	$(".coins").html(coins+" COINS");
        playGameMusic();
    }
}

function dubBoth(){
    if(checkCash(30)){
        window.location.href = '#game-page';
        exp = 2;
        money = 30;
        coins = coins - 30;
    	$(".coins").html(coins+" COINS");
        playGameMusic();
    }
}

function allIn(){
    if(checkCash(120)){
        window.location.href = '#game-page';
        isAllIn = true;
        coins = coins - 120;
    	$(".coins").html(coins+" COINS");
        playGameMusic();
    }
}


function checkCash(moneyz){
	if (!playing || (coins < moneyz && !randomSk)){
         randomSk = false;
         $("#coins").css({"color": "#FF3333"});
         setTimeout(function(){$("#coins").css({"color": "#ffff0b"});}, (250));
         return false;
    }
    
    if(randomSk){
        coins += moneyz;
        randomSk = false;
    }
    return true;
}

/*store music*/
function playStoreBG(){
    var storeBG = document.getElementById("Storemusic");
    storeBG.volume = 0.2;
    storeBG.muted = muteMusic;
    storeBG.play();
}

function stopStoreBG(){
    var storeBG = document.getElementById("Storemusic");
    storeBG.pause();    
}