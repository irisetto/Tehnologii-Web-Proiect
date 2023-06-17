const animalContainer = document.querySelector(".container");

const animalId = new URLSearchParams(window.location.search).get("id");
//console.log(animalId);
const imgOverlayDiv = document.querySelector(".imgOverlay");
const imgElement = imgOverlayDiv.querySelector("img");



const attachExportButtonListeners = async () => {
  const exportJsonButton = document.getElementById("exportJSON");
  const exportXmlButton = document.getElementById("exportXML");

  exportJsonButton.addEventListener("click", () => {
    console.log('Export JSON button clicked');
    const urlParams = new URLSearchParams(window.location.search);
    const animalId = urlParams.get('id');
    if (animalId) {
      downloadAnimalJson(animalId);
    }
  });

  exportXmlButton.addEventListener("click", () => {
    console.log('Export XML button clicked');
    const urlParams = new URLSearchParams(window.location.search);
    const animalId = urlParams.get('id');
    if (animalId) {
      downloadAnimalXml(animalId);
    }
  });
};


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


const getAboutImage = async (animalId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:3000/api/getAnimalImage2/${animalId}`, {
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

    console.log('ehhehe' + base64String);

    //imgElement.src = `data:image/jpeg;base64,${base64String}`;
    const imgElement = document.querySelector(".headline__image img");
    imgElement.src = `data:image/jpeg;base64,${base64String}`;

  } else {
    console.error("Failed to fetch animal image.");
  }
};

const title = document.querySelector("title");
const animalHtmlCard = (animal) => {
  const animalTagVisibility = animal.animal_status === "endangered" ? "" : "hidden";

  return `<section class="axolotl">
  <div class="animal__tag" style="visibility: ${animalTagVisibility}">ENDANGERED</div>

<div class="headline">
  <div class="export-buttons-container">
    <h1>${animal.common_name}</h1>

    <div class="export-buttons">
      <button class="export-json-button" id = "exportJSON">Export JSON</button>
      <button class="export-xml-button" id = "exportXML">Export XML</button>
    </div>
    
  </div>
  <h2>${animal.scientific_name}</h2>
</div>


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
      ${animal.fun_fact1}
    </p>
    <p>
    ${animal.fun_fact2}
    </p>
  </div>
</section>
</section>`;
};

const createAnimalCardFromTemplate = (animal) => {
  title.textContent = animal.common_name;
  animalContainer.insertAdjacentHTML("beforeend", animalHtmlCard(animal));
  attachExportButtonListeners();
  getAboutImage(animalId);
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

function downloadAnimalJson(animalId) {
  const token = localStorage.getItem('token');
  const url = `/api/animalJSON/${animalId}`;

  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch animal JSON');
      }
      return response.json();
    })
    .then(exportedData => {
      const { fileName, fileContent } = exportedData;
      const blob = new Blob([fileContent], { type: 'application/json' });

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, fileName);
      } else {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(link.href);
      }
      alert('Animal JSON file exported successfully!');
    })
    .catch(error => {
      console.error('Error downloading animal JSON:', error);
      alert('Error exporting animal JSON. Please try again.');

    });
}

function downloadAnimalXml(animalId) {
  const token = localStorage.getItem('token');
  const url = `/api/animalXML/${animalId}`;

  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch animal XML');
      }
      const indexFileName = response.headers.get('Content-Disposition').indexOf('filename=');
      let fileName = response.headers.get('Content-Disposition').substring(indexFileName + 9).trim();
      fileName = fileName.substring(1, fileName.length - 1);

      return response.text().then(fileContent => {
        return { fileName, fileContent };
      });
    })
    .then(({ fileName, fileContent }) => {
      const blob = new Blob([fileContent], { type: 'application/xml' });

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, fileName);
      } else {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(link.href);
      }
      alert('Animal XML file exported successfully!');
    })
    .catch(error => {
      console.error('Error downloading animal XML:', error);
      alert('Error exporting animal XML. Please try again.');
    });

}

renderAnimalPage();
