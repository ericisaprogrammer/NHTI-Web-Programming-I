"use strict";

// using a function contructor form to create an object
function TaskAtHandApp()
{
	var version = "v3.2",
		appStorage = new AppStorage("taskAtHand"),
	 	taskList = new TaskList(),
	 	timeoutId = 0;

	// creating a private function
	function setStatus(msg, noFade)
	{
		$("#app>footer").text(msg).show();
		if(!noFade)
		{
			$("#app>footer").fadeOut(1000);
		}
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

		$("#theme").change(onChangeTheme);
		loadTheme();

		$("#app>header").append(version);
		loadTaskList();
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
			var task = new Task(taskName);
			taskList.addTask(task);
			appStorage.setValue("nextTaskId", Task.nextTaskId);
			addTaskElement(task);
			saveTaskList();
				//Resets value in text input
			$("#new-task-name").val("").focus();
		}
	}

		//Event handler for entering something into input
	function addTaskElement(task)
	{
		var $task = $("#task-template .task").clone();
		$task.data("task-id", task.id);
		$("span.task-name", $task).text(task.name);

		$("#task-list").append($task);

		$("button.delete", $task).click(function() {
			removeTask($task, task);
		});

		$("button.move-up", $task).click(function() {
			moveTask($task, true, task);
		});

		$("button.move-down", $task).click(function() {
			moveTask($task, false, task);
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

		$task.click(function() { onSelectTask($task) });
		saveTaskList();

		$("button.toggle-details", $task).click(function() {
			toggleDetails($task);
		});

		$(".details input, .details select", $task).each(function() {
			var $input = $(this);
			var fieldName = $input.data("field");
			$input.val(task[fieldName]);
		});

		$(".details input, .details select", $task).change(function() {
			onChangeTaskDetails(task.id, $(this));
		});
	}

	function onChangeTaskDetails(taskId, $input)
	{
		var task = taskList.getTask(taskId);
		if(task)
		{
			var fieldName = $input.data("field");
			task[fieldName] = $input.val();
			saveTaskList();
		}
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
	function removeTask($task, task)
	{
		$task.remove();
		taskList.removeTask(task.id);
		saveTaskList();
	}

		//Moves given task item up or down in position
	function moveTask($task, moveUp, task)
	{
		if(moveUp)
		{
			$task.insertBefore($task.prev());
			taskList.moveTaskUp(task.id);
		}
		else
		{
			$task.insertAfter($task.next());
			taskList.moveTaskDown(task.id);
		}
		saveTaskList();
	}

		//Saves task list to local storage
	function saveTaskList()
	{
		if(timeoutId) clearTimeout(timeoutId);
		setStatus("saving changes...", true);
		timeoutId = setTimeout(function()
		{
			appStorage.setValue("taskList", taskList.getTasks());
			timeoutId = 0;
			setStatus("changes saved.");
		},
		2000);
	}

	function loadTaskList()
	{
		var tasks = appStorage.getValue("taskList");
		taskList = new TaskList(tasks);
		rebuildTaskList();
	}

	function rebuildTaskList()
	{
		$("#task-list").empty();
		taskList.each(function(task)
		{
			addTaskElement(task);
		});
	}

	function onSelectTask($task)
	{
		if($task)
		{
			//Unselect other tasks
			$task.siblings(".selected").removeClass("selected");
			//Select this class
			$task.addClass("selected");
		}
	}

	function setTheme(theme)
	{
		$("#theme-style").attr("href", "themes/" + theme + ".css");
	}

	function loadTheme()
	{
		var theme = appStorage.getValue("theme");
		if(theme)
		{
			setTheme(theme);
			$("#theme>option[value=" + theme + "]")
				.attr("selected", "selected");
		}
	}

	function onChangeTheme()
	{
		var theme = $("#theme>option").filter(":selected").val();
		setTheme(theme);
		appStorage.setValue("theme", theme);
	}

	function toggleDetails($task)
	{
		$(".details", $task).slideToggle();
		$("button.toggle-details", $task).toggleClass("expanded");
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
