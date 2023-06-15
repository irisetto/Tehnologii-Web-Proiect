const animalsContainer = document.querySelector(".animals__right__container");

const inputs = document.querySelectorAll(".q-a>div div input");

const animalHtmlCard = (animal) => `<div class="card">
<img
  src="/pictures/indPic/amphibians.jpg"
  class="card__img"
  alt="amphibian"
/>
<h2 class="card__title">${animal.common_name}</h2>
<div class="card__content">
  <div class="card__sizeContainer">
    <p class="card__sizeTitle">Habitat:</p>
    <span class="card__sizeNumber">${animal.habitat}</span>
  </div>
  <div class="card__colorContainer">
    <p class="card__colorTitle">Class:</p>
    <span class="card__colorCircle" style="background-color: #fff"
      >${animal.animal_class}</span
    >
  </div>
</div>
<a href="/animal?id=${animal.id}" class="card__link">View</a>
</div>`;

const createAnimalCardFromTemplate = (animal) => {
  animalsContainer.insertAdjacentHTML("beforeend", animalHtmlCard(animal));
};
let filters = {};
const renderAnimalCards = async (filters) => {
  let currentAnimalList = await getAllAnimals();
  animalsContainer.innerHTML = "";
  if (filters) {
    if (Object.keys(filters).length > 0) {
      currentAnimalList = await getFilteredAnimals(filters);
    }
  }
  currentAnimalList.forEach((animal) => {
    createAnimalCardFromTemplate(animal);
  });
};

const filterContainer = document.querySelector(".animals__left__container");
filterContainer.addEventListener("change", function (e) {
  filters = {};
  if (e.target.type === "checkbox") {
    let qaElems = document.querySelectorAll(".q-a");

    qaElems.forEach(function (qaElem) {
      let key = qaElem.querySelector(".toggle-box + label").textContent;
      let values = Array.from(
        qaElem.querySelectorAll('input[name="' + key + '"]:checked')
      ).map((input) => input.nextElementSibling.textContent.trim());
      if (values.length > 0) {
        filters[key] = values;
      }
    });
    renderAnimalCards(filters);
  }
});

const getAllAnimals = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/api/animals", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await response.json();
};

const getFilteredAnimals = async (filters) => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/api/animals/filter", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filters),
  });
  const result = await response.json();
  return result;
};

renderAnimalCards(filters);
