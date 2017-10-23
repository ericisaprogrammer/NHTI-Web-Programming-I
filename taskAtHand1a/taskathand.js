"use strict";

// using a function contructor form to create an object
function TaskAtHandApp()
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
		$("#new-task-name").keypress(function(e) {
			if(e.which == 13) //13 is the ASCII code for enter
			{
				addTask();
				return false;
			}
		});
		
		$("#app>header").append(version);
		setStatus("ready");
	};
	
	function addTask() 
	{
		var taskName = $("#new-task-name").val();
		if(taskName) //Checks for value in text input
		{
			addTaskElement(taskName);
				//Resets value in text input
			$("#new-task-name").val("").focus();
		}		
	}
	
	function addTaskElement(taskName)
	{
		var $task = $("<li></li>");
		var $delete = $("<button class='delete'>X</button>");
		var $moveUp = $("<button class='move-up'>^</button>");
		var $moveDown = $("<button class='move-down'>v</button>");
		
		$task.append($delete)
			 .append($moveUp)
			 .append($moveDown)
			 .append("<span class='task-name'>" + taskName + "</span>");
			 
		$delete.click(function() { $task.remove(); });
		$moveUp.click(function() { $task.insertBefore($task.prev()); });
		$moveDown.click(function() { $task.insertAfter($task.next()); });
		
		$("#task-list").append($task);
	}
} // end MyApp

/* 	JQuery's shorthand for the document ready event handler
		could be written: $(document).ready(handler);

		When this page loads, we'll create a global variable
		named "app" by attaching it to the "window" object
		(part of the BOM - Browser Object Model)
*/
$(function() {
	window.app = new TaskAtHandApp();
	window.app.start();
});
