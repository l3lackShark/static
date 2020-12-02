let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");

let progressChart = document.getElementById("progress");
let strainGraph = document.getElementById("strainGraph");
    
let pp = document.getElementById("pp");
let ifppCont2 = document.getElementById("ifppCont2");
let pptxt = document.getElementById("pptxte");
let combo = document.getElementById("combo");
let score = document.getElementById("score");
let accuracy = document.getElementById("accuracy");
let hun = document.getElementById("cs");
let fifty = document.getElementById("ar");
let miss = document.getElementById("od");
let maxcombo = document.getElementById("maxcombo")


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
let comboData;
let tempppfcData
let tempmaxcomboData


socket.onopen = () => console.log("Successfully Connected");

socket.onclose = event => {
  console.log("Socket Closed Connection: ", event);
  socket.send("Client Closed!");
};

socket.onerror = error => console.log("Socket Error: ", error);

let Score = new CountUp('Score', 0, 0, 0, .5, { useEasing: true, useGrouping: true, separator: " ", decimal: "." })
let Acc = new CountUp('Acc', 0, 0, 2, .5, { useEasing: true, useGrouping: true, separator: " ", decimal: "." })
let urtxt = new CountUp('urtxt', 0, 0, 2, .5, { useEasing: true, useGrouping: true, separator: " ", decimal: "." })
let yeahhh = document.getElementById("yeahhh");


