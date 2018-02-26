//simon game for FCC project,
// Using the OOP paradiam to create this project 

// game Object

var game = {
  playerTurn: false, // becomes true when it's the player's turn
  sequence: [], // array of sequence
  sequenceRepeat: false,
  winSequence: ["green", "red", "blue", "yellow"], // array of sequence to play when winning!
  seqCount: 0, // count (or index) of sequence
  strict: false, // strict mode
  audio: {}
};

// set some global variables, for clicked color, the delay timer and the sequence required to win
var clickedColor,
  timer,
  winningSequence = 20;

// Sound objects!
game.audio.green = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
);
game.audio.red = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
);
game.audio.yellow = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
);
game.audio.blue = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
);
game.audio.wrong = new Audio("http://soundjax.com/reddo/47434%5EBUZZER.mp3");
game.audio.victory = new Audio(
  "https://dl.dropbox.com/s/v0nc608rz7i3gsw/Kids%20Cheering-SoundBible.com-681813822.mp3?dl=0"
);

// PLAYING (AND STOPPING) AUDIO FUNCTIONS (as objects, of course)
game.playAudio = function(id) {
  switch (id) {
    case "green":
      game.audio.green.play();
      break;
    case "red":
      game.audio.red.play();
      break;
    case "yellow":
      game.audio.yellow.play();
      break;
    case "blue":
      game.audio.blue.play();
      break;
  }
};

game.stopAudio = function(id) {
  switch (id) {
    case "green":
      game.audio.green.pause();
      game.audio.green.currentTime = 0;
      break;
    case "red":
      game.audio.red.pause();
      game.audio.red.currentTime = 0;
      break;
    case "yellow":
      game.audio.yellow.pause();
      game.audio.yellow.currentTime = 0;
      break;
    case "blue":
      game.audio.blue.pause();
      game.audio.blue.currentTime = 0;
      break;
  }
};

// add sequence function
game.addSequence = function() {
  var randomNum = Math.floor(Math.random() * 4);
  switch (randomNum) {
    case 0:
      game.sequence.push("green");
      break;
    case 1:
      game.sequence.push("red");
      break;
    case 2:
      game.sequence.push("yellow");
      break;
    case 3:
      game.sequence.push("blue");
      break;
  }
};

// Game Play Sequence (when computer shows the sequence)
// Use boolean argument for when sequence is the first time or not
// (it will be false if it's a repeat from an error)
game.playSequence = function(boolean) {
  // add a sequence if boolean true
  if (boolean) game.addSequence();

  clearTimeout(timer);
  game.seqCount = 0;
  game.sequenceRepeat = false; // variable used to track a repeat (after an error)
  $(".score-digit").html(game.sequence.length);

  // using a setTimeOut to create a delay in the for loop
  // see: https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop
  (function myLoop(i) {
    $("#" + game.sequence[i]).addClass(game.sequence[i] + "On");
    game.playAudio(game.sequence[i]);

    // set a 0.5 second delay
    setTimeout(function() {
      $("#" + game.sequence[i]).removeClass(game.sequence[i] + "On");
      game.stopAudio(game.sequence[i]);

      // set another 0.5 second delay before reiterating the function
      timer = setTimeout(function() {
        i++;
        if (i < game.sequence.length) myLoop(i);
        else {
          game.playerTurn = true;
          $(".corner").css("cursor", "pointer");
        }
      }, 500);
    }, 500); // using 1000ms (1s) in total as delay
  })(0);
};

