"use strict";

const btnExit = document.querySelector(".btnExit");
const userName = document.querySelector(".userName");
const userEmail = document.querySelector(".userEmail");
const userPhoto = document.querySelector('.img');
let currentSession = JSON.parse(localStorage.getItem("currentSession"));
let currentPhoto = JSON.parse(localStorage.getItem("currentPhoto"));

userName.innerHTML = currentSession.name;
userEmail.innerHTML = currentSession.email;

if (JSON.parse(localStorage.getItem("currentPhoto")).img == 'data:'){
  userPhoto.style.backgroundImage = `url(./img/man.svg)`;
}else{
  userPhoto.style.backgroundImage = `url(${currentPhoto.img})`;
}

btnExit.addEventListener("click", () => {
  localStorage.removeItem("currentSession");
  localStorage.removeItem("currentPhoto");
});
