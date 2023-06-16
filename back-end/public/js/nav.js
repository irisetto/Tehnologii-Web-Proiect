const burgerMenu = document.getElementById("burger");
const navMenu = document.getElementById("main-nav");
const menu_item7 = document.getElementById("menu_item7");
const sign1 = document.getElementById("sign1");

burgerMenu.addEventListener("click", (e) => {
  burgerMenu.classList.toggle("is-open");
  navMenu.classList.toggle("is-open");
});

menu_item7.addEventListener("click", () => {
  localStorage.removeItem("token");
});

if (sign1) {
  sign1.addEventListener("click", () => {
    localStorage.removeItem("token");
  });
}

window.addEventListener("popstate", () => {
  localStorage.removeItem("token");
  history.replaceState(null, "", "/");
});

window.onpageshow = function (event) {
  if (!localStorage.getItem("token")) {
    window.location.href = "/";
  }
};
