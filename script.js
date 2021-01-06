var startBtn = document.getElementById("startBtn");
var timerEl = document.getElementById("timerEl");
var questionEl = document.getElementById("questionEl");
var answerEls = document.getElementById("answerEls");
var timer = 60;
var index = 0;
// # PseudoCode
// ```
// GIVEN I am taking a code quiz
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
  setInterval(function () {
    timer--;
    timerEl.textContent = timer;
  }, 1 * 1000);
}
function displayQuestion() {
  var question = questions[index];
  // remove the last question
  // question shows up on the page
  questionEl.textContent = question.title;
  // remove the last answers
  answerEls.textContent = "";
  // show the multiple choice answers
  for (var i = 0; i < question.choices.length; i++) {
    var choice = question.choices[i];
    //  <button></button>
    var choiceBtn = document.createElement("button");
    //  <button>{{choice}}</button>
    choiceBtn.textContent = choice;
    // choiceBtn.style.display = "block";
    choiceBtn.classList.add("choiceBtn");
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
  // shows if the answer is correct or not correct
  console.log(choice === correct);
  // WHEN I answer a question incorrectly
  if (choice !== correct) {
    // THEN time is subtracted from the clock
    timer -= 10;
  }

  // THEN I am presented with another question
  index++;
  displayQuestion();
}

// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// stop the timer
// remove the question from display
// remove incorrect/correct
// show quiz results
// WHEN the game is over
// THEN I can save my initials and score
// show a text box for putting my name in
// take the current high score from storage
// modify the high score to include the user
// save the current high score into storage
// remove input form
// show the high score page
// ```
// ## Some of the things that I need are...
// * Array of questions
// * Timer
// * Click handlers (functions that do click events)
// * HTML templates for Right/Wrong, Questions, Answers, High scores
// * Stylesheets for each template
// * Array of objects for the high scores (Scoreboard and a way to save it)
