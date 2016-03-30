function displayTask(specificTask) {
    'use strict';
    
    var timePhrase = specificTask.timeNeeded + " hour(s)";
    
    if (specificTask.timeNeeded < 1) {
        timePhrase = (specificTask.timeNeeded * 60).toPrecision(2) + " minute(s)";
    }
    
    var taskElement = document.createElement("section"), currentDiv = document.querySelector(".results");
    var taskDescription = document.createTextNode(specificTask.name + " | Time Needed: " + timePhrase);
    
    
    currentDiv.innerHTML = "";
    tasksOnDisplay[0] = specificTask;    
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
        
        if (timeInMinutes === 1) {
            timeDescriptor = "minute";
        }
        return timeInMinutes + " " + timeDescriptor;
    }
    
    return time + " " + timeDescriptor;
}

function generatePriorityString(specificPriority) {
    'use strict';
    
    switch(specificPriority) {
        case 1:
            return "Low";
            break;
        case 2:
            return "Medium";
            break;
        case 3:
            return "High";
            break;
    }
    return "Medium";
}

function createTaskHTML(specificTask) {
    var timePhrase = getTimePhrase(specificTask.timeNeeded);
    var priorityString = generatePriorityString(specificTask.priority);
    
    var htmlString = "<section class='task'>" + "\n";
    
    var prioritySelected = [specificTask.priority === 1 ? "selected='true'" : "",
                            specificTask.priority === 2 ? "selected='true'" : "",
                            specificTask.priority === 3 ? "selected='true'" : ""];
    
    
    htmlString += "<hgroup>" + "\n";
    htmlString += " <h2 class='hidden'> Best Task: " + specificTask.name + "</h2>" + "\n";
    htmlString += " <h3 data-task='" + specificTask.id + "' contenteditable onkeydown='return handleTaskNameEdit(event, this);' onblur='handleTaskNameEdit(event, this);'>" + specificTask.name + "</h3>" + "\n";
    htmlString += "</hgroup>" + "\n";
    htmlString += "<i id='priority' data-priority='" + priorityString.toLowerCase() + "'>Priority: " + "\n";
    htmlString += "<select data-task='" + specificTask.id + "' onchange='updateTaskPriority(this);'>" + "\n";
    
    htmlString += "     <option value='1' " + prioritySelected[0] + ">Low</option>" + "\n";
    htmlString += "     <option value='2' " + prioritySelected[1] + ">Medium</option>" + "\n";
    htmlString += "     <option value='3' " + prioritySelected[2] + ">High</option>" + "\n";
    
    htmlString += "</select></i>" + "\n";
    htmlString += "<i id='time-needed'>Time needed: " + timePhrase + "</i>" + "\n";
    htmlString += "</section>";
    
    return htmlString;
}


function updateDisplayedTask(specificTask) {
    'use strict';

    var timePhrase = getTimePhrase(specificTask.timeNeeded);
    var priorityString = generatePriorityString(specificTask.priority);
    
    resultTimeNeeded.innerHTML = "Time needed: " + timePhrase;
    resultInivisibleHeading.innerHTML = "Best task: " + specificTask.name;
    resultVisibleHeading.innerHTML = specificTask.name;
    resultPriority.innerHTML = "Priority: " + priorityString;
    resultPriority.setAttribute('data-priority', priorityString.toLowerCase());
    
    tasksOnDisplay[0] = specificTask;
}

function populateHTML(tasklist) {
    var section = document.querySelector('.tasks');
    
    tasklist.forEach(function (specificTask) {
        section.innerHTML += createTaskHTML(specificTask);
    });
}


function toggleTaskListVisibility() {
    if (taskListHTML.classList.contains('hidden')) {
        taskListHTML.classList.remove('hidden');
    } else {
        taskListHTML.classList.add('hidden');
    }
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

    console.log(specificTask);
    
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

// TASK CREATION
function createTask(taskList, taskName, taskTimeNeeded, taskPriority) {
    'use strict';
    taskList.push({"id": generateTaskID(), "name": taskName, "timeNeeded": taskTimeNeeded, "priority": taskPriority});
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
var tasks = [];
var tasksOnDisplay = [];

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

// Fill seperate array with best tasks
tasksOnDisplay = whatToDo(tasks, timeAlloted);

// Fill hidden tasklist that can be edited
populateHTML(tasks);
var result = document.querySelector('.result');
var resultInivisibleHeading = result.querySelector('hgroup h2');
var resultVisibleHeading = result.querySelector('hgroup h3');
var resultTimeNeeded = result.querySelector('#time-needed');
var resultPriority = result.querySelector('#priority');

var taskListHTML = document.querySelector('.tasks');

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


function updatePage() {
    'use strict';
    var totalTime = getUserInput(timeHoursInput);
    
    updateDisplayedTask(whatToDo(tasks, totalTime)[0]);
}

function handleTaskNameEdit(e, element) {
    'use strict';
    
    var originalTask = getTaskByID(element.getAttribute('data-task'), tasks);
    var originalTaskName = originalTask.name;
    
    if(e.type === 'blur') {
        updateTaskName(originalTask, element.innerHTML);
    } else if (e.type === 'keydown') {
        if (e.keyCode == 13 || e.which == 13) {
            updateTaskName(originalTask, element.innerHTML);
            element.blur();
            return false;
        } else if (e.keyCode == 27 || e.which == 27 ) {
            element.innerHTML = originalTaskName;
            element.blur();
        }
    }
}