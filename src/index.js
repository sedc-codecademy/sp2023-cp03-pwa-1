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
let songsContainer = document.querySelector("#songs_container")
let pSongNameClass = document.querySelector("#p_song_name_class")
//MP Click Events
noteBtn.addEventListener("click", function(){
    if(mainButtons.style.display == "flex"){
        mainButtons.style.display = "none";
        bottomContainer.style.display = "none";
        noteIconContainer.style.borderRadius = "40px";
        noteIconContainer.style.borderRight = "none";
        mp.style.width = "113.25px"
        expandBtn.innerHTML = '<i class="fa fa-caret-down" aria-hidden="true" id="expand_btn_content" ></i>'
    
    } else{
        mainButtons.style.display = "flex";
        noteIconContainer.style.borderRadius = "11px 0px 0px 11px";
        noteIconContainer.style.borderRight = "1px solid black";
        mp.style.width = "420px"
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
let prevBtn = document.querySelector("#prev_btn");
let playBtn = document.querySelector("#play_btn");
let nextBtn = document.querySelector("#next_btn");
let volumeRange = document.querySelector("#volume_range");
let songRange = document.querySelector("#song_time_range");
let volumeIconContainer = document.querySelector("#volume_icon_container");
let songImg = document.querySelector("#song_img");
let currentSongName = document.querySelector("#p_song_name_id");
let autoBtn = document.querySelector("#autoplay_btn");

let timer;
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
    timer = setInterval(range_slider, 1000);
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
            index_no += 1;
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
//End of Music Player


