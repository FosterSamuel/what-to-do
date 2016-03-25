var tasks = [];
var tasksToDo = [];

var timeAlloted = 1;

var SORT_PRIORITY = function () {
    'use strict';
    return lowest();
};

// createTask(taskList, name, time, priority);

createTask(tasks, "Code left-pad", 0.01, 0);
createTask(tasks, "Make bed", 0.1, 2);
createTask(tasks, "Sketch website idea", .5, 0);
createTask(tasks, "Contribute on github", 1, 0);
createTask(tasks, "Work on scholarships", 2, 2);
createTask(tasks, "Organize your coding assets", 3, 1);
createTask(tasks, "Write English paper", 4, 2);
createTask(tasks, "Build a JavaScript framework", 5, 2);
createTask(tasks, "Call your parents", 6, 2);
createTask(tasks, "Clean entire house", 7, 2);
createTask(tasks, "Make good use of your job's time", 8, 2);
createTask(tasks, "Learn all of JavaScript.", 200, 3);