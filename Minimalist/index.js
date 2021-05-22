let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");

class Rank {
    constructor(id) {
        this.root = document.getElementById(id);
        this.letter = this.root.querySelector(".rank-letter");
        this.superscript = this.root.querySelector(".rank-superscript");
    }

    update(data) {
        this.letter.innerHTML = data[0];
        this.superscript.innerHTML = data[1];
        this.root.style.setProperty("--rank-color", data[2]);
    }

    hidden(hidden) {
        this.root.hidden = hidden;
    }
}

function getRank(rank, mods) {
    let hdfl =
        mods.str.includes("HD") || mods.str.includes("FL") ? true : false;
    return rank.length === 0
        ? "SS"
        : rank + ((rank === "SS" || rank === "S") && hdfl ? "h" : "");
}

// function replace

let rank_main = new Rank("rank1");
let rank_max = new Rank("rank2");

let main = document.getElementById("main");
let stats = document.getElementsByClassName("stats")[0];
let pp_container = document.getElementsByClassName("pp-container")[0];
let hits_container = document.getElementsByClassName("hits-container")[0];
let rank_container = document.getElementsByClassName("rank-container")[0];
let song_container = document.getElementsByClassName("song-container")[0];
let maxpp_container = document.getElementsByClassName("maxpp-container")[0];

let pp = new CountUp("pp1", 0, 0, 0, 0.5);
let hit100 = new CountUp("hit100_1", 0, 0, 0, 0.5);
let hit50 = new CountUp("hit50_1", 0, 0, 0, 0.5);
let hit0 = new CountUp("hit0_1", 0, 0, 0, 0.5);
let maxpp = new CountUp("maxpp1", 0, 0, 0, 0.5);

let song_bg = document.getElementById("song-bg");

const RANK_INFO = {
    SSh: ["S", "+", "#ffffff"],
    SS: ["S", "+", "#eecc96"],
    Sh: ["S", "", "#ffffff"],
    S: ["S", "", "#eecc96"],
    A: ["A", "", "#9bf2da"],
    B: ["B", "", "#9ad7f3"],
    C: ["C", "", "#f6bce0"],
    D: ["D", "", "#fd838b"],
};

socket.onopen = () => console.log("Successfully Connected");
socket.onclose = (event) => {
    console.log("Socket Closed Connection: ", event);
    socket.send("Client Closed!");
};
socket.onerror = (error) => console.log("Socket Error: ", error);

let tempImg;
let state = -2;

main.classList.add("hidden");
stats.classList.add("short");
pp_container.classList.add("hidden");
hits_container.classList.add("hidden");
rank_container.classList.add("hidden");
song_container.classList.add("hidden");
maxpp_container.classList.add("shown");

socket.onmessage = (event) => {
    let data = JSON.parse(event.data),
        mods = data.menu.mods,
        hits = data.gameplay.hits,
        _pp = data.gameplay.pp;

    if (tempImg !== data.menu.bm.path.full) {
        tempImg = data.menu.bm.path.full;
        let img = data.menu.bm.path.full
            .replace(/#/g, "%23")
            .replace(/%/g, "%25");
        song_bg.setAttribute("src", `http://127.0.0.1:24050/Songs/${img}`);
    }

    switch (data.menu.state) {
        case 0:
        case 11:
            if (state != 0) {
                main.classList.replace("shown", "hidden");
                state = 0;
            }
            break;
        case 5:
            if (state != 1) {
                main.classList.replace("hidden", "shown");
                stats.classList.replace("normal", "short");
                pp_container.classList.replace("shown", "hidden");
                hits_container.classList.replace("shown", "hidden");
                rank_container.classList.replace("shown", "hidden");
                song_container.classList.replace("shown", "hidden");
                maxpp_container.classList.replace("hidden", "shown");

                state = 1;
            }

            if (maxpp.d.innerHTML != data.menu.pp["100"]) {
                maxpp.update(data.menu.pp["100"]);
            }
            break;
        case 2:
            if (state != 2) {
                main.classList.replace("hidden", "shown");
                stats.classList.replace("short", "normal");
                pp_container.classList.replace("hidden", "shown");
                hits_container.classList.replace("hidden", "shown");
                rank_container.classList.replace("hidden", "shown");
                song_container.classList.replace("hidden", "shown");
                maxpp_container.classList.replace("shown", "hidden");

                state = 2;
            }

            rank_main.update(RANK_INFO[getRank(hits.grade.current, mods)]);

            rank_max.update(RANK_INFO[getRank(hits.grade.maxThisPlay, mods)]);

            if (pp.d.innerHTML != _pp.current) {
                pp.update(_pp.current);
            }

            if (hit100.d.innerHTML != hits["100"]) {
                hit100.update(hits["100"]);
            }

            if (hit50.d.innerHTML != hits["50"]) {
                hit50.update(hits["50"]);
            }

            if (hit0.d.innerHTML != hits["0"]) {
                hit0.update(hits["0"]);
            }
            break;
        default:
            if (state != -1) {
                main.classList.replace("shown", "hidden");
                stats.classList.replace("normal", "short");
                pp_container.classList.replace("shown", "hidden");
                hits_container.classList.replace("shown", "hidden");
                rank_container.classList.replace("shown", "hidden");
                song_container.classList.replace("shown", "hidden");
                maxpp_container.classList.replace("hidden", "shown");

                state = -1;
            }
            break;
    }
};
