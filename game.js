// declare an array which will holds the color
var buttonColours = ["red", "blue", "green", "yellow"];
//declare an empty array to hold the game generated color 
var gamePattern = [];
//declare an empty array to hold the user clicked  generated color 
var userClickedPattern = [];
//a flag variable 
var started = false;
//level with 0 
var level = 0;

//to check whether user has pressed some key or not
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    //call nextsequence() funcation
    nextSequence();
    //change it to true
    started = true;
  }
});

//this function will detect which button has clicked

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  
  //call the 
  mySound(userChosenColour);
  myAnimation(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

//to check if the both pattern are same
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if(userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 2000);
      }
    } 
    //logic for game over
    else {
      mySound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      //call the restart function
      restart();
    }
}

//to hold the pattern
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  mySound(randomChosenColour);
}

function myAnimation(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function mySound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
//restart function
function restart() {
  level = 0;
  gamePattern = [];
  started = false;
}
