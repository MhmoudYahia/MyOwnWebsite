/*
<<============start settings============>>
*/
"use strict";

//select icon toggle-gear
const toggleGear = document.querySelector(".settings .fa-gear");

//select settings div
const settingsDiv = document.querySelector(".settings");

//toggle bar on clicking
toggleGear.addEventListener("click", () => {
  // toggle spin on clicling
  toggleGear.classList.toggle("fa-spin");

  //toggling settings section on clicking
  settingsDiv.classList.toggle("remove");
});

//select colors span
const colorSpans = document.querySelectorAll(
  ".settings .settings-content span "
);

//select root element
const rootElement = document.querySelector(":root");

// fetch the main color from local storage when reload
const mainColorFromLocalStorage = localStorage.getItem("main-color");

if (mainColorFromLocalStorage) {
  // set the color
  rootElement.style.setProperty("--main-color", mainColorFromLocalStorage);

  //remove default active
  colorSpans[1].classList.remove("active");

  //set class active to the span that contains the main color
  for (const span of colorSpans) {
    if (mainColorFromLocalStorage === span.dataset.color) {
      span.classList.add("active");
    }
  }
}

for (const span of colorSpans) {
  //add its color to main-color on clicking
  span.addEventListener("click", () => {
    //add the spanColor
    rootElement.style.setProperty("--main-color", span.dataset.color);

    //set the color to the local storage
    localStorage.setItem("main-color", span.dataset.color);

    //add class active to the clicked span and remove from all
    for (const span of colorSpans) {
      if (span.classList.contains("active")) span.classList.remove("active");
    }
    span.classList.add("active");
  });
}

//select icon mode
const iconMode = document.querySelector(".settings .fa-sun");

//select icon toggle bars
const iconToggleBars = document.querySelector(".fa-bars");

// select aside bar
const asideSection = document.querySelector("aside");

//convert to shin mode on click
iconMode.addEventListener("click", () => {
  //1
  document.body.classList.toggle("lightmode");

  // set the mode to localstorage
  if (document.body.classList.contains("lightmode")) {
    localStorage.setItem("isShined", true);
  } else {
    localStorage.setItem("isShined", false);
  }

  //2
  asideSection.classList.toggle("lightmode");

  //3
  document.querySelector(".home-page").classList.toggle("lightmode");

  //4
  document.querySelector(".settings").classList.toggle("lightmode");

  //5
  document.querySelector(".about-page").classList.toggle("lightmode");

  //6
  iconToggleBars.classList.toggle("lightmode");

  //7
  document.querySelectorAll("h1.h1-style").forEach((ele) => {
    ele.classList.toggle("lightmode");
  });

  //8 
  document.querySelector(".services-page").classList.toggle('lightmode');
});

// fetch the mode from local storage
const isShinedFromLocalStorage = localStorage.getItem("isShined");
if (isShinedFromLocalStorage) {
  if (isShinedFromLocalStorage == "true") {
    iconMode.click();
  }
}
// <<========end settings bar========>>

// on&off skill bar on scroll

//select spans & all section
const skillSpans = document.querySelectorAll(
  ".skills-lang .skill span.overlay"
);
const skillsSec = document.querySelector(".about-page .skills-lang");

//event scroll

window.onscroll = function () {
  //get All Y offset( the distanse that has been scrolled Up of the current page)
  const pageYoffset = window.pageYOffset;

  //offset Y for skill div (distanse from the top to the element)
  const offsetTop = skillsSec.offsetTop;

  //section height
  const secH = skillsSec.offsetHeight;

  //window height
  const windowH = window.innerHeight;

  if (pageYoffset > offsetTop + secH) {
    skillSpans.forEach((skill) => {
      skill.style.width = "0";
    });
  } else {
    skillSpans.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// onreload event
window.onload = function () {
  skillSpans.forEach((skill) => {
    skill.style.width = skill.dataset.progress;
  });
};

// aboutme responsive

//toggle  side bar on clicking the icon bars
iconToggleBars.addEventListener("click", () => {
  //add class active
  asideSection.classList.toggle("active");
});

//postponed
// // change between pages
// const iconForPage = document.querySelectorAll("aside ul li");

// iconForPage.forEach((icon) => {

//   //set the selected page as main page
//   icon.addEventListener("click", () => {

//     //remove active from previous page and set new
//     iconForPage.forEach((ele) => {
//       if (ele.classList.contains("active")) {
//         ele.classList.remove("active");
//       }
//     });
//     icon.classList.add('active');
//   });
// });
