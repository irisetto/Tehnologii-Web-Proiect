const animalsContainer = document.querySelector(".animals__right__container");

const animalHtmlCard = (animal) => `<div class="card">
<img
  src="/pictures/indPic/amphibians.jpg"
  class="card__img"
  alt="amphibian"
/>
<h2 class="card__title">Amphibian</h2>
<div class="card__content">
  <div class="card__sizeContainer">
    <p class="card__sizeTitle">Habitat:</p>
    <span class="card__sizeNumber">${animal.habitat}</span>
  </div>
  <div class="card__colorContainer">
    <p class="card__colorTitle">Class:</p>
    <span class="card__colorCircle" style="background-color: #fff"
      >Amphibian</span
    >
  </div>
</div>
<a href="./animal.html" class="card__link">View</a>
</div>`;

const createAnimalCardFromTemplate = (animalList, animal) => {
  animalsContainer.insertAdjacentHTML("beforeend", animalHtmlCard(animal));
  console.log(animal);
};

function renderAnimalCards() {
  let animalList = [];
  getAllAnimals().then((data) => {
    animalList = data;
    console.log(animalList);
  });
  console.log(animalsContainer);
  //   animalsContainer.innerHTML = "";
  console.log(animalsContainer);

  animalList.forEach((animal) => {
    createAnimalCardFromTemplate(animalList, animal);
  });
}

const getAllAnimals = async () => {
  const response = await fetch("http://localhost:3000/api/animals", {
    method: "GET",
  });
  return await response.json();
};

renderAnimalCards();
