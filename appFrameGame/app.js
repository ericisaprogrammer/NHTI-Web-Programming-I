"use strict";
var goal = "NaN", guess = "NaN", count = 0;

// using a function contructor form to create an object
function MyApp()
{
	var version = "v1.0";

	// creating a private function
	function setStatus(message)
	{
		$("#app>footer").text(message);
	}

	// creating a public function
	this.start = function()
	{
		$("#app>header").append(version);
		setStatus("ready");
		
		$('#enter').click(onEnter);
		$('#reset').click(onReset);
	};
	
	function onEnter() {
		if(!$('#enter').hasClass('guess')) {
			getGoal();
		}
		else {
			getGuess();
		}
	}

	function onReset() {
		$('#enter').addClass('enter');
		$('#enter').removeClass('guess');
		$('.guess').toggleClass('hidden');
		
		$('#result').html("");
		$('#userInput').val("");
		$('label').html("Number to be guessed:");
		$('#enter').show();
		setStatus("ready");
		goal = "";
		count = 0;
	}

	function getGoal() {
		setStatus("ready");
		goal = Number($('#userInput').val());
		if((goal || goal == 0) && $('#userInput').val() != "") {
			$('.guess').toggleClass('hidden');
			$('#enter').addClass('guess');
			$('#enter').removeClass('enter')
			
			$('label').html("Enter your guess:");
			$('#userInput').val("");
		}
		else 
			setStatus("Please enter a number.");
	}

	function getGuess() {
		setStatus('ready');
		guess = Number($('#userInput').val());
		if((guess || guess == 0) && $('#userInput').val() != "") {
			count++;
			checkGuess();
		}
		else 
			setStatus("Please enter a number.");
	}
	
	function checkGuess() {
		if(guess > goal){
			$('#result').html('That guess is too high. Try again.');
		}
		else if(guess < goal) {
			$('#result').html('That guess is too low. Try again.');
		}
		else {
			$('#result').html('Winner!');
			$('#enter').hide();
			setStatus("Congratulations! You've won! And it only took you " + count + " guesses. Great job!");
		}
	}
} // end MyApp



/* 	JQuery's shorthand for the document ready event handler
		could be written: $(document).ready(handler);

		When this page loads, we'll create a global variable
		named "app" by attaching it to the "window" object
		(part of the BOM - Browser Object Model)
*/

$(function() {
	window.app = new MyApp();
	window.app.start();
});