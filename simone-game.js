
let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;                                // A boolean named "started" initialized as false.
let level = 0;                      // Create a new variable called level and start at level 0.
                    //  Detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {      
  if (!started) {                                 
              // The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {        // Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
          //  Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);//Add the contents of the variable userChosenColour to the end of this userClickedPattern
  playSound(userChosenColour);
  animatePress(userChosenColour);
// Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
// check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){  // If the user got the most recent answer right,
                                                     // then check that they have finished their sequence with another if statement.
        setTimeout(function () {
          nextSequence();
        }, 1000);                     // Call nextSequence() after a 1000 millisecond delay.
      }
    } else {
      playSound("wrong"); // In the sounds folder there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.

        // In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");  // Change the h1 title if the user got the answer wrong.

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      // Call startOver() if the user gets the sequence wrong.
      startOver();
    }
}


function nextSequence() {                                             
  userClickedPattern = []; // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  level++;                                                            // Increase the level by 1 every time nextSequence() is called.
  $("#level-title").text("Level " + level);                           // Changing the level title to the current level.
  let randomNumber = Math.floor(Math.random() * 4); //generate a random number between 0 and 3, store it in a variable "randomNumber"
  let randomChosenColour = buttonColours[randomNumber];               // A variable to store a random color from the array of colors.
  gamePattern.push(randomChosenColour);                         // Pushing the random color into the end of the empty colors array.
                                                            // Making the button with the same id as the randomChosenColour blink.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);                          // Refactor the code in playSound() so that it will work for 
                                                        //both playing sound in nextSequence() and when the user clicks a button.                                    
}

function animatePress(currentColor) {                         
  $("#" + currentColor).addClass("pressed");                        // Once a button is clicked it gets assigned the class "pressed".
  setTimeout(function () {                      
    $("#" + currentColor).removeClass("pressed");                     // The "pressed" class gets removed after 100 milliseconds.
  }, 100);  
}

function playSound(name) {                     // A new function called playSound() that takes a single input parameter called name.
  let audio = new Audio("sounds/" + name + ".mp3");//The code we used to play sound in the nextSequence() function add to playSound().
  audio.play();
}

function startOver() {    // Inside this function, reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
