const burgerMenu = document.getElementById("burger");
const navMenu = document.getElementById("main-nav");
burgerMenu.addEventListener("click", (e) => {
  burgerMenu.classList.toggle("is-open");
  navMenu.classList.toggle("is-open");
});
