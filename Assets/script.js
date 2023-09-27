//Assignment Code

// Create a 2 dimensional array where each element is the question followed by the possible answers and then the correct answer
var questionAnswer = [
    ["Commonly used data types DO NOT include:", "strings", "booleans", "alerts", "numbers", "alerts"],
    ["The condition in an if / else statement is enclosed with ___________.", "quotes", "curly brackets", "parenthesis", "square brackets", "parenthesis"],
    ["Arrays in Javascript can be used to store ________________", "numbers and strings", "other arrays", "booleans", "all of the above", "all of the above"],
    ["String values must be enclosed within ______ when being assigned to variables.", "commas", "curly brackets", "quotes", "parenthesis", "quotes"],
    [" A very useful tool used during development and debugging for printing content to the debugger is:", "JavaScript", "terminal/bash", "for loops", "console.log", "console.log"]
];

// Get references to all the needed elements and make them global so they can be accessed in any function 
var main = document.querySelector("main");
var btn = document.getElementById("start");
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

// add event listener to the start button to start the quiz  and one for the view high scores link
btn.addEventListener("click", startFunction);
link.addEventListener("click", displayHighScores);

// initialize variables 
var x = 0;
var time = 75;
var timeInterval;
var scores;

// Get scores from local storage and create home screen on first run
getScores();
home();

// retrieve scores from localstorage and store them in scores variable 
function getScores() {
    scores = JSON.parse(localStorage.getItem("scores")) || [];

}

// create the home screen 
function home() {
    heading.textContent = "Coding Quiz Challenge";
    questions.textContent = "Answer the following questions within the time limit. " +
        "Each incorrect answer will subtract 10 seconds from the timer. If the time runs out, you lose!";
    btn.style.display = "block";
}

// start button has been pressed so set the timer, fill in the question and the answers and listen for answer choice
function startFunction() {
    heading.style.display = "none";
    btn.style.display = "none";

    timer.textContent = "Time: " + time;

    questions.textContent = questionAnswer[x][0];
    for (var i = 0; i < answers.length; i++) {
        answers[i].style.display = "block";
        answers[i].textContent = questionAnswer[x][i + 1];
    }
    for (var z = 0; z < answers.length; z++) {
        answers[z].addEventListener("click", checkAnswer);
    }

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

// an answer was chosen. if correct, display correct and move on to the next question. if wrong display incorrect and subtract 10 seconds from the timer
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

// Either the timer reached 0 or all the questions have been answered. So retrieve user initials 
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

// Save initials and score into an object, stringify it, and save it to local storage
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
    } else {
        alert("Initials required.");
    }
}

// First get rid of any unneeded elements from other functions, then Display high scores in descending order. Uf no scores, display "no high scores"
// Create back and clear score buttons and listen for clicks 
function displayHighScores() {
    clearInterval(timeInterval);
    for (var p = 0; p < answers.length; p++) {
        answers[p].style.display = "none";
    }
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

// Compare the score of each stored scores object and return a value to be able to sort them 
function compare(a, b) {
    if (a.score < b.score)
        return 1;
    if (a.score > b.score)
        return -1;
    return 0;
}


// back button was clicked, so re initialize variables, reset timer and remove any unneeded elements.
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

// Remove scores from localstorage
function clearHighScores() {
    console.log(scores);
    highScores.innerHTML = "";
    localStorage.removeItem("scores");
    alert("Scores have been cleared.");
    displayHighScores();
}

