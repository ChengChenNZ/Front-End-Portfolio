//simon game for FCC project,
// Using the OOP paradiam to create this project 

// game Object

var game = {
	playerTurn: false,
	sequence: [],
	sequenceRepeat: false,
	winSequence: ["green","red","blue","yellow"],
	seqCount : 0,
	strict: false,
	audio: {}
};

//global variables
var clickedColor,
	timer,
	winnningSequence = 20;

// Sound Objects!
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

//play and stop audio function
game.playAudio = function(id){
	switch(id){
		case "green":
			game.audio.green.paly();
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

game.stopAudio = function(id){
	switch(id){
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
}

//add swquence function
game.addSequence = function(){
	var randomNum = math.floor(Math.random() * 4);
	switch (randomNum) {
		case 0:
			game.sequence.push("green");
			break;
		case 1:
			game.sequence.push("red");
			break
		case 2:
			game.sequence.push("yellow");
			break
		case 3:
			game.sequence.push("blue");
			break;
	}
};

game.playSequence = function(boolean){
	//add a sequence if boolean true
	if (boolean) game.addSequence();

	clearTimeout(timer);
	game.seqCount = 0;
	game.sequenceRepeat = false;
	$(".score-digit").html(game.sequence.length);

	//using a setTimeOut to create a delay in the for loop
	(function myloop(i) {
	$("#" + game.sequence[i]).addClass(game.sequence[i] + "on");
	game.playAudio(game.sequence[i]);

	//set a 0.5s second delay
	setTimeOut(function(){
		$("#" + game.sequence[i]).removeClass(game.sequence[i] + "on");
		game.stopAudio(game.sequence[i]);

		// set another 0.5 second delay before reiterating the function
		timer = setTimeOut(function(){
			i++;
			if (i < game.sequence.length) myloop(i);
			else {
				game.playerTurn = turn;
				$(".corner").css("cursor","pointer");
			}
		}, 500);
	}, 500);	
	})(0);
};

//player did not click the right sequence function
game.wrong = function(){
	game.sequenceRepeat = ture;//set variable to repeat sequence 
	//visual cue to show player that they tied to enter a wrong sequence 
	$("#green").addClass("greenOn");
	$("#red").addClass("redOn");
	$("#yellow").addClass("yellowOn");
	$("blue").addClass("blueOn");
	$(".score-digit").html("!!");
	game.audio.wrong.play();

	setTimeOut(function(){
		$("#green").removeClass("greenOn");
		$("#red").removeClass("redOn");
		$("#yellow").removeClass("yellowOn");
		$("#blue").removeClass("blueOn");

		//reset the game if the game is on strict mode
		if(game.strict){
			game.reset();
			game.playerTurn = false;
			$(".brand").removeClass("hidden");
	      $(".play").removeClass("hidden");
	      $(".stop").addClass("hidden");
	      $(".score").addClass("hidden");
	      $(".inner-circle").css("border", "10px solid #1F2230");
		}

		//otherwise reprat the sequence 
		if (game.sequenceRepeat) {
			clearTimeout(timer);
      		game.playerTurn = false;
      		$(".corner").css("cursor", "default");
      		timer = setTimeout(function() {
       		 game.playSequence(false);
      		}, 500);
		}
	}, 500);
}

//Winning function 

game.win = function(){
	$(".score-digit").html("WIN");
	game.audio.victory.play();
	(function myloop(i){
		$("#" + game.winSequence[i]).addClass(game.winSequence[i] + "on");
		game.playAudio(game.winSequence[i]);

		setTimeout(function() {
      	$("#" + game.winSequence[i]).removeClass(game.winSequence[i] + "On");
      	game.stopAudio(game.winSequence[i]);

		timer = setTimeout(function(){
			i++;
			if(i < game.winSequence.length) myloop(i);
			else {
				game.reset();
				game.playerTurn = false;
				$(".brand").removeClass("hidden");
				$(".play").removeClass("hidden");
				$("stop").addClass("hidden");
				$("score").addClass("hidden");
				$(".inner-circle").css("border", "10px solid #1F2230");
				}
			}, 500);
		}, 500);
	})(0);
};

//reset the game

game.reset = function(){
	clearTimeout(timer);
	game.sequence = [];
	game.seqCount = 0;
	game.sequenceRepeat = false;
};


//start game function
game.start = function(){
	game.reset();
	gmae.playSequence(ture);
};


/**
DOCUMENT READY FUNCTION
**/

