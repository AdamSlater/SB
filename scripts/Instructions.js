var texts = ["This is the grid.", "When a square flashes yellow, click that square.", "Click the wrong square and it flashes red."];
var counter = 0;

function next() {
    var text = document.getElementById('instruct');
    counter++;
    if(texts[counter] == undefined) {
        counter = 0;
    }
    text.innerHTML = texts[counter];
}

function previous() {
    var text = document.getElementById('instruct');
    counter--;
    if(texts[counter] == undefined) {
        counter = 2;
    }
    text.innerHTML = texts[counter];
}

jQuery("#slideshow").cycle({
timeout:0,
fx: 'fade',
next: '#next',
prev: '#prev'
});