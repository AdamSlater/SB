var texts = ["This is the grid.", "When you see a square flash, remember that square.", "Click the wrong square and it flashes red."];
var images = ["images/Instructions/instructions1.png", "images/Instructions/instructions2.png", "images/Instructions/instructions3.png"];
var counter = 0;

function next() {
    var text = document.getElementById('instruct');
    var image = document.getElementById('instructionsPicture').src;
    counter++;
    if(texts[counter] == undefined) {
        counter = 0;
    }
    text.innerHTML = texts[counter];
    console.log(image);
    image = "images/Instructions/instructions2.png";
}

function previous() {
    var text = document.getElementById('instruct');
    counter--;
    if(texts[counter] == undefined) {
        counter = 1;
    }
    text.innerHTML = texts[counter];
}

jQuery("#slideshow").cycle({
timeout:0,
fx: 'fade',
next: '#next',
prev: '#prev'
});