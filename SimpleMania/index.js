let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");

// Beatmap values
let mapid = document.getElementById('mapid');
let mainContainer = document.getElementById("main");
let title = document.getElementById("title");
let mapTitle = document.getElementById("mapTitle");
let mapDesc = document.getElementById("mapDesc")
let stars = document.getElementById("stars");
let OD = document.getElementById("OD");
let HP = document.getElementById("HP");
let CS = document.getElementById("CS");

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



let bottom_cont = document.getElementById("bottom");
let progressChart = document.getElementById("progress");


const modsImgs = {
    'nm': './img/NM.png',
    'ez': './img/EZ.png',
    'nf': './img/NF.png',
    'ht': './img/HF.png',
    'hr': './img/HR.png',
    'sd': './img/SD.png',
    'pf': './img/PF.png',
    'dt': './img/DT.png',
    'nc': './img/NC.png',
    'hd': './img/HD.png',
    'fl': './img/FL.png',
    'at': './img/AT.png',
    'cn': './img/CM.png',
    'v2': './img/V2.png',
    'fi': './img/FI.png',
    'mr': './img/MR.png',
    'rd': './img/RD.png',
    '1k': './img/1K.png',
    '2k': './img/2K.png',
    '3k': './img/3K.png',
    '4k': './img/4K.png',
    '5k': './img/5K.png',
    '6k': './img/6K.png',
    '7k': './img/7K.png',
    '8k': './img/8K.png',
    '9k': './img/9K.png',
    '10k': './img/10K.png',
    'co': './img/CO.png'
};

