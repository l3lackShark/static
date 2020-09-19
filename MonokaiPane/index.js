let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");

let bg = document.getElementById("bg");
let title = document.getElementById("title");
let artist = document.getElementById("artist");
let diff = document.getElementById("diff");
let mapper = document.getElementById("mapper");
let hit = document.getElementById("hits");
let hun = document.getElementById("100");
let fifty = document.getElementById("50");
let miss = document.getElementById("0");
let pp = document.getElementById("pp");
let infoContainer = document.getElementById("infoContainer");


socket.onopen = () => {
    console.log("Successfully Connected");
};

socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
    socket.send("Client Closed!")
};

socket.onerror = error => {
    console.log("Socket Error: ", error);
};
let tempImg;
let tempTitle;
let tempArtist;
let tempDiff;
let tempMapper;
let ppData;
let gameState;

let rank = document.getElementById('rank');
let params = {
    totalHits: 0,
    acc: 0.0,
    ratio300: 0,
    ratio50: 0,
    rank: ''
};

$(".rank").fadeToggle();

function toggleFunction(){
    $(".rank").fadeToggle();
    $(".title").fadeToggle();
    $(".artist").fadeToggle();
}
let toggleStatus;

socket.onmessage = event => {
    let data = JSON.parse(event.data), hits = data.gameplay.hits; 

    if(tempImg !== data.menu.bm.path.full){
        tempImg = data.menu.bm.path.full
        let img = data.menu.bm.path.full.replace(/#/g,'%23').replace(/%/g,'%25')
        bg.setAttribute('src',`http://127.0.0.1:24050/Songs/${img}?a=${Math.random(10000)}`)
    }
    if(data.menu.bm.rankedStatus === 7){
        $("#rankedColor").attr("class", "LOVED");
        $("#rankedStatus").removeClass("fa-angle-double-up fa-question fa-check").addClass("fa-heart");
    } else if(data.menu.bm.rankedStatus === 4){
        $("#rankedColor").attr("class", "RANKED");
        $("#rankedStatus").removeClass("fa-heart fa-question fa-check").addClass("fa-angle-double-up");  
    } else if(data.menu.bm.rankedStatus === 5){
        $("#rankedColor").attr("class", "QUALIFIED");
        $("#rankedStatus").removeClass("fa-heart fa-question fa-angle-double-up").addClass("fa-check");  
    }else {
        $("#rankedColor").attr("class", "GRAVEYARD");
        $("#rankedStatus").removeClass("fa-heart fa-angle-double-up fa-check").addClass("fa-question");  
    }

    if(gameState !== data.menu.state){
        gameState = data.menu.state
        if(gameState === 2 || gameState === 14){
            hit.style.transform = "translateY(0)";
            infoContainer.style.transform = "translateY(-1.225rem)";
            toggleStatus = setInterval(toggleFunction, 10000)
        }else{
            hit.style.transform = "translateY(calc(100% - 0.25rem))";
            infoContainer.style.transform = "translate(0)";
            clearInterval(toggleStatus);
            $(".rank").fadeOut();
            $(".title").fadeIn();
            $(".artist").fadeIn();
        }
    }
    if(tempDiff !== data.menu.bm.metadata.difficulty){
        tempDiff = data.menu.bm.metadata.difficulty;
        diff.innerHTML = tempDiff
    }
    if(tempMapper !== data.menu.bm.metadata.mapper){
        tempMapper = data.menu.bm.metadata.mapper;
        mapper.innerHTML = tempMapper
    }
    if(tempTitle !== data.menu.bm.metadata.title){
        tempTitle = data.menu.bm.metadata.title;
        title.innerHTML = tempTitle
    }
    if(tempArtist !== data.menu.bm.metadata.artist){
        tempArtist = data.menu.bm.metadata.artist;
        artist.innerHTML = tempArtist
    }
    if (data.gameplay.pp.current != '') {
		let ppData = data.gameplay.pp.current;
		pp.innerHTML = Math.round(ppData)
	} else {
		pp.innerHTML = 0
    }

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
    };

    rank.innerHTML = params.rank;

    if(hits[100] > 0){
        hun.innerHTML = hits[100];
    }else{
        hun.innerHTML = 0
    }
    if(hits[50] > 0){
        fifty.innerHTML = hits[50]
    }else{
        fifty.innerHTML = 0
    }
    if(hits[0] > 0){
        miss.innerHTML = hits[0]
    }else{
        miss.innerHTML = 0
    }
}