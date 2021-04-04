const socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");

socket.onopen = () => {
  console.log("Connected");
};

socket.onerror = (error) => {
  console.log("Socket error: ", error);
};

let beatmapId;
let isPlaying;
let title;
let ppCount;

let ppCountObj = {
  ppCount: 0
}

const backgroundElement = document.getElementById("background");
const backgroundElement2 = document.getElementById("background2");
const map = document.getElementsByClassName("map")[0];
const hits = document.getElementsByClassName("hits")[0];

const hithund = document.getElementById("100");
const hitfif = document.getElementById("50");
const hitmiss = document.getElementById("miss");
const pp = document.getElementById("pp");

socket.onmessage = (event) => {
  data = JSON.parse(event.data);

  let beatmap = data.menu.bm;
  let menu = data.menu;

  if (beatmapId != beatmap.set) {
    // Beatmap Changed update title etc.
    let background = `http://127.0.0.1:24050/Songs/${beatmap.path.full}`;
    backgroundElement.setAttribute("src", background);
    backgroundElement2.setAttribute("src", background);

    let titleDiv = document.getElementsByClassName("title")[0];
    anime({
      targets: titleDiv,
      translateY: 120,
      duration: 600,
      easing: "easeOutQuint",
      complete: (anim) => {
        titleDiv.remove();
      },
    });
    let newTitleDiv = createNewTitleDiv(beatmap.metadata.title);
    map.insertBefore(newTitleDiv, map.firstChild);
    anime({
      targets: newTitleDiv,
      translateY: 0,
      duration: 600,
      easing: "easeOutQuint",
    });

    beatmapId = beatmap.set;
  }

  if (menu.state == 2) {
    // Playing
    if (!isPlaying) {
      // Switched to playing

      anime({
        targets: map,
        height: 90,
        duration: 500,
        easing: "easeOutQuint",
      });

      anime({
        targets: hits,
        translateY: 0,
        duration: 500,
        easing: "easeOutQuint",
      });
      

      isPlaying = true;
    } else {
      let gameplay = data.gameplay;

      let hits = gameplay.hits;
      hithund.innerText = hits["100"];
      hitfif.innerText = hits["50"];
      hitmiss.innerText = hits["0"];

      if (gameplay.pp.current != ppCount) {
        anime({
          targets: ppCountObj,
          ppCount: [ppCount, gameplay.pp.current],
          easing: "easeOutQuint",
          round: 1,
          update: (event) => {
            if (event.animations[0]) {
              pp.innerText = `${event.animations[0].currentValue}pp`;
            }
          },
        });

      }
      ppCount = gameplay.pp.current;
    }
  } else {
    // main menu
    if (isPlaying) {
      // switched to menu

      anime({
        targets: map,
        height: 150,
        duration: 500,
        easing: "easeOutQuint",
      });

      anime({
        targets: hits,
        translateY: -100,
        duration: 500,
        easing: "easeOutQuint",
      });

      isPlaying = false;
    }
  }
};