socket.onopen = () => {
    console.log("Successfully Connected");
};
// target, startVal, endVal, decimals, duration, options
let animation = {
    acc:  new CountUp('accuracy', 0, 0, 2, .2, {useEasing: true, useGrouping: true,   separator: " ", decimal: "." }),
    ur:  new CountUp('ur', 0, 0, 2, .2, {useEasing: true, useGrouping: true,   separator: " ", decimal: "." }),
    score:  new CountUp('score', 0, 0, 0, .2, {useEasing: true, useGrouping: true,   separator: "", decimal: "." }),
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
function setRankStyle(text, color, shadow) {
	rank.innerHTML = text;
	rank.style.color = color;
	rank.style.textShadow = shadow;
}

socket.onmessage = event => {
    try {
    let data = JSON.parse(event.data)
    , menu = data.menu
    , play = data.gameplay
    , hitGrade = data.gameplay.hits.grade.current
    , hdflfi = (data.menu.mods.str.includes("HD") || data.menu.mods.str.includes("FL") || data.menu.mods.str.includes("FI") ? true : false)
    , tempGrade = ""
    , tempColor = ""
    , tempShadow = "";

// Check GameMode and hide bottom on all modes except mania.
if (data.menu.state === 2){
 bottom_cont.style.display = "block";}
else{
 bottom_cont.style.display = "none";
 ur.innerHTML = 0;
}

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
            tempColor = (hdfl ? "#ffffff" : "#d6c253");
            tempShadow = (hdfl ? "0 0 0.5rem #ffffff" : "0 0 0.5rem #d6c253");;
            break;
    }
}
// Change rank by acc value (this will work until rank got fixed on json, mania only).
if (data.menu.gameMode = 3){
    
switch (menu.state) {
   case 2:   
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
setRankStyle(tempGrade,tempColor,tempShadow);
   default:
}

}

    if(gameState !== data.menu.state){
        gameState = data.menu.state
        if(gameState === 2 || gameState === 7 || gameState === 14){
            state.style.transform = "translateY(0)"
        }else{
            state.style.transform = "translateY(-50px)"
        }
    }
    
    gameState = data.menu.state
        if(gameState === 2){
            mainContainer.style.opacity = "1";
            document.documentElement.style.setProperty('--progress', ` ${(menu.bm.time.current / menu.bm.time.mp3 * 100).toFixed(2)}%`);
            line.style.cssText = "transition: transform 500ms ease, opacity 20ms ease, width 500ms ease;";
            line.style.transform = "translate(0px, 5px)"
            line.style.opacity = "1"
        }else if (gameState === 0){
            mainContainer.style.opacity = "0";
            document.documentElement.style.setProperty('--progress', ` 100%`);
            line.style.cssText = "transition: transform 500ms ease, opacity 20ms ease, width 300ms ease;";
            line.style.transform = "translate(0px, 5px)"
            line.style.opacity = "1"
        }else{
        mainContainer.style.opacity = "1";
            document.documentElement.style.setProperty('--progress', ` 100%`);
            line.style.cssText = "transition: transform 500ms ease, opacity 20ms ease, width 300ms ease;";
            line.style.transform = "translate(0px, 5px)"
            line.style.opacity = "1"
        }
    if(tempTitle !== data.menu.bm.metadata.artist + ' - ' + data.menu.bm.metadata.title){
        tempTitle = data.menu.bm.metadata.artist + ' - ' + data.menu.bm.metadata.title;
        title.innerHTML = tempTitle
    }

	if(fullTime !== data.menu.bm.time.mp3){
		fullTime = data.menu.bm.time.mp3;
		onepart = 1400/fullTime;
	}

    if (tempStars !== data.menu.bm.stats.fullSR) {
        tempStars = data.menu.bm.stats.fullSR;
        stars.innerHTML = tempStars;
    }
    if (tempOD !== data.menu.bm.stats.memoryOD){
        tempOD = data.menu.bm.stats.memoryOD;
        OD.innerHTML = tempOD;       
    }

    if (tempHP !== data.menu.bm.stats.memoryHP){
        tempHP = data.menu.bm.stats.memoryHP;
        HP.innerHTML = tempHP;       
    }

    if (tempCS !== data.menu.bm.stats.memoryCS){
        tempCS = data.menu.bm.stats.memoryCS;
        CS.innerHTML = tempCS;       
    }

    if (tempPos !== data.gameplay.leaderboard.ourplayer.position){
        tempPos = data.gameplay.leaderboard.ourplayer.position;
        if (tempPos > 50){
            pos.innerHTML = "51+"
        }else{
            pos.innerHTML = tempPos
        }
        pos.innerHTML = tempPos
    }

    
    if (tempMapDiff !== '[' + data.menu.bm.metadata.difficulty + ']') {
        tempMapDiff = '[' + data.menu.bm.metadata.difficulty + ']';
        tempMapper = data.menu.bm.metadata.mapper;
        mapDesc.innerHTML = '' + tempMapDiff + " by " + tempMapper;
    }

	if(seek !== data.menu.bm.time.current && fullTime !== undefined && fullTime != 0){
		seek = data.menu.bm.time.current;
		progressChart.style.width = onepart*seek+'px';
	}
	if (data.gameplay.pp.current != '') {
		let ppData = data.gameplay.pp.current;
		pp.innerHTML = Math.round(ppData);
	} else {
		pp.innerHTML = "0";
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
		let comboData = data.gameplay.combo.current;
		combo.innerHTML = comboData + "x";
	} else {
		combo.innerHTML = "0x";
	}
    if (data.gameplay.hits['geki'] > 0) {
		Marv.innerHTML = data.gameplay.hits['geki'];
	} else {
		Marv.innerHTML = 0;
	}
    if (data.gameplay.hits[300] > 0) {
		Perfect.innerHTML = data.gameplay.hits[300];
	} else {
		Perfect.innerHTML = 0;
	}
    if (data.gameplay.hits['katu'] > 0) {
		Great.innerHTML = data.gameplay.hits['katu'];
	} else {
		Great.innerHTML = 0;
	}
	if (data.gameplay.hits[100] > 0) {
		hun.innerHTML = data.gameplay.hits[100];
	} else {
		hun.innerHTML = 0;
	}
	if (data.gameplay.hits[50] > 0) {
		fifty.innerHTML = data.gameplay.hits[50];
	} else {
		fifty.innerHTML = 0;
	}
	if (data.gameplay.hits[0] > 0) {
		miss.innerHTML = data.gameplay.hits[0];
	} else {
		miss.innerHTML = 0;
	}
	if (data.gameplay.hits.unstableRate > 0) {
		animation.ur.update(data.gameplay.hits.unstableRate);
	} else {
		animation.ur.update(0);
	}
    if(tempMods != data.menu.mods.str){
        tempMods = data.menu.mods.str;
        if (tempMods == ""){
           tempMods = 'NM';
        }
		mods.innerHTML = '';
		let modsApplied = tempMods.toLowerCase();
		
		if(modsApplied.indexOf('nc') != -1){
			modsApplied = modsApplied.replace('dt','');
		}
		if(modsApplied.indexOf('pf') != -1){
			modsApplied = modsApplied.replace('sd','');
		}
		let modsArr = modsApplied.match(/.{1,2}/g);
		for(let i = 0; i < modsArr.length; i++){
			let mod = document.createElement('div');
			mod.setAttribute('class','mod');
			let modImg = document.createElement('img');
			modImg.setAttribute('src', modsImgs[modsArr[i]]);
			mod.appendChild(modImg);
			mods.appendChild(mod);
		}
    }
} catch (err) {
console.log(err);
};
};
