let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");

// Beatmap values
let mapid = document.getElementById('mapid');
let mainContainer = document.getElementById("main");

// Gameplay values (Mania)
let mods = document.getElementById("mods");
let pp = document.getElementById("pp");
let combo = document.getElementById("combo");
let score = document.getElementById("score");
let accuracy = document.getElementById("accuracy");
let rank = document.getElementById("rank");
let ur = document.getElementById("ur");
let pos = document.getElementById("pos");
// Hit values (Mania)
let Marv = document.getElementById("geki");
let Great = document.getElementById("katu");
let Perfect = document.getElementById("300");
let hun = document.getElementById("h100");
let fifty = document.getElementById("h50");
let miss = document.getElementById("h0");

// Overlay
let box_right = document.getElementById("box_right");

socket.onopen = () => {
    console.log("Successfully Connected");
};
// target, startVal, endVal, decimals, duration, options
let animation = {
    acc:  new CountUp('accuracy', 0, 0, 2, .2, {useEasing: true, useGrouping: true,   separator: " ", decimal: "." }),
    ur:  new CountUp('ur', 0, 0, 2, .2, {useEasing: true, useGrouping: true,   separator: " ", decimal: "." }),
    score:  new CountUp('score', 0, 0, 0, .2, {useEasing: true, useGrouping: true,   separator: "", decimal: "." }),
    Marv: new CountUp('geki', 0, 0, 0, .2, {useEasing: true, useEasing: true, separator: "", decimal: ""}),
    Perfect: new CountUp('300', 0, 0, 0, .2, {useEasing: true, useEasing: true, separator: "", decimal: ""}),
    Great: new CountUp('katu', 0, 0, 0, .2, {useEasing: true, useEasing: true, separator: "", decimal: ""}),
    hun: new CountUp('h100', 0, 0, 0, .2, {useEasing: true, useEasing: true, separator: "", decimal: ""}),
    fifty: new CountUp('h50', 0, 0, 0, .2, {useEasing: true, useEasing: true, separator: "", decimal: ""}),
    miss: new CountUp('h0', 0, 0, 0, .2, {useEasing: true, useEasing: true, separator: "", decimal: ""}),
    pp: new CountUp('pp', 0, 0, 0, .2, {useEasing: true, useEasing: true, separator: "", decimal: "."}),
    combo: new CountUp('combo', 0, 0, 0, .2, {useEasing: true, useEasing: true, separator: "", decimal: "."}),
}

socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
    socket.send("Client Closed!");
};

socket.onerror = error => {
    console.log("Socket Error: ", error);
};

let tempTitle;
let tempDiff;
let tempMods;
let gameState;
let tmods;

let tempMapArtist;
let tempMapName;
let tempMapDiff;
let tempMapper;
let tempStars;

let tempStrainBase;
let smoothOffset = 2;
let seek;
let fullTime;
let tempImg;
let GR = 0;
let tempOD;
let tempHP;
let tempCS;
let tempPos;
// Simplistic code
function setRankStyle(text, color, shadow,GM) {
    switch (GM){
        case 3:
            rank.innerHTML = text;
            rank.style.color = color;
            rank.style.textShadow = shadow;
        break;
    }
}

