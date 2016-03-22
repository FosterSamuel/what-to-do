//////////////////////////////////////////////////////////////
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

//////////////////////////////////////////////////////////////
// TASK PROPERTIES

function generateTimeDifference(taskList, timeGiven) {
    'use strict';
    
    return taskList.map(function (specificTask) {
        if (specificTask.hasOwnProperty(lastGivenTime())) {
            if (specificTask[lastGivenTime()] === timeGiven) {
                return specificTask;
            } else {
                specificTask[lastGivenTime()] = timeGiven;
                specificTask.timeDifference = specificTask.timeNeeded - timeGiven;
                return specificTask;
            }
        } else {
            specificTask[lastGivenTime()] = timeGiven;
            specificTask.timeDifference = specificTask.timeNeeded - timeGiven;
            return specificTask;
        }
    });
}

function generateTaskWeight(taskList) {
    'use strict';
    
    return taskList.map(function (specificTask) {
        specificTask.weight = specificTask.priority + specificTask.timeDifference;
        return specificTask;
    });
}

//////////////////////////////////////////////////////////////
// TASK FILTERING

function getPossibleTasks(amount, taskList) {
    'use strict';
    if (amount > 0) {
        return taskList.filter(function (specificTask) {
            return specificTask.timeDifference <= 0;
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


//////////////////////////////////////////////////////////////
// TASK CREATION & DISPLAY //
function createTask(taskList, taskName, taskTimeNeeded, taskPriority) {
    'use strict';
    taskList.push({"name": taskName, "timeNeeded": taskTimeNeeded, "priority": taskPriority});
}

function displayTask(specificTask) {
    'use strict';
    
    var timePhrase = specificTask.timeNeeded + " hour(s)";
    
    if (specificTask.timeNeeded < 1) {
        timePhrase = (specificTask.timeNeeded * 60).toPrecision(2) + " minute(s)";
    }
    
    var taskElement = document.createElement("section"), currentDiv = document.querySelector(".user-input");
    var taskDescription = document.createTextNode("It will take " + (timePhrase) + " to complete the task '" + specificTask.name + ".'");
    
    taskElement.appendChild(taskDescription); //add the text node to the newly created div. 
    currentDiv.appendChild(taskElement);
    
    console.log(specificTask);

}
//////////////////////////////////////////////////////////////


// USER INPUT

function getUserInput() {
    var inputValue = document.querySelector('input').value;
    
    return inputValue;
}


function whatToDo(taskList, timeGiven) {
    'use strict';
    var possibleTasks = [];
    
    generateTimeDifference(taskList, timeGiven);
    possibleTasks = getPossibleTasks(taskList.length, taskList);

    generateTaskWeight(possibleTasks);
    
    return getBestTasks(possibleTasks).sort(byProperty(taskPriority(), highest()));
}

/*
    Priority:
        0 = low
        1 = medium
        2 = high
        3 = emergency
        
    Time difference:
       >0 = uses more than the time alloted. (not possible)
        0 = uses all time alloted
       -n = less time than the time alloted
*/

var tasks = [];
var tasksToDo = [];
var bestTask = null;

var timeAlloted  = 1;

var SORT_PRIORITY = function () {
    'use strict';
    return lowest();
};


// createTask(taskList, name, time, priority);

createTask(tasks, "Contribute on github", 0.5, 1);
createTask(tasks, "Work on scholarship video", 2, 1);
createTask(tasks, "Write paper", 4, 1);
createTask(tasks, "Make bed", .1, 2);
createTask(tasks, "Organize code", 1, 2);
createTask(tasks, "Learn all of JavaScript.", 2, 2);

tasksToDo = whatToDo(tasks, timeAlloted);

// Hypothetical best task
bestTask = tasksToDo[0];

// Display the task(s).
//displayTask(bestTask);

//////////////////////////////////////////////////////////////