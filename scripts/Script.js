var frame, path = [], rows, cols, pathLength = 1;
var step, stepCount = 0;
var clickCount = 0, firstClick = false;
var time = 250, timer, countDown = 3;
var xp = 0, coins = 0;
var playing = false;
var name = false;
var lives = 3, numWrong = 0;
var muteMusic = false, muteSound = false;
var money = 10, exp = 1;
var isAllIn = false;
var streak = 0;

//Draws grid
function init(rows,cols) {
    var num = 0;
    $("#game").html("<ul id='frame'></ul>");
    for (var i = 0; i < rows; i++) {
        frame[i] = new Array(cols);
        for (var j = 0; j < cols; j++) {
             frame[i][j] = $('<li class="cell" id=' + num++ +' >').appendTo('#frame');
             if (j == rows-1)
                 $('<br>').appendTo('#frame');
        }       
    }
}

/*Called after user name submitted*/
function play() {
    $(".ui-content").css({"margin-top":"35%"});
    playing = true; //done once, prevents actions before playing

    name = $("#name").attr("value"); //adds to form for leaderboard
    if (!name) name = "anon"; //default name
    $("#userName").attr("value", name); //change name ^

    $("#game").html("<ul id='frame'></ul>"); //gets rid of enter name

    rows = 1, cols = 1; //initial grid size
    frame = new Array(rows);
    roundDelay(); //count down
    setTimeout(function() {
        init(rows, cols);
        setUpRound(rows, cols);
    }, 3000); 
    setTimeout(function() {
        enableUserChoice();
    }, (3000 + (543 * pathLength))); 
}

function makePath() {
    step = Math.floor(Math.random() * (cols*cols));//starts top row
	path.push(step);//store valid cells in-order
	stepCount++;
	while(stepCount < pathLength) {//generates count(pathlength) elements
		do {
            //x coord of cell
            stepx = Math.floor(Math.random()*(step%rows+3-step%rows-1+1)+step%rows-1);
            //y coord of cell
            stepy = Math.floor(Math.random()*(step/rows+2-step/rows-1+1)+step/rows-1);
           } 
        while(stepx < 0 || stepx > rows-1 || stepy < 0 || stepy > rows-1);//checks nearby cells
		step = stepx + (stepy*rows);//next valid cell
		path.push(step);
		stepCount++;
    }
}

function setUpRound(rows, cols) {
    yellow = document.getElementById("yellowTile");//sound for generate path
    makePath();
    var offset = 0;
    path.forEach(function(e) {
        setTimeout(function() {
            resetAudio(yellow);
            $("#" + e).addClass("path");//makes cell yellow
            setTimeout(function(){$("#" + e).removeClass("path");}, (250));//removes yellow
        }, 500 + offset);    
        offset += 500;
    });
    path.push(-3); //signifies the end of the path
    
}

function enableUserChoice() {
    $(".cell").attr("onclick", "getUserChoice(this.id)");
	firstClick = false;
    $(".ui-icon-pause").attr("href", "index.html#store-page");
    $(".ui-icon-pause").attr("onclick", "pause();playTransition();playStoreBG();stopGameMusic();mouseClick()");
}

function disableUserChoice() {
    $(".cell").attr("onclick", "");
	firstClick = false;
}

function getUserChoice(click_id) {
    if (time <= 0) { //return early if timeup
        clearInterval(timer);
        timer = false;
        return;
    } 

    if(!firstClick || !timer) {
        firstClick = true;
        timer = setInterval(function () {
            if (time == 0){
             clearInterval(timer);
             timer = false;
             }
            $('#timer').html(time-- + " donkey seconds");
            if (time >= 0) {
                $('.progress-bar').html(time); //text on progress bar
                $('.progress-bar').css('width', Math.floor((time / (250 * pathLength)) * 100) + '%');//red part of progress bar
                $('progress-bar').attr('aria-valuenow', ((time / (250 * pathLength)) * 100));
            }
        }, 1);
    }

    if(click_id == path[clickCount]) {
        var green = document.getElementById("greenTile");
        resetAudio(green);
        $("#" + click_id).addClass("selected"); //makes cell green
        setTimeout(function(){$("#" + click_id).removeClass("selected");}, (250)); //removes green
        clickCount++;
        xp += exp;
        $(".xp").html(xp + "XP"); //1 xp per correct cell
        $("#userScore").attr("value", xp); //used for leaderboard score
    }
    else {
        var red = document.getElementById("redTile");
        resetAudio(red);
        $("#" + click_id).addClass("wrong"); //makes cell red
        setTimeout(function(){$("#" + click_id).removeClass("wrong");}, (250));//removes red
		numWrong++;
	}

    //regresses, pathlength
    if (numWrong == 2) {
     	disableUserChoice();
     	if (lives != 1) {
	    	$(".lives").css({"color": "#ff0000"});		            
            $(".lives").html(--lives + " <img src='images/donkey.png' alt='LIVES'/>");
            setTimeout(function(){$(".lives").css({"color": "#00ff00"});}, (250));
        } else
            alert("ur a failure");
		pathLength--;
		isAllIn = false;
        streak = 0;
        if (rows > 1 && cols > 1) rows-- && cols--;
        numWrong = 0;
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

    if (path[clickCount] == -3) {
		disableUserChoice();
        endRoundReward();
        $(".coins").html((coins+=money) + " COINS");
         pathLength++;
		 if(isAllIn){
             streak++;
             if(streak == 10){
             	$(".coins").html((coins+= 120) + " COINS");
             	xp += 120;
             	$(".xp").html(xp + "XP");
             	isAllIn = false;
             	streak = 0;
             }
         }
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
        }, (3000 + (543 * pathLength))); 
        gridChange();
    }
     
}

