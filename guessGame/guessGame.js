var initialInput, guess, count = 0;

function hide(elements) {
	for(i = 0; i < elements.length; i++) {
		elements[i].style.visibility = "hidden";
	}
}

function show(elements) {
	for(i = 0; i < elements.length; i++) {
		elements[i].style.visibility = "visible";
	}
}

function startGame(button) {
	initialInput = document.getElementById("initialInput").value;
	
	hide(document.getElementsByClassName("start"));
	show(document.getElementsByClassName("guess"));
}

function getGuess(button) {
	count++;
	guess = document.getElementById("guessInput").value;
	if(parseInt(guess) == parseInt(initialInput)) {
		document.getElementById("result").innerHTML = "That's right! Guess counter: " + count;
	}
	else if(parseInt(guess) < parseInt(initialInput)) {
		document.getElementById("result").innerHTML = "Nope. That's too low. Try again.";
	}
	else {
		document.getElementById("result").innerHTML = "Nope. That's too high. Try again.";
	}
}

function restart(button) {
	count = 0;
	show(document.getElementsByClassName("start"));
	hide(document.getElementsByClassName("guess"));
	document.getElementById("result").innerHTML = "";
	document.getElementById("initialInput").value = "";
	document.getElementById("guessInput").value = "";
}

