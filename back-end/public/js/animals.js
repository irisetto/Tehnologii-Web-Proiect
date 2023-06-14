const animalsContainer = document.querySelector(".animals__right__container");

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
      >${animal.class}</span
    >
  </div>
</div>
<a href="/animal" class="card__link">View</a>
</div>`;

const createAnimalCardFromTemplate = (animal) => {
  animalsContainer.insertAdjacentHTML("beforeend", animalHtmlCard(animal));
  console.log(animal);
};

function renderAnimalCards() {
  let animalList = [];
  animalsContainer.innerHTML = "";
  getAllAnimals().then((data) => {
    animalList = data;
    animalList.forEach((animal) => {
      createAnimalCardFromTemplate(animal);
    });
  });
  console.log(animalsContainer);
}

const getAllAnimals = async () => {
  const token = localStorage.getItem("token");
  console.log(token);
  const response = await fetch("http://localhost:3000/api/animals", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await response.json();
};

renderAnimalCards();