function reset() {
    exp = 1;
    money = 10;
    time = 250 * pathLength;
	path = new Array(0);
	clickCount = 0;
	stepCount = 0;
	numWrong = 0;
	 $('.progress-bar').html(time);//text on progress bar
     $('.progress-bar').css('width', Math.floor((time / (250 * pathLength)) * 100) + '%');//red part of progress bar
     $('progress-bar').attr('aria-valuenow', ((time / (250 * pathLength)) * 100));
	setUpRound(rows, cols);//makes new round
}

function roundDelay() {	
    $(".ui-icon-pause").attr("href", "");
    $(".ui-icon-pause").attr("onclick", "");
    //clears game frame
    $('#frame').html("");
    //count down
    $('<p class="cd" id=' + 'cd' + countDown + '>' + countDown  + '</p>' ).appendTo('#frame');
    //level number
    $('<p class="cd" id=' + 'levelNum' + '>' + "LEVEL " + pathLength + '</p>' ).appendTo('#frame');
    var countTime = setInterval(function () {
        countDown--;
        $('#' + 'cd' + (countDown + 1)).html('<p class="cd" id=' + 'cd' + countDown + '>' + countDown + '</p>');
        if (countDown == 0) {
            clearInterval(countTime);
            $('#' + 'cd' + countDown).remove();
            countDown = 3;
        }
    }, 1000); 
}

function pause() {
	clearInterval(timer);
	timer = false;
}

function playTransition(){
    var pageAudio = document.getElementById("pageChange");
    pageAudio.play();
}

function gridChange() {
    if (pathLength - 10 > 0){
        cols = 5;
        rows = 5;
    }else if (pathLength - 7 > 0){
        cols = 4;
        rows = 4;        
    }else if (pathLength - 4 > 0){
        cols = 3;
        rows = 3;        
    }else if (pathLength - 1 > 0){
        cols = 2;
        rows = 2;        
    } else {
        cols = 1;
        rows = 1;
    }
}

function stopIntro() {
    var intro = document.getElementById("introMusic");
    intro.pause();
}

function muteSounds() {
    var path = "images/";
    path += (!muteSound) ? "soundmute.png" : "sound.png";
    $("#muteSound").attr("src", path);
    if (muteSound) {
        $(".sound").prop('muted', false);
        muteSound = false;
    } else {
        $(".sound").prop('muted', true);
        muteSound = true;
    }
}

function muteMusics() {
    var path = "images/";
    path += (!muteMusic) ? "musicmute.png" : "music.png";
    $("#muteMusic").attr("src", path);

    if (muteMusic) {
        $(".music").prop('muted', false);
        muteMusic = false;
    } else {
        $(".music").prop('muted', true);
        muteMusic = true;
    }
}

function playIntro() {
    var intro = document.getElementById("introMusic");
    intro.currentTime = 0;
    introMusic.play();
}

function resetAudio(audio) {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
}

function playGameMusic(){
    var game = document.getElementById("gameMusic");
    game.volume = 0.1;
    game.play();
}

function stopGameMusic(){
    var game = document.getElementById("gameMusic");
    game.pause();    
}

function mouseClick() {
    var click = document.getElementById("mouseClick");
    click.play();
}

function storePurchase() {
    var click = document.getElementById("cashRegister");
    click.play();
}

function endRoundReward() {
    var click = document.getElementById("coinDrop");
    click.play();
}

window.onunload = window.onbeforeunload = (function () {
    console.log("prints");
    window.location.href = '#main-page';
    location.reload();
})
