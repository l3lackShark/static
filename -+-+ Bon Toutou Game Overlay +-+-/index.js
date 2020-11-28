let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");
let mapid = document.getElementById('mapid');

/*---------------------------------- GAMEPLAY ----------------------------------*/

let maxcombo = document.getElementById("maxcombo")
let combo = document.getElementById("combo");
let Score = new CountUp('Score', 0, 0, 0, .5, { useEasing: true, useGrouping: true, separator: " ", decimal: "." })
let Acc = new CountUp('Acc', 0, 0, 2, .5, { useEasing: true, useGrouping: true, separator: " ", decimal: "." })
let top_cont = document.getElementById("top");
let bottom_cont = document.getElementById("bottom");
let hpbar = document.getElementById("hpbar");
let progressChart = document.getElementById("progress");
let strainGraph = document.getElementById("strainGraph");
let CurrentSR = document.getElementById("CurrentSR");
let TotalSR = document.getElementById("TotalSR");
let StarRightThing = document.getElementById("StarRightThing")
let comboCont = document.getElementById("comboCont")
let maxcomboCont = document.getElementById("maxcomboCont")



let gameState;
let tempStrainBase;
let smoothOffset = 2;
let seek;
let fullTime;
let temphun;
let tempfifty;
let tempmiss;
let tempSB
let TempCurrentSR;
let TempScore;
let tempmaxcomboData;
let tempppfcData



/*---------------------------------- RANKING ----------------------------------*/
let tempImg
let RankingState;
let temprankhun;
let temprankfifty;
let temprankmiss;
let temprankpp;
let temprankcombo;
let temprankSSPP;
let temprankninePP;
let temprankeightPP;
let tempranksevenPP;
let temprankfivePP;
let h300
let temph300
let tempranksb
let tempRankgeki
let tempRankthreehun
let TempRankScore;

let bg = document.getElementById("bg");
let BackgroundIMG = document.getElementById("BackgroundIMG");
let Ranking = document.getElementById("Ranking");
let rankhun = document.getElementById("Rankhun");
let rankfifty = document.getElementById("Rankfif");
let rankmiss = document.getElementById("RankMiss");
let Rankgeki = document.getElementById("Rankgeki");
let Rankthreehun = document.getElementById("Rankthreehun");
let rankpp = document.getElementById("RankingPP");
let rankcombo = document.getElementById("RankingCombo");
let rankSSPP = document.getElementById("SSPP");
let rankninePP = document.getElementById("ninePP");
let rankeightPP = document.getElementById("eightPP");
let ranksevenPP = document.getElementById("sevenPP");
let rankfivePP = document.getElementById("fivePP");
let RankingPPValues = document.getElementById("RankingPPValues");
let RankingStatus = document.getElementById("RankingStatus");
let PPCounter = document.getElementById("PPCounter");
let Square = document.getElementById("Square");
let Artist = document.getElementById("Artist");
let Title = document.getElementById("Title");
let Diff = document.getElementById("Diff");
let RankUR = document.getElementById("RankUR");
let Rankscore = document.getElementById("RankScore");
let ScoreBruh = document.getElementById("ScoreBruh");
let BGBruh = document.getElementById("BGBruh");
let RankSR = document.getElementById("RankSR")
let RankPP = document.getElementById("RankPP")

let mods = document.getElementById("mods");
const modsImgs = {
    'ez': './static/mods/easy.png',
    'nf': './static/mods/nofail.png',
    'ht': './static/mods/halftime.png',
    'hr': './static/mods/hardrock.png',
    'sd': './static/mods/suddendeath.png',
    'pf': './static/mods/perfect.png',
    'dt': './static/mods/doubletime.png',
    'nc': './static/mods/nightcore.png',
    'hd': './static/mods/hidden.png',
    'fl': './static/mods/flashlight.png',
    'rx': './static/mods/relax.png',
    'ap': './static/mods/autopilot.png',
    'so': './static/mods/spunout.png',
    'at': './static/mods/autoplay.png',
    'cn': './static/mods/cinema.png',
    'v2': './static/mods/v2.png',
}
let tempMods;

