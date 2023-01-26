"use strict";

import {positionPlaceholder, fildStyle, nameReg, emailReg, passwordReg, reset, checkingPresenceOfUser} from './main.js';

const inputPlaceholder = document.querySelectorAll(".inputPlaceholder");
const btnSingup = document.querySelector(".btnSingup");
const form = document.forms.signUp;
const message = document.querySelector('.message');
const userEmail = form[2];

let usersArr = [];
let obj = {};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  if (!checkingPresenceOfUser(userEmail)) {
    obj = {
      name: formData.get("firstName") + " " + formData.get("SecondName"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    if (localStorage.getItem("users")) {
      usersArr = JSON.parse(localStorage.getItem("users"));
    } 
    if (!usersArr.some((elem) => elem.email === userEmail.value)) {
      usersArr.push(obj);
    }
    localStorage.setItem("users", JSON.stringify(usersArr));
    localStorage.setItem("currentSession", JSON.stringify(obj));
    reset(form, inputPlaceholder);
  }
});

form.addEventListener("change", function (event) {
  positionPlaceholder(inputPlaceholder);
  switch (event.target.id) {
    case "inputFirstName":
      fildStyle(form, nameReg, 0);
      break;
    case "inputSecondName":
      fildStyle(form, nameReg, 1);
      break;
    case "inputEmail":
      fildStyle(form, emailReg, 2);
      break;
    case "inputPassword":
      fildStyle(form, passwordReg, 3);
      break;
  }
});

btnSingup.onclick = function () {
  if (form.checkValidity() && !checkingPresenceOfUser(userEmail)) {
    document.location = "userPage.html";
    message.style.display = "none";
  } else {
    if (checkingPresenceOfUser(userEmail)) {
      message.style.display = "block";
      message.innerHTML = "користувач з таким емейлом вже існує";
      setTimeout(function(){
        message.style.display = "none";
      }, 3000)
    }
  }
};

form.addEventListener("formdata", async (e) => {
let photoArr = [];    

  let userPhoto = {
    userEmail: userEmail.value,
  };
  const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
  userPhoto.img = await toBase64(e.formData.get("userPhoto"));
  if (localStorage.getItem("userPhoto")){
    photoArr = JSON.parse(localStorage.getItem("userPhoto"));
  }
  photoArr.push(userPhoto);
  localStorage.setItem("userPhoto", JSON.stringify(photoArr));
  localStorage.setItem("currentPhoto", JSON.stringify(userPhoto));
});
