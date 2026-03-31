(function (window, document) {
  "use strict";

  const retrieveURL = function (filename) {
    let scripts = document.getElementsByTagName("script");
    if (scripts && scripts.length > 0) {
      for (let i in scripts) {
        if (
          scripts[i].src &&
          scripts[i].src.match(new RegExp(filename + "\\.js$"))
        ) {
          return scripts[i].src.replace(
            new RegExp("(.*)" + filename + "\\.js$"),
            "$1",
          );
        }
      }
    }
  };

  function load(url, element) {
    let req = new XMLHttpRequest();

    req.onload = function () {
      if (this.readyState == 4 && this.status == 200) {
        element.insertAdjacentHTML("afterbegin", req.responseText);
      }
    };

    req.open("GET", url, true);
    req.send(null);
  }
})(window, document);

document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav__body");
  const overlay = document.createElement("div");

  // Створюємо оверлей динамічно, якщо його немає в HTML
  overlay.classList.add("menu-overlay");
  document.body.appendChild(overlay);

  const toggleMenu = () => {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-open");
    overlay.classList.toggle("is-open");
    document.body.classList.toggle("no-scroll"); // Заборона скролу фону
  };

  // Відкриття/Закриття по бургеру
  burger.addEventListener("click", toggleMenu);

  // Закриття по кліку на оверлей
  overlay.addEventListener("click", toggleMenu);

  // Закриття по кліку на посилання
  const menuLinks = document.querySelectorAll(".nav-list__link");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (menu.classList.contains("is-open")) toggleMenu();
    });
  });
});

import Swiper from "swiper/bundle";

document.addEventListener("DOMContentLoaded", () => {
  const heroSlider = new Swiper(".hero-slider", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: {
      delay: 500000,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

import AOS from "aos";


document.addEventListener("DOMContentLoaded", () => {
  AOS.init();
});
