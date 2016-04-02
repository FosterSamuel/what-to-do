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

function generateTaskID() {
    'use strict';
    return random4() + random4();
}

function random4() {
    'use strict';
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

function updateTaskPriority(taskHTMLObject) {
    var newPriority = parseInt(taskHTMLObject.value);
    
    var specificTaskID = taskHTMLObject.getAttribute('data-task');
    var specificTask = getTaskByID(specificTaskID, tasks);
    
    var specificTaskPriorityHTML = taskHTMLObject.parentNode;
    specificTaskPriorityHTML.setAttribute('data-priority', generatePriorityString(newPriority).toLowerCase());
    
    specificTask.priority = newPriority;
    
    if (tasksOnDisplay[0].id === specificTaskID) {
       updateDisplayedTask(specificTask); 
    }
}

function updateTaskName(specificTask, newName) {
    specificTask.name = newName;
    if (specificTask.id === tasksOnDisplay[0].id) {
       updateDisplayedTask(specificTask); 
    }
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
    var baseWeight = taskList[0].weight;
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
function createTask(taskList, taskName, taskTimeNeeded, taskPriority) {
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
    console.log(taskList);
}

// TASK PICKING
function whatToDo(taskList, timeGiven) {
    'use strict';
    
    var possibleTasks = [];
    
    generateTimeDifference(taskList, timeGiven);
    possibleTasks = getPossibleTasks(taskList.length, taskList);
    
    generateTaskWeight(possibleTasks);
    
    var bestTasks = getBestTasks(possibleTasks);
    
    if (bestTasks.length > 1) {
        bestTasks.sort(byProperty(taskWeight(), SORT_PRIORITY()));
    }
    
    return bestTasks;
}