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
addTask(masterTaskList, "Clean your room", 1, 1);
addTask(masterTaskList, "Work on scholarships", 2, 2);
addTask(masterTaskList, "Back-up your data", 2, 3);
addTask(masterTaskList, "Organize your programming assets", 2, 1);
addTask(masterTaskList, "Write English paper", 4, 2);
addTask(masterTaskList, "Build a JavaScript framework", 6, 1);
addTask(masterTaskList, "Call your parents", 6, 1);
addTask(masterTaskList, "Clean entire house", 6, 2);
addTask(masterTaskList, "Make good use of your job's time", 8, 2);
addTask(masterTaskList, "Learn all of JavaScript", 200, 3);
function toggleVisiblity(element) {
    'use strict';
    
    if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
    } else {
        element.classList.add('hidden');
    }
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
    
    switch (specificPriority) {
        case 1:
            return "Low";
        case 2:
            return "Medium";
        case 3:
            return "High";
    }
    return "Medium";
}

function createTaskHTML(specificTask, HTMLType) {
    'use strict';
    
    var taskHTMLType = HTMLType || "";
    
    var timePhrase = getTimePhrase(specificTask.timeNeeded);
    var priorityString = generatePriorityString(specificTask.priority);
    
    var masterElement = document.createElement('section');
    
    var hgroupElement = document.createElement('hgroup');
    var hiddenHeaderElement = document.createElement('h2');
    var actualHeaderElement = document.createElement('h3');
    
    var priorityMasterElement = document.createElement('i');    
    var timeNeededElement = document.createElement('i');
    
    if(taskHTMLType === "") {
        var deleteTaskButtonElement = document.createElement('button');   
        
        var prioritySelectElement = document.createElement('select');
        var selectLowElement = document.createElement('option');
        var selectMediumElement = document.createElement('option');
        var selectHighElement = document.createElement('option');
     
        var timeInputElement = document.createElement('input');
    }
    
    masterElement.classList.add('task');
    
    hiddenHeaderElement.classList.add('hidden');
    hiddenHeaderElement.innerHTML = "Task: " + specificTask.name;

    actualHeaderElement.setAttribute('data-task', specificTask.id);
    actualHeaderElement.innerHTML = specificTask.name;

    priorityMasterElement.id = 'priority';
    priorityMasterElement.innerHTML = "Priority: " + priorityString;
    priorityMasterElement.setAttribute('data-priority', priorityString.toLowerCase());
    
    // TIME NEEDED ELEMENT
    timeNeededElement.id = 'time-needed';
    timeNeededElement.innerHTML = "Time needed: " + timePhrase;

    if(taskHTMLType === "") {
        
        actualHeaderElement.setAttribute('contenteditable', true);
        actualHeaderElement.addEventListener('keydown', function () {
            return handleTaskNameEdit(event, this);
        });
        actualHeaderElement.addEventListener('blur', function () {
            return handleTaskNameEdit(event, this);
        });
        
        deleteTaskButtonElement.innerHTML = "X";
        deleteTaskButtonElement.addEventListener('click', function () {
            return handleTaskDeletion(specificTask.id);
        });
        
        priorityMasterElement.innerHTML = "Priority: ";
        
        prioritySelectElement.setAttribute('data-task', specificTask.id);
        prioritySelectElement.addEventListener('change', function () {
            return handleTaskPriorityEdit(this);
        });

        selectLowElement.value = "1";
        selectMediumElement.value = "2";
        selectHighElement.value = "3";

        selectLowElement.innerHTML = "Low";
        selectMediumElement.innerHTML = "Medium";
        selectHighElement.innerHTML = "High";

        switch(specificTask.priority) {
            case 1:
                selectLowElement.setAttribute('selected', true);
                break;
            case 2:
                selectMediumElement.setAttribute('selected', true);
                break;
            case 3:
                selectHighElement.setAttribute('selected', true);
                break;
        }
        
        timeNeededElement.innerHTML = "Time Needed: ";
        
        timeInputElement.id = 'time-input';
        timeInputElement.min = .0002;
        timeInputElement.max = 10000;
        timeInputElement.type = 'number';
        timeInputElement.value = specificTask.timeNeeded;
        timeInputElement.setAttribute('inputMode', 'numeric');
        timeInputElement.setAttribute('data-task', specificTask.id);


        timeInputElement.addEventListener('input', function () {
            return handleTaskTimeEdit(this);
        });
    }
    
    hgroupElement.appendChild(hiddenHeaderElement);
    if(taskHTMLType === "") { 
        hgroupElement.appendChild(deleteTaskButtonElement);
        
        prioritySelectElement.appendChild(selectLowElement);
        prioritySelectElement.appendChild(selectMediumElement);
        prioritySelectElement.appendChild(selectHighElement);

        priorityMasterElement.appendChild(prioritySelectElement);

        timeNeededElement.appendChild(timeInputElement);
    }
    hgroupElement.appendChild(actualHeaderElement);

    
    
    
    masterElement.appendChild(hgroupElement);
    masterElement.appendChild(priorityMasterElement);
    masterElement.appendChild(timeNeededElement);
    
    return masterElement;
}

