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