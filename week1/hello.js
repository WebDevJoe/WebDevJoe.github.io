/*******************HAMBURGER NAVIGATION   **********/
/*  BASE CODE USED FROM WEB DEV TUTORIALS BUT I HAVE ALTERED TO SUIT MY NEEDS. https://www.youtube.com/watch?v=flItyHiDm7E&t=307s */
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);
/*  BASE CODE USED FROM WEB DEV TUTORIALS BUT I HAVE ALTERED TO SUIT MY NEEDS. https://www.youtube.com/watch?v=flItyHiDm7E&t=307s */
/*******************HAMBURGER NAVIGATION   **********/

/*******************FAQ ACCORDION  **********/
/****BASE CODE USED FROM Developer Empire https://www.youtube.com/watch?v=4qnWreynXLU&list=LL&index=4 */

const faqs = document.querySelectorAll(".faq");

faqs.forEach((faq) => {
  faq.addEventListener("click", () => {
    faq.classList.toggle("active");
  });
});

/*******************FAQ ACCORDION  **********/

/******************* FORM POPUP **********/

let popupWindow = document.getElementById("popup-window");
let background = document.getElementById("background");

function openPopup() {
  popupWindow.classList.add("open-popup");
  background.classList.add("bg-blur");
  playSFX();
}
function closePopup() {
  popupWindow.classList.remove("open-popup");
  background.classList.remove("bg-blur");
  formReset();
}
function formReset() {
  document.getElementById("myForm").reset();
}

/******************* FORM POPUP **********/

/*** GOOGLE SHEETS CODE */

const scriptURL =
  "https://script.google.com/macros/s/AKfycbyI1Nx9hH3JcByDYsV0IGuOupvbMAevYrLE6Kt0iq_0L4414g_p3KLsE2Ob41hzMhzeNw/exec";
const form = document.forms["submit-to-google-sheet"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => console.log("Success!", response))
    .catch((error) => console.error("Error!", error.message));

  /*** GOOGLE SHEETS CODE */

  /******************* FORM VALIDATION **********/

  // gets form values and removes space
  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const phoneNumber = document.querySelector("#phoneNumber").value.trim();
  const message = document.querySelector("#messageBox").value.trim();

  // validation
  if (!name) {
    alert("Please enter your name.");
    return;
  }

  // checks if it has a value or matches the expression
  const emailFormat = /^\S+@\S+\.\S+$/;
  if (!email || !emailFormat.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const phoneFormat = /^\d{11}$/;

  if (!phoneNumber || !phoneFormat.test(phoneNumber)) {
    alert("Please enter a valid 11 digit phone number.");
    console.log("error in number");
    return;
  }

  if (!message) {
    alert("Please enter a message.");
    return;
  }

  // submit form if all validation passes
  openPopup();
});

/******************* FORM VALIDATION **********/

/******* SFX ON CLICK ****** */
function playSFX() {
  var sfx = new Audio("sfx.wav");
  sfx.play();
}

/******* SFX ON CLICK ****** */
