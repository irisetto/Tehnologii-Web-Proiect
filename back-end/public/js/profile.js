
const submitButton = document.getElementById("submit_button_pass");
const submitInputs = document.querySelectorAll('input[type="submit"]');
submitInputs.forEach(input => {
  const textWidth = input.scrollWidth+parseInt(getComputedStyle(input).paddingRight);
  input.style.width = `${textWidth}px`;
});

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
  // async function changePassword (){
  //   const currentPasswordInput = document.querySelector('input[name="current-password"]');
  // const currentPasswordValue = currentPasswordInput.value;
  // let userPass;
  // console.log(currentPasswordValue);
  // // getLoggedUser()
  // //     .then((user) => {
  // //       console.log('User:', user);
  // //   userPass = user.password;
  // //   })
  // //     .catch(error => {
  // //       console.error('Request failed:', error);
  // //     });
  // // const token = localStorage.getItem("token");
  // //  fetch(`/api/logUserPass/${userPass}`, {
  // //   method: "POST",
  // //   headers: { Authorization: `Bearer ${token}` },
  // // });

  // }

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