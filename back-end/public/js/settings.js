const getLoggedUser = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch("/api/logUser", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Error: " + response.status);
  }
};
const seeUsersButton = document.getElementById("see_users");
seeUsersButton.addEventListener("click", handleSeeUsers);

function handleSeeUsers() {
  getLoggedUser()
    .then(async (user) => {
      if (user.is_admin === true)
        window.location.href = "./users";
      else {
        alert("Only admins can access this feature.");
      }

    })
    .catch((error) => {
      console.error("Request failed:", error);
    });
}

const seeTicketsButton = document.getElementById("see_tickets");
seeTicketsButton.addEventListener("click", handleSeeTickets);

function handleSeeTickets() {
  getLoggedUser()
    .then(async (user) => {
      if (user.is_admin === true)
        window.location.href = "./tickets";
      else {
        alert("Only admins can access this feature.");
      }

    })
    .catch((error) => {
      console.error("Request failed:", error);
    });
}

const seeAnimalsButton = document.getElementById("see_animals");
seeAnimalsButton.addEventListener("click", handleSeeAnimals);

function handleSeeAnimals() {
  getLoggedUser()
    .then(async (user) => {
      if (user.is_admin === true)
        window.location.href = "./animals_admin";
      else {
        alert("Only admins can access this feature.");
      }

    })
    .catch((error) => {
      console.error("Request failed:", error);
    });
}

const languageSelect = document.querySelector('.language-select');
const updateBtn = document.querySelector('.update-language-btn');

updateBtn.addEventListener('click', () => {
  const languageSetting = languageSelect.value;
  localStorage.setItem("language", languageSetting);
  const token = localStorage.getItem("token");

  const requestBody = {
    languageSetting: languageSetting
  };

  fetch('/api/setLanguage', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(requestBody)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Language setting updated:', data);
      alert('Language setting updated');
    })
    .catch(error => {
      console.error('Error updating language setting:', error);
    });
});
