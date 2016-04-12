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