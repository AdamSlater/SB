var frame, path = [], rows, cols, pathLength = 1;
var step, stepCount = 0;
var speed = 1, speedSet = false;
var clickCount = 0, firstClick = false;
var time = 1200, timer, countDown = 3;
var xp = 0, coins = 0;
var playing = false;
var name = false, numWrong = 0;
var mute = false;

/*Draws grid*/
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

/*Resizes footer+header*/
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

/*Called after user name submitted*/
function play() {
    resize();
    playing = true;//done once, prevents actions before playing

    name = $("#name").attr("value");//adds to form for leaderboard
    if (!name) name = "anon";//default name
    $("#userName").attr("vaue", name);//change name ^

    $("#game").html("<ul id='frame'></ul>"); //gets rid of enter name

    rows = 5, cols = 5;//initial grid size
    frame = new Array(rows);
    roundDelay();//count down
    setTimeout(function() {
        init(rows, cols);
        setUpRound(rows, cols);
    }, 3000); 
    setTimeout(function() {
        enableUserChoice();
    }, (3000 + (543 * pathLength))); 
}

function makePath() {
    step = Math.floor(Math.random() * cols);//starts top row
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
    var yellow = document.getElementById("yellowTile");//sound for generate path
	yellow.volume = (mute) ? 0 : 1;//toggle volume

    makePath();

    var offset = 0;
    path.forEach(function(e) {
        setTimeout(function() {
            yellow.pause();
            yellow.currentTime = 0;
            yellow.play();
            $("#" + e).addClass("path");//makes cell yellow
            setTimeout(function(){$("#" + e).removeClass("path");}, (250*speed));//removes yellow
        }, 500 + offset);    
        offset += 500;
    });
    path.push(-3); //signifies the end of the path
}

function enableUserChoice() {
    $(".cell").attr("onclick", "getUserChoice(this.id)");
	firstClick = false;
}

function disableUserChoice() {
    $(".cell").attr("onclick", "");
	firstClick = false;
}

function getUserChoice(click_id) {	
    if (time <= 0) {//return early if timeup
        clearInterval(timer);
        return;
    } 

    if(!firstClick) {
        firstClick = true;
        timer = setInterval(function () {
            if (time == 0) clearInterval(timer);
            $('#timer').html(time-- + " donkey seconds");
            if (time >= 0) {
                $('.progress-bar').html(time);//text on progress bar
                $('.progress-bar').css('width', Math.floor((time / 2000) * 100) + '%');//red part of progress bar
                $('progress-bar').attr('aria-valuenow', ((time / 2000) * 100));
            }
        }, 1);
    }

    if(click_id == path[clickCount]) {
        var green = document.getElementById("greenTile");
        green.volume = (mute) ? 0 : 1;
		green.pause();
        green.currentTime = 0;
        green.play();
        $("#" + click_id).addClass("selected");//makes cell green
        setTimeout(function(){$("#" + click_id).removeClass("selected");}, (250*speed));//removes green
        clickCount++;
        $(".xp").html(++xp + "XP");//1 xp per correct cell
        $("#userScore").attr("value", xp);//used for leaderboard score
    }
    else {
        var red = document.getElementById("redTile");
        red.volume = (mute) ? 0 : 1;
		red.pause();
        red.currentTime = 0;
        red.play();
        $("#" + click_id).addClass("wrong");//makes cell red
        numWrong++;
        setTimeout(function(){$("#" + click_id).removeClass("wrong");}, (250*speed));//removes red
    }

    //regresses, pathlength
    if (numWrong == 2) {
     	disableUserChoice();
        pathLength--;
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
        
    }

    if (path[clickCount] == -3) {
 	disableUserChoice();
        $(".coins").html((coins+=10) + " COINS");
         pathLength++;
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
        
    }
     
}

function reset() {
    time += 1500;
	path = new Array(0);
	clickCount = 0;
	stepCount = 0;
	numWrong = 0;
	setUpRound(rows, cols);//makes new round
}

function roundDelay() {	
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
}

function resume() {
    if (!playing) return;
    if (time <= 0) return;
	timer = setInterval(function () { $('#timer').html(time-- + " donkey seconds"); if(time < 0){ clearInterval(timer);}; }, 1);
}

function playTransition(){
    var pageAudio = document.getElementById("pageChange");
    pageAudio.play();
}
