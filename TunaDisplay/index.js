let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");
let mapid = document.getElementById('mapid');

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


socket.onmessage = event => {
    let data = JSON.parse(event.data);

    let h100 = data.gameplay.hits[100];
    let h50 = data.gameplay.hits[50];
    let hMiss = data.gameplay.hits[0];

    if(tempImg !== data.menu.bm.path.full){
        tempImg = data.menu.bm.path.full
        let img = data.menu.bm.path.full.replace(/#/g,'%23').replace(/%/g,'%25')
        bg.setAttribute('src',`http://127.0.0.1:24050/Songs/${img}?a=${Math.random(10000)}`)
    }
    if(gameState !== data.menu.state){
        gameState = data.menu.state
        if(gameState === 2 || gameState === 14){
            hit.style.transform = "translateY(-15px)"
        }else{
            hit.style.transform = "translateY(-100%)"
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

    if(h100 > 0){
        hun.innerHTML = h100
    }else{
        hun.innerHTML = 0
    }
    if(h50 > 0){
        fifty.innerHTML = h50
    }else{
        fifty.innerHTML = 0
    }
    if(hMiss > 0){
        miss.innerHTML = hMiss
    }else{
        miss.innerHTML = 0
    }
}
