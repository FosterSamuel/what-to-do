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