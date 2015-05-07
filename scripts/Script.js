var frame;
var path = [];
var step, stepCount = 0;
var speed = 1, speedSet = false;
var rows, cols;
var clickCount = 0, firstClick = false;
var time = 1200;
var timer;
var countDown = 3;
var xp = 0, coins = 0;
var playing = false;
var name = false, numRight = 0, numWrong = 0;
pathLength = 1;

function init(rows,cols) {
	console.log("drawing frame");
	
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

function resize() {
    var screen = $.mobile.getScreenHeight();
    var header = $(".ui-header").hasClass("ui-header-fixed") ? $(".ui-header").outerHeight()  - 1 : $(".ui-header").outerHeight();
    var footer = $(".ui-footer").hasClass("ui-footer-fixed") ? $(".ui-footer").outerHeight() - 1 : $(".ui-footer").outerHeight();
    /* content div has padding of 1em = 16px (32px top+bottom). This step
       can be skipped by subtracting 32px from content var directly. */
    var contentCurrent = $(".ui-content").outerHeight() - $(".ui-content").height();
    var content = screen - header - footer - contentCurrent;
    $(".ui-content").height(content);
    $(".ui-content").css({"margin-top":$(".ui-header").height() + "px"});
    $(".ui-content").css({"padding":"0px"});
}

function play() {
	
	console.log("first method call");
	
    resize();
    playing = true;

    name = $("#name").attr("value");
    if (!name) name = "anon";
    $("#userName").attr("vaue", name);

    $("#game").html("<ul id='frame'></ul>"); //gets rid of enter name

    rows = 1, cols = 1;
    frame = new Array(rows);
    roundDelay();
    setTimeout(function() {
        init(rows, cols);
        setUpRound(rows, cols);
    }, 3000); 
    setTimeout(function() {
        enableUserChoice();
    }, 3001); 
}

function makePath() {
	console.log("making path");
    step = Math.floor(Math.random() * cols);
	path.push(step);
	stepCount++;
	while(stepCount < pathLength) {
		do {
            stepx = Math.floor(Math.random()*(step%rows+3-step%rows-1+1)+step%rows-1);
            stepy = Math.floor(Math.random()*(step/rows+2-step/rows-1+1)+step/rows-1);
        } while(stepx < 0 || stepx > rows-1 || stepy < 0 || stepy > rows-1);
		step = stepx + (stepy*rows);
		path.push(step);
		stepCount++;
    }
}

function setUpRound(rows, cols) {

	console.log("setting up round");
    var yellow = document.getElementById("yellowTile");
	console.log("before making the path");
    makePath();
	console.log("after making the path");
    var offset = 0;
    path.forEach(function(e) {
        setTimeout(function() {
            yellow.pause();
            yellow.currentTime = 0;
            yellow.play();
            $("#" + e).addClass("path");
            setTimeout(function(){$("#" + e).removeClass("path");}, (250*speed));
        }, 500 + offset);    
        offset += 500;
    });
    path.push(-3); //signifies the end of the path
}

function enableUserChoice() {
	console.log("enabling choice");
    var num = 0;
    for (var i = 0; i < rows; i++) {
         for (var j = 0; j < cols; j++) {
            document.getElementById(num++).onclick = function(){ 
                getUserChoice(this.id);
            };
         }
    }
	console.log("resetting user clicks to continue timer");
	firstClick = false;
}

function getUserChoice(click_id) {
	console.log("user click");
	
    if (time <= 0) {
        clearInterval(timer);
        return;
    } 

    if(!firstClick) {
		console.log("timer continue");
        firstClick = true;
        timer = setInterval(function () {
            if (time == 0) clearInterval(timer);
            $('#timer').html(time-- + " donkey seconds");
            if (time >= 0) {
                $('.progress-bar').html(time);
                $('.progress-bar').css('width', Math.floor((time / 2000) * 100) + '%');
                $('progress-bar').attr('aria-valuenow', ((time / 2000) * 100));
            }
        }, 1);
    }

    if(click_id == path[clickCount]) {
        var green = document.getElementById("greenTile");
        green.pause();
        green.currentTime = 0;
        green.play();
        $("#" + click_id).addClass("selected");
        var blink = setTimeout(function(){$("#" + click_id).removeClass("selected");}, (250*speed));
        clickCount++;
        $("#xp").html(++xp + "XP");
        $("#userScore").attr("value", xp);
    }
    else {
        var red = document.getElementById("redTile");
        red.pause();
        red.currentTime = 0;
        red.play();
        $("#" + click_id).addClass("wrong");
        numWrong++;
        var blink = setTimeout(function(){$("#" + click_id).removeClass("wrong");}, (250*speed));
    }

    if (numWrong == 2) {
    pathLength--;
        if (rows > 1 && cols > 1)
            rows-- && cols--;
        numWrong = 0;
        roundDelay();
		pause();
        setTimeout(function() {
            init(rows, cols);
			reset();
        }, 3000); 
        setTimeout(function() {
            enableUserChoice();
        }, 6000); 
        
    }

    if (path[clickCount] == -3) {
        $("#coin").html((coins+=10) + " COINS");
         pathLength++;
         roundDelay();
		pause();
        setTimeout(function() {
            init(rows, cols);
			reset();
        }, 3000); 
        setTimeout(function() {
            enableUserChoice();
        }, 6000); 
        
    }
     
}

function reset() {
	console.log("resetting");
    time += 1500;
	path = new Array(0);
	clickCount = 0;
	stepCount = 0;
	numWrong = 0;
	setUpRound(rows, cols);
}

function roundDelay() {
	
	console.log("adding delay");
	
    $('#frame').html("");
    $('<p class="cd" id=' + 'cd' + countDown + '>' + countDown  + '</p>' ).appendTo('#frame');
     $('<p class="cd" id=' + 'levelNum' + '>' + "LEVEL " + pathLength + '</p>' ).appendTo('#frame');
    var countTime = setInterval(function () {
        countDown--
        $('#' + 'cd' + (countDown + 1)).html('<p class="cd" id=' + 'cd' + countDown + '>' + countDown + '</p>');
        if (countDown == 0) {
            clearInterval(countTime);
            $('#' + 'cd' + countDown).remove();
            countDown = 3;
        }
    }, 1000); 
}

function pause() {
	console.log("pausing game");
	clearInterval(timer);
}

function resume() {
	console.log("resuming game");
    if (!playing) return;
    if (time <= 0) return;
	timer = setInterval(function () { $('#timer').html(time-- + " donkey seconds"); if(time < 0){ clearInterval(timer);}; }, 1);
}

function playTransition(){
    var pageAudio = document.getElementById("pageChange");
    pageAudio.play();
}