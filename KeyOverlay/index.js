const socket = new ReconnectingWebSocket("ws://" + location.host + "/ws");
const keys = document.getElementById('keys')
let k1 = new KeyOverlay('k1', 'k1Tiles', {speed: 0.4, keyTextId:"k1Text"}),
    k2 = new KeyOverlay('k2', 'k2Tiles', {speed: 0.4}),
    m1 = new KeyOverlay('m1', 'm1Tiles', {speed: 0.4}),
    m2 = new KeyOverlay('m2', 'm2Tiles', {speed: 0.4}),
    tempState;
socket.onopen = () => {
    console.log("Successfully Connected");
};

socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
    socket.send("Client Closed!");
};

socket.onerror = error => {
    console.error(error);
};


socket.onmessage = event => {
    const data = JSON.parse(event.data)

    if (data.menu.state !== tempState) {
        tempState = data.menu.state
        if (tempState !== 2) {
            keys.style.opacity = '0'
        } else {
            keys.style.opacity = '1'
        }
    }
    k1.update(data.gameplay.keyOverlay.k1)
    k2.update(data.gameplay.keyOverlay.k2)
    m1.update(data.gameplay.keyOverlay.m1)
    m2.update(data.gameplay.keyOverlay.m2)
}

