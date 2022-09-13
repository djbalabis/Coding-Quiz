// questions variable array
var questions = [{
    q: "Commonly used data types DO Not include:",
    a: "1. strings",
    b: "2. booleans",
    c: "3. alerts",
    d: "4. numbers",
    correct: "3. alerts",
},
{
    q: "The condition in an if/else statement is enclosed with ____.",
    a: "1. quotes",
    b: "2. curly brackets",
    c: "3. parenthesis",
    d: "4. square brackets",
    correct: "3. parenthesis",
},
{
    q: "Arrays in JavaScript can be used to store ____.",
    a: "1. numbers and strings",
    b: "2. other arrays",
    c: "3. booleans",
    d: "4. all of the above",
    correct: "4. all of the above",
},
{
    q: "String values must be enclosed within ____ when being assigned to variables.",
    a: "1. commas",
    b: "2. curly brackets",
    c: "3. quotes",
    d: "4. parenthesis",
    correct: "3. quotes",
},
{
    q: "A very useful tool used during development and debugging for printing content to the debugger is:",
    a: "1. JavaScript",
    b: "2. terminal/Bash",
    c: "3. for loops",
    d: "4. console.log",
    correct: "4. console.log",
}];
// Created variables pointing towards the DOM elements
var quizStart = document.getElementById("start");
var timerEl = document.getElementById("timer");
var quizContainer = document.querySelector("#quiz");
var timeLeft = 60;
var quizDuration;

function timer() {
    timerEl.textContent = "Time remaining: " + timeLeft + "s";
    quizDuration = setInterval(function() {
        if (timeLeft > 0) {
            adjustTime(-1);
        } else {
            endQuiz();
        }
    }, 1000);
}
function adjustTime(amount) {
    timeLeft += amount;
    if (timeLeft < 0) {
        timeLeft = 0;
    }
    timerEl.textContent = "Time remaining: " + timeLeft + "s";
}
// Function to render questions and append to the DOM
quizStart.onclick = timer;
var renderQuestion = function(question) {
    quizContainer.innerHTML = "";

    var questionHeader = document.createElement("h2");
    questionHeader.textContent = question.q;

    var answerA = document.createElement("button");
    answerA.textContent = question.a;
    answerA.addEventListener("click", answerClick);

    var answerB = document.createElement("button");
    answerB.textContent = question.b;
    answerB.addEventListener("click", answerClick);

    var answerC = document.createElement("button");
    answerC.textContent = question.c;
    answerC.addEventListener("click", answerClick);

    var answerD = document.createElement("button");
    answerD.textContent = question.d;
    answerD.addEventListener("click", answerClick);

    quizContainer.appendChild(questionHeader);
    quizContainer.appendChild(answerA);
    quizContainer.appendChild(answerB);
    quizContainer.appendChild(answerC);
    quizContainer.appendChild(answerD);
}

var currentQuestionIndex = 0;
var userScore = 0;
var correctAnswer = questions[currentQuestionIndex].correct;
var viewScores = document.getElementById("scores");
// Prevent default so page doesnt refresh
var answerClick = function(event) {
    event.preventDefault();
    var userAnswer = event.target.textContent;
    correctAnswer = questions[currentQuestionIndex].correct;
    // Determines if correct or not
    var answerDetermination = document.querySelector("#grade");
    if (userAnswer !== correctAnswer) {
        adjustTime(-10);
        answerDetermination.textContent = "Wrong!";
        currentQuestionIndex++;
        if (currentQuestionIndex >= questions.length) {
            endQuiz();
        } else {renderQuestion(questions[currentQuestionIndex])};

    }
    else if (userAnswer === correctAnswer) {
        currentQuestionIndex++;
        answerDetermination.textContent = "Correct!";
        userScore++;
        if (currentQuestionIndex >= questions.length) {
            endQuiz();
        } else {renderQuestion(questions[currentQuestionIndex])};
    }
};

var quiz = function(event) {
    event.preventDefault();
    resetDisplay();
    renderQuestion(questions[currentQuestionIndex]);
};

function resetDisplay() {
    quizContainer.innerHTML="";
    document.querySelector("#instructions").style.display = "none";
}
function highScores() {
    let data = localStorage.getItem("object");
    let getData = JSON.parse(data);
    let name = getData.name;
    let score = getData.score;
    quizContainer.innerHTML = "";
    quizContainer.innerHTML = name + ": " + score;
}
viewScores.addEventListener("click", () => {
    highScores();
})
// presents the initials input area and submit button
var initials; 
function endQuiz() {
    resetDisplay();
    timerEl.textContent = "";
    clearInterval(quizDuration);
    var endPage = document.createElement("h2");
    quizContainer.appendChild(endPage);

    let blank = document.querySelector("#grade");
    blank.innerHTML = "";

    endPage.innerHTML = "All done! Your final score is " + userScore + ". Enter your initials to save";

    var initialBox = document.createElement("input");
    blank.appendChild(initialBox);

    var submitInitialBtn = document.createElement("button");
    submitInitialBtn.textContent = "Submit";
    blank.appendChild(submitInitialBtn);

    submitInitialBtn.addEventListener("click", () => {
        
        if (initialBox.value.length === 0) return false;

        let storeInitials = (...input) => {
            let data = JSON.stringify({ "name":input[0], "score":input[1]})
            localStorage.setItem("object", data)
        }
        storeInitials(initialBox.value, userScore);

        var playAgain = document.createElement("button");
        playAgain.textContent= "Play Again!";
        blank.appendChild(playAgain);

        playAgain.addEventListener("click", () => {
            location.reload();
        })
    });

    document.querySelector("input").value = "";

    initialBox.addEventListener("submit", endQuiz);
    
};
function renderInitials() {
    submitInitialBtn.addEventListener('click', function(event) {
        event.preventDefault;
}
)};

quizStart.addEventListener('click', quiz);