socket.onmessage = event => {
    
    let data = JSON.parse(event.data)
    , menu = data.menu
    , hitGrade = data.gameplay.hits.grade.current
    , hdflfi = (data.menu.mods.str.includes("HD") || data.menu.mods.str.includes("FL") || data.menu.mods.str.includes("FI") ? true : false)
    , tempGrade = ""
    , tempColor = ""
    , tempShadow = "";

// Rank Check (added FadeIn mod on silver SS/S rank)
function rankCheck(hitGrade) {
    switch (hitGrade) {
        case "SS":
            tempGrade = hitGrade;
            tempColor = (hdflfi ? "#c7c7c7" : "#d6c253");
            tempShadow = (hdflfi ? "0 0 0.5rem #c7c7c7" : "0 0 0.5rem #d6c253");
            break;
        case "S":
            tempGrade = hitGrade;
            tempColor = (hdflfi ? "#c7c7c7" : "#d6c253");
            tempShadow = (hdflfi ? "0 0 0.5rem #c7c7c7" : "0 0 0.5rem #d6c253");
            break;
        case "A":
            tempGrade = hitGrade;
            tempColor = "#7ed653";
            tempShadow = "0 0 0.5rem #7ed653";
            break;
        case "B":
            tempGrade = hitGrade;
            tempColor = "#53d4d6";
            tempShadow = "0 0 0.5rem #53d4d6";
            break;
        case "C":
            tempGrade = hitGrade;
            tempColor = "#d6538e";
            tempShadow = "0 0 0.5rem #d6538e";
            break;
        case "D":
            tempGrade = hitGrade;
            tempColor = "#f04848";
            tempShadow = "0 0 0.5rem #f04848";
            break;
        default:
            tempGrade = "SS";
            tempColor = (hdflfi ? "#ffffff" : "#d6c253");
            tempShadow = (hdflfi ? "0 0 0.5rem #ffffff" : "0 0 0.5rem #d6c253");;
            break;
    }
}

// Check GameMode and hide on all modes except mania.

gameState = data.menu.state
//if (gameState === 2 && data.gameplay.gameMode === 3){
    if (gameState === 2){
    box_right.style.visibility = "visible";
    box_right.style.opacity = "1";
    box_right.style.transition = "opacity .2s linear";
}else{
    box_right.style.visibility = "hidden";
    box_right.style.opacity = "0";
    box_right.style.transition = "visibility 0s .2s, opacity .2s linear";
    ur.innerHTML = 0;
}


// Change rank by acc value (this will work until rank got fixed on json, mania only).
switch (menu.state) {
   case 2:   
   switch (data.gameplay.gameMode){
       case 3:
        accuracy = (data.gameplay.accuracy);
        if (accuracy > "99.99"){
            hitGrade = "SS"
        }
    else if (accuracy >= "95.00") {
    hitGrade = "S"
    }
    else if (accuracy <= "94.99" && accuracy >= "90.00"){
    hitGrade = "A"
    }
    else if (accuracy <= "89.99" && accuracy >= "80.00"){
    hitGrade = "B"
    }
    else if (accuracy <= "79.99" && accuracy >= "70.00"){
    hitGrade = "C"
    }
    else if (accuracy < "70"){
    hitGrade = "D"
    }   
    rankCheck(hitGrade);
    setRankStyle(tempGrade,tempColor,tempShadow,3);
   }
   default:
}
        if(gameState === 2){
            mainContainer.style.opacity = "1";
        }else if (gameState === 0){
            mainContainer.style.opacity = "0";
        }else{
        mainContainer.style.opacity = "1";
        }


switch (menu.state){
    case 2:     
        tempPos = data.gameplay.leaderboard.ourplayer.position;
        if (tempPos >= 50){
            pos.innerHTML = "(#??)"
        }else if(tempPos < 50){
            pos.innerHTML = '(#' + tempPos + ")"
        }
        switch (data.gameplay.gameMode){        
            case 3:      
                if (data.gameplay.pp.current != '') {
                    animation.pp.update(Math.round(data.gameplay.pp.current))
                  } else {
                    animation.pp.update(0)
                }
                if (data.gameplay.score > 0) {
                    animation.score.update(data.gameplay.score);
                } else {
                    animation.score.update(data.gameplay.score);
                }
                if (data.gameplay.accuracy > 0) {
                    animation.acc.update(data.gameplay.accuracy);
                } else {
                    animation.acc.update(0)
                }
                if (data.gameplay.combo.current != '') {
                    animation.combo.update(data.gameplay.combo.current);
                } else {
                    animation.combo.update(0)
                }
                if (data.gameplay.hits['geki'] > 0) {
                    animation.Marv.update(data.gameplay.hits['geki']);
                } else {
                    animation.Marv.update(0)
                }
                if (data.gameplay.hits[300] > 0) {
                    animation.Perfect.update(data.gameplay.hits[300]);
                } else {
                    animation.Perfect.update(0)
                }
                if (data.gameplay.hits['katu'] > 0) {
                    animation.Great.update(data.gameplay.hits['katu']);
                } else {
                    animation.Great.update(0)
                }
                if (data.gameplay.hits[100] > 0) {
                    animation.hun.update(data.gameplay.hits[100]);
                } else {
                    animation.hun.update(0)
                }
                if (data.gameplay.hits[50] > 0) {
                    animation.fifty.update(data.gameplay.hits[50]);
                } else {
                    animation.fifty.update(0)
                }
                if (data.gameplay.hits[0] > 0) {
                    animation.miss.update(data.gameplay.hits[0]);
                } else {
                    animation.miss.update(0)
                }
                if (data.gameplay.hits.unstableRate > 0) {
                    animation.ur.update(data.gameplay.hits.unstableRate);
                } else {
                    animation.ur.update(0);
                }
        }
        if(tempMods != data.menu.mods.str){
            tempMods = data.menu.mods.str;
            if (tempMods == ""){
               tempMods = 'NM';
            }
            mods.innerHTML = '';
            let modsApplied = tempMods;
            
            if(modsApplied.indexOf('NC') != -1){
                modsApplied = modsApplied.replace('DT','');
            }
            if(modsApplied.indexOf('PF') != -1){
                modsApplied = modsApplied.replace('SD','');
            }
            let modsArr = modsApplied.match(/.{1,2}/g);
            for(let i = 0; i < modsArr.length; i++){            
            mods.innerHTML = '' + mods.innerHTML + '   ' + '   '+ modsArr[i];
            }
        }
    default: 
}

};
