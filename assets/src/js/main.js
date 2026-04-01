import Swiper from "swiper/bundle";
import AOS from "aos";

document.addEventListener("DOMContentLoaded", () => {
  // ====== Burger Menu ======
  const burger = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav__body");
  const overlay = document.createElement("div");
  overlay.classList.add("menu-overlay");
  document.body.appendChild(overlay);

  const toggleMenu = () => {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-open");
    overlay.classList.toggle("is-open");
    document.body.classList.toggle("no-scroll");
  };

  burger.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);

  // Делегування подій для посилань
  menu.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("nav-list__link") &&
      menu.classList.contains("is-open")
    ) {
      toggleMenu();
    }
  });

  // ====== Swiper ======
  new Swiper(".hero-slider", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: { delay: 7000 },
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // ====== AOS ======
  AOS.init();

  // ====== Loading Posts ======

  const grid = document.querySelector(".latest-posts__grid");
  const button = document.querySelector(".latest-posts__pagination button");

  const POSTS_PER_LOAD = 6;
  const STORAGE_KEY = "loadedPostsCount";

  let allPosts = [];
  let visibleCount = 0;

  function getInitialCount() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? parseInt(saved, 10) : POSTS_PER_LOAD;
  }

  function saveCount(count) {
    localStorage.setItem(STORAGE_KEY, count);
  }

  function createPostHTML(post) {
    return `
      <article class="post-card">
        <div class="post-card__image-wrapper">
          <img
            src="${post.image}"
            alt="${post.title}"
            class="post-card__image"
            loading="lazy"
          />
          <a href="#" class="btn btn--primary">Читати далі</a>
        </div>

        <div class="post-card__content">
          <div class="post-card__meta">
            <div class="post-card__meta-author">
              <img src="./img/svg/user.svg" alt="User" />
              <span class="sm-hide">${post.author}</span>
              <div class="sm-visible">
                Автор: <span>${post.author}</span>
              </div>
            </div>

            <time datetime="${post.date}" class="post-card__meta-date">
              ${post.dateText}
            </time>
          </div>

          <h3 class="post-card__title">${post.title}</h3>

          <p class="post-card__excerpt">
            ${post.excerpt}
          </p>
        </div>
      </article>
    `;
  }

  function renderPosts() {
    grid.innerHTML = "";
    const postsToShow = allPosts.slice(0, visibleCount);
    postsToShow.forEach((post) => {
      grid.insertAdjacentHTML("beforeend", createPostHTML(post));
    });
    toggleButton();
  }

  function loadMorePosts() {
    visibleCount += POSTS_PER_LOAD;
    if (visibleCount > allPosts.length) {
      visibleCount = allPosts.length;
    }
    saveCount(visibleCount);
    renderPosts();
  }

  function toggleButton() {
    if (visibleCount >= allPosts.length) {
      button.style.display = "none";
    } else {
      button.style.display = "inline-block";
    }
  }

  fetch("./data/posts.json")
    .then((res) => res.json())
    .then((data) => {
      allPosts = data;
      visibleCount = getInitialCount();
      if (visibleCount > allPosts.length) {
        visibleCount = allPosts.length;
      }
      renderPosts();
    })
    .catch((err) => console.error("Error loading posts:", err));
  button.addEventListener("click", loadMorePosts);
});
