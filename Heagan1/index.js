let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");


var temp1;
var temp2;
var id;
// healthbar
// bikin aja div ukuran 100%
// terus nanti kalau hpnya naik turun ya hp * width
// Biasanya HP maksimal 200, jadi ya width = (hp / 200) * width

let rank = document.getElementById('rank');
let params = {
    totalHits: 0,
    acc: 0.0,
    ratio300: 0,
    ratio50: 0,
    rank: ''
};
 
socket.onmessage = event => {
    let data = JSON.parse(event.data), hits = data.gameplay.hits; 
 
    let hdfl = false;
    if(data.menu.mods.str.includes("HD") || data.menu.mods.str.includes("FL")){
        hdfl = true;
    }

    let tempName = ""
    if (tempName != data.gameplay.name) {
        tempName = data.gameplay.name
        axios.get('https://osu.ppy.sh/api/get_user?k=a05c729600d6f4799301d4c898e9ed998eeb2916&u=' + tempName)
          .then(function (response) {
              id = response.data[0].user_id
          })
          .catch(function (error) {
            console.log(error);
          }) 
        document.getElementById('profile').src = 'http://s.ppy.sh/a/' + id;
    }

    document.getElementById('pp').innerHTML = data.gameplay.pp.current + 'PP';

        //cyperdark's rank calculator logic 
        params.totalHits = +hits[50] + +hits[100] + +hits[300] + +hits[0];
        params.acc = params.totalHits > 0 ? (+hits[50] * 50 + +hits[100] * 100 + +hits[300] * 300) / (params.totalHits * 300) : 1;
        params.ratio300 = +hits[300] / params.totalHits, params.ratio50 = +hits[50] / params.totalHits;
     
        if (params.ratio300 == 1 || params.acc == 1) {
            document.getElementById('rank').innerHTML = 'SS';
            if(hdfl == true){
                rank.style.color = '#D3D3D3';
                rank.style.textShadow = '0 0 0.5em #D3D3D3'
            } else{
                rank.style.color = '#d6c253';
                rank.style.textShadow = '0 0 0.5em #d6c253'
            }
        }
        else if (params.ratio300 > 0.9 && params.ratio50 <= 0.01 && hits[0] == 0) {
            document.getElementById('rank').innerHTML = 'S';
            if(hdfl == true){
                rank.style.color = '#D3D3D3';
                rank.style.textShadow = '0 0 0.5em #D3D3D3'
            } else{
                rank.style.color = '#d6c253';
                rank.style.textShadow = '0 0 0.5em #d6c253'
            }
        }
        else if ((params.ratio300 > 0.8 && hits[0] == 0) || params.ratio300 > 0.9) {
            document.getElementById('rank').innerHTML = 'A';
            rank.style.color = '#7ed653';
            rank.style.textShadow = '0 0 0.5em #7ed653'
        }
        else if ((params.ratio300 > 0.7 && hits[0] == 0) || params.ratio300 > 0.8) {
            document.getElementById('rank').innerHTML = 'B';
            rank.style.color = '#53d4d6';
            rank.style.textShadow = '0 0 0.5em #53d4d6'
        }
        else if (params.ratio300 > 0.6) {
            document.getElementById('rank').innerHTML = 'C';
            rank.style.color = '#d6538e';
            rank.style.textShadow = '0 0 0.5em #d6538e'
        }
        else {
            document.getElementById('rank').innerHTML = 'D';
            rank.style.color = '#d65353';
            rank.style.textShadow = '0 0 0.75em #d65353'
        };

        document.getElementById('hit0').innerHTML = data.gameplay.hits[0];
        document.getElementById('hit50').innerHTML = data.gameplay.hits[50];
        document.getElementById('hit100').innerHTML = data.gameplay.hits[100];

        if (data.gameplay.name == '') {
            document.getElementById('playername').innerHTML = 'Your name here';
        } else {
            document.getElementById('playername').innerHTML = data.gameplay.name;
        }

        document.getElementById('combo').innerHTML = data.gameplay.combo.current + ' X';
        document.getElementById('ur').innerHTML = Math.round(data.gameplay.hits.unstableRate) + ' UR';
        document.getElementById('name1').innerHTML = data.gameplay.leaderboard.slots[0].name;
        document.getElementById('score1').innerHTML = data.gameplay.leaderboard.slots[0].score;
        document.getElementById('combo1').innerHTML = data.gameplay.leaderboard.slots[0].maxCombo + "X";
        document.getElementById('name2').innerHTML = data.gameplay.leaderboard.slots[1].name;
        document.getElementById('score2').innerHTML = data.gameplay.leaderboard.slots[1].score;
        document.getElementById('combo2').innerHTML = data.gameplay.leaderboard.slots[1].maxCombo + "X";
        document.getElementById('name3').innerHTML = data.gameplay.leaderboard.slots[2].name;
        document.getElementById('score3').innerHTML = data.gameplay.leaderboard.slots[2].score;
        document.getElementById('combo3').innerHTML = data.gameplay.leaderboard.slots[2].maxCombo + "X";
        document.getElementById('name4').innerHTML = data.gameplay.leaderboard.slots[3].name;
        document.getElementById('score4').innerHTML = data.gameplay.leaderboard.slots[3].score;
        document.getElementById('combo4').innerHTML = data.gameplay.leaderboard.slots[3].maxCombo + "X";
        document.getElementById('name5').innerHTML = data.gameplay.leaderboard.slots[4].name;
        document.getElementById('score5').innerHTML = data.gameplay.leaderboard.slots[4].score;
        document.getElementById('combo5').innerHTML = data.gameplay.leaderboard.slots[4].maxCombo + "X";
        document.getElementById('name6').innerHTML = data.gameplay.leaderboard.slots[5].name;
        document.getElementById('score6').innerHTML = data.gameplay.leaderboard.slots[5].score;
        document.getElementById('combo6').innerHTML = data.gameplay.leaderboard.slots[5].maxCombo + "X";
}

// Create a request variable and assign a new XMLHttpRequest object to it.
// var request = new XMLHttpRequest()
// Open a new connection, using the GET request on the URL endpoint
// idI = request.open('GET', 'https://osu.ppy.sh/api/get_user?k=asdf&u="Heagan"', false)
 
