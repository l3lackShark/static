let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");
let cont = document.querySelector('.container');
let main = document.querySelector('.main');
let line = document.getElementById('line');
let h100 = document.querySelector('.x100');
let h50 = document.querySelector('.x50');
let hMiss = document.querySelector('.xMiss');
let hSb = document.querySelector('.sb');
let rank = document.getElementById('rank');
let rankC = document.querySelector('.rank');
let bmidC = document.querySelector('.bmid');
let ppfcC = document.querySelector('.ppfc');

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
    sb: new CountUp('sb', 0, 0, 0, 0.5, { decimalPlaces: 2, useEasing: true, useGrouping: false, separator: " ", decimal: "." }),
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
            mainColor = (hdfl ? "rgb(60,60,61) linear-gradient(300deg, rgba(60,60,61,1) 0%, rgba(80,80,80,1) 100%)" : "rgb(60,60,61) linear-gradient(300deg, rgba(60,60,61,1) 0%, rgba(80,80,68,1) 100%)");
            break;
        case "S":
            grade = data.gameplay.hits.grade.current;
            color = (hdfl ? "#b5b5b5" : "#e8cb7b");
            shadow = (hdfl ? "#b5b5b5 0 0 2px" : "#e8cb7b 0 0 2px");
            mainColor = (hdfl ? "rgb(60,60,61) linear-gradient(300deg, rgba(60,60,61,1) 0%, rgba(80,80,80,1) 100%)" : "rgb(60,60,61) linear-gradient(300deg, rgba(60,60,61,1) 0%, rgba(80,80,68,1) 100%)");
            break;
        case "A":
            grade = data.gameplay.hits.grade.current;
            color = "#7be882";
            shadow = "#7be882 0 0 2px";
            mainColor = "rgb(60,60,61) linear-gradient(300deg, rgba(60,60,61,1) 0%, rgba(69,80,68,1) 100%)";
            break;
        case "B":
            grade = data.gameplay.hits.grade.current;
            color = "#7bcbe8";
            shadow = "#7bcbe8 0 0 2px";
            mainColor = "rgb(60,60,61) linear-gradient(300deg, rgba(60,60,61,1) 0%, rgba(68,80,79,1) 100%)";
            break;
        case "C":
            grade = data.gameplay.hits.grade.current;
            color = "#e87ba5";
            shadow = "#e87ba5 0 0 2px";
            mainColor = "rgb(60,60,61) linear-gradient(300deg, rgba(60,60,61,1) 0%, rgba(79,68,80,1) 100%)";
            break;
        case "D":
            grade = data.gameplay.hits.grade.current;
            color = "#e87b7b";
            shadow = "#e87b7b 0 0 2px";
            mainColor = "rgb(60,60,61) linear-gradient(300deg, rgba(60,60,61,1) 0%, rgba(80,68,68,1) 100%)";
            break;
        default:
            grade = "SS";
            color = (hdfl ? "#b5b5b5" : "#e8cb7b");
            shadow = (hdfl ? "#b5b5b5 0 0 2px" : "#e8cb7b 0 0 2px");
            mainColor = "#3c3c3d";
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
            rankC.style.transform = 'translate(0, 0)';
            h100.style.transform = 'translate(0, 0)';
            h50.style.transform = 'translate(0, 0)';
            hMiss.style.transform = 'translate(0, 0)';
            h100.style.opacity = '1';
            h50.style.opacity = '1';
            hMiss.style.opacity = '1';
            bmidC.style.transform = 'translate(0, -110%)';
            bmidC.style.opacity = '0';
            rank.innerHTML = grade;
            rank.style.color = color;
            rank.style.textShadow = shadow;
            main.style.background = mainColor;
            if (data.gameplay.hits[0] > 0 || data.gameplay.hits.sliderBreaks > 0) {
                ppfcC.style.opacity = '1';
            } else {
                ppfcC.style.opacity = '0';
            };
            if (data.gameplay.hits.sliderBreaks > 0) {
                hSb.style.opacity = '1';
            } else {
                hSb.style.opacity = '0';
            };
            animation.pp.update(data.gameplay.pp.current);
            animation.ppfc.update(data.gameplay.pp.fc);
            animation.x100.update(data.gameplay.hits[100]);
            animation.x50.update(data.gameplay.hits[50]);
            animation.xMiss.update(data.gameplay.hits[0]);
            animation.sb.update(data.gameplay.hits.sliderBreaks);
            line.style.width = (data.menu.bm.time.current / data.menu.bm.time.mp3 * 100).toFixed(2) + '%';
            break;
        default:
            cont.style.opacity = '1';
            rankC.style.transform = 'translate(100%, 0)';
            h100.style.transform = 'translate(0, 110%)';
            h50.style.transform = 'translate(0, 110%)';
            hMiss.style.transform = 'translate(0, 110%)';
            h100.style.opacity = '0';
            h50.style.opacity = '0';
            hMiss.style.opacity = '0';
            bmidC.style.transform = 'translate(0, 0)';
            bmidC.style.opacity = '1';
            ppfcC.style.opacity = '0';
            hSb.style.opacity = '0';
            main.style.background = '#3e3e42';
            animation.pp.update(data.menu.pp[100]);
            animation.bmid.update(data.menu.bm.id);
            line.style.width = (data.menu.bm.time.current / data.menu.bm.time.mp3 * 100).toFixed(2) + '%';
            break;
    }
}