function updateDisplayedTask() {
    'use strict';
    var outputPoint = document.querySelector('.output');
    
    var sectionCutoff = outputPoint.innerHTML.indexOf("<section");
    var sectionReplace = outputPoint.innerHTML.slice(0, sectionCutoff);
        
    if (displayedTasks[0].name !== "_#_!@NOTPOSSIBLE@!_#__") {
        outputPoint.innerHTML = "";
        displayedTasks.forEach(function (specificTask) {
            outputPoint.appendChild(createTaskHTML(specificTask, "display"));
        });
    } else if (masterTaskList.length === 0) {
        outputPoint.innerHTML = "<p>You have no tasks in your list.</p>";
    } else {
        outputPoint.innerHTML = "<p>No possible tasks. Add a new task or more time.</p>";
    }
}

function updateTaskList(tasklist) {
    'use strict';
    
    var outputPoint = document.querySelector('.tasks');
    var breakPoint = 4;
    
    // Clean out the inside (remove anything after the last input element)
    for(var i = 0; i < outputPoint.childNodes.length; i++) {
        if(outputPoint.childNodes.item(i).tagName === "INPUT") {
            breakPoint = i + 1;
        }
    }
    
    while(outputPoint.hasChildNodes() && outputPoint.childNodes.length > breakPoint) {
        outputPoint.removeChild(outputPoint.lastChild);
    }

    tasklist.sort(byProperty(timeNeeded(), lowest()));
    tasklist.forEach(function (specificTask) {
        outputPoint.appendChild(createTaskHTML(specificTask));
    });
}
var tasklistSection = document.querySelector('.tasks');

var timeHoursInput = document.getElementById('input-hours');
var addTaskButton = document.querySelector('#btn-add-task');
var editTaskListButton = document.getElementById('btn-show-tasks');

timeHoursInput.addEventListener('keyup', function () {
    return updatePage();
});
addTaskButton.addEventListener('click', function () {
    return handleNewTaskCreation();
});
editTaskListButton.addEventListener('click', function () {
    return toggleVisiblity(tasklistSection);
});

function getInputFromElement(inputElement) {
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
    var totalTime = getInputFromElement(timeHoursInput);
    
    var newBestTask = whatToDo(masterTaskList, totalTime)[0];
    
    displayedTasks[0] = newBestTask;
    
    updateTaskList(masterTaskList);
    updateDisplayedTask();
}

function handleTaskDeletion(specificTaskID) {
    'use strict';
    
    deleteTask(masterTaskList, specificTaskID);
    updatePage();
}

function handleTaskNameEdit(e, element) {
    'use strict';
    
    var originalTask = getTaskByID(element.getAttribute('data-task'), masterTaskList);
    var originalTaskName = originalTask.name;
    
    if(e.type === 'blur') {
        changeTaskName(originalTask, element.innerHTML);
        updatePage();
    } else if (e.type === 'keydown') {
        if (e.keyCode == 13 || e.which == 13) {
            changeTaskName(originalTask, element.innerHTML);
            updatePage();
            element.blur();
            return false;
        } else if (e.keyCode == 27 || e.which == 27 ) {
            element.innerHTML = originalTaskName;
            element.blur();
        }
    }
}

function handleTaskPriorityEdit(taskHTMLObject) {
    var newPriority = parseInt(taskHTMLObject.value);
    
    var specificTaskID = taskHTMLObject.getAttribute('data-task');
    var specificTask = getTaskByID(specificTaskID, masterTaskList);
    
    var specificTaskPriorityHTML = taskHTMLObject.parentNode;
    specificTaskPriorityHTML.setAttribute('data-priority', generatePriorityString(newPriority).toLowerCase());
    
    changeTaskPriority(specificTask, newPriority);
    
    updatePage();
}

function handleTaskTimeEdit(taskHTMLObject) {
    var newTimeNeeded = parseFloat(taskHTMLObject.value);
    
    var specificTaskID = taskHTMLObject.getAttribute('data-task');
    var specificTask = getTaskByID(specificTaskID, masterTaskList);
    
    changeTaskTime(specificTask, newTimeNeeded);
    
    if (displayedTasks[0].id === specificTaskID) {
        displayedTasks[0].timeNeeded = newTimeNeeded;
        displayedTasks = whatToDo(masterTaskList, timeAlloted);
        updateDisplayedTask();
    }
}

function handleNewTaskCreation() {
    addTask(masterTaskList, "[New Task]", 1/60, 1);
    updatePage();
}

// Put hidden tasklist that can be edited
updateTaskList(masterTaskList);

// Fill seperate array with best tasks
displayedTasks = whatToDo(masterTaskList, timeAlloted);

updateDisplayedTask();