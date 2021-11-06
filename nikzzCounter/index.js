let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");
let base = document.getElementById('base');
let ppC = document.getElementsByClassName('pp');
let ppFCC = document.getElementsByClassName('ppFC');
let ppSSC = document.getElementsByClassName('ppSS');
let hit100C = document.getElementsByClassName('hit100');
let hit50C = document.getElementsByClassName('hit50');
let hit0C = document.getElementsByClassName('hit0');
let sb = document.getElementsByClassName('sb');

socket.onopen = () => console.log("Successfully Connected");
socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
    socket.send("Client Closed!");
};
socket.onerror = error => console.log("Socket Error: ", error);

let animation = {
    pp: new CountUp('pp', 0, 0, 0, 0.5, { decimalPlaces: 2, useEasing: true, useGrouping: false, separator: " ", decimal: "." }),
    ppFC: new CountUp('ppFC', 0, 0, 0, 0.5, { decimalPlaces: 2, useEasing: true, useGrouping: false, separator: " ", decimal: "." }),
    ppSS: new CountUp('ppSS', 0, 0, 0, 0.5, { decimalPlaces: 2, useEasing: true, useGrouping: false, separator: " ", decimal: "." }),
    hit100: new CountUp('hit100', 0, 0, 0, 0.5, { decimalPlaces: 2, useEasing: true, useGrouping: false, separator: " ", decimal: "." }),
    hit50: new CountUp('hit50', 0, 0, 0, 0.5, { decimalPlaces: 2, useEasing: true, useGrouping: false, separator: " ", decimal: "." }),
    hit0: new CountUp('hit0', 0, 0, 0, 0.5, { decimalPlaces: 2, useEasing: true, useGrouping: false, separator: " ", decimal: "." }),
    sb: new CountUp('sb', 0, 0, 0, 0.5, { decimalPlaces: 2, useEasing: true, useGrouping: false, separator: " ", decimal: "." }),
};

let tempState;

socket.onmessage = event => {
    let data = JSON.parse(event.data)

    if (data.menu.state !== tempState) {
        tempState = data.menu.state
    }
    if (data.gameplay.pp.current !== '' && (tempState === 2 || tempState === 7)) {
        animation.pp.update(data.gameplay.pp.current);
        ppSSC[0].style.opacity = '0';
        ppC[0].style.marginLeft = '120px';
    } else {
        animation.pp.update(0);
        animation.ppSS.update(data.menu.pp[100]);
        ppSSC[0].style.opacity = '1';
        ppC[0].style.marginLeft = '-40px';
        ppFCC[0].style.marginLeft = '-200px';
    }
    if (data.gameplay.hits[100] !== '' && (tempState === 2 || tempState === 7)) {
        animation.hit100.update(data.gameplay.hits[100]);
        hit100C[0].style.marginLeft = '120px';
    } else {
        animation.hit100.update(0);
        hit100C[0].style.marginLeft = '-40px';
    }
    if (data.gameplay.hits[50] !== '' && (tempState === 2 || tempState === 7)) {
        animation.hit50.update(data.gameplay.hits[50]);
        hit50C[0].style.marginLeft = '120px';
    } else {
        animation.hit50.update(0);
        hit50C[0].style.marginLeft = '-40px';
    }
    if (data.gameplay.hits[0] !== '' && (tempState === 2 || tempState === 7)) {
        animation.hit0.update(data.gameplay.hits[0]);
        hit0C[0].style.marginLeft = '120px';
    } else {
        animation.hit0.update(0);
        hit0C[0].style.marginLeft = '-40px';
    }
    if (data.gameplay.hits.sliderBreaks !== '' && data.gameplay.hits.sliderBreaks && (tempState === 2 || tempState === 7)) {
        animation.sb.update(data.gameplay.hits.sliderBreaks);
        sb[0].style.marginLeft = '175px';
    } else {
        animation.sb.update(0);
        sb[0].style.marginLeft = '-50px';
    }
    if (data.gameplay.hits[0] > 0 || data.gameplay.hits.sliderBreaks > 0) {
        animation.ppFC.update(data.gameplay.pp.fc);
        ppFCC[0].style.marginLeft = '220px';
    } else {
        ppFCC[0].style.marginLeft = '-200px';
    }
    if ((data.gameplay.hits[0] > 0 || data.gameplay.hits.sliderBreaks > 0) && data.gameplay.pp.current >= 10) {
        ppFCC[0].style.marginLeft = '240px';
    }
    if ((data.gameplay.hits[0] > 0 || data.gameplay.hits.sliderBreaks > 0) && data.gameplay.pp.current >= 100) {
        ppFCC[0].style.marginLeft = '260px';
    }
    if ((data.gameplay.hits[0] > 0 || data.gameplay.hits.sliderBreaks > 0) && data.gameplay.pp.current >= 1000) {
        ppFCC[0].style.marginLeft = '340px';
    }
    if (data.gameplay.hits[0] >= 10) {
        sb[0].style.marginLeft = '195px';
    }
    if (data.gameplay.hits[0] >= 100) {
        sb[0].style.marginLeft = '215px';
    }
}