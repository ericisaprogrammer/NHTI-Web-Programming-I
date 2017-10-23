"use strict";

// using a function contructor form to create an object
function TaskAtHandApp()
{
	var version = "v1.3",
		appStorage = new AppStorage("taskAtHand");

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
		loadTaskList();
		
		$("#undo").click(function() {
			undo();
		});
		
		$("#clear").click(function() {
			clearList();
		});
		
		setStatus("ready");
	};
	
	/* ****************** *
	 *  Task List methods *
	 * ****************** */
		//Something is entered into input
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
	
		//Event handler for entering something into input
	function addTaskElement(taskName)
	{
		var $task = $("#task-template .task").clone();
		$("span.task-name", $task).text(taskName);
		
		$("#task-list").append($task);
		
		$("button.delete", $task).click(function() {
			removeTask($task);
		});
		
		$("button.move-up", $task).click(function() {
			moveTask($task, true);
		});
		
		$("button.move-down", $task).click(function() {
			moveTask($task, false);
		});
		
		$("span.task-name", $task).click(function() {
			onEditTaskName($(this));
		});
		
		$("input.task-name", $task).change(function() {
			onChangeTaskName($(this));
		})
		.blur(function() {
			$(this).hide().siblings("span.task-name").show();
		});
		
		saveTaskList();
	}
	
		//Changes static text of a task item into editable text input
	function onEditTaskName($span)
	{
		$span.hide()
			 .siblings("input.task-name")
			 .show()
			 .val($span.text())
			 .show()
			 .focus();
		saveTaskList();
	}
	
		//Changes editable text task item into static text
	function onChangeTaskName($input)
	{
		$input.hide();
		var $span = $input.siblings("span.task-name");
		if($input.val())
		{
			$span.text($input.val());
		}
		$span.show();
		saveTaskList();
	}
	
		//Removes given $task item from list
	function removeTask($task)
	{
		$task.remove();
		saveTaskList();
	}
	
		//Moves given task item up or down in position
	function moveTask($task, moveUp)
	{
		if(moveUp)
			$task.insertBefore($task.prev());
		else
			$task.insertAfter($task.next());
		saveTaskList();
	}
	
		//Saves task list to local storage
	function saveTaskList()
	{
		var tasks = [];
		$("#task-list .task span.task-name").each(function() {
			tasks.push($(this).text());
		});
		appStorage.setValue("taskListBackup", appStorage.getValue("taskList"));
		appStorage.setValue("taskList", tasks);
		checkBackup();
	}
	
		//Gets list from memory and displays it
	function loadTaskList()
	{
		var tasks = appStorage.getValue("taskList");
		if(tasks)
		{
			for(var i in tasks)
				addTaskElement(tasks[i]);
		}
		checkBackup();
	}
	
		//Undoes previous action commited to list. Disables undo button.
	function undo() 
	{
		var tasks = appStorage.getValue("taskListBackup");
		if(tasks)
		{
			clearList();
			for(var i in tasks)
				addTaskElement(tasks[i]);
			saveTaskList();
			$("#undo").prop("disabled", true);
		}
	}
	
		//Removes all tasks from current displayed list
	function clearList()
	{
		$("#task-list").empty();
		checkBackup();
	}
	
		//Determines if there is a backup to use. If so, enables Undo button
	function checkBackup()
	{
		var tasks = appStorage.getValue("taskListBackup");
		if(tasks)
			$("#undo").prop("disabled", false);
	}
} // end TaskAtHand

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
