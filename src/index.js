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

//#region  timer 

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

//#endregion

//Start of Music Player
//MP DOM
let expandBtn = document.querySelector("#expand_btn");
let bottomContainer = document.querySelector("#bottom_part_container");
let noteIconContainer = document.querySelector("#main_icon_container");
let sliders = document.querySelector("#scale");
let noteBtn = document.querySelector("#note_btn");
let mainButtons = document.querySelector("#main_controls_container");
let mp = document.querySelector("#music_player_container");
let loopBtn = document.querySelector("#loop_btn");
let songsContainer = document.querySelector("#songs_container");
let pSongNameClass = document.querySelector("#p_song_name_class");
let prevBtn = document.querySelector("#prev_btn");
let playBtn = document.querySelector("#play_btn");
let nextBtn = document.querySelector("#next_btn");
let volumeRange = document.querySelector("#volume_range");
let volumeRangeContainer = document.querySelector("#volume_range_container");
let songRange = document.querySelector("#song_time_range");
let volumeIconContainer = document.querySelector("#volume_icon_container");
let songImg = document.querySelector("#song_img");
let currentSongName = document.querySelector("#p_song_name_id");
let autoBtn = document.querySelector("#autoplay_btn");
let main
//MP Click Events
let screenRatio = window.devicePixelRatio || 1;
let screenWidth = screen.width * screenRatio;
let screenHeight = screen.height * screenRatio;
let navbar = document.querySelector("#navBarMain");
let songTimerContainer = document.querySelector("#song_time_container");
noteBtn.addEventListener("click", function(){
    if(mainButtons.style.display == "flex"){
        mp.style.position = "absolute";
        mainButtons.style.display = "none";
        bottomContainer.style.display = "none";
        noteIconContainer.style.borderRadius = "40px";
        noteIconContainer.style.borderRight = "none";
        expandBtn.innerHTML = '<i class="fa fa-caret-down" aria-hidden="true" id="expand_btn_content" ></i>'
        mp.style.width = "113.25px"
        mp.style.left = "20px"; 
        mp.style.top = "170px";
        mp.style.padding = "0px";

    
    } else{
        mainButtons.style.display = "flex";
        noteIconContainer.style.borderRadius = "11px 0px 0px 11px";
        noteIconContainer.style.borderRight = "1px solid black";
        mp.style.width = "420px"
        songImg.style.height = "71.31px";
        if(window.matchMedia("(max-width: 1200px)").matches){
            mp.style.top = "auto";
            mp.style.bottom = "0px";
            mp.style.left = "0px";
            mp.style.width = "100%";
            mp.style.padding = "0px 300px 0px 300px";
            songTimerContainer.style.width = "72%";
            volumeIconContainer.style.width = "5%";
            volumeRangeContainer.style.width = "25%";
            volumeRange.style.width = "80%";
            songImg.style.height = "71.31px";
            if(mainButtons.style.display == "flex" && window.matchMedia("(max-width: 986px)").matches){
                mp.style.padding = "0px 200px 0px 200px";
                songImg.style.height = "71.31px";
                if(mainButtons.style.display == "flex" && window.matchMedia("(max-width: 785px)").matches){
                    mp.style.padding = "0px";
                    songImg.style.height = "71.31px";
                    if(mainButtons.style.display == "flex" && window.matchMedia("(max-width: 313px)").matches){
                        songImg.style.height = "100%";
                    }
                }
            }
        }
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            mp.style.position = "fixed";
            mp.style.top = "auto";
            mp.style.left = "0px";
            mp.style.width = navbar.offsetWidth + "px";
            mp.style.bottom = "0px";
            songTimerContainer.style.width = "72%";
            volumeIconContainer.style.width = "5%";
            volumeRangeContainer.style.width = "25%";
            volumeRange.style.width = "100px";
            songImg.style.width = "100%"
            mp.style.padding = "0px";

        }
    }
});

expandBtn.addEventListener("click", function(){
    if(bottomContainer.style.display == "flex"){
        bottomContainer.style.display = "none";
        noteIconContainer.style.borderRadius = "11px 0px 0px 11px";
        scale.style.borderRadius = "0px 0px 11px 0px";
        expandBtn.innerHTML = '<i class="fa fa-caret-down" aria-hidden="true" id="expand_btn_content" ></i>';
    } else{
        bottomContainer.style.display = "flex";
        noteIconContainer.style.borderRadius = "11px 0px 0px 0px";
        scale.style.borderRadius = "0px 0px 0px 0px";
        expandBtn.innerHTML = '<i class="fa fa-caret-up" aria-hidden="true" id="expand_btn_content2"></i>';
    }
});  
//MP
let timerMP;
let autoplay = 0;

