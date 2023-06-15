var questions = document.querySelectorAll('.questions li');

questions.forEach(function(question) {
  var questionEl = question.querySelector('.question');
  var answerEl = question.querySelector('.answer');

  questionEl.addEventListener('click', function() {
    answerEl.classList.toggle('active');
  });
});

const submitButton = document.getElementById("submit_button");

submitButton.addEventListener("click", async (event) => {
  event.preventDefault();
  await validateHelpForm();
});

const validateHelpForm = async () => {
  let email = document.forms["help_form"]["email"].value;
  let problema = document.forms["help_form"]["problem"].value;
console.log(email+problem);
  let data = { email, problema };
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:3000/api/help", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });

  if (response.ok) {
   window.location.reload();
  } 
};