var texts = ["The game starts here, in an X by X grid.", "Your job is to replicate the same pattern in which the yellow tiles blink.",
 "A green tile will blink indicating the correct tile in the pattern was clicked.","A red tile will blink indicating an incorrect tile was clicked.",
 "After completing a level you will be awarded coins, spend them in the store for various abilities, hints, or even an extra life and etc.","Skills: Things that assist you in surviving the game longer",
 "Gambles: Similar to skills but they present a risk, spending coins to get a chance at whatever the ability is."];
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