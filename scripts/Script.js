/*Path array stores the correct path, rows and cols are the number of rows and columns. pathLength is the length of the path to generate.*/
var frame, path = [], rows, cols, pathLength = 1;
/*Current square to be added to the path and number of steps generated.*/
var step, stepCount = 0;
/*Used as an arrya index to check if player is clicking the right square.*/
var clickCount = 0, firstClick = false;
/*Time the user has to complete the level and time in seconds to count down before round start.*/
var time, timer, countDown = 3;
/*Player's xp and coins*/
var xp = 0, coins = 0;
/*Used to check if the player has started the game.*/
var playing = false;
/*Players name used for the leaderboards.*/
var name;
/*Number of lives the player has and the number of wrong tiles clicked.*/
var lives = 3, numWrong = 0;
/*Variables to mute the music and sound.*/
var muteMusic = false, muteSound = false;
/*Amount of money and xp to be given to the player on round completion.*/
var money = 10, exp = 1;
/*Variable used to check if the player is currently All In.*/
var isAllIn = false;
/*Current round streak the player has, used with All In.*/
var streak = 0;
/*Height and width of the screen.*/
var scrHeight, scrWidth;
var userID, ach1, ach2, ach3;

function setifSetandOnPage(){
 getID();		
    ach1 = localStorage.getItem("achlvl1");		
    ach2 = localStorage.getItem("achlvl2");		
    ach3 = localStorage.getItem("achlvl3");
    if (ach1 == 1) {
        $("#ach1").attr("value", 1);
        $("#achBG").removeClass("ui-disabled");
    }	
    if (ach2 == 1){		
        $("#ach2").attr("value", 1);
        $("#achSkills").removeClass("ui-disabled");
    }		
    if (ach3 == 1){		
        $("#ach3").attr("value", 1);
        $("#achGambles").removeClass("ui-disabled");
    }		
    pathLength = localStorage.getItem("pathAch");		
    xp = localStorage.getItem("xpAch");		
    xp--;xp++;		
    coins = localStorage.getItem("coinsAch");		
    coins--;coins++;		
    $(".xp").html(xp + "<br>"+"POINTS");		
    $(".coins").html(coins + "<br>" + "COINS");		
    if(pathLength == null)		
        pathLength = 1;		
    gridChange();		
    localStorage.setItem("pathAch", 1);		
    localStorage.setItem("xpAch", 0);		
    localStorage.setItem("coinsAch", 0);		
    if (userID != null && window.location.hash == "#game-page")		
        play();		
}		
function userPlay(){		
    if (localStorage.getItem("playerName") != null)		
        play();		
}		
function newGame(){		
    path = new Array(0);		
    pathLength = 1;		
    xp = 0;		
    coins = 0;		
    $(".xp").html(xp + "<br>"+"POINTS");		
    $(".coins").html(coins + "<br>" + "COINS");		
    gridChange();		
    $('.progress-bar').html("Timer");		
}

