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
        let HTML = '';

        for (i = 0; i < data.length; i++) {
            HTML += "<p>" + data[i].name + " is a " + data[i].species + ".</p>";
        }

        contentContainer.insertAdjacentHTML('beforeend', HTML);
    } else {
        let HTMLHeader = `
            <div class="row">
                <div class="pt-3 col border-end border-primary">
                    <p class="h5 text-center">Liquor</p>
                </div>
                <div class="pt-3 col">
                    <p class="h5 text-center">Flavour Profile</p>
                </div>
            </div>
            <div class="row border-bottom border-primary m-0">
                <div class="col border-end border-primary">Vodka</div>
                <div class="col">Fruity</div>
            </div>
            <div class="row">
                <p class="h5 text-center pt-3">Cocktails</p>
                <div id="cocktails" class="row justify-content-center"></div>
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