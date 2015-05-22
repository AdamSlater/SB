/*Used to skip over money checks if user selects random skill*/
var randomSk = false;
/*Colors and backgrounds for the store*/
var colors = ["#BB9264", "#FF9966", "#CCCC00", "url('images/food.jpg')", "url('images/matrix.gif')", "url('images/rainbow.gif')", "url('images/giphy 1.gif')", "url('images/cat.gif')"]

/*Backgrounds:
  Sets the background color to the specified color.
  id: Corresponds to the index of the array as well as the ID of the radio button.*/
function makeBackground(id) {
    if(~'colors[id.value]'.indexOf('url') == 1)
        $("#game-page, #store-page").css({"background-image" : colors[id.value]});
    else
        $("#game-page, #store-page").css({"background": colors[id.value]});
}
/*End backgrounds.*/


/*Displays the next correct tile in the path.*/
function hint() {
    if(checkCash(10) || randomSk) {
        window.location.href = '#game-page';
        var hint = path[clickCount];
        setTimeout(function () {
            resetAudio(yellow);
            $("#" + hint).addClass("path");
            setTimeout(function () { $("#" + hint).removeClass("path"); }, (250));
        }, 500);
        if(randomSk == false)
            buySkill(10);
    }
}

/*Repeats the pattern.
  cost: Cost of skill. 20 for regular, 30 for slowmo*/
function repeat(cost, offset2, speed) {
    if(checkCash(cost) || randomSk) {
        window.location.href = '#game-page';
        var offset = 0;
        var tmpPath = 0;
        path.forEach(function (e) {
            if (tmpPath < path.length - 1) {
                setTimeout(function () {
                    resetAudio(yellow);
                    $("#" + e).addClass("path"); //makes cell yellow
                    setTimeout(function () { $("#" + e).removeClass("path"); }, (speed)); //removes yellow
                }, offset2 + offset);
                offset += offset2;
                tmpPath++;
            }
        });
        if(randomSk == false)
            buySkill(cost);
    }
}

/*Stops the timer.*/
function stopTimer() {
    if(checkCash(50) || randomSk) {
        window.location.href = '#game-page';
        clearInterval(timer);
        timer = true;
        firstClick = true;
        if(randomSk == false)
            buySkill(50);
    }
}

/*Skips the current level.*/
function skip(){
    if(checkCash(60) || randomSk) {
        window.location.href = '#game-page';
        xp += pathLength++;
        $(".xp").html(xp+" XP");
        if(randomSk == false)
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
    }
}

/*Gives the user an extra life.*/
function oneUp() {
    if(checkCash(70) || randomSk) {
		$(".lives").html(" <img class='donkey' src='images/donkey.png' alt='LIVES'/>" + "x" + (++lives));
        if(randomSk == false)
		    buySkill(70);
    }
}

/*Gives the user a random skill.*/
function randomSkill() {
    var rand;
    if(checkCash(40)) {
    	randomSk = true;
    	buySkill(40);
        rand = Math.floor((Math.random() * 6) + 1);
        console.log(rand);
        if(rand == 1)
            hint();
        if (rand == 2)
            repeat(20, 500, 250);
        if(rand == 3)
            repeat(30, 1000, 600);
        if(rand == 4)
            stopTimer();
        if(rand == 5)
            skip();
        if(rand == 6)
            oneUp();
    }
    randomSk = false;
}

/*Activates double cash.*/
function dubCash() {
    if(checkCash(10)) {
        window.location.href = '#game-page';
        money = 30;
        buySkill(10);
    }
}

/*Activates double XP.*/
function dubXP() {
    if(checkCash(20)) {
        window.location.href = '#game-page';
        exp = 2;
        buySkill(20);
    }
}

/*Activates double money and double XP.*/
function dubBoth() {
    if(checkCash(30)) {
        dubXP();
        dubCash();
    }
}

/*Activates the All In gamble.*/
function allIn(){
    if(checkCash(120)) {
        window.location.href = '#game-page';
        isAllIn = true;
        buySkill(120);
    }
}

/*Checks if the user has enough coins to purchase the skill they wish to use.
  money: Amount of money the player currently has.*/
function checkCash(money){
        var value = $('.coins').text();
        value = value.substr(0,value.indexOf('C'));
        if (coins > value + 30 && !isAllIn) {
        coins = 0;
        alert("CHEATER!");
        window.location.assign(window.location.origin);
   }
	if (!playing || coins < money) {
         $("#coins").css({"color": "#FF3333"});
         setTimeout(function(){$("#coins").css({"color": "#ffff0b"});}, (250));
         return false;
    }
    else {
        storePurchase();
        return true;
    }
}

/*Decrements cost of skill from users coins and updates UI
  cost: Number of coins the skill costs.*/
function buySkill(cost) {
    coins -= cost;
    $(".coins").html(coins+" COINS");
    stopStoreBG();
    playGameMusic();
}

/*Plays the store music*/
function playStoreBG() {
    var storeBG = document.getElementById("Storemusic");
    storeBG.volume = 0.2;
    storeBG.play();
}

/*Stops the stores music.*/
function stopStoreBG() {
    var storeBG = document.getElementById("Storemusic");
    storeBG.pause();    
}