/*Resizes the screen to accomodate elements.*/
function resize() {
    scrHeight = $(window).height();
    scrWidth = $(window).width();

    $(".header").height((100/480)*scrHeight);
    $(".footer").height((80/480)*scrHeight);
    $(".progress").css({
        "margin-top":(30/480)*scrHeight, 
        "height":(40/480)*scrHeight
    });

    $(".progress-bar").css({
        "line-height":(40/480)*scrHeight + "px",
        "font-size": (22/480)*scrHeight
    });

    $(".coins").css({
        "font-size": (12/480)*scrHeight
    });

    $(".xp").css({
        "font-size": (12/480)*scrHeight
    });

    $(".col-xs-3").css({
        "padding-top": (7/480)*scrHeight,
        "text-align": "center"
    });

    $(".livesCont").css({
        "margin-top": (20/480)*scrHeight
    });

    $(".lives").css({
       "font-size": (20/480)*scrHeight
    });
    
    $(".donkey").css({
        "height": (40/480)*scrHeight
    });

    $(".btnimg").css({
        "background-position": "center",
        "background-repeat": "no-repeat",
        "display": "block",
        "margin-left": "auto",
        "margin-right": "auto",
        "margin-top": (13 / 480) * scrHeight+"px"
    });

    $(".btnimg").each(function () {
        this.style.setProperty('height', (50 / 480) * scrHeight + 'px', 'important');
        this.style.setProperty('width', (50 / 480) * scrHeight + 'px', 'important');
    });

    $(".gridPos").css({
        "margin-top": (105 / 480) * scrHeight
    });

    $("#leader-page").css({
        "background-image": "url('images/leaderBG.png')",
        "background-position": "center",
        "background-repeat": "no-repeat",
        "background-size": scrWidth + "px " + scrHeight + "px"
    });

    $(".leaders").css({
        "margin-top": (125 / 480) * scrHeight
    });

    $(".ldrTable").css({
        "position": "absolute",
        "left": (40 / 320) * scrWidth + "px",
        "font-size": (25 / 480) * scrHeight + "px",
        "color": "#553c27",
        "text-shadow": "none"
    });

    $(".scoreData").css({
        "position": "absolute",
        "left": (104 / 320) * scrWidth+"px"
    });

    $(".levelData").css({
        "position": "absolute",
        "left": (209 / 320) * scrWidth+"px"
    });

    $(".overDonkey").css({
        "margin-left": (25/480)*scrWidth,
        "margin-top": (25/480)*scrHeight,
        "height": (270/480)*scrHeight,
        "width": (270/320)*scrWidth
    });
   
    $(".storeCont").css({
        "margin-top": (90/480)*scrHeight
    });

    if (scrWidth < 700) {
        $(".play-sign , .main-sign").css({
            "width": (320 / 320) * scrWidth + "px",
            "height": (80 / 480) * scrHeight + "px",
            "margin-left": "auto",
            "margin-right": "auto",
            "display": "block"
        });
    }else{
        $(".play-sign , .main-sign").css({
            "width": 700 + "px",
            "height": (80 / 480) * scrHeight + "px",
            "margin-left": "auto",
            "margin-right": "auto",
            "display": "block"
        });
    }

    if (scrWidth < 700) {
        $("#main-sign").css({
            "width": (320 / 320) * scrWidth + "px",
            "height": (174 / 480) * scrHeight + "px",
            "margin-bottom": (60 / 480) * scrHeight+ "px",
            "margin-left": "auto",
            "margin-right": "auto",
            "display": "block"
        });
    }else{
        $("#main-sign").css({
            "width": 700 + "px",
            "height": (174 / 480) * scrHeight + "px",
            "margin-bottom": (60 / 480) * scrHeight+ "px",
            "margin-left": "auto",
            "margin-right": "auto",
            "display": "block"
        });
    }
    $(".headGear").css({
        "position": "absolute",
        "top": (170/480)*scrHeight+"px",
        "height": (70/480)*scrHeight,
        "left": (100/320)*scrWidth
    });
    $(".achGear").css({
        "position": "absolute",
        "top": (170/480)*scrHeight+"px",
        "left": (190/320)*scrWidth,
        "height": (70/480)*scrHeight
    });
    $(".gameGear").css({
        "position": "absolute",
        "top": (20/480)*scrHeight+"px",
        "left": (10/320)*scrWidth,
        "height": (70/480)*scrHeight
    });
    $(".mute-sign-ldr").css({
        "position": "absolute",
        "top": (40/480)*scrHeight+"px",
        "left": (230/320)*scrWidth,
        "height": (40/480)*scrHeight,
        "width": (30/320)*scrWidth
    });
}

function getID(){		
    userID = localStorage.getItem("userID");		
    if (userID == null)		
        $("#idForm").submit();		
    $("#userID").attr("value", userID);		
    userID = localStorage.getItem("userID");		
}		
function getName(){		
    name = localStorage.getItem("playerName");		
    if (name != "null") {		
        play();		
        return;		
    }		
    name = $("#name").attr("value");		
    if (name == "")		
        name = "anon";		
    localStorage.setItem("playerName", name);		
    $("#userName").attr("value", name);		
    play();		
}

/*Draws the grid on the screen.*/
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
	$(".cell").css({
        "height": (250/480/cols)*scrHeight+"px",
        "width": (250/480/cols)*scrHeight+"px"
    });
}

