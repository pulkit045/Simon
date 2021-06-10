// ALL-Variables
var buttonColors = ["green","red","yellow","blue"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var start = false;

// Game Random Bheaviour
$(document).keypress(function () {
  if(!start){
    nextSequence();
    start = true;
  }
});

// User Interaction
$(".btn").click(function () {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkOut(userClickedPattern.length-1);
});

// ALL-Functions
//First it check whether user clicked button was right then gamePattern and userClickedPatternlength is same.
function checkOut(currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function (){
        nextSequence();
      },1000)
    }
  }
  else {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function (){
      $("body").removeClass("game-over");
    },200)

    $("#level-title").text("Game Over, Press any key to Restart");
    startOver();
  }
}

//It is generating new color for game and reseting user gamePattern
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  playSound(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
}

function playSound(colorName) {
  var sound = new Audio(colorName + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  },100);
}

function startOver() {
  level = 0;
  start = false;
  gamePattern = [];
}
