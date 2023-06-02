//Start of Music Player
//MP DOM
let expandBtn = document.querySelector("#expand_btn");
let bottomContainer = document.querySelector("#bottom_part_container");
let noteIconContainer = document.querySelector("#main_icon_container");
let sliders = document.querySelector("#scale");
let noteBtn = document.querySelector("#note_btn");
let mainButtons = document.querySelector("#main_controls_container");
let mp = document.querySelector("#music_player_container");
//MP Click Events
noteBtn.addEventListener("click", function(){
    if(mainButtons.style.display == "flex"){
        console.log("if");
        mainButtons.style.display = "none";
        bottomContainer.style.display = "none";
        noteIconContainer.style.borderRadius = "40px";
        noteIconContainer.style.borderRight = "none";
        mp.style.width = "113.25px"
        // mp.style.width = "9.35%";
    
    } else{
        console.log("else");
        mainButtons.style.display = "flex";
        noteIconContainer.style.borderRadius = "11px 0px 0px 11px";
        noteIconContainer.style.borderRight = "1px solid black";
        mp.style.width = "420px"
        // mp.style.width = "35%";
    }
});

expandBtn.addEventListener("click", function(){
    if(bottomContainer.style.display == "flex"){
        bottomContainer.style.display = "none";
        noteIconContainer.style.borderRadius = "11px 0px 0px 11px";
        scale.style.borderRadius = "0px 0px 11px 0px";
    } else{
        bottomContainer.style.display = "flex";
        noteIconContainer.style.borderRadius = "11px 0px 0px 0px";
        scale.style.borderRadius = "0px 0px 0px 0px";
    }
});  
//MP
let prevBtn = document.querySelector("#prev_btn");
let playBtn = document.querySelector("#play_btn");
let nextBtn = document.querySelector("#next_btn");
let volumeRange = document.querySelector("#volume_range");
let songRange = document.querySelector("#song_time_range");

let timer;
let autoplay = 0;

let index_no = 0;
let playing_song = false;

//audio element
let track = document.createElement("audio");

//all songs
// C:\Users\tomba\Desktop\music-library\sp2023-cp03-pwa-1\src\music
// src\music
let all_songs = [
    {
        name:"first song",
        path: "../src/music/Hyakke - Kagefumi.mp3"
    },
    {
        name:"second song",
        path: "../src/music/Nujabes - Aruarian dance.mp3"
    },
    {
        name:"third song",
        path: "../src/music/Peacock Affect - Who Cares If You Exist (eisu remix).mp3"
    }
];
//fncs
// fnc load track
function load_track(index){
    //reset_slider();
    track.src = all_songs[index].path
    track.load();
    timer = setInterval(range_slider, 1000);
}
load_track(index_no);

//checking if the song is playing

function justplay(){
    if(playing_song == false)
    {
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
        index_no += 1;
        load_track(index_no);
        playsong();
    }else{
        index_no = 0;
        load_track(index_no);
        playsong();
    }
}

//previous song
function previous_song(){
    if(index_no > 0){
        index_no -= 1;
        load_track(index_no);
        playsong(); 
    } else{
        index_no = all_songs.length - 1;
        load_track(index_no);
        playsong();
    }
}

//change volume
function volume_change(){
   track.volume = volumeRange.value / 100;
}

// change song duration
//function change_duration(){
    //songRange.value = track.duartion * (songRange.value / 100);
    //track.currentTime = songRange.value;
//}

function range_slider(){
    let position = 0;
    if(!isNaN(track.duration)){
        position = track.currentTime * (100 / track.duration);
        songRange.value = position

    }
}

// reset song range
//function reset_slider(){
 //   songRange.value = 0;
//}
//End of Music Player