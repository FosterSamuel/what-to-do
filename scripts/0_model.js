// TASK SORTING //
function lowest() {
    'use strict';
    return "lowest";
}

function highest() {
    'use strict';
    return "highest";
}

function lastGivenTime() {
    'use strict';
    return "lastGivenTime";
}

function taskWeight() {
    'use strict';
    return "weight";
}

function taskPriority() {
    'use strict';
    return "priority";
}

function timeDifference() {
    'use strict';
    return "timeDifference";
}

function timeNeeded() {
    'use strict';
    return "timeNeeded";
}

function byProperty(prop, sortingOrder) {
    'use strict';
    if (sortingOrder === lowest()) {
        return function (a, b) {
            return (a[prop] - b[prop]);
        };
    } else if (sortingOrder === highest()) {
        return function (a, b) {
            return (b[prop] - a[prop]);
        };
    } else {
        return function (a, b) {
            return false;
        };
    }
}

// TASK PROPERTIES
function generateTimeDifference(taskList, timeGiven) {
    'use strict';
    
    return taskList.map(function (specificTask) {
        if (specificTask.hasOwnProperty(lastGivenTime())) {
            if (specificTask[lastGivenTime()] === timeGiven) {
                return specificTask;
            } else {
                specificTask[lastGivenTime()] = timeGiven;
                specificTask.timeDifference = timeGiven - specificTask.timeNeeded;
                return specificTask;
            }
        } else {
            specificTask[lastGivenTime()] = timeGiven;
            specificTask.timeDifference = timeGiven - specificTask.timeNeeded;
            return specificTask;
        }
    });
}

function generateTaskWeight(taskList) {
    'use strict';
    
    return taskList.map(function (specificTask) {
        specificTask.weight = specificTask.priority - specificTask.timeDifference;
        return specificTask;
    });
}

function random4() {
    'use strict';
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

function generateTaskID() {
    'use strict';
    return random4() + random4();
}

function changeTaskPriority(specificTask, newPriority) {
    'use strict';
    specificTask.priority = newPriority;
}

function changeTaskName(specificTask, newName) {
    specificTask.name = newName;
}

function changeTaskTime(specificTask, newTimeNeeded) {
    specificTask.timeNeeded = newTimeNeeded;
    specificTask[lastGivenTime()] = newTimeNeeded;
}

// TASK FILTERING
function getPossibleTasks(amount, taskList) {
    'use strict';
    if (amount > 0) {
        return taskList.filter(function (specificTask) {
            return specificTask.timeDifference >= 0;
        }).splice(0, amount);
    } else {
        return taskList;
    }
}

function getBestTasks(taskList) {
    'use strict';
    
    taskList.sort(byProperty(taskWeight(), highest()));
    
    var bestTasks = [];
    var baseWeight = taskList[0].weight || 1;
    var escapeTrigger = false;
    
    bestTasks.push(taskList[0]);
    
    taskList.forEach(function (specificTask, taskIndex) {
        if (taskIndex > 0 && !escapeTrigger) {
            if (specificTask.weight === baseWeight) {
                bestTasks.push(specificTask);
            } else {
                escapeTrigger = true;
            }
        }
    });
    
    
    return bestTasks;
}

function getTaskByID(taskID, taskList) {
    'use strict';
    return taskList.filter(function (obj) {
        return obj.id === taskID;
    })[0];
}

// TASK LIFE
function addTask(taskList, taskName, taskTimeNeeded, taskPriority) {
    'use strict';
    taskList.push({"id": generateTaskID(), "name": taskName, "timeNeeded": taskTimeNeeded, "priority": taskPriority});
}

function deleteTask(taskList, taskID) {
    var indexOf = 0;
    var specificTaskIndex = taskList.filter(function (obj, index) {
        if (obj.id === taskID) {
            indexOf = index;
            return true;
        }
    });
    
    taskList.splice(indexOf, 1)
}

// TASK PICKING
function whatToDo(taskList, timeGiven) {
    'use strict';
    
    var possibleTasks = [];
    var nullTask = [];
    addTask(nullTask, "_#_!@NOTPOSSIBLE@!_#__", 1, 1);
            
    generateTimeDifference(taskList, timeGiven);
    possibleTasks = getPossibleTasks(taskList.length, taskList);
    
    if(possibleTasks.length < 1 ) {
        return nullTask;
    } else {
        generateTaskWeight(possibleTasks);

        var bestTasks = getBestTasks(possibleTasks);

        if (bestTasks.length > 1) {
            bestTasks.sort(byProperty(taskWeight(), SORT_PRIORITY()));
        }

        return bestTasks;
    }
}

var masterTaskList = [];
var displayedTasks = [];
var timeAlloted = 1;

var SORT_PRIORITY = function () {
    'use strict';
    return lowest();
};

// addTask(taskList, name, time, priority);
addTask(masterTaskList, "Code left-pad", 0.1, 1);
addTask(masterTaskList, "Make bed", 0.1, 1);
addTask(masterTaskList, "Sketch website idea", .5, 1);
addTask(masterTaskList, "Contribute on Github", 1, 1);
addTask(masterTaskList, "Work on scholarships", 2, 2);
addTask(masterTaskList, "Back-up your data", 2, 3);
addTask(masterTaskList, "Organize your programming assets", 2, 1);
addTask(masterTaskList, "Write English paper", 4, 2);
addTask(masterTaskList, "Build a JavaScript framework", 6, 1);
addTask(masterTaskList, "Call your parents", 6, 1);
addTask(masterTaskList, "Clean entire house", 6, 2);
addTask(masterTaskList, "Make good use of your job's time", 8, 2);
addTask(masterTaskList, "Learn all of JavaScript", 200, 3);