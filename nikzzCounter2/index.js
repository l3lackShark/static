let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");
let cont = document.querySelector('.container');
let main = document.querySelector('.main');
let line = document.getElementById('line');
let hits = document.querySelector('.hits');
let h100 = document.querySelector('.x100');
let h50c = document.getElementById('x50c');
let hMiss = document.querySelector('.xMiss');
let rank = document.getElementById('rank');
let rankC = document.querySelector('.rank');
let bmidC = document.querySelector('.bmid');
let currpp = document.querySelector('.currpp');
let fcpp = document.querySelector('.ppfc');

socket.onopen = () => console.log("Successfully Connected");
socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
    socket.send("Client Closed!");
};
socket.onerror = error => console.log("Socket Error: ", error);

let animation = {
    pp: new CountUp('pp', 0, 0, 0, 0.5, { decimalPlaces: 2, useEasing: true, useGrouping: false, separator: " ", decimal: "." }),
    ppfc: new CountUp('ppfc', 0, 0, 0, 0.5, { decimalPlaces: 2, useEasing: true, useGrouping: false, separator: " ", decimal: "." }),
    x100: new CountUp('x100', 0, 0, 0, 0.5, { decimalPlaces: 2, useEasing: true, useGrouping: false, separator: " ", decimal: "." }),
    x50: new CountUp('x50', 0, 0, 0, 0.5, { decimalPlaces: 2, useEasing: true, useGrouping: false, separator: " ", decimal: "." }),
    xMiss: new CountUp('xMiss', 0, 0, 0, 0.5, { decimalPlaces: 2, useEasing: true, useGrouping: false, separator: " ", decimal: "." }),
    bmid: new CountUp('bmid', 0, 0, 0, 0.5, { decimalPlaces: 2, useEasing: true, useGrouping: false, separator: " ", decimal: "." }),
};

socket.onmessage = event => {
    let data = JSON.parse(event.data);

    let grade, color, shadow;
    let hdfl = (data.menu.mods.str.includes("HD") || data.menu.mods.str.includes("FL") ? true : false);
    switch (data.gameplay.hits.grade.current) {
        case "SS":
            grade = data.gameplay.hits.grade.current;
            color = (hdfl ? "#b5b5b5" : "#e8cb7b");
            shadow = (hdfl ? "#b5b5b5 0 0 2px" : "#e8cb7b 0 0 2px");
            break;
        case "S":
            grade = data.gameplay.hits.grade.current;
            color = (hdfl ? "#b5b5b5" : "#e8cb7b");
            shadow = (hdfl ? "#b5b5b5 0 0 2px" : "#e8cb7b 0 0 2px");
            break;
        case "A":
            grade = data.gameplay.hits.grade.current;
            color = "#7be882";
            shadow = "#7be882 0 0 2px";
            break;
        case "B":
            grade = data.gameplay.hits.grade.current;
            color = "#7bcbe8";
            shadow = "#7bcbe8 0 0 2px";
            break;
        case "C":
            grade = data.gameplay.hits.grade.current;
            color = "#e87ba5";
            shadow = "#e87ba5 0 0 2px";
            break;
        case "D":
            grade = data.gameplay.hits.grade.current;
            color = "#e87b7b";
            shadow = "#e87b7b 0 0 2px";
            break;
        default:
            grade = "SS";
            color = (hdfl ? "#b5b5b5" : "#e8cb7b");
            shadow = (hdfl ? "#b5b5b5 0 0 2px" : "#e8cb7b 0 0 2px");
            break;
    }

    switch (data.menu.state) {
        case 3:
        case 10:
        case 11:
        case 12:
        case 15:
        case 0:
            cont.style.opacity = '0';break;
        case 7:
        case 14:
        case 2:
            cont.style.opacity = '1';
            rankC.style.display = 'inline';
            bmidC.style.opacity = '0';
            bmidC.style.position = 'absolute';
            hits.style.position = 'static';
            hits.style.opacity = '1';
            main.style.height = '115px';
            main.style.width = '390px';
            currpp.style.position = 'static';
            currpp.style.opacity = '1';
            if (data.gameplay.hits[0] <= 0) {
                fcpp.style.opacity = '0';
                fcpp.style.position = 'absolute';
            } else {
                fcpp.style.position = 'static';
                fcpp.style.opacity = '1';
            };
            animation.pp.update(data.gameplay.pp.current);
            animation.ppfc.update(data.gameplay.pp.fc);
            rank.innerHTML = grade;
            rank.style.color = color;
            rank.style.textShadow = shadow;
            animation.x100.update(data.gameplay.hits[100]);
            animation.x50.update(data.gameplay.hits[50]);
            animation.xMiss.update(data.gameplay.hits[0]);
            line.style.width = (data.menu.bm.time.current / data.menu.bm.time.mp3 * 100).toFixed() + '%';
            break;
        default:
            cont.style.opacity = '1';
            rankC.style.display = 'none';
            main.style.width = '300px';
            main.style.height = '96px';
            hits.style.opacity = '0';
            hits.style.position = 'absolute';
            bmidC.style.position = 'static';
            bmidC.style.opacity = '1';
            currpp.style.opacity = '0';
            currpp.style.position = 'absolute';
            fcpp.style.position = 'static';
            fcpp.style.opacity = '1';
            animation.pp.update(data.gameplay.pp.current);
            animation.ppfc.update(data.menu.pp[100]);
            animation.bmid.update(data.menu.bm.id);
            line.style.width = (data.menu.bm.time.current / data.menu.bm.time.mp3 * 100).toFixed() + '%';
            break;
    }
}