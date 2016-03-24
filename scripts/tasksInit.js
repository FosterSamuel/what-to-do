var tasks = [];
var tasksToDo = [];

var timeAlloted = 1;

var SORT_PRIORITY = function () {
    'use strict';
    return lowest();
};

// createTask(taskList, name, time, priority);

createTask(tasks, "Contribute on github", 0.5, 1);
createTask(tasks, "Work on scholarship video", 2, 1);
createTask(tasks, "Write paper", 4, 3);
createTask(tasks, "Make bed", 0.1, 2);
createTask(tasks, "Organize your coding assets", 1, 2);
createTask(tasks, "Learn all of JavaScript.", 200, 2);