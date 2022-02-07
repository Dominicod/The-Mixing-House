// Uses AJAX to validate user auth input
const button = document.querySelector("#create")

// waits for button press, sends data with AJAX to the backend, returns issues that occur
button.addEventListener('click', e => {
    console.log("Button activated!~")
    username = document.getElementById('username').value
    password = document.getElementById('password').value
    if (!username) {
        document.getElementById('username').style.border = "thick solid red";
        throw 'Username needed'
    }
    if (!password) {
        document.getElementById('password').style.border = "thick solid red";
        throw 'Password needed'
    }
    // Trys to send information to server, prints error if failure
    try {
        // Sets up form data
        const data = new FormData()
        data.append("username", username);
        data.append("password", password);

        const XHR = new XMLHttpRequest();

        console.log("Opening XHR Request");
        XHR.open("POST", "app.py", true);

        console.log("XHR Data sent");
        XHR.send(data);
    } catch (error) {
        console.log(error);
    }
})