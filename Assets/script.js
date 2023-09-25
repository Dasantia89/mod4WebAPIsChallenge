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