// Player did not click the right sequence function
game.wrong = function() {
  game.sequenceRepeat = true; // set variable to repeat sequence

  // visual cue to show player that they tried to enter a wrong sequence
  $("#green").addClass("greenOn");
  $("#red").addClass("redOn");
  $("#yellow").addClass("yellowOn");
  $("#blue").addClass("blueOn");
  $(".score-digit").html("!!");
  game.audio.wrong.play();

  setTimeout(function() {
    $("#green").removeClass("greenOn");
    $("#red").removeClass("redOn");
    $("#yellow").removeClass("yellowOn");
    $("#blue").removeClass("blueOn");

    // reset the game if the game is on strict mode
    if (game.strict) {
      game.reset();
      game.playerTurn = false;
      $(".brand").removeClass("hidden");
      $(".play").removeClass("hidden");
      $(".stop").addClass("hidden");
      $(".score").addClass("hidden");
      $(".inner-circle").css("border", "10px solid #1F2230");
    }

    // otherwise, repeat the sequence
    if (game.sequenceRepeat) {
      clearTimeout(timer);
      game.playerTurn = false;
      $(".corner").css("cursor", "default");
      timer = setTimeout(function() {
        game.playSequence(false);
      }, 500);
    }
  }, 500);
};

// WINNING FUNCTION (WOOOOOO!!)
game.win = function() {
  $(".score-digit").html("WIN!");
  game.audio.victory.play();

  (function myLoop(i) {
    $("#" + game.winSequence[i]).addClass(game.winSequence[i] + "On");
    game.playAudio(game.winSequence[i]);

    setTimeout(function() {
      $("#" + game.winSequence[i]).removeClass(game.winSequence[i] + "On");
      game.stopAudio(game.winSequence[i]);

      timer = setTimeout(function() {
        i++;
        if (i < game.winSequence.length) myLoop(i);
        else {
          game.reset();
          game.playerTurn = false;
          $(".brand").removeClass("hidden");
          $(".play").removeClass("hidden");
          $(".stop").addClass("hidden");
          $(".score").addClass("hidden");
          $(".inner-circle").css("border", "10px solid #1F2230");
        }
      }, 500);
    }, 500); // using 1000ms (1s) in total as timer
  })(0);
};

// Reset Game function (i.e. when STOP button is pressed)
game.reset = function() {
  clearTimeout(timer);
  game.sequence = [];
  game.seqCount = 0;
  game.sequenceRepeat = false;
};

// Start Game function
game.start = function() {
  game.reset();
  game.playSequence(true);
};

// =======================
// DOCUMENT READY FUNCTION
// =======================
$(document).ready(function() {
  // when clicking the wheel yo!
  $(document).mouseup(function() {
    // only works when it's the player's turn
    if (game.playerTurn) {
      $("#" + clickedColor).removeClass(clickedColor + "On");
      game.stopAudio(clickedColor);
      // check if this is the last move of the sequence
      if (game.seqCount == game.sequence.length) {
        // check if this is the WINNING move of the sequence
        if (game.seqCount == winningSequence) {
          game.win();
        } else {
          // show new (longer) sequence after half a second
          game.playerTurn = false;
          $(".corner").css("cursor", "default");
          setTimeout(function() {
            game.playSequence(true);
          }, 500);
        }
      }
    }
  });

  $(".corner").mousedown(function() {
    if (game.playerTurn) {
      clearTimeout(timer);
      // if click correct color
      if (game.sequence[game.seqCount] == this.id) {
        clickedColor = this.id;
        $(this).addClass(clickedColor + "On");
        game.playAudio(clickedColor);
        // increment the seq count
        game.seqCount++;
        // if click wrong color
      } else {
        game.wrong();
      }
    }
  });

  // create a jQuery event for main button
  $(".play-button").on("click", function() {
    $(".brand").addClass("hidden");
    $(".play").addClass("hidden");
    $(".stop").removeClass("hidden");
    $(".score").removeClass("hidden");
    $(".inner-circle").css("border", "none");

    game.start();
  });

  //jQuery for stop button
  $(".stop-button").on("click", function() {
    clearTimeout(timer);
    $(".brand").removeClass("hidden");
    $(".play").removeClass("hidden");
    $(".stop").addClass("hidden");
    $(".score").addClass("hidden");
    $(".inner-circle").css("border", "10px solid #1F2230");
  });

  // Strict button
  var checkBox = $("#checkbox");
  $("input").on("click", function() {
    if (checkBox.is(":checked")) {
      game.strict = true;
    } else {
      game.strict = false;
    }
    // console.log(game.strict);
  });
}); // document ready function

