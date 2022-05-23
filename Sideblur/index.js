let socket = new ReconnectingWebSocket(`ws://${location.host}/ws`);
let queryString = window.location.search;
queryString = queryString.replace("?", "");
let queries = {};
let params = queryString.split("&");
for (const param of params) {
	let keyValue = param.split("=");
	queries[keyValue[0]] = keyValue[1];
}

socket.onopen = () => console.log("Successfully Connected");

socket.onclose = (event) => {
	console.log("Socket Closed Connection: ", event);
	socket.send("Client Closed!");
};

socket.onerror = (error) => console.log("Socket Error: ", error);

let bgs = document.getElementsByClassName("bg");
let ov = document.getElementById("overlay");
let metadata = document.getElementById("metadata");
let metadataString = document.getElementById("metadata-string");
let metadataMapId = document.getElementById("metadata-map-id");
let metadataMap = document.getElementById("metadata-map");
let metadataStars = document.getElementById("metadata-stars");
let metadataCSAR = document.getElementById("metadata-csar");
let metadataODHP = document.getElementById("metadata-odhp");
let metadataBPM = document.getElementById("metadata-bpm");
let hits = document.getElementById("hits");
let hits0 = document.getElementById("hits0");
let hits50 = document.getElementById("hits50");
let hits100 = document.getElementById("hits100");
let ppString = document.getElementById("pp");
let grade = document.getElementById("grade");

let statesEnum = {
	0: "MainMenu",
	1: "EditingMap",
	2: "Playing",
	3: "GameShutdownAnimation",
	4: "SongSelectEdit",
	5: "SongSelect",
	6: "WIP_NoIdeaWhatThisIs",
	7: "ResultsScreen",
	10: "GameStartupAnimation",
	11: "MultiplayerRooms",
	12: "MultiplayerRoom",
	13: "MultiplayerSongSelect",
	14: "MultiplayerResultsscreen",
	15: "OsuDirect",
	17: "RankingTagCoop",
	18: "RankingTeam",
	19: "ProcessingBeatmaps",
	22: "Tourney",
};

let temp = {
	state: null,
	bg: null,
	id: null,
	sr: null,
	ur: null,
	hits: {
		0: null,
		50: null,
		100: null,
	},
	pp: null,
	grade: null,
};

let od = new Odometer({
	el: metadataMapId,
	value: 1000000,
	format: "d",
});

let pp = new Odometer({
	el: ppString,
	value: 0,
	format: "(d).dd",
});

if (queries?.side?.match(/top|left|right|bottom|none/)) {
	metadata.classList.add(queries.side);
	ov.classList.add("ov-" + queries.side);
} else {
	metadata.classList.add("top");
	metadata.classList.add("ov-top");
}

socket.onmessage = (event) => {
	try {
		let data = JSON.parse(event.data);
		if (temp.id != data.menu.bm.id) {
			temp.id = data.menu.bm.id;
			let { artist, title, difficulty } = data.menu.bm.metadata;
			metadataString.textContent = `${artist} - ${title} [${difficulty}]`;

			metadataMapId.textContent = temp.id;
		}

		if (
			temp.sr != data.menu.bm.stats.fullSR ||
			temp.id != data.menu.bm.id
		) {
			temp.sr = data.menu.bm.stats.fullSR;
			let { CS, AR, OD, HP, fullSR, BPM } = data.menu.bm.stats;

			metadataStars.textContent = `${fullSR.toFixed(2)}☆`;
			metadataCSAR.textContent = `CS${CS.toFixed(1)} AR${AR.toFixed(1)}`;
			metadataODHP.textContent = `OD${OD.toFixed(1)} HP${HP.toFixed(1)}`;
			metadataBPM.textContent = `BPM: ${BPM.max}`;
		}

		if (temp.bg != data.menu.bm.path.full) {
			temp.bg = data.menu.bm.path.full;
			let img = data.menu.bm.path.full
				.replace(/#/g, "%23")
				.replace(/%/g, "%25");
			for (const bg of bgs) {
				bg.setAttribute(
					"src",
					`http://${location.host}/Songs/${img}?a=${Math.random(
						10000
					)}`
				);
			}
		}

		if (temp.hits[0] != data.gameplay.hits[0]) {
			temp.hits[0] = data.gameplay.hits[0];
			hits0.textContent = temp.hits[0];
		}

		if (temp.hits[50] != data.gameplay.hits[50]) {
			temp.hits[50] = data.gameplay.hits[50];
			hits50.textContent = temp.hits[50];
		}

		if (temp.hits[100] != data.gameplay.hits[100]) {
			temp.hits[100] = data.gameplay.hits[100];
			hits100.textContent = temp.hits[100];
		}

		if (temp.pp != data.gameplay.pp.current) {
			temp.pp = data.gameplay.pp.current;
			ppString.textContent = data.gameplay.pp.current;
		}

		if (temp.grade != data.gameplay.hits.grade.current) {
			temp.grade = data.gameplay.hits.grade.current;
			if (
				data.menu.mods.str.includes("HD") ||
				data.menu.mods.str.includes("FL")
			) {
				hdfl = true;
			} else hdfl = false;

			if (data.gameplay.hits.grade.current === "") {
				grade.textContent = "SS";
			} else grade.textContent = data.gameplay.hits.grade.current;

			if (grade.textContent == "SS") {
				if (hdfl == true) {
					grade.style.color = "#E4E4E4";
				} else {
					grade.style.color = "#FFFB8B";
				}
			} else if (grade.textContent == "S") {
				if (hdfl == true) {
					grade.style.color = "#E4E4E4";
				} else {
					grade.style.color = "#FFFB8B";
				}
			} else if (grade.textContent == "A") {
				grade.style.color = "#9DF9AA";
			} else if (grade.textContent == "B") {
				grade.style.color = "#9DACF9";
			} else if (grade.textContent == "C") {
				grade.style.color = "#ED9DF9";
			} else {
				grade.style.color = "#F99D9D";
			}
		}

		if (temp.state != data.menu.state) {
			if (temp.state == 2 || temp.state == 7 || temp.state == 14) {
				metadataMap.style.transform = "translate(-90px, 0px)";
			}
			if (temp.state == 5 && data.menu.state == 7) {
				return;
			}
			temp.state = data.menu.state;

			if (temp.state == 2 || temp.state == 7 || temp.state == 14) {
				metadata.style.width = "310px";
				metadataMap.style.transform = "translate(-90px, 0px)";
				setTimeout(() => {
					hits.style.transform = "translateY(0px)";
					metadata.style.height = "160px";
					metadataMap.style.transform = "translate(-90px, 60px)";
				}, 500);

				if (metadataString.getBoundingClientRect().width >= 290) {
					metadataString.classList.add("over");
				} else {
					metadataString.classList.remove("over");
				}
			} else {
				setTimeout(() => {
					metadata.style.width = "150px";
					metadataMap.style.transform = "translate(0px, 0px)";
				}, 500);
				metadata.style.height = "40px";
				metadataString.classList.remove("over");
				hits.style.transform = "translateY(125px)";
			}

			if (temp.state == 7 || temp.state == 14) {
				ppString.style.color = "#AAFFAA";
				ppString.style.transform = "translateX(-10px) scale(1.2)";
			} else if (temp.state == 2) {
				ppString.style.color = "#FFFFFF";
				ppString.style.transform = "translateX(0px) scale(1)";
			} else {
				ppString.style.color = "#FFFFFF";
				ppString.style.transform = "translateX(0px) scale(1)";
			}
		}
	} catch (err) {
		console.log(err);
	}
};
