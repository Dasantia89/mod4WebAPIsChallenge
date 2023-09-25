//Assignment Code

var questionAnswer = [
    ["Commonly used data types DO NOT include:", "strings", "booleans", "alerts", "numbers", "alerts"],
    ["The condition in an if / else statement is enclosed with ___________.", "quotes", "curly brackets", "parenthesis", "square brackets", "parenthesis"],
    ["Arrays in Javascript can be used to store ________________", "numbers and strings", "other arrays", "booleans", "all of the above", "all of the above"],
    ["String values must be enclosed within ______ when being assigned to variables.", "commas", "curly brackets", "quotes", "parenthesis", "quotes"],
    [" A very useful tool used during development and debugging for printing content to the debugger is:", "JavaScript", "terminal/bash", "for loops", "console.log", "console.log"]
];

var btn = document.getElementById("start");
btn.addEventListener("click", startFunction);
var heading = document.getElementById("heading");
var questions = document.getElementById("rules");
var answers = document.querySelectorAll(".answer");
var timer = document.getElementById("timer");
var check = document.querySelector("footer");
var x = 0;
var time = 75;



function startFunction() {
    heading.style.display = "none";
    btn.style.display = "none";
    check.style.display="none";
    timer.textContent = time;

    // for (var x = 0; x < questionAnswer.length; x++) {
    questions.textContent = questionAnswer[x][0];
    for (var i = 0; i < answers.length; i++) {
        answers[i].style.display = "block";
        answers[i].textContent = questionAnswer[x][i + 1];
        console.log(questionAnswer[x][i + 1]);

    }
    for (var z = 0; z < answers.length; z++) {
        answers[z].addEventListener("click", checkAnswer);
    }

    // }
    if (x === 0) {
        var timeInterval = setInterval(function () {
            if (time > 0) {
                time--;
                timer.textContent = time;
            }
        }, 1000)
    }
}

function checkAnswer(event) {
    choice = event.target.textContent;
 
    if (questionAnswer[x][5] == choice) {
        check.textContent = "Correct!"
        check.style.display = "block";
        setTimeout(function(){
            check.style.display="none";
        }, 1500);
        x++;
        startFunction();
    } else {
        time -= 10;
        check.textContent = "Incorrect.";
        check.style.display = "block";
        setTimeout(function(){
            check.style.display="none";
        }, 1500);
    }

}