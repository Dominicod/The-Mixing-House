// Uses JSON to validate user auth input
const buttonsi = document.querySelector("#signin")
const buttoncr = document.querySelector("#create")

// waits for button press, sends data with AJAX to the backend, returns issues that occur
buttonsi.addEventListener('click', validate)
buttoncr.addEventListener('click', validate)


function validate() {

    if (this.id == "signin") {
        username = document.getElementById('username1')
        password = document.getElementById('password1')
    } else {
        username = document.getElementById('username2')
        password = document.getElementById('password2')
    }

    const auth = {
        "username": username.value,
        "password": password.value,
        "origin": this.id
    };
    if (!auth.username) {
        throw 'Username needed'
    }
    if (!auth.password) {
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
                if (response.status == 400) {
                    document.getElementById('username1').value = '';
                    document.getElementById('password1').value = '';
                    document.getElementById('username2').value = '';
                    document.getElementById('password2').value = '';
                    return;
                } else if (response.status == 307) {
                    // valid login
                    location.href = `${window.origin}/`;
                    return;
                } else {
                    console.log(`${response.status}`)
                }
            })
    } catch (error) {
        console.log(error);
    }
}