var i = 0;

const settingsButtons = {
    DELETE: "Delete",
    EDIT: "Edit",
    START: "Start"
};

openModal = function (li) {
    if (li) {
        i = li.id
        const taskName = li.querySelector('#taskName');
        const taskDesc = li.querySelector('#taskDesc');
        const taskEst = li.querySelector('#taskEst');
        var taskDescText = "";
        const bottomText = li.querySelector('#bottom');
        if (bottomText) {
            taskDescText = bottomText.innerHTML
        }
        else {
            taskDescText = taskDesc.innerHTML;
        }

        document.getElementById("taskName").value = taskName.innerHTML;
        document.getElementById("taskDesc").value = taskDescText;
        document.getElementById("taskEst").value = taskEst.innerHTML;
    }
    document.getElementById("modal").style.display = "block";
}

closeModal = function () {
    document.getElementById("taskName").value = "";
    document.getElementById("taskDesc").value = "";
    document.getElementById("taskEst").value = "";
    document.getElementById("modal").style.display = "none";
}


addTask = function () {
    const taskName = document.getElementById("taskName");
    const taskEst = document.getElementById("taskEst");
    const taskDesc = document.getElementById("taskDesc");

    const text = taskDesc.value;

    let spanName = createElement("span", taskName);
    let spanEst = createElement("span", taskEst);
    let spanDesc = createElement("div", taskDesc);
    let div = createElement("div");

    div.appendChild(spanName);
    div.appendChild(spanEst);
    div.appendChild(createElement("br"));
    div.appendChild(spanDesc);

    if (text.length > 30) {
        div.classList = "hover-text";
        let fullTooltipText = createElement("span", text);
        fullTooltipText.innerHTML = text;
        fullTooltipText.classList = "tooltip-text";
        fullTooltipText.id = "bottom";
        spanDesc.innerHTML = spanDesc.innerHTML.substr(0, 30);
        div.appendChild(fullTooltipText);
    }
    let hr = document.createElement("hr");
    hr.style.width = "300px";
    hr.style.color = "white";

    div.appendChild(hr);

    let li = createElement("li");
    let taskList = document.getElementById("taskList");
    removeItemIfExists(taskList);

    li.id = i++;
    li.appendChild(div);
    appendSettingsButton(li);

    taskList.appendChild(li);
    displayList(true);
    closeModal();
    if (taskList.querySelectorAll("li").length == 5) {
        toggleAddButton(true);

    }
}

removeItemIfExists = function (list) {
    const listItems = list.querySelectorAll("li");
    listItems.forEach((item) => {
        if (item.id == i) {
            list.removeChild(item);
        }
    });
}

createElement = function (element, input) {
    if (!input) {
        return document.createElement(element);
    }

    let newElement = document.createElement(element);
    newElement.innerHTML = input.value;
    newElement.id = input.name;
    return newElement;
}

appendSettingsButton = function (li) {
    let buttonDiv = document.createElement("div");
    buttonDiv.classList = "actionButtons";

    const button1 = addButton(li, settingsButtons.DELETE);
    const button2 = addButton(li, settingsButtons.EDIT);
    const button3 = addButton(li, settingsButtons.START);

    buttonDiv.appendChild(button1);
    buttonDiv.appendChild(button2);
    buttonDiv.appendChild(button3);

    li.appendChild(buttonDiv);
}

addButton = function (li, buttonType) {
    let button = document.createElement("button");

    button.innerHTML = buttonType;

    const buttonClass = buttonType.toLowerCase() === "delete" ?
        "btn btn-outline-danger" : buttonType.toLowerCase() === "edit" ?
            "btn btn-outline-warning" : "btn btn-outline-success";

    button.classList = buttonClass;

    switch (buttonType) {
        case settingsButtons.DELETE:

            button.onclick = function () {
                let ul = li.parentNode;
                ul.removeChild(li);
                i--;
                if (ul.childElementCount == 0) {
                    displayList(false);
                }
                toggleAddButton(false);
            }
            break;
        case settingsButtons.EDIT:
            button.onclick = function () {
                openModal(li);
            }
            break;
        case settingsButtons.START:
            button.onclick = function () {
                //TODO: implement start logic
            }
            break;
    }
    return button;
}

