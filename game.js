const buttonColors = ["red", "blue", "green", "yellow"];
const buttons = $(".btn");

const gameOverAudio = new Audio("sounds/wrong.mp3");

let computerPattern;
let playerPattern;

let level;

function setUp() {
    computerPattern = [];
    playerPattern = [];
    level = 0;
    document.addEventListener("keypress", startGame);
}

function startGame() {
    document.removeEventListener("keypress", startGame);
    buttons.on("click",t =>{
        playerSequence($(t.target).attr("id"));
    })

    setTimeout(computerSequence, 500);
}

function playerSequence(chosenColor) {
    //save answer and animate
    playerPattern.push(chosenColor);
    animateButton(chosenColor);
    //console.log("Player Turn: " +playerPattern)

    //check current answer
    setTimeout(checkAnswer, 500,playerPattern.length-1);
}

function computerSequence() {
    //choose color
    const chosenColor = buttonColors[Math.floor(Math.random() * 4)];
    //change level
    level = level+1;
    $("#level-title").text("Level "+level);

    //save pattern
    computerPattern.push(chosenColor);
    //animate list
    setTimeout(animateButton, 1000, chosenColor);
    //console.log("Computer Turn: " +computerPattern)
    playerPattern = [];

}

function checkAnswer(indexOfLastColor) {
    if(indexOfLastColor > level){
        console.log("Wrong, too long")
        gameOver();
    }
    else if(playerPattern[indexOfLastColor] !== computerPattern[indexOfLastColor]){
        console.log("Wrong color.")
        gameOver();
    } else if((playerPattern[indexOfLastColor] === computerPattern[indexOfLastColor]) && indexOfLastColor+1 === level) {
        console.log("Correct color\nCorrect Sequence.")
        setTimeout(computerSequence, 1000);
    } else {
        console.log("Correct color")
    }
}

function animateButton(chosenColor) {
    const colorButton = "#"+chosenColor;
    const colorSound = chosenColor + ".mp3";

    $(colorButton).addClass("pressed");
    setTimeout(function () {
        $(colorButton).removeClass("pressed")
    }, 100);

    const audio = new Audio("sounds/"+colorSound);
    audio.play();
}

function gameOver(){
    gameOverAudio.play();

    $("#level-title").text("GAME OVER!! Press any key to restart.");

    setUp();
}

setUp();