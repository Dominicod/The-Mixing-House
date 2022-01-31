// Creates a class to define what a background image is
class BGImg {
    constructor(url, displayed) {
        this.url = url;
        this.displayed = displayed;
    }
}

// Assigns background images
let BG1 = new BGImg("url('/static/img/BG1.jpg')", false)
let BG2 = new BGImg("url('/static/img/BG2.jpg')", false)
let BG3 = new BGImg("url('/static/img/BG3.jpg')", false)
let BG4 = new BGImg("url('/static/img/BG4.jpg')", false)
let BG5 = new BGImg("url('/static/img/BG5.jpg')", false)
let BG6 = new BGImg("url('/static/img/BG6.jpg')", false)
arr = [BG1, BG2, BG3, BG4, BG5, BG6];
total = 0;

// Cycles through the background images untill it cannot cycle anymore, which it then reevaluates arr.displayed = false
window.onload = function ImageCycle() {
    random = Math.floor(Math.random() * arr.length)
    if (arr[random].displayed == false) {
        document.getElementById("hero").style.backgroundImage=arr[random].url;
        arr[random].displayed = true;
        total++;
    }
    else if (total == arr.length) {
        for (let i = 0; i < arr.length; i++) {
            arr[i].displayed = false;
        }
        total = 0;
    }
    timerRef = setTimeout(ImageCycle, 10000);
}
