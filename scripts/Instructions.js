var texts = ["This is the grid.", "When a square flashes yellow, click that square.", "Click the wrong square and it flashes red."];
var num = 1;
var name = "images/Instructions/instructions";
var ext = ".png";

/*Displays next image + text instruction*/
function next() {
    if (num <= 3) {
        (num == 3) ? num = 0 : {};
        $("#slideshow").attr("src", name + ++num + ext);
        $("#instText").html(texts[num-1]); 
    }
}

/*Displays previous image + text instruction*/
function previous() {
    if (num >= 1) {
        (num == 1) ? num = 4 : {};
        $("#slideshow").attr("src", name + --num + ext);
        $("#instText").html(texts[num-1]); 
    }
}
