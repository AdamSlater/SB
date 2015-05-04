var frame;
var path = [];
var step, userPath, stepCount = 0;
var speed = 1, speedSet = false;
var rows, cols, pathLength;
var userChoice;
var clickCount = 0, firstClick = false;
var time = 1200;
var timer;
var xp = 0, coins = 0;
var playing = false;
var name = false, numRight = 0, numWrong = 0, userSucks = false;

function init(rows,cols){
    var num = 0;
    $("#game").html("<ul id='frame'></ul>");
    for (var i = 0; i < rows; i++){
        frame[i] = new Array(cols);
         for (var j = 0; j < cols; j++){
             frame[i][j] = $('<li onclick="getUserChoice(this.id)" class="cell" id=' + num++ +' >').appendTo('#frame');
             if ((j+1)%cols==0)
                 $('<br>').appendTo('#frame');
         }       
    }
}

function resize(){
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

function play(){
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
    init(rows, cols);
    setUpRound(rows, cols);
}

function makePath(){
    step = Math.floor(Math.random() * cols);
	path.push(step);
	stepCount++;
	while(stepCount < pathLength){
		do {
				stepx = Math.floor(Math.random()*(step%rows+3-step%rows-1+1)+step%rows-1);
				stepy = Math.floor(Math.random()*(step/rows+2-step/rows-1+1)+step/rows-1);
			} 
        while(stepx < 0 || stepx > rows-1 || stepy < 0 || stepy > rows-1)
		step = stepx + (stepy*rows);
		path.push(step);
		stepCount++;
    }
    path.push(-3); //signifies the end of the path
}

function setUpRound(rows,cols){
    makePath();
    var offset = 0;
    path.forEach(function(e){
        setTimeout(function(){
            $("#" + e).addClass("path");
            setTimeout(function(){$("#" + e).removeClass("path");}, (250*speed));
        }, 500 + offset);    
        offset += 500;
    });
}

function getUserChoice(click_id){
    if (time <= 0){
        clearInterval(timer);
        return;
    } 

    if(!firstClick){
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

    if(click_id == path[clickCount]){
        $("#" + click_id).addClass("selected");
        var blink = setTimeout(function(){$("#" + click_id).removeClass("selected");}, (250*speed));
        clickCount++;
        $("#xp").html(++xp + "XP");
        $("#userScore").attr("value", xp);
    }
    else{
        $("#" + click_id).addClass("wrong");
        numWrong++;
        var blink = setTimeout(function(){$("#" + click_id).removeClass("wrong");}, (250*speed));
    }

    userChoice.push(click_id);

    if (numWrong == 2){
        if (rows > 1 && cols > 1)
            rows-- && cols--;
        numWrong = 0;
        init(rows, cols);
    }

    if(path[clickCount] == -3)
		reset();

    $("#coin").html(++coins + " COINS");
}

function reset() {
    time += 1500;
	path = new Array(0);
	clickCount = 0;
	stepCount = 0;
	setUpRound(rows, cols);
}

function slowMo(){
    if (!playing) return;
    if (!speedSet){
        speed = 10;
        speedSet = true;
    }
    resume();
}

function hint(){
    if (!playing) return;
	var hint = path[clickCount];
    setTimeout(function(){
        $("#" + hint).addClass("path");
        setTimeout(function(){$("#" + hint).removeClass("path");}, (250*speed));
    }, 500);
    resume();    
}

function repeat(){
    if (!playing) return;
	var offset = 0;
    path.forEach(function(e){
      	setTimeout(function(){
            $("#" + e).addClass("path");
            setTimeout(function(){$("#" + e).removeClass("path");}, (250*speed));
        }, 500 + offset);    
        offset += 500;
    });
    resume();
}

function pause(){
	clearInterval(timer);
}

function resume(){
    if (!playing) return;
    if (time <= 0) return;
	timer = setInterval(function () { $('#timer').html(time-- + " donkey seconds"); if(time < 0){ clearInterval(timer);}; }, 1);
}

function makeRed(){
    $("#game-page, #instruct-page, #store-page").css({"background": "#FF0000"});
}

function makeBlue(){
    $("#game-page, #instruct-page, #store-page").css({"background": "#0000FF"});
}
function makeGreen(){
    $("#game-page, #instruct-page, #store-page").css({"background": "#00FF00"});
}

function makeFire(){
    $("#game-page, #instruct-page, #store-page").css({
        "background-image" : "url('images/giphy 1.gif')",
        "background-position" : "center",
        "background-repeat" : "no-repeat",
        "background-size" : "cover"
    });
}

