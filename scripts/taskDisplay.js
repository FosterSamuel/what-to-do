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