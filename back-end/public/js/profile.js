//pt butoanele de submit sa nu dea textul pe afara
const submitInputs = document.querySelectorAll('input[type="submit"]');
submitInputs.forEach((input) => {
  const textWidth =
    input.scrollWidth + parseInt(getComputedStyle(input).paddingRight);
  input.style.width = `${textWidth}px`;
});

//submit button change password
const submitButton = document.getElementById("submit_button_pass");

submitButton.addEventListener("click", async (event) => {
  event.preventDefault();
  await validateChangePassForm();
});
let userPass;
let userEmail;
const validateChangePassForm = async () => {
  let currentPass = document.forms["changepass_form"]["current-password"].value;
  let newPass = document.forms["changepass_form"]["new-password"].value;
  let confirmPass =
    document.forms["changepass_form"]["confirm-new-password"].value;

  getLoggedUser()
    .then(async (user) => {
      console.log("User:", user);
      userPass = user.password;
      userEmail = user.email;
      let data = { currentPass, newPass, confirmPass, userPass, userEmail };
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
    .catch((error) => {
      console.error("Request failed:", error);
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

  let data = { first_name, last_name, phone, email, position };
  const token = localStorage.getItem("token");

  const response = await fetch("/api/saveInfo", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  const fileInput = document.getElementById("profile-picture");
  const file = fileInput.files[0];
  if( file !== undefined) {
  const byteArray = await imageToByteArray(file);
  console.log(byteArray);

  const responseImage = await fetch("/api/updateProfilePicture", {
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
      Authorization: `Bearer ${token}`,
    },
    body: byteArray,
  });
  }
  if (response.ok) {
    const responseData = await response.json();
    alert(JSON.stringify(responseData));
  }
  window.location.reload();
};

//submit button submit ticket
const submitButtonTicket = document.getElementById("submit_button_ticket");

submitButtonTicket.addEventListener("click", async (event) => {
  event.preventDefault();
  await validateSubmitTicketForm();
});

const validateSubmitTicketForm = async () => {

  let section = document.forms["tickets_form"]["section"].value;
  let manager = document.forms["tickets_form"]["manager"].value;
  let desc = document.forms["tickets_form"]["desc"].value;
  
  let data = { section, manager, desc };
  const token = localStorage.getItem("token");

  const response = await fetch("/api/submitTicket", {
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

//afisarea informatiilor dinamic despre user
function getUserFromServer() {
  getLoggedUser()
    .then(async (user) => {
      console.log("User:", user);
      document.getElementById("current-first-name").textContent =
        user.first_name;
      document.getElementById("current-last-name").textContent = user.last_name;
      document.getElementById("current-phone-number").textContent =
        user.phone_number;
      document.getElementById("current-email").textContent = user.email;
      document.getElementById("current-occupied-position").textContent =
        user.occupied_position;
      if (user.profile_picture) {
        const uint8Array = new Uint8Array(user.profile_picture.data);
        let base64String = btoa(String.fromCharCode.apply(null, uint8Array));

        const imageElement = document.getElementById("profile_img");
        imageElement.src = `data:image/png;base64,${base64String}`;
      } else console.log("n are poza");
    })
    .catch((error) => {
      console.error("Request failed:", error);
    });
}

function imageToByteArray(image) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result;
      const byteArray = new Uint8Array(arrayBuffer);
      resolve(byteArray);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(image);
  });
}
window.onload = function () {
  getUserFromServer();
};
