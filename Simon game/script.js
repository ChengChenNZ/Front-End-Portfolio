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

}


