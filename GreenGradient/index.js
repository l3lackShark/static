let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");

socket.onopen = () => console.log("Successfully Connected");

socket.onclose = event => {
  console.log("Socket Closed Connection: ", event);
  socket.send("Client Closed!");
};

socket.onerror = error => console.log("Socket Error: ", error);

let animation = {
  pp: {
    current: new CountUp('pp', 0, 0, 0, .5, { useEasing: true, useGrouping: true, separator: " ", decimal: "." }),
  },
  h100: document.getElementById('h100'),
  h50: document.getElementById('h50'),
  h0: document.getElementById('h0'),
  mods: document.getElementById('mods-container'),
};

let cache = {
  id: 0,
  time: 0,
  pp: {
    current: 0,
    fc: 0
  },
  hits: {
    100: 0,
    50: 0,
    0: 0,
  },
  mods: [],
};

socket.onmessage = event => {
  try {
    let data = JSON.parse(event.data),
      menu = data.menu,
      play = data.gameplay;
    document.documentElement.style.setProperty('--progress', `${(menu.bm.time.current / menu.bm.time.full * 100).toFixed(2)}%`);
    if (menu.state == 2) {
      if (cache.id != 0) cache.id = 0;
      if (menu.bm.time.firstObj > menu.bm.time.current) {
        animation.h100.innerHTML = 0;
        animation.h50.innerHTML = 0;
        animation.h0.innerHTML = 0;
      };

      // handle the mods update lazyily
      if (cache.mods.length === 0) {
        // display the mod element
        animation.mods.style.display = "flex";
        const modstr = menu.mods.str.toLowerCase();
        const modsArr = modstr.match(/.{1,2}/g);
        cache.mods = modsArr;
        for(let i = 0; i < modsArr.length; i++){
          let mod = document.createElement('span');
          mod.setAttribute('class','mod');
          const text = document.createTextNode(modsArr[i]);
          mod.appendChild(text);
          animation.mods.appendChild(mod);
        }
      }

      document.body.classList.remove('songSelect');
      if (menu.bm.time.current > menu.bm.time.firstObj) {
        if (cache.pp.current != play.pp.current) {
          cache.pp.current = play.pp.current;
          animation.pp.current.update(play.pp.current);
        };
        if (cache.hits[100] != play.hits[100]) {
          cache.hits[100] = play.hits[100];
          animation.h100.innerHTML = play.hits[100];
        };
        if (cache.hits[50] != play.hits[50]) {
          cache.hits[50] = play.hits[50];
          animation.h50.innerHTML = play.hits[50];
        };
        if (cache.hits[0] != play.hits[0]) {
          cache.hits[0] = play.hits[0];
          animation.h0.innerHTML = play.hits[0];
        };
      } else animation.pp.current.update(0);
    } else if (menu.state != 7) {
      if (cache.mods.length > 0) {
        cache.mods = [];
        animation.mods.style.display = "none";
        animation.mods.innerHTML = "";
      }
      document.body.classList.add('songSelect');
      if (cache.id != menu.bm.id) {
        animation.pp.current.update(menu.bm.id);
        cache.id = menu.bm.id;
      };
      animation.h100.innerHTML = 0;
      animation.h50.innerHTML = 0;
      animation.h0.innerHTML = 0;
    };
  } catch (err) { console.log(err); };
};
