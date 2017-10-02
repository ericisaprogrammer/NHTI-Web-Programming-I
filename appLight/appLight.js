function flip(button) {
	if(button.classList.contains("on")) {
		button.className = "button off";
		document.body.style.backgroundColor = "black";
		document.getElementById("div1").innerHTML = " OFF ";
	}
	else {
		button.className = "button on";
		document.body.style.backgroundColor = "white";
		document.getElementById("div1").innerHTML = " ON ";
	}
}