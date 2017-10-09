var initialInput = "";
var guess = "";
var count = 0;

function startGame(button) {
	initialInput = document.getElementById("initialInput").value;
	
	hide(document.getElementsByClassName("start"));
	show(document.getElementsByClassName("guess"));
	
	document.getElementById("result").innerHTML = initialInput;
}

function guess(button) {
	alert("test");
	//count++;
	//initialInput = document.getElementById("guessInput").value;
	//document.getElementById("result").innerHTML = count;
}

function restart(button) {
	count = 0;
	show(document.getElementsByClassName("start"));
	hide(document.getElementsByClassName("guess"));
	document.getElementById("result").innerHTML = "";
	document.getElementById("initialInput").value = "";
	document.getElementById("guessInput").value = "";
}

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