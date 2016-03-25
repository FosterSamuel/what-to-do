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
