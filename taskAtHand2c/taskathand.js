"use strict";

// using a function contructor form to create an object
function TaskAtHandApp()
{
	var version = "v2.1",
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

		$task.click(function() { onSelectTask($task) });
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
		appStorage.setValue("taskList", tasks);
	}

	function loadTaskList()
	{
		var tasks = appStorage.getValue("taskList");
		if(tasks)
		{
			for(var i in tasks)
				addTaskElement(tasks[i]);
		}
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
		if (theme == "doggo")
		{
				//Makes background random doggo .gif
			var num = Math.floor(Math.random() * 10) + 1;
				//Changes value of custom .css property
			$(":root").css("--filename", "url(../images/" + theme + num + ".gif)");
		}
		if (theme == "wat")
		{
			var num = Math.floor(Math.random() * 180) - 90;
			if(num < 0)
			{
				num = 360 + num;
			}
				//Changes value of custom .css property
			$(":root").css("--transformAngle", "rotate(" + num + "deg)");
		}
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