let index_no = 0;
let playing_song = false;

//audio element
let track = document.createElement("audio");

//all songs
let all_songs = [
    {
        name:"Hyakke - Kagefumi",
        path: "../src/music/Hyakke - Kagefumi.mp3",
        img: "../src/img/a3145441046_5.jpg"
    },
    {
        name:"Nujabes - Aruarian dance",
        path: "../src/music/Nujabes - Aruarian dance.mp3",
        img: "../src/img/artworks-000010633044-0pecn0-t500x500.jpg"
    },
    {
        name:"Peacock Affect - Who Cares If You Exist (eisu remix)",
        path: "../src/music/Peacock Affect - Who Cares If You Exist (eisu remix).mp3",
        img: "../src/img/artworks-000092286828-3ghmnl-t240x240.jpg"
    },
    {
        name:"KOAN Sound - Lost In Thought",
        path: "../src/music/KOAN Sound - Lost In Thought.mp3",
        img: "../src/img/artworks-dblZ961xJv8n-0-t500x500.jpg"
    }
];
//fncs
// fnc load track
function load_track(index){
    reset_slider();
    track.src = all_songs[index].path
    songImg.src = all_songs[index].img
    currentSongName.innerHTML = all_songs[index].name
    track.load();
    timerMP = setInterval(range_slider, 1000);
}
load_track(index_no);

//reset song
function reset_slider(){
    songRange.value = 0;
}

//checking if the song is playing
function justplay(){
    if(playing_song == false)
    {
        playsong();
    }else if(songRange.value == 100){
        playsong();                
    }else{
        pausesong();
    }
};

//play song
function playsong(){
    track.play();
    playing_song = true;
    playBtn.innerHTML = '<i class = "fa fa-pause"></i>';
};

//pause song
function pausesong(){
    track.pause();
    playing_song = false;
    playBtn.innerHTML = '<i class = "fa fa-play"></i>';
}

//next song
function next_song(){
    if(index_no < all_songs.length - 1){
        index_no = parseInt(index_no) + 1;
        load_track(index_no);
        addSongs();
        playsong();
    }else{
        index_no = 0;
        load_track(index_no);
        addSongs();
        playsong();
    }
}

//previous song
function previous_song(){
    if(index_no > 0){
        index_no -= 1;
        load_track(index_no);
        addSongs()
        playsong(); 
    } else{
        index_no = all_songs.length - 1;
        load_track(index_no);
        addSongs()
        playsong();
    }
}
let muted = false;
//change volume
function volume_change(){
   track.volume = volumeRange.value / 100;
   if(volumeRange.value > 50){
    volumeIconContainer.innerHTML = '<i class="fa fa-volume-up" aria-hidden="true" id="volume_icon" onclick="mute_sound()"></i>'
    muted = false;
   }
   if(volumeRange.value > 0 && volumeRange.value <= 50){
    volumeIconContainer.innerHTML = '<i class="fa fa-volume-down" aria-hidden="true" id="volume_icon2" onclick="mute_sound()"></i>';
    muted = false;
   }
   if(volumeRange.value == 0){
    volumeIconContainer.innerHTML = '<i class="fa fa-volume-off" aria-hidden="true" id="volume_icon3" onclick="mute_sound()"></i>';
    muted = true;
   } 
}



// change song duration
function change_duration(){
    track.currentTime = songRange.value * (track.duration / 100);
}

//autoplay
function autoplay_switch(){
    if(autoplay == 1){
        autoplay = 0;
        autoBtn.style.backgroundColor = "rgba(0, 0, 0, 0.59)";
        autoBtn.innerHTML = 'Auto Play <i class="fa fa-pause-circle" aria-hidden="true" id="autoplayIcon"></i>'
    }else{
        autoplay = 1;
        autoBtn.style.backgroundColor = "rgb(56, 12, 64)";
        autoBtn.innerHTML = 'Auto Play <i class="fa fa-play-circle" aria-hidden="true"></i>'
    }
}

function range_slider(){
    let position = 0;
    if(!isNaN(track.duration)){
        position = track.currentTime * (100 / track.duration);
        songRange.value = position

    }
    if(track.ended){
        playBtn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
        if(index_no == all_songs.length - 1){
            index_no = 0;
        } else{
            index_no = parseInt(index_no) + 1;
        }
        if(autoplay == 1){
            load_track(index_no);
            addSongs();
            playsong();

        }
    }
}

