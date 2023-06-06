var i = 0;

const settingsButtons = {
    DELETE: "Delete",
    COMPLETE: "Complete"
};

openModal = function () {
    document.getElementById("modal").style.display = "block";
    sessions.push({name: currentUser, taskDescription:"Testing" , duration: "testing hours"})
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
        spanDesc.innerHTML = spanDesc.innerHTML.substr(0, 30) + "...";
        div.appendChild(fullTooltipText);
    }
    let hr = document.createElement("hr");
    hr.style.width = "300px";
    hr.style.color = "white";

    div.appendChild(hr);
    
    let li = createElement("li");
    let taskList = document.getElementById("taskList");

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
    const button2 = addButton(li, settingsButtons.COMPLETE);

    buttonDiv.appendChild(button1);
    buttonDiv.appendChild(button2);

    li.appendChild(buttonDiv);
}

addButton = function (li, buttonType) {
    let button = document.createElement("button");

    button.innerHTML = buttonType;
  
    const buttonClass = buttonType.toLowerCase() === "delete" ?
        "btn btn-outline-danger" : "btn btn-outline-primary";

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
       
        case settingsButtons.COMPLETE:
            button.onclick = function () {
                let checkImg = createElement("img");
                checkImg.src = "./images/complete-icon.jpg";
                checkImg.style.height = "30px";
                checkImg.style.width = "30px";
                checkImg.style.marginBottom = "50px";
                li.prepend(checkImg);
                li.querySelector("#taskName").style.textDecoration = "line-through";
                button.style.display = "none";
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
    document.getElementById("taskBtn").disabled = toggle;
}

var currentUser = null;
//Nikola logic for login to store pass/user
document.addEventListener('DOMContentLoaded', function() {
    var innerLoginButton = document.getElementById('innerLoginButton');
    innerLoginButton.addEventListener('click', function() {
        
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        
        if(!matchCredentials(username, password)){
            showWrongLoginMessage();
            hideBootstrapModal('loginModal');
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            return;
        }
        
        

        document.getElementById('username').value = '';
        document.getElementById('password').value = '';

        hideBootstrapModal('loginModal');
        hideButtonById('loginButton');
        hideButtonById('registerButton');
        showButtonById('signOutButton');
        showButtonById('navBarButton');
        showButtonById('timerDisplay');
        showButtonById('taskBar');
        currentUser = username;
    });
});

//sign out button logic
document.addEventListener('DOMContentLoaded',function(){
    var signOutButton = document.getElementById('signOutButton');
    signOutButton.addEventListener('click',function(){
        showButtonById('loginButton');
        showButtonById('registerButton');
        hideButtonById('signOutButton');
        hideButtonById('navBarButton');
        hideButtonById('timerDisplay');
        hideButtonById('taskBar');
        signOutMessage();
    })
})

function hideBootstrapModal(modalId) {
    var modalElement = document.getElementById(modalId);
    var modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
}

function hideButtonById(button){
    var hideButton = document.getElementById(button);
    hideButton.style.display = 'none';
}
function showButtonById(button){
    var showButton = document.getElementById(button);
    showButton.style.display = 'block';
}

//test credentials
var testCredentials = [
    {username: 'Nikola', password: 'password123',firstName: 'Nikola', lastName: 'Jovanovski'},
    {username: 'Aleksandar', password: 'password456',firstName: 'Aleksandar', lastName: 'Aleksandrovski'},
    {username: 'Kire', password: 'password789',firstName: 'Kire', lastName: 'Kirovski'},
    {username: 'Albert', password: 'password012',firstName: 'Albert', lastName: 'Albertovski'},
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
        console.log('Matched credentials:', "Full Name: "+ matchedUser.firstName,matchedUser.lastName,"Username: " + matchedUser.username, "Password: " + matchedUser.password);
        return true;
    } 
    else {
        console.log('Error: Incorrect username or password');
        return false;
    }
}
//Nikola logic for register
document.addEventListener('DOMContentLoaded', function() {
    var innerRegisterButton = document.getElementById('innerRegisterButton');
    innerRegisterButton.addEventListener('click',function(){

        var firstName = document.getElementById('firstname').value;
        var lastName = document.getElementById('lastname').value;
        var username = document.getElementById('registerUsername').value;
        var password = document.getElementById('registerPassword').value;
        var confirmPassword = document.getElementById('confirmpassword').value;
        
        if(!isFirstNameFilled(firstName)){
            return;
        }
        if(!isLastNameFilled(lastName)){
            return;
        }
        if(!isUserAvailable(username)){
            return;
        }
        if(!isPasswordLongEnough(password)){
            return;
        }
        if(!isPasswordMatching(password,confirmPassword)){
            return;
        }
        addUserToCredentials(firstName,lastName,username,password);
    })
})

