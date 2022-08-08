console.log("This is Piano Tlies Game.");

// These are ids given to each box.
var buttonId = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"];

var gamePattern = []; //here we store button chosen by computer.
var userClickedPattern = []; //here we store button chosen by user.

var started = false;
var level = 0;
var myTimer ;
var timer = 0;
// here game starts.
function keyPressFunction() {
    if (!started){
    document.getElementById("title").textContent = "level " + level ;
    nextSequence();
    myTimer = setInterval(() => {
        document.querySelector(".timer").textContent = timer + " seconds";
        timer += 1;
    }, 1000);
    started = true ;
    }
}

// storing id clicked by user.
function game(t) {
    var userChosenId = t.id ;
    userClickedPattern.push(userChosenId);

    animatePress(userChosenId);

    checkAnswer(userClickedPattern.length-1);
};

// checking the elements of gamePattern and userClickedButton
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        document.getElementById("body").classList.add("game-over");
        document.getElementById("title").textContent = "Game Over, your score is " + level + " Press Any Key to Restart" ;

        setTimeout(() => {
            document.getElementById("body").classList.remove("game-over");
        }, 1000);
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++ ;
    document.getElementById("title").textContent = "level " + level ;
    var randomNumber = Math.floor(Math.random() * 16);
    var randomChosenId = buttonId[randomNumber];
    gamePattern.push(randomChosenId);

    document.getElementById(randomChosenId).classList.add("add");

    setTimeout(() => {
        document.getElementById(randomChosenId).classList.remove("add");

    }, 100);
}

function animatePress(currentId) {
    document.getElementById(currentId).classList.add("pressed");
    setTimeout(function () {
        document.getElementById(currentId).classList.remove("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    clearInterval(myTimer);
    timer = 0;
    gamePattern = [];
    started = false;
}
