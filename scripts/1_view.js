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