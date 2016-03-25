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

var result = document.querySelector('.result');
var resultInivisibleHeading = result.querySelector('hgroup h2');
var resultVisibleHeading = result.querySelector('hgroup h3');
var resultTimeNeeded = result.querySelector('i');

var timeHoursInput = document.querySelector('#input-hours');


updateDisplayedTask(whatToDo(tasks, timeAlloted)[0]);

timeHoursInput.addEventListener("keyup", function () {
    'use strict';
    // Allowing room for the addition 
    var totalTime = getUserInput(timeHoursInput);
    
    updateDisplayedTask(whatToDo(tasks, totalTime)[0]);
});

timeHoursInput.addEventListener("blur", function () {
    'use strict';
    // Allowing room for the addition 
    var totalTime = getUserInput(timeHoursInput);
    
    updateDisplayedTask(whatToDo(tasks, totalTime)[0]);
});