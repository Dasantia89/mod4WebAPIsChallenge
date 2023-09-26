//Assignment Code

var questionAnswer = [
    ["Commonly used data types DO NOT include:", "strings", "booleans", "alerts", "numbers", "alerts"],
    ["The condition in an if / else statement is enclosed with ___________.", "quotes", "curly brackets", "parenthesis", "square brackets", "parenthesis"],
    ["Arrays in Javascript can be used to store ________________", "numbers and strings", "other arrays", "booleans", "all of the above", "all of the above"],
    ["String values must be enclosed within ______ when being assigned to variables.", "commas", "curly brackets", "quotes", "parenthesis", "quotes"],
    [" A very useful tool used during development and debugging for printing content to the debugger is:", "JavaScript", "terminal/bash", "for loops", "console.log", "console.log"]
];
var main = document.querySelector("main");
var btn = document.getElementById("start");
btn.addEventListener("click", startFunction);
var heading = document.getElementById("heading");
var questions = document.getElementById("rules");
var answers = document.querySelectorAll(".answer");
var timer = document.getElementById("timer");
var check = document.querySelector("footer");
var initials = document.getElementById("enterInitials");
var textBox = document.getElementById("initials");
var submit = document.getElementById("submit");
var highScores = document.getElementById("highScores");
var link = document.getElementById("highScoreLink");
var x = 0;
var time = 75;
var timeInterval;
var scores = JSON.parse(localStorage.getItem("scores")) || [];
link.addEventListener("click", displayHighScores);
getScores();
home();
function init() {
    x = 0;
    time = 75;
    timer.textContent = "Time: " + time;
    getScores();
    var scoreButtons = document.querySelectorAll(".scoreBtn");
    for (var z = 0; z < scoreButtons.length; z++) {
        scoreButtons[z].remove();
    }
    highScores.innerHTML = "";
    home();
}

function getScores() {
    scores = JSON.parse(localStorage.getItem("scores")) || [];

}

function home() {
    heading.textContent = "Coding Quiz Challenge";
    questions.textContent = "Answer the following questions within the time limit. " +
        "Each incorrect answer will subtract 10 seconds from the timer. If the time runs out, you lose!";
    btn.style.display = "block";
}

function startFunction() {

    heading.style.display = "none";
    btn.style.display = "none";

    timer.textContent = "Time: " + time;

    // for (var x = 0; x < questionAnswer.length; x++) {
    questions.textContent = questionAnswer[x][0];
    for (var i = 0; i < answers.length; i++) {
        answers[i].style.display = "block";
        answers[i].textContent = questionAnswer[x][i + 1];
    }
    for (var z = 0; z < answers.length; z++) {
        answers[z].addEventListener("click", checkAnswer);
    }

    // }
    if (x === 0) {
        timeInterval = setInterval(function () {
            if (time > 0) {
                time--;
                timer.textContent = "Time: " + time;
            } else {
                endGame();
            }
        }, 1000)
    }


}

function checkAnswer(event) {
    choice = event.target.textContent;

    if (questionAnswer[x][5] == choice) {
        check.textContent = "Correct!";
        check.style.display = "block";
        x++;
        setTimeout(function () {
            check.style.display = "none";
            if (x == 5) {

                endGame();
            } else {
                startFunction();
            }
        }, 1000);

    } else {
        time -= 10;
        check.textContent = "Incorrect.";
        check.style.display = "block";
        setTimeout(function () {
            check.style.display = "none";
        }, 1500);
    }

}

function endGame() {
    clearInterval(timeInterval);
    for (var i = 0; i < answers.length; i++) {
        answers[i].style.display = "none";
    }
    if (time <= 0) {
        heading.textContent = "Time's up!";

    } else {
        heading.textContent = "All done!";

    }
    heading.style.display = "block";
    questions.textContent = "Your final score is " + time + ".";
    initials.style.display = "flex";
    initials.style.flexDirection = "column";
    initials.style.alignItems = "center";
    initials.style.justifyContent = "center";
    submit.addEventListener("click", saveScore);
}

function saveScore(event) {
    if (textBox.value != "") {
        var result = {
            initial: textBox.value,
            score: time
        };
        textBox.value = "";
        scores.push(result);
        scores = scores.sort(compare);
        localStorage.setItem("scores", JSON.stringify(scores));
        displayHighScores();
        // .sort(function(a, b){return b-a});
    } else {
        alert("Initials required.");
    }
}

function displayHighScores() {
    var scoreButtons = document.querySelectorAll(".scoreBtn");
    for (var z = 0; z < scoreButtons.length; z++) {
        scoreButtons[z].remove();
    }
    highScores.innerHTML = "";
    btn.style.display = "none";
    heading.textContent = "High Scores";
    initials.style.display = "none";
    questions.textContent = "";
    getScores();
    var backBtn = document.createElement("button");
    var clearBtn = document.createElement("button");
    backBtn.className = "scoreBtn";
    backBtn.textContent = "Back";
    clearBtn.className = "scoreBtn";
    clearBtn.textContent = "Clear";
    main.appendChild(backBtn);
    main.append(clearBtn);
    backBtn.addEventListener("click", init);
    clearBtn.addEventListener("click", clearHighScores);

    if (scores.length === 0) {
        questions.textContent = "No High Scores"

    } else {
        for (var y = 0; y < scores.length; y++) {
            var hiScore = document.createElement("li");
            hiScore.textContent += y + 1 + ". " + scores[y].initial + " - " + scores[y].score;
            highScores.appendChild(hiScore);
            highScores.style.display = "block";
        }

    }



}

function clearHighScores() {
    console.log(scores);
    highScores.innerHTML = "";
    localStorage.removeItem("scores");
    alert("Scores have been cleared.");
    displayHighScores();
}
function compare(a, b) {
    if (a.score < b.score)
        return 1;
    if (a.score > b.score)
        return -1;
    return 0;
}
