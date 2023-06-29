const quizContainer = document.getElementById('quiz');

let currentQuestionIndex = 0;

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  const questionElement = document.createElement('h2');
  questionElement.textContent = currentQuestion.question;

  const answersContainer = document.createElement('div');
  answersContainer.classList.add('answers');

  currentQuestion.answers.forEach(answer => {
    const answerElement = document.createElement('button');
    answerElement.textContent = answer.text;
    answerElement.addEventListener('click', () => handleAnswer(answer.correct));
    answersContainer.appendChild(answerElement);
  });

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(answersContainer);
}

function handleAnswer(correct) {
  const answerButtons = document.querySelectorAll('.answers button');
  answerButtons.forEach(button => {
    button.disabled = true;

    if (correct) {
      button.style.backgroundColor = 'green';
    } else {
      button.style.backgroundColor = 'red';
    }
  });

  setTimeout(nextQuestion, 2000);
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showEndScreen();
  }
}

function showEndScreen() {
  const score = calculateScore();
  const endMessage = document.createElement('h2');
  endMessage.textContent = 'Fim do Quiz!';

  const scoreMessage = document.createElement('p');
  scoreMessage.textContent = `Você fez ${score} pontos.`;

  const restartButton = document.createElement('button');
  restartButton.textContent = 'Reiniciar Quiz';
  restartButton.addEventListener('click', restartQuiz);

  const backButton = createNavigationButton('Voltar ao Início', 'index.html');
  const mapButton = createNavigationButton('Voltar ao Mapa', 'mapa.html');

  quizContainer.innerHTML = '';
  quizContainer.appendChild(endMessage);
  quizContainer.appendChild(scoreMessage);
  quizContainer.appendChild(restartButton);
  quizContainer.appendChild(backButton);
  quizContainer.appendChild(mapButton);
  }
  
  function createNavigationButton(text, link) {
  const button = document.createElement('button');
  button.textContent = text;
  button.addEventListener('click', () => {
  window.location.href = link;
  });
  return button;
  }
  
  function calculateScore() {
  let score = 0;
  questions.forEach(question => {
  question.answers.forEach(answer => {
  if (answer.selected && answer.correct) {
  score++;
  }
  });
  });
  return score;
  }
  
  function restartQuiz() {
  currentQuestionIndex = 0;
  questions.forEach(question => {
  question.answers.forEach(answer => {
  answer.selected = false;
  });
  });
  showQuestion();
  }
  
  showQuestion();