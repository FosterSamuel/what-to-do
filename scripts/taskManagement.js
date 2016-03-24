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

function byProperty(prop, sortingOrder) {
    'use strict';
    if (sortingOrder === lowest()) {
        return function (a, b) {
            return a[prop] > b[prop];
        };
    } else if (sortingOrder === highest()) {
        return function (a, b) {
            return a[prop] < b[prop];
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
    var bestTasks = [];
       
    taskList.sort(byProperty(taskWeight(), highest()));
    var baseWeight = taskList[0].weight;
    
    taskList.sort(byProperty(taskPriority(), highest()));
    var basePriority = taskList[0].priority;
    
    bestTasks.push(taskList[0]);
    
    taskList.forEach(function (specificTask, taskIndex) {
        if (taskIndex !== 0) {
            if (specificTask.weight === baseWeight && specificTask.priority === basePriority) {
                bestTasks.push(specificTask);
            }
        }
    });
    
    return bestTasks;
}


// TASK CREATION
function createTask(taskList, taskName, taskTimeNeeded, taskPriority) {
    'use strict';
    taskList.push({"name": taskName, "timeNeeded": taskTimeNeeded, "priority": taskPriority});
}


// TASK PICKING
function whatToDo(taskList, timeGiven) {
    'use strict';
    
    var possibleTasks = [];
    
    generateTimeDifference(taskList, timeGiven);
    possibleTasks = getPossibleTasks(taskList.length, taskList);

    generateTaskWeight(possibleTasks);
    
    return getBestTasks(possibleTasks).sort(byProperty(taskPriority(), SORT_PRIORITY()));
}