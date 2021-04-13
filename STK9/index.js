let socket = new ReconnectingWebSocket("ws://" + location.host + "/ws");
let mapid = document.getElementById('mapid');

// NOW PLAYING
let mapContainer = document.getElementById("mapContainer");
let mapTitle = document.getElementById("mapTitle");
let mapDifficulty = document.getElementById("mapDifficulty");

// TEAM OVERALL SCORE
let teamBlueName = document.getElementById("teamBlueName");
let teamRedName = document.getElementById("teamRedName");

// For Star Visibility
let scoreBlue = document.getElementById("scoreBlue");
let scoreRed = document.getElementById("scoreRed");
let teamBlue = document.getElementById("teamBlue");
let teamRed = document.getElementById("teamRed");

// TEAM PLAYING SCORE
let playScoreBlue = document.getElementById("playScoreBlue");
let playScoreRed = document.getElementById("playScoreRed");

// Graphic components
let bottom = document.getElementById("bottom");
let sponsor = document.getElementById("sponsor");

// Chats
let chats = document.getElementById("chats");

socket.onopen = () => {
    console.log("Successfully Connected");
};

let animation = {
    playScoreBlue:  new CountUp('playScoreBlue', 0, 0, 0, .2, {useEasing: true, useGrouping: true,   separator: " ", decimal: "." }),
    playScoreRed:  new CountUp('playScoreRed', 0, 0, 0, .2, {useEasing: true, useGrouping: true,   separator: " ", decimal: "." }),
}

socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
    socket.send("Client Closed!");
};

socket.onerror = error => {
    console.log("Socket Error: ", error);
};

let bestOfTemp;
let scoreVisibleTemp;
let starsVisibleTemp;

let tempImg;
let tempMapName;
let tempMapDiff;

let scoreBlueTemp;
let scoreRedTemp;
let teamNameBlueTemp;
let teamNameRedTemp;
let gameState;

let preScoreBlue = 0;
let preScoreRed = 0;

let chatLen = 0;
let tempClass = 'unknown';