socket.onmessage = event => {
  try {
    let data = JSON.parse(event.data), menu = data.menu, play = data.gameplay;
    Score.update(play.score);
    Acc.update(play.accuracy);
    urtxt.update(play.hits.unstableRate);

    document.documentElement.style.setProperty('--progress', `${(menu.bm.time.current / menu.bm.time.full * 100).toFixed(2)}%`);
    
    if(gameState !== data.menu.state){
        gameState = data.menu.state;
        if(gameState === 2 ){
        Scoreboard.style.transform = "translateY(0px)";
        Scoreboard.style.opacity = "1";

        URDiv.style.transform = "translateY(0px)";
        URDiv.style.opacity = "1";

        HitDiv.style.transform = "translateY(0px)";       
        HitDiv.style.opacity = "1";

        strainGraph.style.transform = "translateX(0px)";       
        strainGraph.style.opacity = "1";

        man.style.transform = "translateY(0px)";       
        man.style.opacity = "1";

        comboCont.style.transform = "translateY(0px)";       
        comboCont.style.opacity = "1";

        adsdas.style.transform = "translateY(0px)";       
        adsdas.style.opacity = "1";

        Accdiv.style.transform = "translateY(0px)";       
        Accdiv.style.opacity = "1";

        Rankdiv.style.transform = "translateX(0px)";       
        Rankdiv.style.opacity = "1"; 
        
        hpbar.style.transform = "translateX(0px)";       
        hpbar.style.opacity = "1"; 
        
        Scorediv.style.transform = "translateX(0px)";       
        Scorediv.style.opacity = "1"; 
        hpbar.style.opacity = "scale(0)";

        man2.style.transform = "scale(1)";
        man2.style.transform = "translateX(0px)";
        man2.style.opacity = "1";

        maxcomboConte.style.transform = "translateX(0px)";
        maxcomboConte.style.opacity = "1";
    }else{
        Scoreboard.style.transform = "translateX(50px)";       
        Scoreboard.style.opacity = "0";

        URDiv.style.transform = "translateX(100px)";       
        URDiv.style.opacity = "0";

        HitDiv.style.transform = "translateY(50px)"; 
        HitDiv.style.opacity = "0";      

        strainGraph.style.transform = "translateY(50px)";       
        strainGraph.style.opacity = "0";

        man.style.transform = "translateY(100px)"; 
        man.style.opacity = "0";  

        comboCont.style.transform = "translateY(100px)"; 
        comboCont.style.opacity = "0";

        adsdas.style.transform = "translateX(200px)"; 
        adsdas.style.opacity = "0";  

        Accdiv.style.transform = "translateY(-40px)"; 
        Accdiv.style.opacity = "0";  
        
        Rankdiv.style.transform = "translateX(20px)"; 
        Rankdiv.style.opacity = "0";  

        hpbar.style.transform = "translateX(-100px)"; 
        hpbar.style.opacity = "0"; 
        hpbar.style.opacity = "scale(0,8)";
    
        Scorediv.style.transform = "translateY(20px)"; 
        Scorediv.style.opacity = "0";  

        man2.style.opacity = "0";
        man2.style.transform = "translateX(-150px)";
        man2.style.transform = "scale(0.5)";

        maxcomboConte.style.transform = "translateX(-150px)";
        maxcomboConte.style.transform = "scale(0)";
        maxcomboConte.style.opacity = "0";
    }
}
    
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

if(data.gameplay.leaderboard.hasLeaderboard == true && data.gameplay.leaderboard.slots[data.gameplay.leaderboard.slots.length-1].position > 5 && gameState === 2){
    Scoreboard.style.opacity = "1";       
    Scoreboard.style.transform = "translateX(0px)";   


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

    if (data.gameplay.leaderboard.ourplayer.position = 5){
        NamePlayer1.classList.remove('PlayerOver');
        NamePlayer2.classList.remove('PlayerOver');
        NamePlayer3.classList.remove('PlayerOver');
        NamePlayer4.classList.remove('PlayerOver');
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
    } }else{
        Scoreboard.style.transform = "translateX(-150px)";  
        Scoreboard.style.opacity = "0";  
       }
       if (data.gameplay.hp.smooth > 0) {
        hpbar.style.width = (data.gameplay.hp.smooth / 200) * 1300 + "px";
	} else {
		hpbar.style.width = 1300;
	}
    if(tempStrainBase != JSON.stringify(data.menu.pp.strains)){
		tempStrainBase = JSON.stringify(data.menu.pp.strains);
		smoothed = smooth(data.menu.pp.strains, smoothOffset);
		config.data.datasets[0].data = smoothed;
		config.data.labels = smoothed;
		configSecond.data.datasets[0].data = smoothed;
		configSecond.data.labels = smoothed;
		window.myLine.update();
		window.myLineSecond.update();
	}
	if(fullTime !== data.menu.bm.time.mp3){
		fullTime = data.menu.bm.time.mp3;
		onepart = 280/fullTime;
	}
	if(seek !== data.menu.bm.time.current && fullTime !== undefined && fullTime != 0){
		seek = data.menu.bm.time.current;
		progressChart.style.width = onepart*seek+'px';
    }

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

    if (data.gameplay.pp.fc != '') {
		let ifppData = data.gameplay.pp.fc;
		ifpp.innerHTML = Math.round(ifppData);
	} else {
		ifpp.innerHTML = "";
	}
    if (data.gameplay.pp.current != '') {
		let ppData = data.gameplay.pp.current;
		pp.innerHTML = Math.round(ppData);
	} else {
		pp.innerHTML = "";
	}

    if(data.gameplay.hits[100] != temphun){
        temphun = data.gameplay.hits[100]
        h100.innerHTML = `${data.gameplay.hits[100]} <hr>`;
        $("#h100").removeClass("click");
        $("#h100").width(); 
        $("#h100").addClass("click");;
	}
    if(data.gameplay.hits[50] != tempfifty){
        tempfifty = data.gameplay.hits[50]
        h50.innerHTML = `${data.gameplay.hits[50]} <hr>`;
      $("#h50").removeClass("click");
      $("#h50").width(); // trigger a DOM reflow
      $("#h50").addClass("click");
	}
    if(data.gameplay.hits[0] != tempmiss){
        tempmiss = data.gameplay.hits[0]
        h0.innerHTML = `${data.gameplay.hits[0]} <hr>`;
        $("#h0").removeClass("click");
        $("#h0").width(); // trigger a DOM reflow
        $("#h0").addClass("click");

    }
    if(data.gameplay.combo.current < data.gameplay.combo.max){
        
        document.getElementById("maxcomboConte").style.transform = "scale(1)";
        document.getElementById("maxcomboConte").style.transform = "translateX(0px)";
        document.getElementById("maxcomboConte").style.opacity = "1";
    }else{
        document.getElementById("maxcomboConte").style.opacity = "0";
        document.getElementById("maxcomboConte").style.transform = "translateX(-150px)";
        document.getElementById("maxcomboConte").style.transform = "scale(0.5)";
    }

    if((data.gameplay.hits[0] > 0 ) || (data.gameplay.hits.sliderBreaks > 0)){
        document.getElementById("man2").style.transform = "scale(1)";
        document.getElementById("man2").style.transform = "translateX(0px)";
        document.getElementById("man2").style.opacity = "1";
            

    }else{
        document.getElementById("man2").style.opacity = "0";
        document.getElementById("man2").style.transform = "translateX(-150px)";
        document.getElementById("man2").style.transform = "scale(0.5)";
    }


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

let PlayerRank = data.gameplay.hits.grade.current;

/*if (PlayerRank == "SS" || data.gameplay.hits.grade.current == "") {
    
    if(hdfl == true){
        rank.style.color = '#D3D3D3';
        rank.style.textShadow = '0 0 0.5em #D3D3D3'
    } else{
        rank.style.color = '#d6c253';
        rank.style.textShadow = '0 0 0.5em #d6c253'
    }
}*/
if (PlayerRank == "D"){
    params.rank = 'D';
    rank.style.color = '#d65353';
    rank.style.textShadow = '0 0 0.75em #d65353'}
else if (PlayerRank == "S") {
    params.rank = 'S';
    if(hdfl == true){
        rank.style.color = '#D3D3D3';
        rank.style.textShadow = '0 0 0.5em #D3D3D3'
    } else{
        rank.style.color = '#d6c253';
        rank.style.textShadow = '0 0 0.5em #d6c253'
    }
}
else if (PlayerRank == "A") {
    params.rank = 'A';
    rank.style.color = '#7ed653';
    rank.style.textShadow = '0 0 0.5em #7ed653'
}
else if (PlayerRank == "B") {
    params.rank = 'B';
    rank.style.color = '#53d4d6';
    rank.style.textShadow = '0 0 0.5em #53d4d6'
}
else if (PlayerRank == "C") {
    params.rank = 'C';
    rank.style.color = '#d6538e';
    rank.style.textShadow = '0 0 0.5em #d6538e'
}
else {
    params.rank = 'S+';
    if(hdfl == true){
        rank.style.color = '#D3D3D3';
        rank.style.textShadow = '0 0 0.5em #D3D3D3'
    } else{
        rank.style.color = '#d6c253';
        rank.style.textShadow = '0 0 0.5em #d6c253'
    }
}

rank.innerHTML = params.rank;

  } catch (err) { console.log(err); };
};

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
