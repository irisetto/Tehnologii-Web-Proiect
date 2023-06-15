//pt butoanele de submit sa nu dea textul pe afara
const submitInputs = document.querySelectorAll('input[type="submit"]');
submitInputs.forEach(input => {
  const textWidth = input.scrollWidth+parseInt(getComputedStyle(input).paddingRight);
  input.style.width = `${textWidth}px`;
});

//submit button change password
const submitButton = document.getElementById("submit_button_pass");

submitButton.addEventListener("click", async (event) => {
  event.preventDefault();
  await validateChangePassForm();
});
let userPass;
const validateChangePassForm = async () => {
  let currentPass = document.forms["changepass_form"]["current-password"].value;
  let newPass = document.forms["changepass_form"]["new-password"].value;
  let confirmPass = document.forms["changepass_form"]["confirm-new-password"].value;

getLoggedUser()
      .then(async (user) => {
        console.log('User:', user);
    userPass = user.password;
    userEmail = user.email;
  let data = { currentPass,newPass,confirmPass,userPass,userEmail };
  const token = localStorage.getItem("token");

  const response = await fetch("/api/changePasswordProfile", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const responseData = await response.json();
    alert(JSON.stringify(responseData));
    window.location.reload();
  } else {
    const errorData = await response.json();
    alert(JSON.stringify(errorData));
  }
    })
      .catch(error => {
        console.error('Request failed:', error);
      });

};
//submit button save information
const submitButtonInfo = document.getElementById("submit_button_info");

submitButtonInfo.addEventListener("click", async (event) => {
  event.preventDefault();
  await validateSaveInfoForm();
});

const validateSaveInfoForm = async () => {
  let first_name = document.forms["info_form"]["first-name"].value;
  let last_name = document.forms["info_form"]["last-name"].value;
  let phone = document.forms["info_form"]["phone-number"].value;
  let email = document.forms["info_form"]["email"].value;
  let position = document.forms["info_form"]["occupied-position"].value;

  let data = { first_name,last_name,phone,email,position };
  const token = localStorage.getItem("token");

  const response = await fetch("/api/saveInfo", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const responseData = await response.json();
    alert(JSON.stringify(responseData));
   
  } 
window.location.reload();
};
//preia userul logat
  const getLoggedUser = async() =>{
    const token = localStorage.getItem("token");

    const response = await fetch('/api/logUser', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
        if (response.ok) {
          return await response.json();
        } else {
          throw new Error('Error: ' + response.status);
        }
  }

  //afisarea informatiilor dinamic despre user
  function getUserFromServer() {
    getLoggedUser()
      .then((user) => {
        console.log('User:', user);
        document.getElementById('current-first-name').textContent = user.first_name;
        document.getElementById('current-last-name').textContent = user.last_name;
        document.getElementById('current-phone-number').textContent = user.phone_number;
        document.getElementById('current-email').textContent = user.email;
        document.getElementById('current-occupied-position').textContent = user.occupied_position;
      })
      .catch(error => {
        console.error('Request failed:', error);
      });
  }
  window.onload = function () {
    getUserFromServer();
  };