var frame;
var path = [];
var step, stepCount = 0;
var speed = 1, speedSet = false;
var rows, cols, pathLength;
var userChoice;
var clickCount = 0, firstClick = false;
var time = 1200;
var timer;
var countDown = 3;
var xp = 0, coins = 0;
var playing = false;
var name = false, numRight = 0, numWrong = 0;
var texts = ["This is the grid.", "When you see a square flash, remember that square.", "Click the wrong square and it flashes red."];
var counter = 0;

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
    resize();
    playing = true;

    name = $("#name").attr("value");
    if (!name) name = "anon";
    $("#userName").attr("vaue", name);

    $("#game").html("<ul id='frame'></ul>"); //gets rid of enter name

    rows = 5, cols = 5;
    pathLength = 5;
    frame = new Array(rows);
    userChoice = new Array(pathLength);
    roundDelay();
    setTimeout(function() {
        init(rows, cols);
        setUpRound(rows, cols);
    }, 3000); 
    setTimeout(function() {
        enableUserChoice();
    }, 6000); 
}

function makePath() {
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
    path.push(-3); //signifies the end of the path
}

function setUpRound(rows, cols) {
    makePath();
    var offset = 0;
    path.forEach(function(e) {
        setTimeout(function() {
            $("#" + e).addClass("path");
            setTimeout(function(){$("#" + e).removeClass("path");}, (250*speed));
        }, 500 + offset);    
        offset += 500;
    });
}

function enableUserChoice() {
    var num = 0;
    for (var i = 0; i < rows; i++) {
         for (var j = 0; j < cols; j++) {
            document.getElementById(num++).onclick = function(){ 
                getUserChoice(this.id);
            };
         }
    }
}

function getUserChoice(click_id) {
    if (time <= 0) {
        clearInterval(timer);
        return;
    } 

    if(!firstClick) {
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
        $("#" + click_id).addClass("selected");
        var blink = setTimeout(function(){$("#" + click_id).removeClass("selected");}, (250*speed));
        clickCount++;
        $("#xp").html(++xp + "XP");
        $("#userScore").attr("value", xp);
    }
    else {
        $("#" + click_id).addClass("wrong");
        numWrong++;
        var blink = setTimeout(function(){$("#" + click_id).removeClass("wrong");}, (250*speed));
    }

    userChoice.push(click_id);

    if (numWrong == 2) {
        if (rows > 1 && cols > 1)
            rows-- && cols--;
        numWrong = 0;
        roundDelay();
        setTimeout(function() {
            init(rows, cols);
            setUpRound(rows, cols);
        }, 3000); 
        setTimeout(function() {
            enableUserChoice();
        }, 6000); 
    }

    if (path[clickCount] == -3) {
        $("#coin").html((coins+=10) + " COINS");
        reset();
    }
}

function reset() {
    time += 1500;
	path = new Array(0);
	clickCount = 0;
	stepCount = 0;
	numWrong = 0;
	setUpRound(rows, cols);
}

function roundDelay() {
    $('#frame').html("");
    $('<p class="cd" id=' + 'cd' + countDown + '>' + countDown + '</p>').appendTo('#frame');
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
	clearInterval(timer);
}

function resume() {
    if (!playing) return;
    if (time <= 0) return;
	timer = setInterval(function () { $('#timer').html(time-- + " donkey seconds"); if(time < 0){ clearInterval(timer);}; }, 1);
}