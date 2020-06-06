var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var min = 0;
var max = 3;
var started = false;

// RANDOM GENERATION FUNCTION - Random Button
function nextSequence(min, max) {
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  var randomChosenColour = buttonColours[randomNumber];
  // alert("Chosen color is:" + buttonColours[randomNumber]);
  gamePattern.push(buttonColours[randomNumber]);
  $("#" + randomChosenColour).fadeOut(250).fadeIn(250);
  // alert("sounds/" + randomChosenColour + ".mp3");
  playSound(randomChosenColour);
}

// Click check section
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

//Audio play function section
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Animation upon click of a button section

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed")
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 200);

}

// Keyboard press check section
$(document).keypress(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence(0, 3);
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // alert("SUCCESS");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence(min, max);
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  userClickedPattern = [];
  gamePattern = [];
  started = false;
}
