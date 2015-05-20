var randomSk = false;

/*Backgrounds:
  Sets the background color to the specified color.*/
function makePeach() {
    $("#game-page, #store-page").css({"background": "#FF9966"});
}

function makeDefault() {
    $("#game-page, #store-page").css({"background": "#BB9264"});
}
function makePuke() {
    $("#game-page, #store-page").css({"background": "#CCCC00 "});
}

function makeFire() {
    $("#game-page, #store-page").css({"background-image" : "url('images/giphy 1.gif')"});
}

function makeFood() {
    $("#game-page,  #store-page").css({"background-image" : "url('images/food.jpg')"});
}

function makeCat() {
    $("#game-page, #store-page").css({"background-image" : "url('images/cat.gif')"});
}

function makeMatrix() {
    $("#game-page, #store-page").css({"background-image" : "url('images/matrix.gif')"});
}

function makeRainbow() {
    $("#game-page, #store-page").css({"background-image" : "url('images/rainbow.gif')"});
}
/*End backgrounds.*/


/*Displays the next correct tile in the path.*/
function hint() {
    if(checkCash(10)){
        window.location.href = '#game-page';
        var hint = path[clickCount];
        setTimeout(function () {
            resetAudio(yellow);
            $("#" + hint).addClass("path");
            setTimeout(function () { $("#" + hint).removeClass("path"); }, (250));
        }, 500);
        buySkill(10);
        stopStoreBG();
        playGameMusic();
    }
}

/*Repeats the pattern.*/
function repeat() {
    if(checkCash(20)){
        window.location.href = '#game-page';
        var offset = 0;
        var tmpPath = 0;
        path.forEach(function (e) {
            if (tmpPath < path.length - 1) {
                setTimeout(function () {
                    resetAudio(yellow);
                    $("#" + e).addClass("path"); //makes cell yellow
                    setTimeout(function () { $("#" + e).removeClass("path"); }, (250)); //removes yellow
                }, 500 + offset);
                offset += 500;
                tmpPath++;
            }
        });
        buySkill(20);
        stopStoreBG();
        playGameMusic();
    }
}

/*Flashes the tiles in slow motion.*/
function slowMo() {
    if(checkCash(30)){
        window.location.href = '#game-page';
        var offset = 0;
        var tmpPath = 0;
        path.forEach(function (e) {
            if (tmpPath < path.length - 1) {
                setTimeout(function () {
                    resetAudio(yellow);
                    $("#" + e).addClass("path"); //makes cell yellow
                    setTimeout(function () { $("#" + e).removeClass("path"); }, (600)); //removes yellow
                }, 1000 + offset);
                offset += 1000;
                tmpPath++;
            }
        });
        buySkill(30);
        stopStoreBG();
        playGameMusic();
    }
}

/*Stops the timer.*/
function stopTimer(){
    if(checkCash(50)){
        window.location.href = '#game-page';
        clearInterval(timer);
        timer = true;
        firstClick = true;
        buySkill(50);
        stopStoreBG();
        playGameMusic();
    }
}

/*Skips the current level.*/
function skip(){
    if(checkCash(60)){
        window.location.href = '#game-page';
        xp += pathLength++;
        $(".xp").html(xp+" XP");
        buySkill(60);
    	
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

/*Gives the user an extra life.*/
function oneUp(){
    if(checkCash(70)){
		$(".lives").html(" <img class='donkey' src='images/donkey.png' alt='LIVES'/>" + "x" + (++lives));
		buySkill(70);
    }
}

/*Gives the user a random skill.*/
function randomSkill(){
    var rand;
    if(checkCash(40)){
    	randomSk = true;
    	buySkill(40);
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
        stopStoreBG();
    }
}

/*Activates double cash.*/
function dubCash(){
    if(checkCash(10)){
        window.location.href = '#game-page';
        money = 30;
        buySkill(10);
        stopStoreBG();
        playGameMusic();
    }
}

/*Activates double XP.*/
function dubXP(){
    if(checkCash(20)){
        window.location.href = '#game-page';
        exp = 2;
        buySkill(20);
        stopStoreBG();
        playGameMusic();
    }
}

/*Activates double money and double XP.*/
function dubBoth(){
    if(checkCash(30)){
        dubXP();
        dubCash();
    }
}

/*Activates the All In gamble.*/
function allIn(){
    if(checkCash(120)){
        window.location.href = '#game-page';
        isAllIn = true;
        buySkill(120);
        stopStoreBG();
        playGameMusic();
    }
}

/*Checks if the user has enough coins to purchase the skill they wish to use.*/
function checkCash(moneyz){
	if (!playing || (coins < moneyz && !randomSk)){
         randomSk = false;
         $("#coins").css({"color": "#FF3333"});
         setTimeout(function(){$("#coins").css({"color": "#ffff0b"});}, (250));
         return false;
    }

    if (randomSk) {
        coins += moneyz;
        randomSk = false;
    }
    else {
        storePurchase();
        return true;
    }
}

/*Decrements cost of skill from users coins and updates UI*/
function buySkill(cost) {
    coins -= cost;
    $(".coins").html(coins+" COINS");
}

/*Plays the store music*/
function playStoreBG(){
    var storeBG = document.getElementById("Storemusic");
    storeBG.volume = 0.2;
    storeBG.play();
}

/*Stops the stores music.*/
function stopStoreBG(){
    var storeBG = document.getElementById("Storemusic");
    storeBG.pause();    
}