/*Called after user name submitted*/
function play() {
    name = localStorage.getItem("playerName");		
    if (name == "null") getName();
    playing = true; //done once, prevents actions before playing

    $("#game").html("<ul id='frame'></ul>"); //gets rid of enter name

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

/*Generates the path to be shown to the user to be replicated.*/
function makePath() {
    step = Math.floor(Math.random() * (cols*cols)); //Selects a cell from the top of the grid
	path.push(step); //Pushes that cell to the beginning of the path
	stepCount++; //Counts up one step
	while(stepCount < pathLength) { //Generates steps until the length has been reached
		do {
            stepx = Math.floor(Math.random()*(step%rows+3-step%rows-1+1)+step%rows-1); //Gets the x value of a cell adjacent to the cell before it
            stepy = Math.floor(Math.random()*(step/rows+2-step/rows-1+1)+step/rows-1); //Gets the y value of a cell adjacent to the cell before it
           } 
        while(stepx < 0 || stepx > rows-1 || stepy < 0 || stepy > rows-1); //If any of the cells are out of bounds, make a new one
		step = stepx + (stepy*rows); //Gets the ID of the cell at the x and y coordinates
		path.push(step); //Pushes that ID into the path
		stepCount++; //Counts up one step
    }
}

/*Shows the path generated by makePath() to the user.*/
function setUpRound(rows, cols) {
    yellow = document.getElementById("yellowTile"); //sound for generate path
    makePath();
    var offset = 0;
    path.forEach(function(e) {
        setTimeout(function() {
            resetAudio(yellow);
            $("#" + e).addClass("path"); //makes cell yellow
            setTimeout(function(){$("#" + e).removeClass("path");}, (250)); //removes yellow
        }, 500 + offset);    
        offset += 500;
    });
    path.push(-3); //signifies the end of the path
    
}

/*Allows the user to click on the home and store buttons again after path has been shown.*/
function enableUserChoice() {
    $(".cell").attr("onclick", "getUserChoice(this.id)");
	firstClick = false;
    /*Allows the user to click the home and store buttons again.*/
    $(".ui-icon-pause").attr("href", "index.html#store-page");
    $(".ui-icon-pause").attr("onclick", "pause();playTransition();playStoreBG();stopGameMusic();mouseClick()");
    $(".ui-icon-homez").attr("href", "#popupDialog");
    $(".ui-icon-homez").attr("onclick", "mouseClick()");
}

/*Prevents user from clicking the grid while the path is being shown.*/
function disableUserChoice() {
    $(".cell").attr("onclick", "");
	firstClick = false;
}

/*Parses user choice and colors the tiles according to if they wee correct or incorrect.*/
function getUserChoice(click_id) {
    if (clickCount == 0)		
        time = 250 * pathLength;

    if(!firstClick || !timer) {
        firstClick = true;
        timer = setInterval(function () {
            if (time <= 0 && lives != 0) {
                clearInterval(timer);
                timer = false;
                getUserChoice(-1);
            }

            if (time >= 0) {
                $('.progress-bar').html(time--); //text on progress bar
                $('.progress-bar').css('width', Math.floor((time / (250 * pathLength)) * 100) + '%'); //red part of progress bar
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
        var p= (xp==1)?"POINT":"POINTS";
        $(".xp").html(xp + "<br>"+p); //1 xp per correct cell
        $("#userScore").attr("value", xp); //used for leaderboard score
    }
    else {
        var red = document.getElementById("redTile");
        resetAudio(red);
        $("#" + click_id).addClass("wrong"); //makes cell red
        setTimeout(function(){$("#" + click_id).removeClass("wrong");}, (250));//removes red
		numWrong++;
	}

    //Makes grid smaller if player clicks 2 wrong tiles.
    if (numWrong == 2) {
     	disableUserChoice();
     	$(".lives").html(" <img class='donkey' src='images/donkey.png' alt='LIVES'/>" + "x" + (--lives));
     	resize();
        if (lives == 0) {
     	    window.location.href = "#over-page";
            $("#game").html("<button onclick='over()'>Go Submit Your Score!</button>");
     	    return;
     	}
		pathLength--;
		isAllIn = false;
        streak = 0;
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
         pathLength++;
         if(pathLength > ($("#userLevel").val()))
            $("#userLevel").attr("value", pathLength); //used for leaderboard score
		 if(isAllIn){
             streak++;
             if(streak == 10){
             	$(".coins").html((coins+= 120) + "<br>COINS");
             	xp += 120;
             	$(".xp").html(xp + "<br>POINTS");
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

/*Resets all variables in preparation for the next round.*/
function reset() {
    exp = 1;
    money = 10;
    time = 250 * pathLength;
	path = new Array(0);
	clickCount = 0;
	stepCount = 0;
	numWrong = 0;
	 $('.progress-bar').html(time); //text on progress bar
     $('.progress-bar').css('width', Math.floor((time / (250 * pathLength)) * 100) + '%');//red part of progress bar
     $('progress-bar').attr('aria-valuenow', ((time / (250 * pathLength)) * 100));
	setUpRound(rows, cols); //makes new round
}

/*Counts down to the round starting.*/
function roundDelay() {	
    document.getElementById("bpStart").play();
    /*Stops user from clicking the home or store buttons while path is being shown.*/
    $(".ui-icon-pause").attr("href", "");
    $(".ui-icon-pause").attr("onclick", "");
    $(".ui-icon-homez").attr("href", "");
    $(".ui-icon-homez").attr("onclick", "");
    //clears game frame
    $('#frame').html("");
    //count down
    $('<p class="cd" id=' + 'cd' + countDown + '>' + countDown  + '</p>' ).appendTo('#frame');
    //level number
    $('<p class="cd" id=' + 'levelNum' + '>' + "LEVEL " + pathLength + '</p>' ).appendTo('#frame');
    var countTime = setInterval(function () {
        countDown--;
        if (countDown >= 2) {
            document.getElementById("bpStart").play();
        } else if(countDown == 1){
            document.getElementById("bpEnd").play();
        }
        $('#' + 'cd' + (countDown + 1)).html('<p class="cd" id=' + 'cd' + countDown + '>' + countDown + '</p>');
        if (countDown == 0) {
            clearInterval(countTime);
            $('#' + 'cd' + countDown).remove();
            countDown = 3;
        }
    }, 1000); 
}

/*Pauses the timer in order to show the path to the user.*/
function pause() {
	clearInterval(timer);
	timer = false;
}

/*Plays sound for when user changes pages.*/
function playTransition(){
    var pageAudio = document.getElementById("pageChange");
    pageAudio.play();
}

/*Changes grid length based on level user has reached.*/
function gridChange() {
    if (pathLength - 10 > 0){ //Level 11
        cols = 5;
        rows = 5;
    }else if (pathLength - 7 > 0){ //Level 8
        cols = 4;
        rows = 4;        
    }else if (pathLength - 4 > 0){ //Level 5
        cols = 3;
        rows = 3;        
    }else if (pathLength - 1 > 0){ //Level 2
        cols = 2;
        rows = 2;        
    } else { //Level 1
        cols = 1;
        rows = 1;
    }
}

/*Mutes all sounds such as tile sounds, clicking, etc.*/
function muteSounds() {
    var path = "images/";
    path += (!muteSound) ? "soundmute.png" : "sound.png";
    $(".muteSound").attr("src", path);
    if (muteSound) {
        $(".sound").prop('muted', false);
        muteSound = false;
    } else {
        $(".sound").prop('muted', true);
        muteSound = true;
    }
}

/*Mutes all music, intro music and store music.*/
function muteMusics() {
    var path = "images/";
    path += (!muteMusic) ? "musicmute.png" : "music.png";
    $(".muteMusic").attr("src", path);

    if (muteMusic) {
        $(".music").prop('muted', false);
        muteMusic = false;
    } else {
        $(".music").prop('muted', true);
        muteMusic = true;
    }
}

/*Plays the intro music.*/
function playIntro() {
    var intro = document.getElementById("introMusic");
    resetAudio(intro);
}

/*Stops the intro music.*/
function stopIntro() {
    var intro = document.getElementById("introMusic");
    intro.pause();
}

/*Resets an audio track so it starts at the beginning when played again.*/
function resetAudio(audio) {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
}

/*Plays the game music.*/
function playGameMusic(){
    var game = document.getElementById("gameMusic");
    game.volume = 0.1;
    game.play();
}

/*Stops the game music.*/
function stopGameMusic(){
    var game = document.getElementById("gameMusic");
    game.pause();    
}

/*Plays mouse click sound when user clicks on an option.*/
function mouseClick() {
    var click = document.getElementById("mouseClick");
    click.play();
}

/*Plays when user successfully makes a store purchase.*/
function storePurchase() {
    var click = document.getElementById("cashRegister");
    click.play();
}

/*Plays when a round ends signifying the user has recieved coins.*/
function endRoundReward() {
    if((pathLength == 3 && localStorage.getItem("achlvl1") == null)|| (pathLength == 7 && localStorage.getItem("achlvl2") == null) || (pathLength == 10 && localStorage.getItem("achlvl3") == null) ){			
        localStorage.setItem("pathAch", pathLength + 1);		
        localStorage.setItem("xpAch", xp);		
        localStorage.setItem("coinsAch", coins+10);		
    }		
    if (pathLength == 3 && localStorage.getItem("achlvl1") == null) {		
        localStorage.setItem("achlvl1", 1);		
        $("#ach1").attr("value", 1);		
        $("#purp").attr("value", 1);
        $("#achBG").removeClass("ui-disabled");		
        $("#achesForm").submit();		
    } 		
    if (pathLength == 7 && localStorage.getItem("achlvl2") == null) {		
        localStorage.setItem("achlvl2", 1);		
        $("#ach2").attr("value", 1);		
        $("#purp").attr("value", 1);
        $("#achSkills").removeClass("ui-disabled");		
        $("#achesForm").submit();		
    }		
    if (pathLength == 10 && localStorage.getItem("achlvl3") == null) {		
        localStorage.setItem("achlvl3", 1);		
        $("#ach3").attr("value", 1);		
        $("#purp").attr("value", 1);
        $("#achGambles").removeClass("ui-disabled");		
        $("#achesForm").submit();		
    }

    var click = document.getElementById("coinDrop");
    click.play();
    $(".coins").html((coins+=money) + "<br>COINS");
}

function checkPageSound(){
    if(window.location.hash != "#main-page" && window.location.hash != "")
        stopIntro();
}

window.onunload = window.onbeforeunload = (function () {
    if (window.location.hash == "#over-page") {
        window.location.href = '#leader-page';
        location.reload();
    }
        
    
});

$(window).resize(function () {
    resize();
})

/*Displays the game over page.*/
function over(){
    window.location.href = "#over-page";
}
