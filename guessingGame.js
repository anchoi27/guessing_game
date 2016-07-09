(function () { 
	var playersGuess;
	var winningNumber;
	var players = 0;
	var guessArray = [];


	/* **** Guessing Game Functions **** */

	// Generate the Winning Number

	function generateWinningNumber(){
		return Math.floor((Math.random() * 100) + 1);
	};

	// Fetch the Players Guess
	winningNumber = generateWinningNumber();

	function playersGuessSubmission(event){
		event.preventDefault();
		if (players < 5){
			playersGuess = +$('#userinput').val();
			$('#userinput').val('');
			checkGuess();
		};
	};

	// Determine if the next guess should be a lower or higher number

	function lowerOrHigher(){
		if (playersGuess > winningNumber){
			if ((playersGuess - winningNumber) > 20) {
				return 'Your Guess is higher and more than 20 digits away from the answer!';
			}else {
				return 'Your Guess is higher than the answer!';
			} 
		} else if(playersGuess < winningNumber){
			if ((winningNumber - playersGuess) > 20) {
				return 'Your Guess is lower and more than 20 digits away from the answer!';
			}else {
				return 'Your Guess is lower than the answer!';
			} 
		}
	}	

	function countRemaining(){
		var remain = (5 - players);
		if (remain > 0){
			alert('Also You have '+remain+' guesses left!!!'); //used 'alert' here in order to remind the user. (all the other messages are shown using DOM.)
		} else{
			$('.loser').show();
			$('.loser').append('<p class="answer">The answer was '+winningNumber+'!</p>');
		}
	}



	function guessMessage(){
		var string;
		if (guessArray.indexOf(playersGuess) != -1){
			string = $('.please').append($('<p class="result">Try Again! '+lowerOrHigher()+'</p>'));
		} else{
			string = $('.please').append($('<p class="result">You have submitted a duplicate number!</p>'));
		}
		return string;
	}
	// Check if the Player's Guess is the winning number 

	function checkGuess(){
		$('.result').remove();
		if (playersGuess === winningNumber){
			players++;
			$('.please').append($('<p class="result">You Won!</p>'));
			$('.winner').show();
		} else if (guessArray.indexOf(playersGuess) != -1){ //returns -1 if it's already in guessArray
			$('.please').append($('<p class="result">You have submitted a duplicate number!</p>'));
		} else{
			players++;
			guessArray.push(playersGuess);
			guessMessage();
			countRemaining();
		}
	}


	// Create a provide hint button that provides additional clues to the "Player"

	function provideHint(event){
		event.preventDefault();
		$('.hintnumber').remove();
		var hintNumber;
		for (var i = winningNumber - 1; i >= 1 ; i--){
			if (winningNumber % i === 0){
				hintNumber = i;
				break;
			}
		}
		$('.buttons').append($('<p class="hintnumber">It is a multiple of '+hintNumber+'!</p>'));
	}

	// Allow the "Player" to Play Again

	function playAgain(event){
		event.preventDefault();
		playersGuess = null;
		winningNumber = generateWinningNumber();
		players = 0;
		guessArray = [];
		$('.loser').hide();
		$('.winner').hide();
		$('.hintnumber').remove();
		$('.result').remove();
		$('.winner').hide();
		$('.loser').hide();
		$('.answer').remove();
		alert('play again?');
	}


/* **** Event Listeners/Handlers ****  */

	$(document).ready(function() {
		$('#usersubmit').on('click', playersGuessSubmission);
		$('#hint').on('click', provideHint);
		$('#playagain').on('click', playAgain);
		$('.user').keypress(function(e) {
    		if (e.which == 13) { // 13 = enter
    			playersGuessSubmission(event);
    		}
 		});
	});


}());