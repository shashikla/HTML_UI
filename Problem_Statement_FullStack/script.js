// const axios = require('axios');

// axios.get('http://localhost:3000/api/').then(resp => {
//     console.log(resp.data);
// })


var urlData = "http://localhost:3000/api/getalluser";
fetch(urlData)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        data.forEach(function (itemData) {
            document.getElementById('data').innerHTML += `
            <tr>
                <td>${itemData.name}</td>
                <td>${itemData.email}</td>
                <td>${itemData.number}</td>
                <td>
                <button class="btn btn-warning" 
                onClick='changeClick(this)'>Reset Passowrd</button>
                </td>
            </tr>
            `
        })
});



const button = document.getElementById("submit-button");
const input = document.getElementById("empName");
const email = document.getElementById("exampleInputEmail1");
const number = document.getElementById("number");
const password = document.getElementById("exampleInputPassword1");

const name_err = document.getElementById("name_err");
const emailHelp = document.getElementById("emailHelp");
const number_err = document.getElementById("number_err");
const password_err = document.getElementById("password_err");

//login variable initialization

const loginEmail = document.getElementById("LoginEmail");
const loginPassword = document.getElementById("LoginPassword");
const submit_btn = document.getElementById("login-submit-button");
const e_err = document.getElementById("e-err");
const p_err = document.getElementById("p-err");

var gen_tkn;

button.disabled = true;
submit_btn.disabled = true;

function validateLogin(val) {
    // console.log(val.id);
    let p_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (loginEmail.value.trim() !== "" && loginPassword.value.trim() !== "") {
        // e_err.innerHTML = " ";
        submit_btn.disabled = false;
    }
    else {
        submit_btn.disabled = true;
    }

    if (val.id == "LoginEmail") {
        let formate = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (loginEmail.value.trim() == "" && loginEmail.value.length == 0) {
            e_err.innerHTML = "Email is Required";
            submit_btn.disabled = true;
        } else if (loginEmail.value.match(formate)) {
            e_err.innerHTML = "";
        } else {
            e_err.innerHTML = "Email should be valid";
            submit_btn.disabled = true;
        }
    }

    if (val.id == "LoginPassword") {

        if (loginPassword.value == "") {
            p_err.innerHTML = "Password is Required";
            submit_btn.disabled = true;
        } else if (loginPassword.value.match(p_pattern)) {
            p_err.innerHTML = "";
            return true;
        }
        else {
            p_err.innerHTML = "Password should be valid (atleast 1 character,digit and uppercase)";
            submit_btn.disabled = true;
            return false;
        }
    }

}

function loginForm() {
    // alert("Clicked!..");
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:3000/api/authenticate"
    xhr.open("POST", url)
    xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");
    xhr.send(JSON.stringify({
        "email": loginEmail.value,
        "password": loginPassword.value
    }))
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = xhr.responseText;
            var obj = JSON.parse(response);
            console.log(response);
            gen_tkn = obj;
            console.log(gen_tkn);
            var myAlert = document.getElementById('toastNotice');
            var bsAlert = new bootstrap.Toast(myAlert, {
                delay: 5000
            });
            bsAlert.show();
            window.setTimeout(function () {
                window.location.href = "welcome.html";
            }, 5000);
            // var urlData = "http://localhost:3000/api/getalluser";
            // fetch(urlData)
            //     .then((response) => response.json())
            //     .then((data) => console.log(data));
            loginEmail.value = "";
            loginPassword.value = "";
            // console.log(obj);
        } else if (xhr.status == 404) {
            var myAlert = document.getElementById('toastError');
            var errAlert = new bootstrap.Toast(myAlert, {
                delay: 5000
            });
            errAlert.show();
        }
    }
}
function changeClick(val) {
    console.log(val);
    err = val.parentElement.previousElementSibling.innerHTML;
    console.log(err);
}

//  404 = pwd missed;  200 = logged; 

function submit_form() {
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:3000/api/register";
    xhr.open("POST", url);
    xhr.setRequestHeader("content-type", "application/json; charset=UTF-8");
    xhr.send(JSON.stringify({
        "name": input.value,
        "email": email.value,
        "number": number.value,
        "password": password.value
    }));
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = xhr.responseText;
            var obj = JSON.parse(response);
            var myAlert = document.getElementById('toastNotice');
            var bsAlert = new bootstrap.Toast(myAlert, {
                delay: 5000
            });
            bsAlert.show();
            window.setTimeout(function () {
                window.location.href = "login.html";
            }, 5000);
            loginEmail.value = "";
            loginPassword.value = "";
            console.log(obj);

        } else if (xhr.status == 422) {
            var myAlert = document.getElementById('toastError');
            var errAlert = new bootstrap.Toast(myAlert, {
                delay: 5000
            });
            errAlert.show();
            loginEmail.value = "";
            loginPassword.value = "";
        } else {
            console.log(xhr);
        }
    }
}

function validate(val) {

    let emailFormate = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.value.trim() !== "" && number.value.trim() !== "" && password.value.trim() !== "") {
        emailHelp.innerHTML = " ";
        button.disabled = false;
    } else {
        button.disabled = true;
    }

    if (val.id == "empName") {
        // console.log(input.value.length);
        if (input.value.trim() == "" || input.value.length <= 0) {
            name_err.innerHTML = "Name is Required";
        } else if (input.value.length < 6) {
            name_err.innerHTML = "Name length should be greater than 6";
        } else if (input.value != input.value.toUpperCase()) {
            name_err.innerHTML = "Name should be in Capital Letter";
        } else {
            name_err.innerHTML = " ";
        }
    }

    if (val.id == "exampleInputEmail1") {
        if (email.value.trim() == "" || email.value.length == 0) {
            emailHelp.innerHTML = "Email is Required";
        } else if (email.value.match(emailFormate)) {
            emailHelp.innerHTML = "";
        } else {
            emailHelp.innerHTML = "Email should be valid";
        }
    }

    if (val.id == "number") {
        let pattern = /^[6-9][0-9]{0,9}$/;
        if (number.value.trim() == "" || number.value.length == 0) {
            number_err.innerHTML = "Number is Required";
        } else if (number.value.match(pattern)) {
            number_err.innerHTML = "";
        } else {
            number_err.innerHTML = "Number should be valid";
        }
    }

    if (val.id == "exampleInputPassword1") {
        var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if (password.value == "") {
            password_err.innerHTML = "Password is Required"
        } else if (password.value.match(pattern)) {
            password_err.innerHTML = "";
            return true;
        }
        else {
            password_err.innerHTML = "Password should be valid (atleast 1 character,digit and uppercase)";
            return false;
        }

    }

}

function logout() {
    var xhr = new XMLHttpRequest();
    var url = "login.html";
    xhr.open("GET", url);
    xhr.send('');
    document.location = url;
    return false;
}
const api_url =
    "http://localhost:3000/api/";

async function funcName(url) {
    const response = await fetch(url);
    var data = await response.json();
    console.log(data);
}

funcName(api_url);



function showData() {
    var urlData = "http://localhost:3000/api/getalluser";
    fetch(urlData)
        .then((response) => response.json())
        .then((data) => console.log(data));
}
showData();