function isFirstNameFilled(firstName) {
    firstName = firstName.trim();
  
    if (typeof firstName !== 'string') {
      alert("Please enter a valid first name!");
      document.getElementById('firstname').value = '';
      return false;
    }
  
    if (firstName === '' || firstName.length < 2) {
      alert("First name must be at least 2 characters long!");
      document.getElementById('firstname').value = '';
      return false;
    }
  
    if (!/^[a-zA-Z '-]+$/.test(firstName)) {
        alert("First name must contain only letters, spaces, hyphens, and apostrophes!");
        document.getElementById('firstname').value = '';
        return false;
    } 
    return true;
}
function isLastNameFilled(lastName){
    lastName = lastName.trim();

    if (typeof lastName !== 'string') {
        alert("Please enter a valid Last name!");
        document.getElementById('lastname').value = '';
        return false;
    }

    if (lastName === '' || lastName.length < 2) {
        alert("Last name must be at least 2 characters long!");
        document.getElementById('lastname').value = '';
        return false;
    }

    if (!/^[a-zA-Z '-]+$/.test(lastName)) {
        alert("Last name must contain only letters, spaces, hyphens, and apostrophes!");
        document.getElementById('lastname').value = '';
        return false;
    }
    return true;
}

function isUserAvailable(username) {
    for (var i = 0; i < testCredentials.length; i++) {
        if (testCredentials[i].username === username) {
            alert("That username is already in use!");
            document.getElementById('registerUsername').value = '';
            return false;
        }
    }
    return true;
}

function isPasswordLongEnough(password){
    if(password.length < 5){
        alert("Your password is not long enough!");
        return false;
    }
    return true;
}
function isPasswordMatching(password,confirmPassword){
    console.log(password + "hi from isPasswordMatching")
    console.log(confirmPassword)

    if(password !== confirmPassword){
        alert("Passwords do not match!");
        document.getElementById('registerPassword').value = '';
        document.getElementById('confirmpassword').value = '';
        return false;
    }
    return true;
}

function addUserToCredentials(firstName, lastName, username, password) {
    var newUser = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName
    };
  
    testCredentials.push(newUser);
  
    showSignupSuccessMessage();
    document.getElementById('firstname').value = '';
    document.getElementById('lastname').value = '';
    document.getElementById('registerUsername').value = '';
    document.getElementById('registerPassword').value = '';
    document.getElementById('confirmpassword').value = '';
    hideBootstrapModal('registerModal');
}
//wrong login message

function showWrongLoginMessage(){
    var wrongLoginToast = new bootstrap.Toast(document.getElementById('wrongLoginToast'));
    wrongLoginToast.show();

    setTimeout(function() {
        wrongLoginToast.hide();
    }, 5000);
}

//sucessful signout message

function signOutMessage(){
    var signOutMessage = new bootstrap.Toast(document.getElementById('signOutToast'));
    signOutMessage.show();

    setTimeout(function(){
        signOutMessage.hide();
    }, 5000);
}

//user already exits message

function showSignupSuccessMessage() {
    var signupToast = new bootstrap.Toast(document.getElementById('signupToast'));
    signupToast.show();

    setTimeout(function() {
        signupToast.hide();
    }, 5000);
}



  
//Nikola logic for sessions

//test sessions
var sessions = [];


document.addEventListener('DOMContentLoaded', function() {
    var currentSessionBtn = document.getElementById('allSessionsBtn');
  
    currentSessionBtn.addEventListener('click', function() {
      sessions.forEach(function(session) {
        var sessionElement = document.createElement('div');
        sessionElement.classList.add('session');
        sessionElement.classList.add('my-sessions-container');
  
        var nameElement = document.createElement('h3');
        nameElement.textContent = "User: " + session.name;
        nameElement.classList.add('session-text');
        sessionElement.appendChild(nameElement);
  
        var dateElement = document.createElement('p');
        dateElement.textContent = 'Date: ' + session.taskDescription;
        dateElement.classList.add('session-text');
        sessionElement.appendChild(dateElement);
  
        var durationElement = document.createElement('p');
        durationElement.textContent = 'Duration: ' + session.duration;
        durationElement.classList.add('session-text');
        sessionElement.appendChild(durationElement);
  
        document.body.appendChild(sessionElement);
      });
    });
  });

//fix this part
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


  
  