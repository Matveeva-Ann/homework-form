"use strict";

const nameReg = /^[a-z,A-Z]+$/;
const emailReg = /^\S+@[a-z,A-Z]+\.[a-z,A-Z]+/;
const passwordReg = /\S{6,}/;


function positionPlaceholder(inputsPlaceholder) {
  for (const elem of inputsPlaceholder) {
    {
      if (elem.previousElementSibling.value != "") {
        elem.classList.add("positionPlaceholder");
      } else {
        elem.classList.remove("positionPlaceholder");
      }
    }
  }
}

function fildStyle(form, reg, numb) {
  if (reg.test(form[numb].value)) {
    form[numb].classList.add("green");
    form[numb].classList.remove("red");
  } else {
    form[numb].classList.add("red");
    form[numb].classList.remove("green");
  }
}

function reset(imputs, placeholder){
  for (let i= 0; i<imputs.length-2; i++){
    imputs[i].classList.remove("green");
    placeholder[i].classList.remove("positionPlaceholder");
  }
  imputs.reset();
}

function checkingPresenceOfUser(usetMail, userPassword=0) {
  let usersArr = [];
  if (localStorage.length > 0) {
    usersArr = JSON.parse(localStorage.getItem("users"));
  }
  return (usersArr.some((elem) => elem.email == usetMail.value) && usersArr.some((elem) => elem.password == userPassword.value || userPassword == 0))
}

export {positionPlaceholder, fildStyle, nameReg, emailReg, passwordReg, reset, checkingPresenceOfUser};





