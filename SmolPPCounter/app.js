let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");

// Map Info
let title = document.getElementById("title");
let artist = document.getElementById("artist");
let bg = document.getElementById("bg");
let rank = document.getElementById('rank')
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

let tempImg;
let tempTitle;
let tempArtist;
let gameState;
let hdfl;
let fifold = 0;
let missold = 0;
let hunold = 0;

 function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

socket.onmessage = (event) => {
  let data = JSON.parse(event.data), hits = data.gameplay.hits;
  document.getElementById('pp').innerHTML = data.gameplay.pp.current;
  document.getElementById('greend').innerHTML = data.gameplay.hits[100];
  document.getElementById('brownd').innerHTML = data.gameplay.hits[50];
  document.getElementById('redd').innerHTML = data.gameplay.hits[0];

    if (data.gameplay.hits[0] > missold) {
		missold = data.gameplay.hits[0]
		document.getElementById('squarered').style.background = '#C41A1F';
		sleep(1000).then(() => {
			document.getElementById('squarered').style.background = '#6E1D1F';
		})
	}

	if (data.gameplay.hits[50] > fifold) {
		fifold = data.gameplay.hits[50]
		document.getElementById('squarebrown').style.background = '#CCA82D';
		sleep(1000).then(() => {
			document.getElementById('squarebrown').style.background = '#6C4C1C';
		})
	}

	if (data.gameplay.hits[100] > hunold) {
		hunold = data.gameplay.hits[100]
		document.getElementById('squaregreen').style.background = '#26943C';
		sleep(1000).then(() => {
			document.getElementById('squaregreen').style.background = '#134C1D';
		})
	}

  // Background Image Check
  if (tempImg !== data.menu.bm.path.full) {
    tempImg = data.menu.bm.path.full;
    let img = data.menu.bm.path.full.replace(/#/g, "%23").replace(/%/g, "%25");
    jQuery($('#bg').fadeOut(1000, function() {
    	bg.setAttribute(
      "src",
      `http://127.0.0.1:24050/Songs/${img}?a=${Math.random(10000)}`
    );
    	$('#bg').fadeIn(1000);
    }))
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
  }
  // Game State Check
  if (gameState != data.menu.state) {
    gameState = data.menu.state;
    if (gameState == 2) {
      jQuery($('#title').animate({margin: "0 auto"}, function() {
      	$('#rank').fadeIn(1000)
      	$('#artist').fadeIn(1000)
      	$('#ppCont').animate({marginLeft: "215px"})
      	jQuery($('#squaregreen').fadeIn(1000))
		jQuery($('#squarebrown').fadeIn(1000))
		jQuery($('#squarered').fadeIn(1000))
		jQuery($('#greend').fadeIn(1000))
		jQuery($('#brownd').fadeIn(1000))
		jQuery($('#redd').fadeIn(1000))
      }));
    } else {
    	jQuery($('#rank').fadeOut(1000, function() {
    		$('#title').animate({margin: "50px auto"});
    		$('#artist').fadeOut(1000);
    		hunold = 0;
    		missold = 0;
    		fifold = 0;
    		jQuery($('#squaregreen').fadeOut(1000))
    		jQuery($('#squarebrown').fadeOut(1000))
    		jQuery($('#squarered').fadeOut(1000))
    		jQuery($('#greend').fadeOut(1000))
    		jQuery($('#brownd').fadeOut(1000))
    		jQuery($('#redd').fadeOut(1000))
    		$('#ppCont').animate({marginLeft: "300px"});
    	}));
    }
}
}