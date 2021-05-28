let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");

socket.onopen = () => console.log("Successfully Connected");

socket.onclose = event => {
  console.log("Socket Closed Connection: ", event);
  socket.send("Client Closed!");
};

socket.onerror = error => console.log("Socket Error: ", error);

let pp = new CountUp('pp', 0, 0, 0, .5, { useEasing: true, useGrouping: true, separator: "", decimal: "." })
let h100 = new CountUp('h100', 0, 0, 0, .5, { useEasing: true, useGrouping: true, separator: "", decimal: "." })
let h50 = new CountUp('h50', 0, 0, 0, .5, { useEasing: true, useGrouping: true, separator: "", decimal: "." })
let h0 = new CountUp('h0', 0, 0, 0, .5, { useEasing: true, useGrouping: true, separator: "", decimal: "." })
let title = document.getElementById("title");
let bg = document.getElementById("bg");

let tempImg;
let tempTitle;


socket.onmessage = event => {
	let data = JSON.parse(event.data);
    if(tempImg !== data.menu.bm.path.full){
        tempImg = data.menu.bm.path.full;
        data.menu.bm.path.full = data.menu.bm.path.full.replace(/#/g,'%23').replace(/%/g,'%25');
        bg.setAttribute('src',`http://127.0.0.1:24050/Songs/${data.menu.bm.path.full}?a=${Math.random(10000)}`);
	}
	try {
		let data = JSON.parse(event.data), menu = data.menu, play = data.gameplay;
		pp.update(play.pp.current);
		h100.update(play.hits[100]);
		h50.update(play.hits[50]);
		h0.update(play.hits[0]);
	}	catch (err) { console.log(err); };
	
	if(tempTitle !== ` ${data.menu.bm.metadata.artist} - ${data.menu.bm.metadata.title} [${data.menu.bm.metadata.difficulty}]` ){
        tempTitle = ` ${data.menu.bm.metadata.artist} - ${data.menu.bm.metadata.title} [${data.menu.bm.metadata.difficulty}]`;
        title.innerHTML = tempTitle;
    }
	
};
