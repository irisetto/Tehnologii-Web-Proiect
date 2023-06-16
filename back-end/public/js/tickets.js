
const ticketsContainer = document.querySelector(".tickets");


const createTicketRowFromTemplate = (ticket) => {
  const row = document.createElement("tr");

  const userIdCell = document.createElement("td");
  userIdCell.textContent = ticket.id_user;
  row.appendChild(userIdCell);

  const sectionCell = document.createElement("td");
  sectionCell.textContent = ticket.zoo_section;
  row.appendChild(sectionCell);

  const managerCell = document.createElement("td");
  managerCell.textContent = ticket.manager;
  row.appendChild(managerCell);

  const descCell = document.createElement("td");
  descCell.textContent = ticket.description;
  row.appendChild(descCell);


  const deleteButtonCell = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Resolved";
  deleteButtonCell.classList.add("no-border");
  deleteButton.classList.add("ok-button");

  deleteButton.addEventListener("click", async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:3000/api/tickets/${ticket.id}`, {
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

  ticketsContainer.appendChild(row);
};

function renderTicketCards() {
  let ticketList = [];
  ticketsContainer.innerHTML = "";
  getAllTickets().then((data) => {
    ticketList = data;
    ticketList.forEach((ticket) => {
      createTicketRowFromTemplate(ticket);
    });
  });
  console.log(ticketsContainer);
}

const getAllTickets = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/api/tickets", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return await response.json();
};

renderTicketCards();
