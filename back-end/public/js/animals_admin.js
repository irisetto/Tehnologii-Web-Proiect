
const animalsContainer = document.querySelector(".animals");


const createAnimalRowFromTemplate = (animal) => {
  const row = document.createElement("tr");

  const animalIdCell = document.createElement("td");
  animalIdCell.textContent = animal.id;
  row.appendChild(animalIdCell);

  const nameCell = document.createElement("td");
  nameCell.textContent = animal.common_name;
  row.appendChild(nameCell);

  const image1ButtonCell = document.createElement("td");
  const image1Button = document.createElement("input");
  image1Button.textContent = "Image 1";
  image1Button.type = "file";
  image1ButtonCell.appendChild(image1Button);
  row.appendChild(image1ButtonCell);
  
  image1Button.addEventListener("change", () => {
    const file = image1Button.files[0];
    uploadAnimalImage(file,1,animal.id);
  });
  
  
  const image2ButtonCell = document.createElement("td");
  const image2Button = document.createElement("input");
  image2Button.textContent = "Image 2";
  image2Button.type = "file";

  image2ButtonCell.appendChild(image2Button);
  row.appendChild(image2ButtonCell);
  image2Button.addEventListener("change", () => {
    const file = image2Button.files[0];
    uploadAnimalImage(file,2,animal.id);
  });
  
 

  const deleteButtonCell = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButtonCell.classList.add("no-border");
  deleteButton.classList.add("fire-button");

  deleteButton.addEventListener("click", async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:3000/api/deleteAnimal/${animal.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      row.remove();
    } else {
      console.error("Failed to delete user");
    }
  });
  deleteButtonCell.appendChild(deleteButton);
  row.appendChild(deleteButtonCell);

  animalsContainer.appendChild(row);
};

function uploadAnimalImage(file,imageNr,animalId) {

  if (!file) {
      console.log('No image selected');
      return;
  }

  const reader = new FileReader();

  reader.onload = function () {
      const arrayBuffer = this.result;
      const uintArray = new Uint8Array(arrayBuffer);

      const url = `/api/setAnimalImage${imageNr}/${animalId}`;
      const token = localStorage.getItem('token');

      fetch(url, {
          method: 'PUT',
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/octet-stream',
          },
          body: uintArray,
      })
          .then(response => {
              if (response.ok) {
                  console.log('Image uploaded successfully');
                  alert('Image uploaded successfully');
              } else {
                  console.error('Error uploading image:', response.status);
              }
          })
          .catch(error => {
              console.error('Error uploading image:', error);
          });
  };

  reader.readAsArrayBuffer(file);
}


function renderAnimalCards() {
  let animalList = [];
  animalsContainer.innerHTML = "";
  getAllAnimals().then((data) => {
    animalList = data;
    animalList.forEach((animal) => {
      createAnimalRowFromTemplate(animal);
    });
  });
  console.log(animalsContainer);
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
