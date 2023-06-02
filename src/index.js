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
    sessions.push({name: "GOCE", date: "ASDASDAS", duration: "ASDSD"})
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

//Nikola logic for login to store pass/user
document.addEventListener('DOMContentLoaded', function() {
    var loginButton = document.getElementById('loginButton');
    loginButton.addEventListener('click', function() {
        
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        
        matchCredentials(username, password);     

        document.getElementById('username').value = '';
        document.getElementById('password').value = '';

        hideBootstrapModal('loginModal');
        
    });
});

function hideBootstrapModal(modalId) {
    var modalElement = document.getElementById(modalId);
    var modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
}

//test credentials
var testCredentials = [
    {username: 'Nikola', password: 'password123'},
    {username: 'Aleksandar', password: 'password456'},
    {username: 'Kire', password: 'password789'},
    {username: 'Albert', password: 'password012'},
]

function matchCredentials(username, password){
var matchedUser = null;
var j = 0;

    for(j = 0; j < testCredentials.length; j++){
        if(testCredentials[j].username === username && testCredentials[j].password === password){
            matchedUser = testCredentials[j];       
            break;
        }
    }
    if (matchedUser) {
        console.log('Matched credentials:', matchedUser.username, matchedUser.password);
    } 
    else {
        console.log('Error: Incorrect username or password');
    }
}

//Nikola logic for sessions

//test sessions
var sessions = [];


document.addEventListener('DOMContentLoaded', function() {
    var currentSessionBtn = document.getElementById('allSessionsBtn');
  

    //redo this with list items or make them all into one element
    //so i can border them all together instead of separate items
    currentSessionBtn.addEventListener('click', function() {
      sessions.forEach(function(session) {
        var sessionElement = createElement('div');
        sessionElement.classList.add('session');
        sessionElement.classList.add('my-sessions-container');
  
        var nameElement = createElement('h3');
        nameElement.textContent = session.name;
        nameElement.classList.add('session-text');
        sessionElement.appendChild(nameElement);
  
        var dateElement = createElement('p');
        dateElement.textContent = 'Date: ' + session.date;
        dateElement.classList.add('session-text');
        sessionElement.appendChild(dateElement);
  
        var durationElement = createElement('p');
        durationElement.textContent = 'Duration: ' + session.duration;
        durationElement.classList.add('session-text');
        sessionElement.appendChild(durationElement);
  
        
        document.body.appendChild(sessionElement);
      });
    });
  });

let elements = {
    page: document.querySelector("body").style.backgroundColor = "rgb(17, 54, 3)",
    min: document.querySelector("#minutes"),
    sec: document.querySelector("#seconds"),
    work: document.querySelector("#workSession").
        addEventListener("click", () => {
            timer.stop();
            document.querySelector('#start').innerHTML=`Start`;
            timer.time = 45 * 60;
            elements.min.innerHTML = "45";
            elements.sec.innerHTML = "00";
            document.querySelector("body").style.backgroundColor = "rgb(17, 54, 3)"
        }
        ),
    long: document.querySelector("#longBreakSession").
        addEventListener("click", () => {
            timer.stop();
            document.querySelector('#start').innerHTML=`Start`;
            elements.min.innerHTML = "15";
            elements.sec.innerHTML = "00";
            timer.time = 15 * 60;
            document.querySelector("body").style.backgroundColor = "#3f6c51";
        }),
    short: document.querySelector("#shortBreakSession").
        addEventListener("click", () => {
            timer.stop();
            document.querySelector('#start').innerHTML=`Start`;
            timer.time = 5 * 60;
            elements.min.innerHTML = "05";
            elements.sec.innerHTML = "00";
            document.querySelector("body").style.backgroundColor = "#498467"
        }),
    start: document.querySelector("#start").
        addEventListener("click", () => { 
            if(timer.interval===null){
            timer.start();
            document.querySelector('#start').innerHTML=`Pause`
            }
            else {
                timer.stop();
                document.querySelector('#start').innerHTML=`Start`
            }
        }),

}

let timer = {
    time: 2700,
    interval: null,
    start: function () {
        this.interval = setInterval(() => {
            if (this.time !== 0) {
                this.time--;
            }
            convertFromSeconds();
            
        }, 1000)
    },
    stop: function () {
        clearInterval(this.interval);
        this.interval = null;
    }
}

function convertFromSeconds() {
    const minutes = Math.floor(timer.time / 60);
    const seconds = timer.time % 60;
    elements.min.textContent = minutes.toString().padStart(2, 0);
    elements.sec.textContent = seconds.toString().padStart(2, 0);
}
  
  
  