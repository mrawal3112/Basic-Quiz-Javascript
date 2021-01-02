const QuizTitle = "JAVASCRIPT QUIZ";
const questions = [
  {
    number: 1,
    question:
      "Which of the following function of Array object returns true if at least one element in this array satisfies the provided testing function?",
    options: ["shift()", "reverse()", "slice()", "some()"],
    answer: "some()",
  },
  {
    number: 2,
    question:
      "Which of the following is true about typeof operator in JavaScript?",
    options: [
      "The typeof is a unary operator that is placed before its single operand, which can be of any type.",
      "Its value is a string indicating the data type of the operand.",
      "Both of the above.",
      "None of the above.",
    ],
    answer: "Both of the above.",
  },
  {
    number: 3,
    question:
      "Which of the following function of String object creates a string to be displayed as bold as if it were in a <b> tag?",
    options: ["anchor()", "blink()", "big()", "bold()"],
    answer: "bold()",
  },
  {
    number: 4,
    question:
      "Which of the following function of Array object adds one or more elements to the end of an array and returns the new length of the array?",
    options: ["pop()", "push()", "join()", "map()"],
    answer: "push()",
  },
  {
    number: 5,
    question: "Which of the following is not a reserved word in JavaScript?",
    options: ["Interface", "Throws", "Program", "Short"],
    answer: "program",
  },
  {
    number: 6,
    question: " JavaScript is a ___ -side programming language.",
    options: ["Client", "Server", "Both", "None"],
    answer: "Both",
  },
];

let count = 0;
let score = 0;
let savedAnswer = " ";
let correctAnswer;
let progressScore = 100 / questions.length;

document.querySelector(
  ".quizBox"
).innerHTML = `<div class="questionBox ms-2 mt-4"></div>

<div class="questionnaire mx-2 mt-4 ">
    <div class="question m-3 pt-2">
      <div class="questionNumber"> </div>
      <hr>
      <h5 class='mb-4 questionStatement'> </h5>
      <div class="questionOptions">
      </div>
      <button class="btn btn-outline-dark ms-auto btn-sm save mt-3" type="submit">Save</button>
      <hr>
      <div class="questionBoxFooter">
      </div>
    </div>
</div>`;

const queStmt = document.querySelector(".questionStatement");
const saveBtn = document.querySelector(".save");
const quizTitle = document.querySelector(".questionBox");
const optionsBox = document.querySelector(".questionOptions");
const footerArea = document.querySelector(".questionBoxFooter");
const questionDiv = document.querySelector(".question");
const questionaire = document.querySelector(".questionnaire");
const queNumber = document.querySelector(".questionNumber");

function loadQuestions(abc) {
  optionsBox.innerHTML = null;
  queNumber.innerHTML = null;
  footerArea.innerHTML = null;

  count = abc;
  document.querySelector(
    ".progress"
  ).innerHTML = `<div class="progress-bar" role="progressbar" style="width: ${(
    progressScore *
    (count + 1)
  ).toFixed(2)}%;" 
  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${(
    progressScore *
    (count + 1)
  ).toFixed(2)}%</div>`;

  for (let i = 0; i < questions[count].options.length; i++) {
    const radioButtons = document.createElement("input");
    const spanField = document.createElement("span");
    const spanData = document.createTextNode(`${questions[count].options[i]}`);
    const breakElement = document.createElement("br");
    radioButtons.classList.add(
      "mb-2",
      "ms-3",
      "options",
      `options--${count + 1}`
    );
    radioButtons.type = "radio";
    radioButtons.value = `${questions[count].options[i]}`;
    radioButtons.name = `question${questions[count].number}`;
    spanField.classList.add("ms-2");
    spanField.appendChild(spanData);
    optionsBox.appendChild(radioButtons);
    optionsBox.appendChild(spanField);
    optionsBox.appendChild(breakElement);
  }
  const queOptions = document.querySelectorAll(`.options--${count + 1}`);

  queOptions.forEach(function (a) {
    a.addEventListener("click", function (b) {
      savedAnswer = b.target.value;
    });
  });

  const queHeading = document.createElement("h1");
  const headingData = document.createTextNode(
    `Question ${questions[count].number}`
  );
  queHeading.appendChild(headingData);
  queNumber.append(queHeading);

  if (count >= questions.length - 1) {
    const buttonSave = document.createElement("button");
    const btnData = document.createTextNode("Finish");
    buttonSave.type = "submit";
    buttonSave.appendChild(btnData);
    buttonSave.classList.add(
      "btn",
      "btn-outline-dark",
      "ms-auto",
      "btn-sm",
      "text-danger",
      "finished"
    );
    queNumber.appendChild(buttonSave);

    const finishBtn = document.querySelector(".finished");
    finishBtn.addEventListener("click", finishMessage);
  } else {
    const buttonSave = document.createElement("button");
    const btnData = document.createTextNode("Next");
    buttonSave.type = "submit";
    buttonSave.appendChild(btnData);
    buttonSave.classList.add(
      "btn",
      "btn-outline-dark",
      "ms-auto",
      "btn-sm",
      "next"
    );
    queNumber.appendChild(buttonSave);
    const nextBtn = document.querySelector(".next");
    nextBtn.addEventListener("click", countIncrement);
  }

  quizTitle.innerHTML = `<h1>${QuizTitle}</h1>`;
  const heading = document.querySelector(".questionBox h1");
  heading.classList.add("h1Style");
  const footerText = document.createElement("h6");
  const footerQuestion = document.createTextNode(
    `${count + 1} of ${questions.length} Question`
  );

  footerText.appendChild(footerQuestion);
  footerArea.appendChild(footerText);
  queStmt.textContent = questions[count].question;

  correctAnswer = questions[count].answer;
  console.log(correctAnswer);
}

saveBtn.addEventListener("click", function () {
  if (savedAnswer === correctAnswer) score++;
  console.log(score);
  progressBarReport();
});
function countIncrement() {
  count++;
  loadQuestions(count);
}

function finishMessage() {
  alert(`Congratulation, You have scored ${score}/${questions.length} marks`);
}
