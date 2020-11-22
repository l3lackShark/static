let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");

// ----------------------- Variables

//Animated Containers
let infoContainer = document.getElementById("info-container");
let trackContainer = document.getElementById("track-container");
let bgWrapper = document.getElementById("bg-wrapper");
let ppContainer = document.getElementById("pp-container");

// Map Info
let title = document.getElementById("title");
let artist = document.getElementById("artist");
let bg = document.getElementById("bg");

// Hits & PP
let hun = document.getElementById("h100");
let fifty = document.getElementById("h50");
let miss = document.getElementById("h0");
let pp = document.getElementById("pp");

// Rank
let rank = document.getElementById("rank");

let root = document.documentElement;


// Websocket
socket.onopen = () => {
  console.log("Successfully Connected");
};
socket.onclose = (event) => {
  console.log("Socket Closed Connection: ", event);
  socket.send("Client Closed!");
};
socket.onerror = (error) => {
  console.log("Socket Error: ", error);
};

// Temp Variables
let tempImg;
let tempTitle;
let tempArtist;
let gameState;
let hdfl;

function reflow(elt){
  console.log(elt.offsetHeight);
}

socket.onmessage = (event) => {
  let data = JSON.parse(event.data), hits = data.gameplay.hits;
  if (data.menu.mods.str.includes("HD") || data.menu.mods.str.includes("FL")) {
    hdfl = true;
  } else hdfl = false;

  // Rank Check
  if (hits.grade.current == 'SS'){
    if (hdfl == true) {
      rank.style.color = "#D3D3D3";
      rank.style.textShadow = "0 0 0.5rem #D3D3D3";
    } else {
      rank.style.color = "#d6c253";
      rank.style.textShadow = "0 0 0.5rem #d6c253";
    }
  } else if (hits.grade.current == 'S'){
    if (hdfl == true) {
      rank.style.color = "#D3D3D3";
      rank.style.textShadow = "0 0 0.5rem #D3D3D3";
    } else {
      rank.style.color = "#d6c253";
      rank.style.textShadow = "0 0 0.5rem #d6c253";
    }
  } else if (hits.grade.current == 'A'){
    rank.style.color = "#7ed653";
    rank.style.textShadow = "0 0 0.5rem #7ed653";
  } else if (hits.grade.current == 'B'){
    rank.style.color = "#53d4d6";
    rank.style.textShadow = "0 0 0.5rem #53d4d6";
  } else if (hits.grade.current == 'C'){
    rank.style.color = "#d6538e";
    rank.style.textShadow = "0 0 0.5rem #d6538e";
  } else {
    rank.style.color = "#d6c253";
    rank.style.textShadow = "0 0 0.5rem #d6c253";
  } 
 // rank.innerHTML = (hits.grade.current == "" ? "SS" : hits.grade.current);
 if (hits.grade.current == "") {
   rank.innerHTML = "SS";
 } else if (hits.grade.current != rank.innerHTML) {
    rank.innerHTML = hits.grade.current;
    rank.classList.remove("click");
    reflow(rank);
    rank.classList.add("click");
  }

  // Background Image Check
  if (tempImg !== data.menu.bm.path.full) {
    tempImg = data.menu.bm.path.full;
    let img = data.menu.bm.path.full.replace(/#/g, "%23").replace(/%/g, "%25");
    bg.setAttribute(
      "src",
      `http://127.0.0.1:24050/Songs/${img}?a=${Math.random(10000)}`
    );
  }

  // Game State Check
  if (gameState !== data.menu.state) {
    gameState = data.menu.state;
    //Playing State
    if (gameState === 2) {
      bg.style.cssText = "width: 500px; height: 500px; border-radius: 50%; position: absolute; top: -100px; left: -200px;";
      trackContainer.style.transform = "translateY(-45px) scale(0.85)";
      infoContainer.style.transform = "translateY(0)";
    } else {
    //Menu State
      bg.style.cssText = "width: 100%; height: 100%; border-radius: 0; position: absolute; top: 0; left: 0;";
      trackContainer.style.transform = "translateY(0) scale(1)";
      infoContainer.style.transform = "translateY(500px)";
    }
  }
  // Title & Artist Check
  if (tempTitle !== data.menu.bm.metadata.title) {
    tempTitle = data.menu.bm.metadata.title;
    title.innerHTML = tempTitle;
  }
  if (tempArtist !== data.menu.bm.metadata.artist) {
    tempArtist = data.menu.bm.metadata.artist;
    artist.innerHTML = tempArtist;
  }

  // PP & Hits Animation
  if (Math.round(data.gameplay.pp.current) != pp.innerHTML) {
    let ppData = data.gameplay.pp.current;
    pp.innerHTML = Math.round(ppData);
    ppContainer.classList.remove("click");
    reflow(ppContainer);
    ppContainer.classList.add("click");
  }
  if (hits[100] != h100.innerHTML) {
    hun.innerHTML = hits[100];
    hun.classList.remove("click");
    reflow(hun);
    hun.classList.add("click");
  }
  if (hits[50] != h50.innerHTML) {
    fifty.innerHTML = hits[50];
    fifty.classList.remove("click");
    reflow(fifty);
    fifty.classList.add("click");
  }
  if (hits[0] != h0.innerHTML) {
    miss.innerHTML = hits[0];
    miss.classList.remove("click");
    reflow(miss);
    miss.classList.add("click");
  }
};
