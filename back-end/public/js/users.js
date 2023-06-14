
const usersContainer = document.querySelector(".users");

const userRow = (user) => `

  <tr>
    <td>${user.first_name}</td>
    <td>${user.last_name}</td>
    <td>${user.email}</td>
    <td>${user.phone_number}</td>
    <td>${user.occupied_position}</td>
    <td class="no-border">
    <button class="fire-button" data-userid="${user.id}">Fire!</button>
  </td>
  </tr>


`;

const createUserRowFromTemplate = (user) => {
 
  const row = document.createElement("tr");
  
  const firstNameCell = document.createElement("td");
  firstNameCell.textContent = user.first_name;
  row.appendChild(firstNameCell);
  
  const lastNameCell = document.createElement("td");
  lastNameCell.textContent = user.last_name;
  row.appendChild(lastNameCell);
  
  const emailCell = document.createElement("td");
  emailCell.textContent = user.email;
  row.appendChild(emailCell);
  
  const phoneNumberCell = document.createElement("td");
  phoneNumberCell.textContent = user.phone_number;
  row.appendChild(phoneNumberCell);
  
  const occupiedPositionCell = document.createElement("td");
  occupiedPositionCell.textContent = user.occupied_position;
  row.appendChild(occupiedPositionCell);
  
    const deleteButtonCell = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Fire!";
  deleteButtonCell.classList.add("no-border");
  deleteButton.classList.add("fire-button");

  deleteButton.addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    
    const response = await fetch(`http://localhost:3000/api/users/${user.id}`, {
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
  
  usersContainer.appendChild(row);
};

function renderUserCards() {
  let userList = [];
  usersContainer.innerHTML = "";
  getAllUsers().then((data) => {
    userList = data;
    userList.forEach((user) => {
      createUserRowFromTemplate(user);
    });
  });
  console.log(usersContainer);
}

const getAllUsers = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/api/users", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await response.json();
};

renderUserCards();
