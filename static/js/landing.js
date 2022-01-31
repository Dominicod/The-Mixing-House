
// Will make this function correctly cycle through images at some point

let BG1 = "url('/static/img/BG1.jpg')"
let BG2 = "url('/static/img/BG2.jpg')"
let BG3 = "url('/static/img/BG3.jpg')"
let BG4 = "url('/static/img/BG4.jpg')"
arr = [BG1, BG2, BG3, BG4];

function ImageCycle() {
    random = Math.floor(Math.random() * arr.length)
    document.getElementById("hero").style.backgroundImage=arr[random];
}

// Calls ImageCycle
ImageCycle();
