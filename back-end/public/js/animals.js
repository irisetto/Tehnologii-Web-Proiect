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
  const pickedAnimalCategory = new URLSearchParams(window.location.search).get(
    "category"
  );
  if (pickedAnimalCategory) {
    window.history.replaceState({}, document.title, "/animals");
    filters = { animal_class: pickedAnimalCategory };
  }
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
      let key = toUnderscoreString(
        qaElem.querySelector(".toggle-box + label").textContent
      );
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

const getAnimalCategories = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/api/animals/categories", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return result;
};

const getLabelHtml = (categoryName, labelIndex, labelValue) => {
  return `<div>
            <input id="${categoryName}_characteristic-${labelIndex}"
              name="${categoryName}"
              type="checkbox"
              value="yes"
            />
            <label for="${categoryName}_characteristic-${labelIndex}">${toReadableString(
    labelValue
  )}</label>
          </div>`;
};

const getCategoryHtml = (categoryName, labels) => {
  let labelsHtml = "";

  labels.forEach((labelValue, labelIndex) => {
    labelsHtml = labelsHtml.concat(
      getLabelHtml(categoryName, labelIndex + 2, labelValue)
    );
  });

  return `
  <div class="q-a">
    <input
      class="toggle-box"
      id="${categoryName}_characteristic-1"
      type="checkbox"
    />
    <label for="${categoryName}_characteristic-1">${toReadableString(
    categoryName
  )}</label>
    <div>
      <div>
      ${labelsHtml}
      </div>
    </div>
  </div>`;
};

function toReadableString(input) {
  let words = input.split("_");

  let output = words
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  return output;
}

function toUnderscoreString(input) {
  let words = input.split(" ");

  let output = words
    .map((word) => {
      return word.toLowerCase();
    })
    .join("_");

  return output;
}

const renderFilteringMenu = async () => {
  const filteringMenuNode = document.querySelector(".animals__left__container");
  filteringMenuNode.innerHTML = "";
  const categories = await getAnimalCategories();

  for (const [key, value] of Object.entries(categories)) {
    filteringMenuNode.insertAdjacentHTML(
      "beforeend",
      getCategoryHtml(key, value)
    );
  }
};

renderFilteringMenu();

renderAnimalCards(filters);
