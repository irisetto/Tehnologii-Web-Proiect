
const animalsContainer = document.querySelector(".animals");


const createAnimalRowFromTemplate = (animal) => {
  const row = document.createElement("tr");

  const animalIdCell = document.createElement("td");
  animalIdCell.textContent = animal.id;
  row.appendChild(animalIdCell);

  const sectionCell = document.createElement("td");
  sectionCell.textContent = animal.zoo_section;
  row.appendChild(sectionCell);

  const managerCell = document.createElement("td");
  managerCell.textContent = animal.manager;
  row.appendChild(managerCell);

  const descCell = document.createElement("td");
  descCell.textContent = animal.description;
  row.appendChild(descCell);


  const deleteButtonCell = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Resolved";
  deleteButtonCell.classList.add("no-border");
  deleteButton.classList.add("ok-button");

  deleteButton.addEventListener("click", async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:3000/api/animals/${animal.id}`, {
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

function renderanimalCards() {
  let animalList = [];
  animalsContainer.innerHTML = "";
  getAllanimals().then((data) => {
    animalList = data;
    animalList.forEach((animal) => {
      createAnimalRowFromTemplate(animal);
    });
  });
  console.log(animalsContainer);
}

const getAllanimals = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/api/animals", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await response.json();
};

renderanimalCards();
