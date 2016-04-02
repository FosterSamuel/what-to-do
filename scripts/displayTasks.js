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
    htmlString += "<button onclick='deleteTask(tasks, " + '"' + specificTask.id + '"' + "); populateHTML(tasks);'>X</button>" + "\n";
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
    
    // Get anything that isn't a .task
    var sectionCutoff = section.innerHTML.indexOf("<section");
    var sectionReplace = section.innerHTML.slice(0, sectionCutoff);
    
    section.innerHTML = sectionReplace;
    
    tasklist.sort(byProperty(timeNeeded(), lowest()));
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