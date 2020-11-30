let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");
let mapid = document.getElementById('mapid');

/*---------------------------------- GAMEPLAY ----------------------------------*/
let pp = document.getElementById("pp");
let ifppCont2 = document.getElementById("ifppCont2");
let pptxt = document.getElementById("pptxte");
let combo = document.getElementById("combo");
let score = document.getElementById("score");
let accuracy = document.getElementById("accuracy");
let hun = document.getElementById("cs");
let fifty = document.getElementById("ar");
let miss = document.getElementById("od");


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
    let data = JSON.parse(event.data);

    if(gameState !== data.menu.state){
        gameState = data.menu.state;
        if(gameState === 2 ){
            PPCounter.style.transform = "translateY(0)";
            
        }else{
            PPCounter.style.transform = "translateY(500px)";         
        }
    }

    if(data.gameplay.pp.fc != tempppfcData){
        tempppfcData = data.gameplay.pp.fc
        ifppCont2.innerHTML = "FC: "+`${data.gameplay.pp.fc}`+"PP";
    }

    if (data.gameplay.pp.current != '') {
		let ppData = data.gameplay.pp.current;
		pp.innerHTML = Math.round(ppData);
	} else {
		pp.innerHTML = "";
	}

    if(data.gameplay.hits.sliderBreaks != tempSB){
        tempSB = data.gameplay.hits.sliderBreaks
		SB.innerHTML = `${data.gameplay.hits.sliderBreaks} xSB`;
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
    
    
    if((data.gameplay.hits[0] > 0 ) || (data.gameplay.hits.sliderBreaks > 0)){
        document.getElementById("ifppCont2").style.transform = "scale(1)";
        document.getElementById("pptxt3").classList.add("ppOver");
        document.getElementById("pptxt3").classList.remove("ppclass2")
    }else{
        document.getElementById("ifppCont2").style.transform = "scale(0)";
        document.getElementById("pptxt3").classList.add("ppclass2")
        document.getElementById("pptxt3").classList.remove("ppOver");   
    }
    if(data.gameplay.hits.sliderBreaks > 0){
        document.getElementById("SBCont").style.transform = "scale(1)";
    }else{
        document.getElementById("SBCont").style.transform = "scale(0)";
    }


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
