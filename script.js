var startBtn = document.getElementById("startBtn");
var timerEl = document.getElementById("timerEl");
var questionEl = document.getElementById("questionEl");
var answerEls = document.getElementById("answerEls");
var verifyAnswer = document.getElementById("verifyAnswer");
var mainHeader = document.getElementById("mainHeader");
var startBtn = document.getElementById("startBtn");
var finalScoreDisplay = document.getElementById("finalScoreDisplay");
var finalScoreHeader = document.getElementById("finalScoreHeader");
var highscorePage = document.getElementById("highscorePage");
var userInput = document.getElementById("userInput");
var submitInitials = document.getElementById("submitInitials");

var timer = 60;
var index = 0;
var timerId;

// WHEN I click the start button
startBtn.addEventListener("click", startQuiz);
// THEN a timer starts and I am presented with a question
function startQuiz() {
  // timer starts
  startTimer();
  // question shows up on the page
  displayQuestion();
}

function startTimer() {
  timerId = setInterval(function () {
    timer--;
    timerEl.textContent = timer;
    if (timer === 0) {
      endGame();
    }
  }, 1 * 1000);
}
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// stop the timer
function endGame() {
  clearInterval(timerId);
  // remove the question from display
  questionEl.textContent = "";
  answerEls.textContent = "";
  // remove incorrect/correct
  verifyAnswer.textContent = "";
  // WHEN the game is over, display results
  displayResults();
}

function displayQuestion() {
  var question = questions[index];
  // remove the last question
  // question shows up on the page
  questionEl.textContent = question.title;

  // remove the last answers
  answerEls.textContent = "";
  verifyAnswer.textContent = "";

  // show the multiple choice answers
  for (var i = 0; i < question.choices.length; i++) {
    var choice = question.choices[i];
    //  <button></button>
    var choiceBtn = document.createElement("button");
    //  <button>{{choice}}</button>
    choiceBtn.textContent = choice;
    // displays choice in the choiceBtn text
    choiceBtn.classList.add("choiceBtn");
    //initializes and adds choiceBtn to class list
    // WHEN I answer a question
    choiceBtn.addEventListener("click", answerQuestion);

    //  <div id='answerEls'>
    //      <button class='choiceBtn'>{{choice[0]}}</button>
    //      <button class='choiceBtn'>{{choice[1]}}</button>
    //      <button class='choiceBtn'>{{choice[2]}}</button>
    //  </div>

    answerEls.append(choiceBtn);
  }
}

// click handler is triggered on what the user clicked on
function answerQuestion() {
  var choice = this.textContent;
  var correct = questions[index].answer;

  //shows if the answer is correct or not correct
  if (choice === correct) {
    verifyAnswer.textContent = `Correct!`;
  }
  //WHEN I answer a question incorrectly
  else {
    // THEN time is subtracted from the clock
    timer -= 5;
    verifyAnswer.textContent = `Wrong!`;
  }

  setTimeout(function () {
    // THEN I am presented with another question
    index++;
    if (index < questions.length) {
      displayQuestion();
    } else {
      endGame();
    }
  }, 1 * 1000);
}

// show quiz results
function displayResults() {
  //create tag for showing score
  //var scoreMsgEL = $("<h1>");
  // adds text to it
  //scoreMsgEL.text(`Your final score was ${timer}!`);
  // add child to the parent tag
  //displayResults.append(scoreMsgEL);

  // show a text box for putting my initials in
  finalScoreDisplay.style.display = "block";
  startBtn.style.display = "none";

  mainHeader.textContent = "All done!";
  finalScoreHeader.textContent = `Your final score was ${timer}!`;

  submitInitials.addEventListener("click", submitScore);
}

function submitScore() {
  //pass in userInitials and userScore
  const scoreObj = {
    user: userInput.value,
    score: timer,
  };
  // take the current high score from storage
  let highscores = JSON.parse(localStorage.getItem("highscores"));
  if (!highscores) {
    highscores = [];
  }
  // modify the high score to include the user
  highscores.push(scoreObj);

  // save the current high score into storage
  localStorage.setItem("highscores", JSON.stringify(highscores));

  // remove input form
  finalScoreDisplay.style.display = "none";

  // show the high score page
  highscorePage.style.display = "block";
  for (let i = 0; i < highscores.length; i++) {
    const element = document.createElement("div");
    element.textContent = highscores[i].user + ": " + highscores[i].score;
    highscorePage.appendChild(element);
  }
}

// ```
// ## Some of the things that I need are...
// * Array of questions
// * Timer
// * Click handlers (functions that do click events)
// * HTML templates for Right/Wrong, Questions, Answers, High scores
// * Stylesheets for each template
// * Array of objects for the high scores (Scoreboard and a way to save it)

