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
      >${animal.class}</span
    >
  </div>
</div>
<a href="/animal?id=${animal.id}" class="card__link">View</a>
</div>`;

const createAnimalCardFromTemplate = (animal) => {
  animalsContainer.insertAdjacentHTML("beforeend", animalHtmlCard(animal));
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
}

const getAllAnimals = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/api/animals", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await response.json();
};

renderAnimalCards();

let filters = {};
const labels = document.querySelectorAll(".q-a>input");
labels.forEach((label) => {
  label.addEventListener("change", () => {
    const myNodeList = label.parentElement.querySelectorAll("input");
    const myLabelList = label.parentElement.querySelectorAll("label");
    const [categoryName, ..._2] = myLabelList;
    const [_, ...checkedRawInputs] = myNodeList;
    const checkedInputs = Array.from(checkedRawInputs).filter(
      (input) => input.checked
    );
    const labelNames = checkedInputs
      .map(function (input) {
        let associatedLabel;
        if (input.parentElement.tagName.toLowerCase() === "label") {
          associatedLabel = input.parentElement;
        } else {
          associatedLabel = document.querySelector(`label[for="${input.id}"]`);
        }
        return associatedLabel ? associatedLabel.textContent : null;
      })
      .filter(Boolean);
    filters[`${categoryName.textContent}`] = labelNames.map((item) =>
      item.trim()
    );
    console.log(filters);
    // renderFilteredAnimals(filters);
  });
});

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
  console.log(result);
  return result;
};

const renderFilteredAnimals = async (filters) => {
  console.log("filters", filters);
  const result = await getFilteredAnimals(filters);
  console.log("resultat", result);
};
