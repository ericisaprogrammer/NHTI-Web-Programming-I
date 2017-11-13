function Task(name)
{
  this.name = name;
  this.id = Task.nextTaskId++;
  this.created = new Date();
  this.priority = Task.priorities.normal;
  this.status = Task.statuses.notStarted;
  this.pctComplete = 0;
  this.startDate = null;
  this.dueDate = null;
}

Task.nextTaskId = 1;
Task.priorities = {
  none: 0,
  low: 1,
  normal: 2,
  high: 3
};
Task.statuses = {
  none: 0,
  notStarted: 1,
  started: 2,
  completed: 3
};

function TaskList (tasks)
{
  tasks = tasks || [];
  this.getTasks = function()
  {
    return tasks;
  };

  this.addTask = function(task)
  {
    tasks.push(task);
    return this;
  };

  this.removeTask = function(taskId)
  {
    var i = getTaskIndex(taskId);
    if(i >= 0)
    {
      var task = tasks[i];
      tasks.splice(i, 1);
      return task;
    }
    return null;
  }

  this.getTask = function(taskId)
  {
    var index = getTaskIndex(taskId);
    return(index >= 0 ? tasks[index] : null);
  }

  this.moveTaskUp = function(taskId)
  {
    var index = getTaskIndex(taskId);
    if(index != 0)
    {
      var temp = tasks[index - 1];
      tasks[index - 1] = tasks[index];
      tasks[index] = temp;
    }
  }

  this.moveTaskDown = function(taskId)
  {
    var index = getTaskIndex(taskId);
    if(index != tasks.length - 1)
    {
      var temp = tasks[index + 1];
      tasks[index + 1] = tasks[index];
      tasks[index] = temp;
    }
  }

  this.each = function(callback)
  {
    for(var i in tasks)
    {
      callback(tasks[i]);
    }
  }
  function getTaskIndex(taskId)
  {
    for (var i = 0; i < tasks.length; i++)
    {
      if(tasks[i].id == taskId)
      {
        return i;
      }
    }
    return -1;
  }

}
