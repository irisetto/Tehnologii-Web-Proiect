var questions = document.querySelectorAll('.questions li');

questions.forEach(function(question) {
  var questionEl = question.querySelector('.question');
  var answerEl = question.querySelector('.answer');

  questionEl.addEventListener('click', function() {
    answerEl.classList.toggle('active');
  });
});