/*---------------------------------- Scorebar ----------------------------------*/
let LB
let Scoreboard = document.getElementById("Scoreboard");
let combxtxt1 = document.getElementById("combxtxt1")
let combxtxt2 = document.getElementById("combxtxt2")
let combxtxt3 = document.getElementById("combxtxt3")
let combxtxt4 = document.getElementById("combxtxt4")
let combxtxt5 = document.getElementById("combxtxt5")
/*Player 1 */
let NamePlayer1 = document.getElementById("NamePlayer1");
let RankPlayer1 = document.getElementById("RankPlayer1");
let ScorePlayer1 = document.getElementById("ScorePlayer1");
let ComboPlayer1 = document.getElementById("ComboPlayer1");
let TempRankPL1;
let TempScore1;
let TempName1;
let TempCombo1;

/*Player 2 */
let NamePlayer2 = document.getElementById("NamePlayer2");
let RankPlayer2 = document.getElementById("RankPlayer2");
let ScorePlayer2 = document.getElementById("ScorePlayer2");
let ComboPlayer2 = document.getElementById("ComboPlayer2");
let TempRankPL2;
let TempScore2;
let TempName2;
let TempCombo2;

/*Player 3 */
let NamePlayer3 = document.getElementById("NamePlayer3");
let RankPlayer3 = document.getElementById("RankPlayer3");
let ScorePlayer3 = document.getElementById("ScorePlayer3");
let ComboPlayer3 = document.getElementById("ComboPlayer3");
let TempRankPL3;
let TempScore3;
let TempName3;
let TempCombo3;

/*Player 4 */
let NamePlayer4 = document.getElementById("NamePlayer4");
let RankPlayer4 = document.getElementById("RankPlayer4");
let ScorePlayer4 = document.getElementById("ScorePlayer4");
let ComboPlayer4 = document.getElementById("ComboPlayer4");
let TempRankPL4;
let TempScore4;
let TempName4;
let TempCombo4;

/*Player 5 */
let NamePlayer5 = document.getElementById("NamePlayer5");
let RankPlayer5 = document.getElementById("RankPlayer5");
let ScorePlayer5 = document.getElementById("ScorePlayer5");
let ComboPlayer5 = document.getElementById("ComboPlayer5");
let TempRankPL5;
let TempScore5;
let TempName5;
let TempCombo5;


socket.onopen = () => {
    console.log("Successfully Connected");
};

socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
    socket.send("Client Closed!");
};

socket.onerror = error => {
    console.log("Socket Error: ", error);
};


