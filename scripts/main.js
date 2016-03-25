function displayTask(specificTask) {
    'use strict';
    
    var timePhrase = specificTask.timeNeeded + " hour(s)";
    
    if (specificTask.timeNeeded < 1) {
        timePhrase = (specificTask.timeNeeded * 60).toPrecision(2) + " minute(s)";
    }
    
    var taskElement = document.createElement("section"), currentDiv = document.querySelector(".results");
    var taskDescription = document.createTextNode(specificTask.name + " | Time Needed: " + timePhrase);
    
    
    currentDiv.innerHTML = "";
    taskElement.appendChild(taskDescription); //add the text node to the newly created div. 
    currentDiv.appendChild(taskElement);
    
    console.log(specificTask);
}

function getTimePhrase(time) {
    'use strict';
    var timeDescriptor = "hours";
    
    if (time === 1) {
        timeDescriptor = "hour";
    } else if (time < 1) {
        var timeInMinutes = (time * 60);
        timeDescriptor = "minutes";
        
        if(timeInMinutes == 1) {
            timeDescriptor = "minute";
        }
        return timeInMinutes + " " + timeDescriptor;
    }
    
    return time + " " + timeDescriptor;
}



function updateDisplayedTask(specificTask) {
    'use strict';

    var timePhrase = getTimePhrase(specificTask.timeNeeded);
    
    resultTimeNeeded.innerHTML = "Time needed: " + timePhrase;
    resultVisibleHeading.innerHTML = specificTask.name;
}
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
    
    var bestTasks = getBestTasks(possibleTasks);
    
    if(bestTasks.length > 1) {
        bestTasks.sort(byProperty(taskWeight(), SORT_PRIORITY()));
    }
    
    return bestTasks;
}
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
var result = document.querySelector('.result');
var resultInivisibleHeading = result.querySelector('hgroup h2');
var resultVisibleHeading = result.querySelector('hgroup h3');
var resultTimeNeeded = result.querySelector('i');

var timeHoursInput = document.querySelector('#input-hours');


// Make sure the default time is accounted for
updateDisplayedTask(whatToDo(tasks, timeAlloted)[0]);


function getUserInput(inputElement) {
    'use strict';
    
    var inputValue = inputElement.value;
    
    if (inputValue !== "") {
        inputValue = parseFloat(inputValue);
    } else {
        inputValue = 1;
    }
       
    return inputValue;
}


// Input element is tied to this function
// so that 'updating' can be expanded in
// the future.
function updatePage() {
    'use strict';
    var totalTime = getUserInput(timeHoursInput);
    
    updateDisplayedTask(whatToDo(tasks, totalTime)[0]);
}
