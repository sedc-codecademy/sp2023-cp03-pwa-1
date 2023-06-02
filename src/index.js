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
        if(bottomText)
        {
            taskDescText = bottomText.innerHTML
        }
        else
        {
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
    console.log(reminders);
    renderReminders(reminders)
}

//REMINDER ITEM
function createReminderItem(reminder) {
    let reminderItem = document.createElement('div');
    reminderItem.className = 'reminderDivElement';
    reminderItem.textContent = reminder.value;
    reminderItem.attributes.id = reminder.id;
  
    //DELETE BUTTON TODO!!!!! WHY WHEN I CLIICK ON THE SAME BUTTON IT DOES SHOW THE DELETED DIVS
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
      removeReminder(reminder.id)
    });
  
    //edit button
    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
      //updated reminder text
      let updatedText = prompt('Enter updated reminder:', reminderItem.textContent);
      
      // Update the reminder text if user provides valid input
      if (updatedText !== null && updatedText !== '') {
        reminderItem.textContent = updatedText;
      }
    });
  
    // Append delete and edit buttons to the reminder item
    reminderItem.appendChild(deleteButton);
    reminderItem.appendChild(editButton);
  
    return reminderItem;
  }
  
  // Event listener for form submission
    document.getElementById('reminderForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
  
    //reminder input value
    let reminderInput = document.getElementById('reminderInput');
    let reminderText = reminderInput.value;
  
    if (reminderText !== '') {
      // Create a new reminder item with delete and edit buttons
    //   var reminderItem = createReminderItem(reminderText);
  
    //   // Add the reminder item to the list
    //    document.getElementById("allReminders").addEventListener("click", () => {
    //     let reminderList = document.getElementById('reminderList');
    //     reminderList.appendChild(reminderItem); 
    //   }) 
        reminders.push({id: Math.random().toString(), value: reminderText})
  
  
      // Clear the input field
      reminderInput.value = '';
    }
  
  });
//   // Add the reminder item to the list
    document.getElementById("allReminders").addEventListener("click", () => {
        renderReminders()
       
    })

    function renderReminders() {
        document.getElementById('reminderList').innerHTML= ""
        reminders.forEach(el => {
            var reminderItem = createReminderItem(el);
            let reminderList = document.getElementById('reminderList');
            reminderList.appendChild(reminderItem); 
        })
    }
  

  //Add Menu reminder to show main div when the button from mennu is clicked
  document.getElementById('addMenuReminder').addEventListener('click', function(){
    let displayMainDiv = document.getElementById('displayReminders');
    displayMainDiv.style.display = "block"
    // let taskBarMainDiv = document.getElementsByClassName('container');
    // taskBarMainDiv.style.display = 'none'
  });
  
  
