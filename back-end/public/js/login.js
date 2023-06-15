const submitButton = document.getElementById("submitButton");

submitButton.addEventListener("click", async (event) => {
  event.preventDefault();
  await validateLoginForm();
});

const getTheme = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:3000/api/logUserTheme`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  
  const theme = await response.json()
  localStorage.setItem("theme", theme.mode_preference);
}

const validateLoginForm = async () => {
  let email = document.forms["loginForm"]["email"].value;
  let password = document.forms["loginForm"]["password"].value;

  let data = { email, password };

  const response = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const { token } = await response.json();
    localStorage.setItem("token", token); 
    getTheme();
    window.location.href = "/home";
  } else {
    const errorData = await response.json();
    alert(errorData.error);
  }
};