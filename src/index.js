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
//End of Music Player