let trackVolume = 0;
let volumeRangeValue = 0;
function mute_sound(){
    if(track.volume > 0 && muted == false){
        trackVolume = track.volume;
        volumeRangeValue = volumeRange.value;
	    track.volume = 0;
	    volumeRange.value = 0;
        volumeIconContainer.innerHTML = '<i class="fa fa-volume-off" aria-hidden="true" id="volume_icon3" onclick="mute_sound()"></i>';
        setTimeout(() => {
            muted = true;
        }, 20);
    }
    if(track.volume == 0 && muted == true){
        track.volume = trackVolume;
        volumeRange.value = volumeRangeValue
        if(volumeRangeValue > 0 && volumeRangeValue <= 50){
            volumeIconContainer.innerHTML = '<i class="fa fa-volume-down" aria-hidden="true" id="volume_icon2" onclick="mute_sound()"></i>';
        }
        if(volumeRangeValue > 50){
            volumeIconContainer.innerHTML = '<i class="fa fa-volume-up" aria-hidden="true" id="volume_icon" onclick="mute_sound()"></i>'
        } 
        muted = false
    }
}

let loopSong = false;

function loop_song(){
   if(loopSong == false){
    track.loop = true;
    loopBtn.style.backgroundColor = "rgb(56 12 64)";
    setTimeout(() =>{
      loopSong = true;
    },20)
   }
   if(loopSong == true){
    track.loop = false;
    loopSong = false;
    loopBtn.style.backgroundColor = "#00000096";
   }
}

function addSongs(){
    songsContainer.innerHTML = "";
    let i = 0;
    let x = 1;
    while (i <= index_no){
        if(i == index_no){
            if(i == 0){
                for(let i = 1; i < all_songs.length; i++){
                    songsContainer.innerHTML += `<div id="${i}" class="songs_div" onclick="idTarget(event)"><p id="${i}" class="p_song_name_class">${all_songs[i].name}</p></div>`;
                }
            }
            if(i == all_songs.length - 1){
                for(let i = 0; i < all_songs.length - 1; i++){
                    songsContainer.innerHTML += `<div id="${i}" class="songs_div" onclick="idTarget(event)"><p id="${i}" class="p_song_name_class">${all_songs[i].name}</p></div>`;
                }
            }
            if(i > 0 && i < all_songs.length - 1){
                x = parseInt(index_no);
                y = parseInt(index_no);
                while(x < all_songs.length - 1){
                    songsContainer.innerHTML += `<div id="${x + 1}" class="songs_div" onclick="idTarget(event)"><p id="${x + 1}" class="p_song_name_class">${all_songs[x + 1].name}</p></div>`;
                    x++;
                }
                if(x = all_songs.length - 1){
                    songsContainer.innerHTML += `<div id="0" class="songs_div" onclick="idTarget(event)"><p id="0" class="p_song_name_class">${all_songs[0].name}</p></div>`;
                    x = 0;
                }
                while(x < y - 1){
                    songsContainer.innerHTML += `<div id="${x + 1}" class="songs_div" onclick="idTarget(event)"><p id="${x + 1}" class="p_song_name_class">${all_songs[x + 1].name}</p></div>`;
                    x++;
                }
            }
        }
        i++
    }
}

//event id target
function idTarget(event){
    index_no = event.target.id;
    load_track(index_no);
    addSongs();
    playsong();
}

addSongs();

//match media
window.addEventListener("resize", function(){
    if(mainButtons.style.display == "flex" && window.matchMedia("(max-width: 1200px)").matches){
            mp.style.top = "auto";
            mp.style.bottom = "0px";
            mp.style.width = "100%";
            mp.style.padding = "0px 300px 0px 300px";
            mp.style.left = "0px";
            songTimerContainer.style.width = "72%";
            volumeIconContainer.style.width = "5%";
            volumeRangeContainer.style.width = "25%";
            volumeRange.style.width = "80%";
            songImg.style.height = "71.31px";
            if(mainButtons.style.display == "flex" && window.matchMedia("(max-width: 986px)").matches){
                mp.style.padding = "0px 200px 0px 200px";
                songImg.style.height = "71.31px";
                if(mainButtons.style.display == "flex" && window.matchMedia("(max-width: 785px)").matches){
                    mp.style.padding = "0px";
                    songImg.style.height = "71.31px";
                    if(mainButtons.style.display == "flex" && window.matchMedia("(max-width: 313px)").matches){
                        songImg.style.height = "100%";
                    }
                }
            }
    }
    if(mainButtons.style.display == "flex" && window.matchMedia("(min-width: 1201px)").matches){
        mp.style.width = "420px"
        mp.style.left = "20px"; 
        mp.style.top = "170px";
        mp.style.padding = "0px";
        songImg.style.height = "71.31px";
    }
});
//End of Music Player