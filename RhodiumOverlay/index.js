let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");
let overlay = document.getElementById('overlay')
let title = document.getElementById('title')
let artist = document.getElementById('artist')
let mods = document.getElementById('mods')
let bmid = document.getElementById('beatmap-id')
let hp = document.getElementById('hp')
let widthBase = hp.offsetWidth

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

let animation = {
    score: new CountUp('score', 0, 0, 0, 0.5, {isScore: true}),
    acc: new CountUp('acc', 0, 0, 2, 0.5, {isScore: false, decimal: '.', suffix: '%'}),
    combo: new CountUp('combo', 0, 0, 0, 0.5, {isScore: false, suffix: 'x'}),
    pp: new CountUp('pp', 0, 0, 0, 0.5, {isScore: false, suffix: ' pp'}),
    ppifFC: new CountUp('ppifFC', 0, 0, 0, 0.5, {isScore: false, prefix: '/', suffix: ' pp'}),
};

let tempState;
socket.onmessage = event => {
    let data = JSON.parse(event.data);
    if (tempState !== data.menu.state) {
        tempState = data.menu.state;
        if (tempState == 2) {
            overlay.style.opacity = 1
        } else {
            overlay.style.opacity = 0
        }
    }

    //HP
    if(data.gameplay.hp.smooth != '' || data.gameplay.hp.smooth != null || data.gameplay.hp.smooth != undefined) {
        let step = widthBase/200;
        hp.style.width = step * data.gameplay.hp.smooth + 'px'
    }
    else
    {

    }
    
    //Song and artist
    if (data.menu.bm.metadata.artist != '' && data.menu.bm.metadata.title != '') {
        artist.innerHTML = data.menu.bm.metadata.artist
        title.innerHTML = data.menu.bm.metadata.title
    }
    else {
        artist.innerHTML = ''
        title.innerHTML = ''
    }
    
    //Beatmap ID
    if (data.menu.bm.id != '') {
        bmid.innerHTML = '/b/' + data.menu.bm.id
    }
    else {
        bmid.innerHTML = ''
    }

    //Score
    if(data.gameplay.score != '') {
        animation.score.update(data.gameplay.score);
    }

    //Acc
    if(data.gameplay.accuracy != '') {
        animation.acc.update(data.gameplay.accuracy)
    }
    else {
        animation.acc.update(0)
    }

    //Mods
    if(data.menu.mods.str != '' && data.menu.mods.str != 'NM') {
        mods.innerText = data.menu.mods.str
    }
    else {
        mods.innerText = ''
    }

    //Combo
    if(data.gameplay.combo.current != '') {
        animation.combo.update(data.gameplay.combo.current)
    }
    else {
        animation.combo.update(0)
    }

    //PP
    if (data.gameplay.pp.current != '' && data.gameplay.pp.current != 0) {
        animation.pp.update(data.gameplay.pp.current)
    }
    else {
        animation.pp.update(0)
    }

    //PP if FC
    if (data.gameplay.pp.fc != '' && data.gameplay.pp.fc != 0) {
        animation.ppifFC.update(data.gameplay.pp.fc)
    }
    else {
        animation.pp.update(0)
    }
}