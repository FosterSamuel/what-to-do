var tasks = [];
var tasksToDo = [];

var timeAlloted = 1;

var SORT_PRIORITY = function () {
    'use strict';
    return lowest();
};

// createTask(taskList, name, time, priority);

createTask(tasks, "Code left-pad", 0.1, 1);
createTask(tasks, "Make bed", 0.1, 1);
createTask(tasks, "Sketch website idea", .5, 1);
createTask(tasks, "Contribute on Github", 1, 1);
createTask(tasks, "Work on scholarships", 2, 2);
createTask(tasks, "Back-up your data", 2, 3);
createTask(tasks, "Organize your programming assets", 2, 1);
createTask(tasks, "Write English paper", 4, 2);
createTask(tasks, "Build a JavaScript framework", 6, 1);
createTask(tasks, "Call your parents", 6, 1);
createTask(tasks, "Clean entire house", 6, 2);
createTask(tasks, "Make good use of your job's time", 8, 2);
createTask(tasks, "Learn all of JavaScript", 200, 3);