socket.onmessage = event => {
    let data = JSON.parse(event.data);
	if(scoreVisibleTemp !== data.tourney.manager.bools.scoreVisible) {
		scoreVisibleTemp = data.tourney.manager.bools.scoreVisible;
		if(scoreVisibleTemp) {
			// Score visible -> Set bg bottom to full
			chats.style.opacity = 0;
			playScoreBlue.style.opacity = 1;
			playScoreRed.style.opacity = 1;
			sponsor.style.transform = 'translateX(-50%)';
		} else {
			// Score invisible -> Set bg to show chats
			chats.style.opacity = 1;
			playScoreBlue.style.opacity = 0;
			playScoreRed.style.opacity = 0;
			sponsor.style.transform = 'translateX(-300%)';
		}
	}
	if(starsVisibleTemp !== data.tourney.manager.bools.starsVisible) {
		starsVisibleTemp = data.tourney.manager.bools.starsVisible;
		if(starsVisibleTemp) {
			scoreBlue.style.opacity = 1;
			scoreRed.style.opacity = 1;
		} else {
			scoreBlue.style.opacity = 0;
			scoreRed.style.opacity = 0;
		}
	}
	if(tempImg !== data.menu.bm.path.full){
        tempImg = data.menu.bm.path.full;
        data.menu.bm.path.full = data.menu.bm.path.full.replace(/#/g,'%23').replace(/%/g,'%25').replace(/\\/g,'/');
        mapContainer.style.backgroundImage = `url('http://` + location.host + `/Songs/${data.menu.bm.path.full}?a=${Math.random(10000)}')`;
    }
    if(tempMapName !== data.menu.bm.metadata.title){
        tempMapName = data.menu.bm.metadata.title;
        mapTitle.innerHTML = tempMapName;
    }
    if(tempMapDiff !== '[' + data.menu.bm.metadata.difficulty + ']'){
        tempMapDiff = '[' + data.menu.bm.metadata.difficulty + ']';
        mapDifficulty.innerHTML = tempMapDiff;
    }
	if (bestOfTemp !== Math.ceil(data.tourney.manager.bestOF / 2) || scoreBlueTemp !== data.tourney.manager.stars.left || scoreRedTemp !== data.tourney.manager.stars.right) {
		// Courtesy of Victim-Crasher
		// To know where to blow or pop score
		if (scoreBlueTemp < data.tourney.manager.stars.left) {
			scoreEvent = "blue-add";
		} else if (scoreBlueTemp > data.tourney.manager.stars.left) {
			scoreEvent = "blue-remove";
		} else if (scoreRedTemp < data.tourney.manager.stars.right) {
			scoreEvent = "red-add";
		} else if (scoreRedTemp > data.tourney.manager.stars.right) {
			scoreEvent = "red-remove";
		}

		scoreBlueTemp = data.tourney.manager.stars.left;
		scoreBlue.innerHTML = "";
		for (var i = 0; i < scoreBlueTemp; i++) {
			if (scoreEvent === "blue-add" && i === scoreBlueTemp - 1) {
				let scoreFill = document.createElement("div");
				scoreFill.setAttribute("class", "score scoreFillAnimate");
				scoreBlue.appendChild(scoreFill);
			} else {
				let scoreFill = document.createElement("div");
				scoreFill.setAttribute("class", "score scoreFill");
				scoreBlue.appendChild(scoreFill);
			}
		}
		for (var i = 0; i < bestOfTemp - scoreBlueTemp; i++) {
			if (scoreEvent === "blue-remove" && i === 0) {
				let scoreNone = document.createElement("div");
				scoreNone.setAttribute("class", "score scoreNoneAnimate");
				scoreBlue.appendChild(scoreNone);
			} else {
				let scoreNone = document.createElement("div");
				scoreNone.setAttribute("class", "score");
				scoreBlue.appendChild(scoreNone);
			}
		}

		scoreRedTemp = data.tourney.manager.stars.right;
		scoreRed.innerHTML = "";
		for (var i = 0; i < bestOfTemp - scoreRedTemp; i++) {
			if (scoreEvent === "red-remove" && i === bestOfTemp - scoreRedTemp - 1) {
				let scoreNone = document.createElement("div");
				scoreNone.setAttribute("class", "score scoreNoneAnimate");
				scoreRed.appendChild(scoreNone);
			} else {
				let scoreNone = document.createElement("div");
				scoreNone.setAttribute("class", "score");
				scoreRed.appendChild(scoreNone);
			}
		}
		for (var i = 0; i < scoreRedTemp; i++) {
			if (scoreEvent === "red-add" && i === 0) {
				let scoreFill = document.createElement("div");
				scoreFill.setAttribute("class", "score scoreFillAnimate");
				scoreRed.appendChild(scoreFill);
			} else {
				let scoreFill = document.createElement("div");
				scoreFill.setAttribute("class", "score scoreFill");
				scoreRed.appendChild(scoreFill);
			}
		}

		// for (var i = bestOfTemp; i > 0; i--) {
		// 	if (i == scoreRedTemp && scoreRedTemp > preScoreRed) {
		// 		let scoreFill = document.createElement('div');
		// 		scoreFill.setAttribute('class','scoreFillFade');
		// 		scoreRed.appendChild(scoreFill);
		// 	} else if (i == scoreRedTemp+1 && scoreRedTemp < preScoreRed) {
		// 		let scoreNone = document.createElement('div');
		// 		scoreNone.setAttribute('class','scoreNoneFade');
		// 		scoreRed.appendChild(scoreNone);
		// 	} else if (i <= scoreRedTemp){
		// 		let scoreFill = document.createElement('div');
		// 		scoreFill.setAttribute('class','scoreFill');
		// 		scoreRed.appendChild(scoreFill);
		// 	} else {
		// 		let scoreNone = document.createElement('div');
		// 		scoreNone.setAttribute('class','scoreNone');
		// 		scoreRed.appendChild(scoreNone);
		// 	}
		// }

		// preScoreRed = scoreRedTemp;
		
		// for(var i = 0; i < scoreBlueTemp; i++) {
		// 	let scoreFill = document.createElement('div');
		// 	scoreFill.setAttribute('class','scoreFill');
		// 	scoreBlue.appendChild(scoreFill);		
		// }
		// for(var i = 0; i < bestOfTemp-scoreBlueTemp; i++) {
		// 	let scoreNone = document.createElement('div');
		// 	scoreNone.setAttribute('class','scoreNone');	
		// 	scoreBlue.appendChild(scoreNone);			
		// }
		
		
		// for(var i = 0; i < bestOfTemp-scoreRedTemp; i++) {
		// 	let scoreNone = document.createElement('div');
		// 	scoreNone.setAttribute('class','scoreNone');	
		// 	scoreRed.appendChild(scoreNone);			
		// }
		// for(var i = 0; i < scoreRedTemp; i++) {
		// 	let scoreFill = document.createElement('div');
		// 	scoreFill.setAttribute('class','scoreFill');	
		// 	scoreRed.appendChild(scoreFill);		
		// }

		// if (scoreRedTemp == bestOfTemp) {
		// 	let tree = document.createElement('div');
		// 	tree.setAttribute('class','redWin');
		// 	tree.appendChild(treeRed);
		// } else if (scoreBlueTemp == bestOfTemp) {
		// 	let tree = document.createElement('div');
		// 	tree.setAttribute('class','blueWin');
		// 	tree.appendChild(treeRed);
		// }
	}
	if(teamNameBlueTemp !== data.tourney.manager.teamName.left) {
		teamNameBlueTemp = data.tourney.manager.teamName.left;
		teamBlueName.innerHTML = teamNameBlueTemp;
	}
	if(teamNameRedTemp !== data.tourney.manager.teamName.right) {
		teamNameRedTemp = data.tourney.manager.teamName.right;
		teamRedName.innerHTML = teamNameRedTemp;
	}
	if(scoreVisibleTemp) {
		scoreBlueTemp = data.tourney.manager.gameplay.score.left;
		scoreRedTemp = data.tourney.manager.gameplay.score.right;
		
		animation.playScoreBlue.update(scoreBlueTemp);
		animation.playScoreRed.update(scoreRedTemp);
		
		if(scoreBlueTemp > scoreRedTemp) {
			// Blue is Leading
			playScoreBlue.style.backgroundColor = '#ad81db';
			playScoreBlue.style.color = '#f2f1f5';
			
			playScoreRed.style.backgroundColor = '#4e326b';
			playScoreRed.style.color = '#f2f1f5';
		} else if (scoreBlueTemp == scoreRedTemp) {
			// Tie
			playScoreBlue.style.backgroundColor = '#4e326b';
			playScoreBlue.style.color = '#f2f1f5';
			
			playScoreRed.style.backgroundColor = '#4e326b';
			playScoreRed.style.color = '#f2f1f5';
		} else {
			// Red is Leading
			playScoreBlue.style.backgroundColor = '#4e326b';
			playScoreBlue.style.color = '#f2f1f5';
			
			playScoreRed.style.backgroundColor = '#ad81db';
			playScoreRed.style.color = '#f2f1f5';
			
		}
	}
	if(!scoreVisibleTemp) {
		if(chatLen != data.tourney.manager.chat.length) {
			// There's new chats that haven't been updated
			
			if(chatLen == 0 || (chatLen > 0 && chatLen > data.tourney.manager.chat.length)) {
				// Starts from bottom
				chats.innerHTML = "";
				chatLen = 0;
			}
			
			// Add the chats
			for(var i=chatLen; i < data.tourney.manager.chat.length; i++) {
				tempClass = data.tourney.manager.chat[i].team;
				
				// Chat variables
				let chatParent = document.createElement('div');
				chatParent.setAttribute('class', 'chat');

				let chatTime = document.createElement('div');
				chatTime.setAttribute('class', 'chatTime');
				
				let wholeChat = document.createElement('div');
				wholeChat.setAttribute('class', 'wholeChat');

				let chatName = document.createElement('div');
				chatName.setAttribute('class', 'chatName');

				let chatText = document.createElement('div');
				chatText.setAttribute('class', 'chatText');
				
				chatTime.innerText = data.tourney.manager.chat[i].time;
				chatName.innerText = data.tourney.manager.chat[i].name + ":\xa0";
				chatText.innerText = data.tourney.manager.chat[i].messageBody;
				
				chatName.classList.add(tempClass);
				
				chatParent.append(chatTime);
				chatParent.append(wholeChat);
				wholeChat.append(chatName);
				wholeChat.append(chatText);
				chats.append(chatParent);
			}
			
			// Update the Length of chat
			chatLen = data.tourney.manager.chat.length;
			
			// Update the scroll so it's sticks at the bottom by default
			chats.scrollTop = chats.scrollHeight;
		}
	}
}