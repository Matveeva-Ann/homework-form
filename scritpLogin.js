"use strict";

import {positionPlaceholder, emailReg, passwordReg, fildStyle, checkingPresenceOfUser, reset} from './main.js';

const inputPlaceholderSingIN = document.querySelectorAll(".inputPlaceholderSingIN");
const formSignIN = document.forms.signIN;
const btnSingIn = document.querySelector(".btnSingIN");
const userEmail = formSignIN[0];
const userPassword = formSignIN[1];

let messageInvalid = document.querySelector('.messageInvalid')

formSignIN.addEventListener('submit', (e) => {
  e.preventDefault();
  const formSignINData = new FormData(formSignIN);
})

formSignIN.addEventListener("change", function (event) {
  positionPlaceholder(inputPlaceholderSingIN);
  switch (event.target.id) {
    case "inputEmailSingIN":
      fildStyle(formSignIN, emailReg, 0);
      break;
    case "inputPasswordSingIN":
      fildStyle(formSignIN, passwordReg, 1);
      break;
  }
});

btnSingIn.onclick = function (event) {
  event.preventDefault();
  if (checkingPresenceOfUser(userEmail, userPassword)) {
    document.location = "userPage.html";  
    let userObj = (JSON.parse(localStorage.getItem("users"))).find(el => el.email === userEmail.value)
    let userImg = (JSON.parse(localStorage.getItem("userPhoto"))).find(el => el.userEmail === userEmail.value)
    localStorage.setItem("currentSession", JSON.stringify(userObj));
    localStorage.setItem("currentPhoto", JSON.stringify(userImg));
    reset(formSignIN, inputPlaceholderSingIN);
  } else {
    messageInvalid.style.display = "block";
    setTimeout(function(){
      messageInvalid.style.display = "none";
    }, 3000)
    messageInvalid.innerHTML = "Ви ввели невірний логін або пароль";
    userEmail.classList.add("red");
    userPassword.classList.add("red");
  }
};

