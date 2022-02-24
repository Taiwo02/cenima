function register(event) {
    let response = document.querySelector("#message")
    event.preventDefault()
    if (name1.value == "") {

        document.getElementById('name1').focus();
    } else if (name2.value == "") {

        document.getElementById('name2').focus();
    } else if (name3.value == "") {

        document.getElementById('name3').focus();
    } else if (number.value == "") {

        document.getElementById('number').focus();
    } else if (email.value == "") {

        document.getElementById('email').focus();
    } else if (password.value == "") {

        document.getElementById('password').focus();
    } else {
        human = {
            "SURNAME": name1.value,
            "FIRST_NAME": name2.value,
            "SECOND_NAME": name3.value,
            "PHONE_NUMBER": number.value,
            "EMAIL_ADDRESS": email.value,
            "PASSWORD": password.value,
        }


        if (localStorage.getItem("registeredHumans")) {
            let data = JSON.parse(localStorage.getItem("registeredHumans"));
            let index = data.findIndex((existingUser) => existingUser.EMAIL_ADDRESS == human.EMAIL_ADDRESS);
            console.log(index);
            if (index > -1) {
                response.style.color = "red";
                return response.innerHTML = "Oops! Account already exists";
            }
            human.ID = data.length + 1;
            let newData = [...data, human]
            localStorage.setItem("registeredHumans", JSON.stringify(newData))
            window.open("http://127.0.0.1:5502/customer/login.html")
        } else if (!localStorage.getItem("registeredHumans")) {
            human.ID = 1;
            localStorage.setItem("registeredHumans", JSON.stringify([human]))
        }

    }
    location.reload();
}

function login(event) {
    event.preventDefault()
    let email = loginEmail.value;
    let password = loginPassword.value;
    let response = document.querySelector("#logger");
    if (localStorage.getItem("registeredHumans")) {
        let registeredHumans = JSON.parse(localStorage.getItem("registeredHumans"));
        let currentUser = registeredHumans.find((existingUser) => existingUser.EMAIL_ADDRESS == email && existingUser.PASSWORD == password);
        console.log(currentUser);
        if (currentUser) {
            nam = `${currentUser.SURNAME} ${currentUser.FIRST_NAME}, you're highly welcome to Steven Cinema`;
            localStorage.login = currentUser.ID;
            localStorage.setItem("myName", JSON.stringify(nam))
            window.open(" http://127.0.0.1:5502/customer/page1.html");
            return
        } else {
            response.style.color = "red";
            return response.innerHTML = "Incorrect Credentials";
        }

    }

    // for (let i = 0; i <= registeredHumans.length; i++) {
    //     if (loginEmail.value == registeredHumans[i].EMAIL_ADDRESS && loginPassword.value == registeredHumans[i].PASSWORD) {
    //         window.open("http://127.0.0.1:5504/ASSIGNMENTS/CINEMA_TICKETING/Cinema_Hall.html")
    //         alert(registeredHumans[i].FIRST_NAME + " logged in")
    //         break;
    //     } else {
    //         alert("Username or password is correct")
    //         break;
    //     }

    // }
}