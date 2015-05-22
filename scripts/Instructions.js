var texts = ["The game starts here in a 1x1 to 5x5 sized grid.", "Your job is to replicate the same pattern in which the yellow tiles blink.",
 "A green tile will blink if the tile you click is correct.","A red tile will blink if the tile you clicked was wrong.",
 "After completing a level you will be awarded 10 coins and 1xp per correct square clicked. Coins can be used in the store to purchase goodies.",
 "Skills provide you with abilities to survive longer such as extra lives or showing the path again.",
 "Gambles tetst your luck. Succeed in finishing a level and you could earn double coins or xp. Fail that level though and you'll lose the money you spent."];
var num = 1;
var imageFolder = "images/Instructions/instructions";
var ext = ".png";

/*Displays next image + text instruction*/
function next() {
    if (num <= 7) {
        (num == 7) ? num = 0 : {};
        $("#slideshow").attr("src", imageFolder + ++num + ext);
        $("#instText").html(texts[num-1]); 
    }
}

/*Displays previous image + text instruction*/
function previous() {
    if (num >= 1) {
        (num == 1) ? num = 8 : {};
        $("#slideshow").attr("src", imageFolder + --num + ext);
        $("#instText").html(texts[num-1]); 
    }
}