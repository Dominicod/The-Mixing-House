// Uses JSON/AJAX to display content and tab between pages

const contentContainer = document.getElementById('session-content');
const tabs = document.querySelectorAll('.tabs')
const mixer = document.querySelector('#mixer')

// Allows tabbing between pages with event listeners
// Automatically deletes and replaces HTML in given tab
tabs.forEach(element => {
    element.addEventListener('click', e => {
        data(e);
    })
})

// Loads the "Mixer" tab automatically by default through an else statement in
// function renderHTML
// Throws unknown error..but works..
window.addEventListener('load', e => {
    renderHTML(data(e), "mixer");
})

// Makes JSON request to server for information regarding tabs
function data(e) {
    let target = e.target.id
    const request = new XMLHttpRequest();
    request.open('GET', 'https://learnwebcode.github.io/json-example/animals-1.json');
    request.onload = f => {
        const data = JSON.parse(request.responseText);
        renderHTML(data, target);
    }
    request.onerror = e => {
        console.log("Connection Error")
    }
    request.send();
}

// Renders the HTML on the given tab with information from function Data
function renderHTML(data, target) {
    while (contentContainer.firstChild) {
        contentContainer.removeChild(contentContainer.firstChild);
    }
    if (target == "bar") {
        let HTML = `
            <div class="row p-3">
                <div class="col">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="switch1">
                        <label class="form-check-label" for="switch1">${data[0].name}</label>
                    </div>
                </div>
                <div class="col">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="switch2">
                        <label class="form-check-label" for="switch2">${data[1].name}</label>
                    </div>
                </div>
                <div class="col">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="switch3">
                        <label class="form-check-label" for="switch3">${data[2].name}</label>
                    </div>
                </div>
            </div>
        `;

        contentContainer.insertAdjacentHTML('beforeend', HTML);
    } else {
        let HTMLHeader = `
            <div class="row container-xxl">
                <div class="pt-3 col">
                    <p class="h5 text-center">Liquor</p>
                </div>
                <div class="pt-3 col ">
                    <p class="h5 text-center">Flavour Profile</p>
                </div>
                <div id="cocktails" class="pt-3 row justify-content-center"></div>
            </div>
        `;
        contentContainer.insertAdjacentHTML('beforeend', HTMLHeader);

        let HTML = ``;
        cocktailContainer = document.getElementById('cocktails')

        for (i = 0; i < data.length; i++) {
            HTML += `
                <div class="card m-3" style="width: 18rem;">
                    <div class="card-body text-dark">
                        <h5 class="card-title">Manhatton</h5>
                        <p class="card-text"><strong>Liqour Primary: </strong>${data[i].name}</p>
                        <p class="card-text"><strong>Flavour: </strong>${data[i].species}</p>
                        <a href="#" class="btn btn-primary">Recipe</a>
                    </div>
                </div>
            `;
        }

        cocktailContainer.insertAdjacentHTML('beforeend', HTML);
    }
}