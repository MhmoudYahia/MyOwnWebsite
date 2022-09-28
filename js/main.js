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
  document.querySelector(".services-page").classList.toggle("lightmode");

  //9
  document.querySelector(".portfolio").classList.toggle("lightmode");
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

// change between pages

//select spans li
const iconForPage = document.querySelectorAll("aside ul li");

//select main sections in the website
const mainSections = document.querySelectorAll("body > div");

//toggle the selected page
iconForPage.forEach((icon, index) => {
  //set the selected page as main page
  icon.addEventListener("click", () => {
    //if the section is allready main section do none
    if (!mainSections[index].classList.contains("active")) {
      //remove active from previous page and set new
      mainSections.forEach((sec) => {
        if (sec.classList.contains("active")) {
          setTimeout(() => {
            sec.classList.remove("active");
          }, 200);
        }
        if (sec.classList.contains("scroll-x")) {
          sec.classList.remove("scroll-x");
        }
      });
      setSectionAsMainSection(index);

      // set the current section to localstorage
      localStorage.setItem("section-index", index);
    }
  });
});

// fetch the currrnt page from local storage if found
const currentPageLocalStorageIndex = localStorage.getItem("section-index");

// if found
if (currentPageLocalStorageIndex) {
  // set last page opened as main page
  setSectionAsMainSection(Number(currentPageLocalStorageIndex));
} else {
  // set home page opened as main page
  setSectionAsMainSection(0);
}

function setSectionAsMainSection(index) {
  //set class active to section
  mainSections[index].classList.add("active");

  // scroll the page on x when clicking, after all loading of css (async)
  // the bug of display is fixed (الحمد لله)
  setTimeout(() => {
    mainSections[index].classList.add("scroll-x");
  }, 0);
}

//<<======== portfolio popup ================>>

//select popup-box elements
const popupBox = document.querySelector(".portfolio .popup-box");
const popupOverlay = document.querySelector(".portfolio .popup-box .overlay");
const projectName = document.querySelector(
  ".portfolio .popup-box .popup-content h2"
);
const projectText = document.querySelector(
  ".portfolio .popup-box .popup-content p"
);
const projectRepoLnk = document.querySelector(
  ".portfolio .popup-box .popup-content a.repo"
);
const projectPage = document.querySelector(
  ".portfolio .popup-box .popup-content a.page"
);
const xicon = document.querySelector(".portfolio .popup-box .popup-content i");

//select projects
const projects = document.querySelectorAll(".portfolio-content .project");

//display popup-box onclicking the img project
projects.forEach((project) => {
  //listen click event
  project.addEventListener("click", () => {
    //set name
    projectName.innerHTML = project.dataset.name;

    //set text
    projectText.innerHTML = project.dataset.text;

    //set repo link
    projectRepoLnk.setAttribute("href", project.dataset.repo);

    //set page link
    projectPage.setAttribute("href", project.dataset.page);

    //display popup
    popupBox.classList.add("active");
  });
});

//remove popup on clicking X icon
xicon.addEventListener("click", () => {
  popupBox.classList.remove("active");
});

//remove popup on clicking the overlay
popupOverlay.addEventListener("click", () => {
  popupBox.classList.remove("active");
});