socket.onmessage = event => {
    let data = JSON.parse(event.data), menu = data.menu, play = data.gameplay;


    if(tempImg !== data.menu.bm.path.full){
        tempImg = data.menu.bm.path.full
        let img = data.menu.bm.path.full.replace(/#/g,'%23').replace(/%/g,'%25')
        bg.setAttribute('src',`http://127.0.0.1:24050/Songs/${img}?a=${Math.random(10000)}`)
    }
    Acc.update(play.accuracy);

	if(gameState !== data.menu.state){
        gameState = data.menu.state;
        if(gameState === 2 ){
			// GameplayPPCounter
            top_cont.style.transform = "translateY(0)";
            hpbar.style.transform = "translateY(0)";
            bottom_cont.style.transform = "translateY(0)";
            strainGraph.style.transform = "translateY(0)";
            Scoreboard.style.transform = "translateY(0px)";
            StarRightThing.style.transform = "translateX(0)";
            bg.style.transform = "translateY(0px)";
            
        }else{
            top_cont.style.transform = "translateY(-500px)";
            hpbar.style.transform = "translateY(-500px)";
            bottom_cont.style.transform = "translateY(500px)";
            strainGraph.style.transform = "translateY(500px)";
            Scoreboard.style.transform = "translateX(500px)";
            StarRightThing.style.transform = "translateX(-500px)";
            bg.style.transform = "translateY(1920px)";            
        }
    }
    if(data.gameplay.leaderboard.hasLeaderboard == true && data.gameplay.leaderboard.slots[data.gameplay.leaderboard.slots.length-1].position > 5 && gameState === 2){
                Scoreboard.style.transform = "translateX(0px)";
            
            
    let board = data.gameplay.leaderboard.slots
    let pos1
    let pos2
    let pos3
    let pos4
    let pos5
    let LBComb2 ="combxtxt" + Math.round(+`${data.gameplay.leaderboard.ourplayer.position}` +1);
    let LBComb ="combxtxt" + `${data.gameplay.leaderboard.ourplayer.position}`;
    let LBRank2 ="NamePlayer" + Math.round(+`${data.gameplay.leaderboard.ourplayer.position}` +1);
    let LBRank ="NamePlayer" + `${data.gameplay.leaderboard.ourplayer.position}`;
    let TempourName
    let TempourPos

    
    if (data.gameplay.leaderboard.ourplayer.name != TempourName) {
        TempourName = data.gameplay.leaderboard.ourplayer.name
        TempourName.innerHTML ="" + data.gameplay.leaderboard.ourplayer.name + "";
    }
    if (data.gameplay.leaderboard.ourplayer.position != TempourPos) {
    TempourPos = data.gameplay.leaderboard.ourplayer.position
    TempourPos.innerHTML ="" + data.gameplay.leaderboard.ourplayer.position + "";
    }

    if (data.gameplay.leaderboard.ourplayer.position >5){
         pos1 = board[0].position;
         pos2 = +data.gameplay.leaderboard.ourplayer.position - 4;
         pos3 = +data.gameplay.leaderboard.ourplayer.position - 3;
         pos4 = +data.gameplay.leaderboard.ourplayer.position - 2;
         pos5 = +data.gameplay.leaderboard.ourplayer.position -1;
            if(data.gameplay.leaderboard.ourplayer.position > 5){
                document.getElementById("NamePlayer5").classList.add("PlayerOver");
                document.getElementById("combxtxt5").classList.add("CombOver");
            }else{
                document.getElementById(`${LBRank2}`).classList.contains('PlayerOver') 
                document.getElementById(`${LBRank2}`).classList.remove('PlayerOver');
                document.getElementById(`${LBComb2}`).classList.contains("CombOver")
                    document.getElementById(`${LBComb2}`).classList.remove("CombOver");
            }

    }
    else{
         pos1 = 0;
         pos2 = 1;
         pos3 = 2;
         pos4 = 3;
         pos5 = 4;
         if(data.gameplay.leaderboard.ourplayer.position < 5){
            document.getElementById(`${LBComb}`).classList.add("CombOver");
            document.getElementById(`${LBRank}`).classList.add("PlayerOver");
                if(document.getElementById(`${LBRank2}`).classList.contains("PlayerOver")){
                    document.getElementById(`${LBRank2}`).classList.remove("PlayerOver");}
                if(document.getElementById(`${LBComb2}`).classList.contains("CombOver")){
                    document.getElementById(`${LBComb2}`).classList.remove("CombOver");}
            }
        else{
            }
    }
                var x1 = "" + board[pos1].score,
                x1 = x1.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

                var x2 = "" + board[pos2].score,
                x2 = x2.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

                var x3 = "" + board[pos3].score,
                x3 = x3.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

                var x4 = "" + board[pos4].score,
                x4 = x4.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

                var x5 = "" + board[pos5].score,
                x5 = x5.replace(/\B(?=(\d{3})+(?!\d))/g, " ");


            if (board[0].name != TempName1) {
                TempName1 = board[0].name
                NamePlayer1.innerHTML ="" + board[0].name + "";
            }
            if (board[0].score != TempScore1) {
                TempScore1 = board[0].score
                ScorePlayer1.innerHTML ="" + x1 + "";
            }
            if (board[0].maxCombo != TempCombo1) {
                TempCombo1 = board[0].maxCombo
                ComboPlayer1.innerHTML ="" + board[0].maxCombo + "";
            }
            if (board[0].position != TempRankPL1) {
                TempRankPL1 = board[0].position
                RankPlayer1.innerHTML ="#" + board[0].position + "";
            }

            if (board[pos2].name != TempName2) {
                TempName2 = board[pos2].name
                NamePlayer2.innerHTML ="" + board[pos2].name + "";
            }
            if (board[pos2].score != TempScore2) {
                TempScore2 = board[pos2].score
                ScorePlayer2.innerHTML ="" + x2 + "";
            }
            if (board[pos2].maxCombo != TempCombo2) {
                TempCombo2 = board[pos2].maxCombo
                ComboPlayer2.innerHTML ="" + board[pos2].maxCombo + "";
            }
            if (board[pos2].position != TempRankPL2) {
                TempRankPL2 = board[pos2].position
                RankPlayer2.innerHTML ="#" + board[pos2].position + "";
            }

            if (board[pos3].name != TempName3) {
                TempName3 = board[pos3].name
                NamePlayer3.innerHTML ="" + board[pos3].name + "";
            }
            if (board[pos3].score != TempScore3) {
                TempScore3 = board[pos3].score
                ScorePlayer3.innerHTML ="" + x3 + "";
            }
            if (board[pos3].maxCombo != TempCombo3) {
                TempCombo3 = board[pos3].maxCombo
                ComboPlayer3.innerHTML ="" + board[pos3].maxCombo + "";
            }
            if (board[pos3].position != TempRankPL3) {
                TempRankPL3 = board[pos3].position
                RankPlayer3.innerHTML ="#" + board[pos3].position + "";
            }

            if (board[pos4].name != TempName4) {
                TempName4 = board[pos4].name
                NamePlayer4.innerHTML ="" + board[pos4].name + "";
            }
            if (board[pos4].score != TempScore4) {
                TempScore4 = board[pos4].score
                ScorePlayer4.innerHTML ="" + x4 + "";
            }
            if (board[pos4].maxCombo != TempCombo4) {
                TempCombo4 = board[pos4].maxCombo
                ComboPlayer4.innerHTML ="" + board[pos4].maxCombo + "";
            }
            if (board[pos4].position != TempRankPL4) {
                TempRankPL4 = board[pos4].position
                RankPlayer4.innerHTML ="#" + board[pos4].position + "";
            }

            if (board[pos5].name != TempName5) {
                TempName5 = board[pos5].name
                NamePlayer5.innerHTML ="" + board[pos5].name + "";
            }
            if (board[pos5].score != TempScore5) {
                TempScore5 = x5
                ScorePlayer5.innerHTML ="" + x5 + "";
            }
            if (board[pos5].maxCombo != TempCombo5) {
                TempCombo5 = board[pos5].maxCombo
                ComboPlayer5.innerHTML ="" + board[pos5].maxCombo + "";
            }       
            if (board[pos5].position != TempRankPL5) {
                TempRankPL5 = board[pos5].position
                RankPlayer5.innerHTML ="#" + board[pos5].position + "";
            }     
       }else{
        Scoreboard.style.transform = "translateX(-500px)";
       }
       
	if(tempStrainBase != JSON.stringify(data.menu.pp.strains)){
		tempLink = JSON.stringify(data.menu.pp.strains);
		smoothed = smooth(data.menu.pp.strains, smoothOffset);
		config.data.datasets[0].data = smoothed;
		config.data.labels = smoothed;
		configSecond.data.datasets[0].data = smoothed;
		configSecond.data.labels = smoothed;
		window.myLine.update();
		window.myLineSecond.update();
	}
	if(fullTime !== data.menu.bm.time.full){
		fullTime = data.menu.bm.time.full;
		onepart = 1350/fullTime;
	}
	if(seek !== data.menu.bm.time.current && fullTime !== undefined && fullTime != 0){
		seek = data.menu.bm.time.current;
		progressChart.style.width = onepart*seek+'px';
    }
    
    

	if (data.gameplay.hp.smooth > 0) {
		hpbar.style.width = (data.gameplay.hp.normal / 200) * 1300 + "px";
	} else {
		hpbar.style.width = 1300;
	}
    Score.update(play.score);

//------------------Star Rating--------------------------
    if (data.menu.bm.stats.SR != TempCurrentSR) {
        TempCurrentSR = data.menu.bm.stats.SR
		CurrentSR.innerHTML = `${data.menu.bm.stats.SR}` + "";
    }
    if (data.menu.bm.stats.fullSR > 0) {
		TotalSR.innerHTML = `${data.menu.bm.stats.fullSR}`  + "";
	} else {
		TotalSR.innerHTML = "";
    }
//--------------------UR & SB-------------------------
	
    
//---------------------------------------------
	
	if (data.gameplay.combo.current != '') {
		let comboData = data.gameplay.combo.current;
		combo.innerHTML = comboData;
	} else {
		combo.innerHTML = "";
    }
    if(data.gameplay.combo.max != tempmaxcomboData){
        tempmaxcomboData = data.gameplay.combo.max
		maxcombo.innerHTML = `${data.gameplay.combo.max}x`;
	}
    
    

    if((data.gameplay.hits[0] > 0 ) || (data.gameplay.hits.sliderBreaks > 0)){
        document.getElementById("maxcomboCont").style.transform = "scale(1)";
        document.getElementById("combtxt3").classList.add("ppOver");
        document.getElementById("combtxt3").classList.remove("ppclass2")
    }else{
        document.getElementById("maxcomboCont").style.transform = "scale(0)";
        document.getElementById("combtxt3").classList.add("ppclass2")
        document.getElementById("combtxt3").classList.remove("ppOver");
        
    }
//------------------Ranking--------------------------//

if(RankingState !== data.menu.state){
    RankingState = data.menu.state
    if(RankingState === 7 ){
        RankingStatus.style.transform = "translateY(0px)";
        RankingPPValues.style.transform = "translateX(0px)";
        BGBruh.style.transform = "scale(1)";
        bg.style.transform = "scale(1)";
        Square.style.transform = "scale(1)";
        RankScoreDIV.style.transform = "scale(1)";
        RankAccDIV.style.transform = "scale(1)";
        MaxRankComboDIV.style.transform = "scale(1)";
        RankURDIV.style.transform = "scale(1)";
        RankthreehunDIV.style.transform = "scale(1)";
        RankgekiDIV.style.transform = "scale(1)";
        RankhunDIV.style.transform = "scale(1)";
        RankfifDIV.style.transform = "scale(1)";
        RankSBDIV.style.transform = "scale(1)";
        RankMissDIV.style.transform = "scale(1)";
        mods.style.transform = "scale(1)";
        RankSRDIV.style.transform = "scale(1)";
        RankPPDIV.style.transform = "scale(1)";
    }else{
        RankingStatus.style.transform = "translateX(-500px)";
        RankingPPValues.style.transform = "translateX(500px)";
        BGBruh.style.transform = "scale(0)";
        bg.style.transform = "scale(0)";
        Square.style.transform = "scale(0)";
        RankScoreDIV.style.transform = "scale(0)";
        RankAccDIV.style.transform = "scale(0)";
        MaxRankComboDIV.style.transform = "scale(0)";
        RankURDIV.style.transform = "scale(0)";
        RankthreehunDIV.style.transform = "scale(0)";
        RankgekiDIV.style.transform = "scale(0)";
        RankhunDIV.style.transform = "scale(0)";
        RankfifDIV.style.transform = "scale(0)";
        RankSBDIV.style.transform = "scale(0)";
        RankMissDIV.style.transform = "scale(0)";
        mods.style.transform = "scale(0)";
        RankSRDIV.style.transform = "scale(0)";
        RankPPDIV.style.transform = "scale(0)";

    }
}

if(tempMods != data.menu.mods.str){
    tempMods = data.menu.mods.str
    if (tempMods == "" || tempMods == "NM"){
        mods.innerHTML = '';
    }
    else{
        mods.innerHTML = '';
        let modsApplied = tempMods.toLowerCase();
        
        if(modsApplied.indexOf('nc') != -1){
            modsApplied = modsApplied.replace('dt','')
        }
        if(modsApplied.indexOf('pf') != -1){
            modsApplied = modsApplied.replace('sd','')
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
}
/*----------------------------------- SqureTXT -----------------------------------*/
    if (data.menu.bm.stats.fullSR > 0) {
        RankSR.innerHTML = `${data.menu.bm.stats.fullSR}`  + "";
    } else {
        RankSR.innerHTML = "";
    }

    if(data.menu.bm.metadata.artist  != '') {
        Artist.innerHTML = data.menu.bm.metadata.artist +  " - ";
    }
    if(data.menu.bm.metadata.title  != '') {
        Title.innerHTML = data.menu.bm.metadata.title + " ";
    }
    if(data.menu.bm.metadata.difficulty  != '') {
        Diff.innerHTML = "["+data.menu.bm.metadata.difficulty+"]" ;
    }

    if (data.gameplay.hits.unstableRate > 0) {
		let URdata = data.gameplay.hits.unstableRate;
        RankUR.innerHTML = " " + Math.round(URdata) + " ";
	} else {
		RankUR.innerHTML = 0;
    }
    let TempRankingMaxComboData
    let MaxRankCombo = document.getElementById("MaxRankCombo");


    if(data.gameplay.combo.max != TempRankingMaxComboData){
        TempRankingMaxComboData = data.gameplay.combo.max
		MaxRankCombo.innerHTML = `${data.gameplay.combo.max}`;
    }
    
    let RankAcc = document.getElementById("RankAcc")

    if (data.gameplay.accuracy > 0) {
		let ACCdata = data.gameplay.accuracy;
		RankAcc.innerHTML = parseFloat(ACCdata).toFixed(2);
	} else {
		RankAcc.innerHTML = 0;
    }
    

/*----------------------------------- Left Thing -----------------------------------*/
    if(data.gameplay.hits[300] != temph300){
        temph300 = data.gameplay.hits[300]
        h300 = `${data.gameplay.hits[300]}`;
    }
    if(data.gameplay.hits[100] != temprankhun){
        temprankhun = data.gameplay.hits[100]
		rankhun.innerHTML = `${data.gameplay.hits[100]}  ` + "  ";
	}
    if(data.gameplay.hits[50] != temprankfifty){
        temprankfifty = data.gameplay.hits[50]
		rankfifty.innerHTML = `${data.gameplay.hits[50]}`;
	}
    if(data.gameplay.hits[0] != temprankmiss){
        temprankmiss = data.gameplay.hits[0]
		rankmiss.innerHTML = `${data.gameplay.hits[0]}`;
    }

    if(data.gameplay.hits.sliderBreaks != tempranksb){
        tempranksb = data.gameplay.hits.sliderBreaks
		RanksliderBreaks.innerHTML = `${data.gameplay.hits.sliderBreaks}`;
	}
    if(data.gameplay.hits.geki != tempRankgeki){
        tempRankgeki = data.gameplay.hits.geki
		Rankgeki.innerHTML = `${data.gameplay.hits.geki}`;
    }
    if(data.gameplay.hits[300] != tempRankthreehun){
        tempRankthreehun = data.gameplay.hits[300]
		Rankthreehun.innerHTML = `${data.gameplay.hits[300]}`;
	}
    if (data.gameplay.pp.current != '') {
		let RankPPData = data.gameplay.pp.current;
		RankPP.innerHTML = Math.round(RankPPData);
	} else {
		RankPP.innerHTML = "";
	}
    if (data.gameplay.combo.max != temprankcombo) {
        temprankcombo = data.gameplay.combo.max;
		rankcombo.innerHTML = `${data.gameplay.combo.max}`;
    }
    
/*----------------------------------- Right Thing -----------------------------------*/

if(data.menu.pp[100] != temprankSSPP){
    temprankSSPP = data.menu.pp[100]
    rankSSPP.innerHTML = `${data.menu.pp[100]}`;
}
if(data.menu.pp[99] != temprankninePP){
    temprankninePP = data.menu.pp[99]
    rankninePP.innerHTML = `${data.menu.pp[99]}`;
}
if(data.menu.pp[98] != temprankeightPP){
    temprankeightPP = data.menu.pp[98]
    rankeightPP.innerHTML = `${data.menu.pp[98]}`;
}
if(data.menu.pp[97] != tempranksevenPP){
    tempranksevenPP = data.menu.pp[97]
    ranksevenPP.innerHTML = `${data.menu.pp[97]}`;
}
if(data.menu.pp[95] != temprankfivePP){
    temprankfivePP = data.menu.pp[95]
    rankfivePP.innerHTML = `${data.menu.pp[95]}`;
}
if (data.gameplay.score != TempRankScore) {
    TempRankScore = data.gameplay.score
        var qdfs = "" + TempRankScore,
        qdfs = qdfs.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    Rankscore.innerHTML = qdfs + "";
}

/*----------------------------------- Rank -----------------------------------*/
let hits = data.gameplay.hits   
let rank = document.getElementById("Rank");

let params = {
    totalHits: 0,
    acc: 0.0,
    ratio300: 0,
    ratio50: 0,
    rank: ''
};

let hdfl = false;
if(data.menu.mods.str.includes("HD") || data.menu.mods.str.includes("FL")){
    hdfl = true;
}

//cyperdark's rank calculator logic 
params.totalHits = +hits[50] + +hits[100] + +hits[300] + +hits[0];
params.acc = params.totalHits > 0 ? (+hits[50] * 50 + +hits[100] * 100 + +hits[300] * 300) / (params.totalHits * 300) : 1;
params.ratio300 = +hits[300] / params.totalHits, params.ratio50 = +hits[50] / params.totalHits;

if (params.ratio300 == 1 || params.acc == 1) {
    params.rank = 'SS';
    if(hdfl == true){
        rank.style.color = '#D3D3D3';
        rank.style.textShadow = '0 0 0.5em #D3D3D3'
    } else{
        rank.style.color = '#d6c253';
        rank.style.textShadow = '0 0 0.5em #d6c253'
    }
}
else if (params.ratio300 > 0.9 && params.ratio50 <= 0.01 && hits[0] == 0) {
    params.rank = 'S';
    if(hdfl == true){
        rank.style.color = '#D3D3D3';
        rank.style.textShadow = '0 0 0.5em #D3D3D3'
    } else{
        rank.style.color = '#d6c253';
        rank.style.textShadow = '0 0 0.5em #d6c253'
    }
}
else if ((params.ratio300 > 0.8 && hits[0] == 0) || params.ratio300 > 0.9) {
    params.rank = 'A';
    rank.style.color = '#7ed653';
    rank.style.textShadow = '0 0 0.5em #7ed653'
}
else if ((params.ratio300 > 0.7 && hits[0] == 0) || params.ratio300 > 0.8) {
    params.rank = 'B';
    rank.style.color = '#53d4d6';
    rank.style.textShadow = '0 0 0.5em #53d4d6'
}
else if (params.ratio300 > 0.6) {
    params.rank = 'C';
    rank.style.color = '#d6538e';
    rank.style.textShadow = '0 0 0.5em #d6538e'
}
else {
    params.rank = 'D';
    rank.style.color = '#d65353';
    rank.style.textShadow = '0 0 0.75em #d65353'
}

rank.innerHTML = params.rank;


}
window.onload = function () {
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = new Chart(ctx, config);

    var ctxSecond = document.getElementById('canvasSecond').getContext('2d');
    window.myLineSecond = new Chart(ctxSecond, configSecond);
};

let config = {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            borderColor: 'rgba(255, 255, 255, 0)',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            data: [],
            fill: true,
        }]
    },
    options: {
        tooltips: { enabled: false },
        legend: {
            display: false,
        },
        elements: {
            line: {
                tension: 0.4,
                cubicInterpolationMode: 'monotone'
            },
            point: {
                radius: 0
            }
        },
        responsive: false,
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
            }
        }
    }
};

let configSecond = {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            borderColor: 'rgba(255, 255, 255, 0)',
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            data: [],
            fill: true,
        }]
    },
    options: {
        tooltips: { enabled: false },
        legend: {
            display: false,
        },
        elements: {
            line: {
                tension: 0.4,
                cubicInterpolationMode: 'monotone'
            },
            point: {
                radius: 0
            }
        },
        responsive: false,
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
            }
        }
    }
};
