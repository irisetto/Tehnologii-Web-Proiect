const animalContainer = document.querySelector(".container");

const animalId = new URLSearchParams(window.location.search).get("id");
//console.log(animalId);
const imgOverlayDiv = document.querySelector(".imgOverlay");
const imgElement = imgOverlayDiv.querySelector("img");


const getAnimalImage = async (animalId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:3000/api/getAnimalImage1/${animalId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const imageData = await response.json();
    console.log(imageData)
    const uint8Array = new Uint8Array(imageData.data);
    const base64String = btoa(String.fromCharCode.apply(null, uint8Array));

    console.log(base64String);

    imgElement.src = `data:image/jpeg;base64,${base64String}`;
  } else {
    console.error("Failed to fetch animal image.");
  }
};
getAnimalImage(animalId);


const animalHtmlCard = (animal) => `<section class="axolotl">
<div class="animal__tag">ENDANGERED</div>
<div class="headline">
  <h1>${animal.common_name}</h1>
  <h2>${animal.scientific_name}</h2>
</div>
<hr />

<div class="tag_area">
  <div class="tag">
    CLASS:
    <p>${animal.animal_class}</p>
  </div>
  <div class="tag">
    DIET:
    <p>${animal.diet}</p>
  </div>
  <div class="tag">
    LIFESTYLE:
    <p>${animal.lifestyle}</p>
  </div>
  <div class="tag">
    SKIN TYPE:
    <p>${animal.skin_type}</p>
  </div>
  <div class="tag">
    HABITAT:
    <p>${animal.habitat}</p>
  </div>
  <div class="tag">
    REGION:
    <p>${animal.region}</p>
  </div>
</div>
<hr />

<div class="headline__image">
  <div class="headline__image__main">
    <img
      src="https://animals.sandiegozoo.org/sites/default/files/styles/image_grid_full_width/public/2019-09/axolotl01.jpg?itok=s4JXUKA3"
      alt="animale"
    />
  </div>
 
</div>
</section>

<section class="main__container">
<section class="main__container__left">
  <div class="animal__characteristic">
    <div class="animal__charateristic__title">
      <img src="../pictures/paragraph-box-orange.jpg" alt="orangeBox" />
      <h2>ABOUT</h2>
    </div>

    <div class="animal__charateristic__text">
      ${animal.about_text}
      ADD ABOUT TEXT HERE
    </div>
   
  </div>
</section>
<section class="main__container__right">
 
  <div class="animal__side__note__text">
    <h3>SIZE</h3>
    <p>Height: ${animal.height} meters</p>
    <p>Weight: ${animal.weight} kilograms</p>
  </div>
  <div class="animal__side__note__text">
    <h3>FUN FACTS</h3>
    <p>
      FUN FACT 1
    </p>
    <p>
      FUN FACT 2
    </p>
  </div>
</section>
</section>`;

const createAnimalCardFromTemplate = (animal) => {
  animalContainer.insertAdjacentHTML("beforeend", animalHtmlCard(animal));
};

function renderAnimalPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  animalContainer.innerHTML = "";
  getAnimalById(id).then((animal) => {
    createAnimalCardFromTemplate(animal);
  });
}

const getAnimalById = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:3000/api/animals/${id}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await response.json();
};

renderAnimalPage();
