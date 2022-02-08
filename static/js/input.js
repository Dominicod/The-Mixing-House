// Uses AJAX/JSON to validate user auth input
const button = document.querySelector("#create")

// waits for button press, sends data with AJAX to the backend, returns issues that occur
button.addEventListener('click', e => {
    const auth = {
        "username": document.getElementById('username').value,
        "password": document.getElementById('password').value,
        "origin": window.location.pathname
    };
    if (!auth.username) {
        document.getElementById('username').style.border = "solid red";
        throw 'Username needed'
    }
    if (!auth.password) {
        document.getElementById('password').style.border = "solid red";
        throw 'Password needed'
    }
    // Trys to send information to server, prints error if failure
    try {
        fetch(`${window.origin}/validation`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(auth),
                cache: "no-cache",
                headers: new Headers({
                    "content-type": "application/json"
                })
            })
            .then(response => {
                if (response.status !== 200) {
                    console.log(`Response status was not 200: ${response.status}`);
                    return;
                }
            })
    } catch (error) {
        console.log(error);
    }
})

// If code == 307 redirect user to landing
// else if code == 400 prompt user saying invalid