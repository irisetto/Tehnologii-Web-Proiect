const animalsContainer = document.querySelector(".animals__right__container");

const inputs = document.querySelectorAll(".q-a>div div input");

const animalHtmlCard = (animal) => `<div class="card">
<img
  src="${animal.image}"
  class="card__img"
  alt="${animal.common_name}"
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
  // const matchingImage = imagePairs.find(image => image.animal_id === animal.id);
  // if (matchingImage) {
  //   animal.image = `data:image/jpeg;base64,${matchingImage.image}`;
  // }
  //console.log('lalalall');

  animalsContainer.insertAdjacentHTML("beforeend", animalHtmlCard(animal));
};

let filters = {};
const renderAnimalCards = async (filters) => {
  const searchInput = document.querySelector(".search-animals");
  const searchQuery = searchInput ? searchInput.value.toLowerCase() : "";

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
    // const matchingImage = imagePairs.find(image => image.animal_id === animal.id);
    // if (matchingImage) {
    //   animal.image = `data:image/jpeg;base64,${matchingImage.image}`;
    // }
    if (
      searchQuery === "" ||
      animal.common_name.toLowerCase().includes(searchQuery)
    ) {
      createAnimalCardFromTemplate(animal);
    }
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

const getAllImagePairs = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/api/getAllImage1", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const imageData = await response.json();

  const imagePairs = imageData.map((image) => {
    const imageData = Array.from(image.image1.data);
    const uint8Array = new Uint8Array(imageData);
    const base64String = btoa(String.fromCharCode.apply(null, uint8Array));

    return { animal_id: image.animal_id, image: base64String };
  });

  return imagePairs;
};

let imagePairs = [];

const loadImagePairs = async () => {
  imagePairs = await getAllImagePairs();
};

const getAllAnimals = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/api/animals", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const result = await response.json();
  result.forEach((animal) => {
    const matchingImage = imagePairs.find(
      (image) => image.animal_id === animal.id
    );
    if (matchingImage) {
      //console.log(matchingImage);
      animal.image = `data:image/jpeg;base64,${matchingImage.image}`;
    }
  });
  //console.log(JSON.stringify(result, null, 1));
  return result;
};

function convertMeasurementUnitRange(weightRange, measurementUnit) {
  const pattern = `^(\\d+(\\.\\d+)?)-(\\d+(\\.\\d+)?)${measurementUnit}$`;
  const regex = new RegExp(pattern);

  const matches = weightRange.match(regex);

  if (matches) {
    const min = parseFloat(matches[1]);
    const max = parseFloat(matches[3]);
    return { min, max };
  } else {
    return { min: 9999, max: 0 };
  }
}

const getFilteredAnimals = async (filters) => {
  const token = localStorage.getItem("token");

  if (filters.weight) {
    let minimum = 9999;
    let maximum = 0;
    filters.weight.forEach((weightRange) => {
      const { min, max } = convertMeasurementUnitRange(weightRange, "kg");
      if (min < minimum) {
        minimum = min;
      }
      if (max > maximum) {
        maximum = max;
      }
    });
    filters.weight = { min: minimum, max: maximum };
  }
  if (filters.height) {
    let minimum = 9999;
    let maximum = 0;
    filters.height.forEach((heightRange) => {
      const { min, max } = convertMeasurementUnitRange(heightRange, "m");
      if (min < minimum) {
        minimum = min;
      }
      if (max > maximum) {
        maximum = max;
      }
    });
    filters.height = { min: minimum, max: maximum };
  }
  if (filters.lifespan) {
    let minimum = 9999;
    let maximum = 0;
    filters.lifespan.forEach((lifespanRange) => {
      const { min, max } = convertMeasurementUnitRange(lifespanRange, "years");
      if (min < minimum) {
        minimum = min;
      }
      if (max > maximum) {
        maximum = max;
      }
    });
    filters.lifespan = { min: minimum, max: maximum };
  }

  const response = await fetch("http://localhost:3000/api/animals/filter", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filters),
  });
  //console.log('asdasdasdasd 2')
  const result = await response.json();

  result.forEach((animal) => {
    const matchingImage = imagePairs.find(
      (image) => image.animal_id === animal.id
    );
    if (matchingImage) {
      //console.log(matchingImage);
      animal.image = `data:image/jpeg;base64,${matchingImage.image}`;
    }
  });
  //console.log(JSON.stringify(result, null, 1));

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

const getSearchHtml = () => {
  return `
  <div class="q-a-search">
   
    <input id="search-animals" type="text" class="search-animals" placeholder="Search..." />
    
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
  //searchhh
  filteringMenuNode.insertAdjacentHTML("beforeend", getSearchHtml());
  const searchInput = document.querySelector("#search-animals");
  searchInput.addEventListener("input", function () {
    renderAnimalCards(filters);
  });

  for (const [key, value] of Object.entries(categories)) {
    filteringMenuNode.insertAdjacentHTML(
      "beforeend",
      getCategoryHtml(key, value)
    );
  }
};

//?
(async () => {
  await loadImagePairs();

  renderFilteringMenu();

  renderAnimalCards(filters);
})();

// await loadImagePairs();
// renderFilteringMenu();
// renderAnimalCards(filters);