displayList = function (toggle) {
    if (toggle) {
        document.getElementById("tasks").style.display = "block";
    } else {
        document.getElementById("tasks").style.display = "none";
    }
}

toggleAddButton = function (toggle) {
    let taskList = document.getElementById("taskList");

    document.getElementById("taskBtn").disabled = toggle;
}


// REMINDERS
let reminders = [];

function removeReminder(id) {
    reminders = reminders.filter(el => el.id !== id)
    renderReminders(reminders)
}

//REMINDER ITEM
function createReminderItem(reminder) {
    let reminderItem = document.createElement('div');
    reminderItem.className = 'reminderDivElement';
    reminderItem.attributes.id = reminder.id;


    let buttonDivForReminders = document.createElement('div');
    buttonDivForReminders.className = 'buttonDiv';

    //text in the reminder
    let headerText = document.createElement('h3');
    headerText.className = 'headerText';
    headerText.textContent = reminder.value;

    //delete button
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    deleteButton.addEventListener('click', function () {
        removeReminder(reminder.id)
    });

    //edit button
    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'editButton';
    editButton.addEventListener('click', function () {
        createEditButtonForModal(reminderItem, reminder)
        
    });

    // Append delete and edit buttons to the reminder item
    reminderItem.appendChild(headerText);
    buttonDivForReminders.appendChild(editButton);
    buttonDivForReminders.appendChild(deleteButton);
    reminderItem.appendChild(buttonDivForReminders)

    return reminderItem;
}

function createEditButtonForModal(reminderItem, editReminder){
    //Modal for edit button on reminders
    console.log("ReminderItem", reminderItem)
    console.log("Parametar", editReminder)
    reminders.map(reminder => console.log("Reminders",reminder))
    let modalEdit = document.getElementById('editModal');
    modalEdit.style.display = 'block'


    let reminderToUpdate = reminders.find(el => el.id == editReminder.id)
    console.log("ReminderToUpdate",reminderToUpdate)

    let saveButton = document.getElementById('saveButton');
    saveButton.addEventListener('click', function () {
        let updatedTextInput = document.getElementById('updatedText');
        let updatedTextValue = updatedTextInput.value;
        console.log("UpdatedTextValue", updatedTextValue);

        // Update the reminder text if user provides valid input
        if (updatedTextValue !== null && updatedTextValue !== '') {
            reminderToUpdate.value = updatedTextValue;
            let headerText = reminderItem.querySelector('.headerText');
            headerText.textContent = reminderToUpdate.value;
            console.log("HeaderText",headerText.textContent);
        }


        modalEdit.style.display = 'none';
            reminderToUpdate = "";
    });

    let cancelButton = document.getElementById("cancelButton");
    cancelButton.addEventListener('click', function () {
        modalEdit.style.display = 'none';
    })
}


// Event listener for form submission
document.getElementById('reminderForm').addEventListener('submit', function (event) {
    event.preventDefault();

    //reminder input value
    let reminderInput = document.getElementById('reminderInput');
    let reminderText = reminderInput.value;

    if (reminderText !== '') {
        reminders.push({ id: Math.random().toString(), value: reminderText })
        // Clear the input
        reminderInput.value = '';
    }

});
// Add the reminder item to the list
let allReminders = document.getElementById("allReminders");
allReminders.addEventListener("click", () => {
    renderReminders()
    displayMainDiv.style.display = "none";
    reminderList.style.display = 'flex';
})
let reminderList = document.getElementById('reminderList');

function renderReminders() {
    document.getElementById('reminderList').innerHTML = ""
    reminders.forEach(el => {
        var reminderItem = createReminderItem(el);
        let reminderList = document.getElementById('reminderList');
        reminderList.appendChild(reminderItem);
    })
}

let addMenuReminder = document.getElementById('addMenuReminder');
let displayMainDiv = document.getElementById('displayReminders');
//Add Menu reminder to show main div when the button from mennu is clicked
addMenuReminder.addEventListener('click', function () {
    displayMainDiv.style.display = "block"
    reminderList.style.display = 'none';
});


