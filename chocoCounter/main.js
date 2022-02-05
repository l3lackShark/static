// websocket
let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");

socket.onopen = () => console.log("Successfully Connected");

socket.onclose = event => {
  console.log("Socket Closed Connection: ", event);
  socket.send("Client Closed!");
};

socket.onerror = error => console.log("Socket Error: ", error); 


// variables
let $title = document.getElementById('title')
let grade = document.getElementById('grade')
let star = document.getElementById('star')
let starAccent = document.getElementById('starAccent')
let bg = document.getElementById('bg')
let starContainer = document.getElementById('starContainer')
let playing = false
let hdfl = false
let mode;
let selector; // show halfBottom
let selector2; // show halfTop
let selector3; // hide
let all = ["c1", "_c1", "c2", "_c2", "c3", "_c3", "c4", "_c4", "c5", "_c5","c6", "_c6", "c7", "_c7", "c8", "_c8", "c9", "_c9", "grade", "star"]

let artist;
let title;
let diff;
let mapper
let mods;

let tempImg;
let tempTitle;
let tempSR;

/* 
c1 = max combo
c2 = combo
c3 = max judge
c4 = 300 judge
c5 = 200 judge
c6 = 100 judge
c7 = 50 judge
c8 = 0 judge
c9 = accuracy

$ for upper text
_ for lower text
*/
let $c1 = document.getElementById('c1')
let $c2 = document.getElementById('c2')
let $c3 = document.getElementById('c3')
let $c4 = document.getElementById('c4')
let $c5 = document.getElementById('c5')
let $c6 = document.getElementById('c6')
let $c7 = document.getElementById('c7')
let $c8 = document.getElementById('c8')
let $c9 = document.getElementById('c9')

let _c1 = document.getElementById('_c1')
let _c2 = document.getElementById('_c2')
let _c3 = document.getElementById('_c3')
let _c4 = document.getElementById('_c4')
let _c5 = document.getElementById('_c5')
let _c6 = document.getElementById('_c6')
let _c7 = document.getElementById('_c7')
let _c8 = document.getElementById('_c8')
let _c9 = document.getElementById('_c9')

let pp = new CountUp('pp', 0, 0, 0, .5, { useEasing: true, useGrouping: true, separator: "", decimal: "."})
let acc = new CountUp('c9', 0, 0, 2, .5, { useEasing: true, useGrouping: true, separator: "", decimal: ".", suffix: "%" })
let combo = new CountUp('c2', 0, 0, 0, .5, { useEasing: true, useGrouping: true, separator: "", decimal: ".", suffix: "x" })
let maxCombo = new CountUp('c1', 0, 0, 0, .5, { useEasing: true, useGrouping: true, separator: "", decimal: ".", suffix: "x" })

// dom

socket.onmessage = event => {
    try { 
        let data = JSON.parse(event.data), menu = data.menu, play = data.gameplay, hits = play.hits, meta = menu.bm.metadata, stats = menu.bm.stats

        // checks game state to indicate if its playing or not
        if (menu.state === 2 || menu.state === 7 || menu.state === 14) {
            playing = true
        } else {
            playing = false
        }

        // logs what gamemode it is
        if (mode != menu.gameMode) {
          mode = menu.gameMode
        }

        //bg
        if (tempImg !== data.menu.bm.path.full) {
            tempImg = data.menu.bm.path.full;
            let img = data.menu.bm.path.full.replace(/#/g, "%23").replace(/%/g, "%25");
            bg.setAttribute(
              "src",
              `http://127.0.0.1:24050/Songs/${img}?a=${Math.random(10000)}`
            );
          }
          //title bar (.top)
          if (artist != meta.artist) {
            artist = meta.artist
          }

          if (title != meta.title) {
            title = meta.title
          }

          if (diff != meta.difficulty) {
            diff = meta.difficulty
          }

          if (mapper != meta.mapper) {
            mapper = meta.mapper
          }

          if (mods != menu.mods.str){
            mods = "+" + menu.mods.str
            if (mods == "+NM") {
                mods = ""
            }
            if (mods.includes('HD') || mods.includes('FL')) {
              hdfl = true
            } else {
              hdfl = false
            }
          }

        if (tempTitle != $title) {
            tempTitle = `${artist} - ${title} [${diff}] (${mapper}) ${mods}`
            $title.innerText = tempTitle
            textFit(document.getElementById('title'), {alignHoriz: true, minFontSize: 16, maxFontSize: 50})
        }

        //state if not playing
        if (playing == false) {

          // updates pp to pp if fc if not playing
          if (pp != menu.pp['100']) {
            pp.update(menu.pp['100'])
          }

          // hides certain counters
          setTimeout(function(){
            _c9.style.cssText = "width: 0px; font-size: 0px;"
            $c9.style.cssText = "width: 0px; font-size: 0px;"
            _c2.style.cssText = "width: 0px; font-size: 0px;"
            $c2.style.cssText = "width: 0px; font-size: 0px;"
            _c1.style.cssText = "width: 0px; font-size: 0px;"
            $c1.style.cssText = "width: 0px; font-size: 0px;"
            grade.style.fontSize = "0px"
            star.style.fontSize = "50px"
            starAccent.style.fontSize = "50px"
            starContainer.style.width = "165px"
            starContainer.style.height = "85px"
            }, 300)

          // changes border color (bar below the number)
          $c3.style.borderImage = "linear-gradient(to right, #FA5C61 0%, #FA5C61 25%, #FA5C61 50%, #FA5C61 75%, #FA5C61 100%)"
          $c3.style.borderImageSlice = "1"
          $c4.style.borderColor = "#D9CF7A";
          $c5.style.borderColor = "#509EDD";
          $c6.style.borderColor = "#6E20F9";

          // checks gamemode to change info 
          if (mode === 0 || mode === 2) {
            _c3.innerText = "CS"
            _c4.innerText = "AR"
            _c5.innerText = "HP"
            _c6.innerText = "OD"
            selector = [5, 7, 9, 11] // show halfBottom
            selector2 = [4, 6, 8, 10] // show halfTop
            selector3 = [12, 13, 14, 15] // hide
          }
           if (mode === 3) {
            _c3.innerText = "Keys"
            _c4.innerText = "AR"
            _c5.innerText = "HP"
            _c6.innerText = "OD"
            selector = [5, 9, 11] // show halfBottom
            selector2 = [4, 8, 10] // show halfTop
            selector3 = [6, 7, 12, 13, 14, 15] // hide
          }
           if (mode === 1) {
            _c3.innerText = "CS"
            _c4.innerText = "AR"
            _c5.innerText = "HP"
            _c6.innerText = "OD"
            selector = [9, 11] // show halfBottom
            selector2 = [8, 10] // show halfTop
            selector3 = [4, 5, 6, 7, 12, 13, 14, 15] // hide
          } 

          /* "c1", "_c1", "c2", "_c2", "c3", "_c3", "c4", "_c4", "c5", "_c5","c6", "_c6", "c7", "_c7", "c8", "_c8", "c9", "_c9", "grade", "star"*/

          // shows and hides certain counters indicated by the checking above
          for (let i = 0; i < selector.length; i++) {
            document.getElementById(all[selector[i]]).style.width = "100px"
            document.getElementById(all[selector[i]]).style.fontSize = "25px"
          }

          for (let n = 0; n < selector2.length; n++) {
            document.getElementById(all[selector2[n]]).style.width = "100px"
            document.getElementById(all[selector2[n]]).style.fontSize = "30px"
          }

          for (let y = 0; y < selector3.length; y++) {
            document.getElementById(all[selector3[y]]).style.width = "0px"
            document.getElementById(all[selector3[y]]).style.fontSize = "0px"
          }

          // changes text
          if ($c3 != stats.memoryCS) {
            $c3.innerText = stats.memoryCS
          }

          if ($c4 != stats.memoryAR) {
            $c4.innerText = stats.memoryAR
          }

          if ($c5 != stats.memoryHP) {
            $c5.innerText = stats.memoryHP
          }

          if ($c6 != stats.memoryOD) {
            $c6.innerText = stats.memoryOD
          }

          // changes star rating text and container color according to the star rating
          if (star != stats.fullSR) {
            star.innerText = stats.fullSR
            tempSR = stats.fullSR
            if (tempSR <= 1.99) {
              starContainer.style.backgroundColor = "#6fb23a"
            } else if (tempSR >= 2 && tempSR <= 2.69) {
              starContainer.style.backgroundColor = "#63c7ff"
            } else if (tempSR >= 2.7 && tempSR <= 3.99) {
              starContainer.style.backgroundColor = "#ffd966"
            } else if (tempSR >= 4 && tempSR <= 5.29) {
              starContainer.style.backgroundColor = "#ff7aba"
            } else if (tempSR >= 5.3 && tempSR <= 6.49) {
              starContainer.style.backgroundColor = "#868aff"
            } else if (tempSR >= 6.5) {
              starContainer.style.backgroundColor = "#000000"
            }
          }
        }

        // state if playing

        if (playing == true) {

          let tempCombo;
          let tempMaxCombo;
          let tempGrade;
          let tempAcc;

          // shows and hides certain counters
          setTimeout(function(){
          _c9.style.cssText = "width: 115px; font-size: 25px;"
          $c9.style.cssText = "width: 115px; font-size: 30px;"
          _c2.style.cssText = "width: 115px; font-size: 25px;"
          $c2.style.cssText = "width: 115px; font-size: 30px;"
          grade.style.fontSize = "90px"
          star.style.fontSize = "0px"
          starAccent.style.fontSize = "0px"
          starContainer.style.width = "0px"
          starContainer.style.height = "0px"
          }, 300)

          // changes border (bar below the number)
          $c1.style.borderColor = "lightcoral";
          $c2.style.borderColor = "lightcoral";
          $c3.style.borderImage = "linear-gradient(to right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)"
          $c3.style.borderImageSlice = "1"
          $c4.style.borderColor = "#1C96C7";
          $c5.style.borderColor = "#A1CE6A";
          $c6.style.borderColor = "#17B572";
          $c7.style.borderColor = "#A2B1F0";
          $c8.style.borderColor = "#F01920";
          $c9.style.borderColor = "lightcoral";

          // changes info according to the gamemode
          if (mode === 0) {
            selector = [7, 11, 13, 15,] // show halfBottom
            selector2 = [6, 10, 12, 14,] // show halfTop
            selector3 = [4, 5, 8, 9] // hide
            _c4.innerText = "300"
            _c6.innerText = "100"
            _c7.innerText = "50"
            _c8.innerText = "0"
          }

          if (mode === 1) {
            selector = [7, 11, 15,] //show halfBottom
            selector2 = [6, 10, 14,] // show halfTop
            selector3 = [4, 5, 8, 9, 12, 13,] // hide
            _c4.innerText = "300"
            _c6.innerText = "100"
            _c8.innerText = "0"
          }

          if (mode === 2) {
            selector = [7, 11, 13, 15,] // show halfBottom
            selector2 = [6, 10, 12, 14,] // show halfTop
            selector3 = [4, 5, 8, 9] // hide
            _c4.innerText = "FRUITS"
            _c6.innerText = "TICKS"
            _c7.innerText = "DRPMSS"
            _c8.innerText = "MISS"
          }

          if (mode === 3) {
            selector = [5, 7, 9, 11, 13, 15,] //show halfBottom
            selector2 = [4, 6, 8, 10, 12,14,] // show halfTop
            selector3 = [] // hide
            _c3.innerText = "320"
            _c4.innerText = "300"
            _c5.innerText = "200"
            _c6.innerText = "100"
            _c7.innerText = "50"
            _c8.innerText = "0"
          }

          /* "c1", "_c1", "c2", "_c2", "c3", "_c3", "c4", "_c4", "c5", "_c5","c6", "_c6", "c7", "_c7", "c8", "_c8", "c9", "_c9", "grade", "star"*/

          // shows and hides counters based on the checks above
          for (let x = 0; x < selector.length; x++) {
            document.getElementById(all[selector[x]]).style.width = "100px"
            document.getElementById(all[selector[x]]).style.fontSize = "25px"
          }

          for (let a = 0; a < selector2.length; a++) {
            document.getElementById(all[selector2[a]]).style.width = "100px"
            document.getElementById(all[selector2[a]]).style.fontSize = "30px"
          }

          for (let b = 0; b < selector3.length; b++) {
            document.getElementById(all[selector3[b]]).style.width = "0px"
            document.getElementById(all[selector3[b]]).style.fontSize = "0px"
          }

          // changes text
          if (pp != play.pp.current) {
            pp.update(play.pp.current)
          }

          if (tempCombo != play.combo.current) {
            tempCombo = play.combo.current
          }

          if (tempMaxCombo != play.combo.max) {
            tempMaxCombo = play.combo.max
          }

          // shows and hides the max combo if max combo and combo are equal and vice versa
          setTimeout(function(){
            if (tempMaxCombo != tempCombo) {
              $c1.style.cssText = "width: 165px; font-size: 30px;"
              _c1.style.cssText = "width: 165px; font-size: 25px;"
              } else {
              $c1.style.cssText = "width: 0px; font-size: 0px;"
              _c1.style.cssText = "width: 0px; font-size: 0px;"
              }
          }, 350)
          
          // changes text again
          if (combo != play.combo.current) {
            combo.update(play.combo.current)
          }

          if (maxCombo != play.combo.max) {
            maxCombo.update(play.combo.max)
          }

          if (acc != play.accuracy) {
            acc.update(play.accuracy)
            tempAcc = play.accuracy
          }

          // catch and mania grade system
          if (mode === 2 || mode === 3) {
            if (mode === 2) {
              if (tempAcc == 100.00) {
                tempGrade = "SS"
              } else if (tempAcc >= 98.01 && tempAcc <= 99.99) {
                tempGrade = "S"
              } else if (tempAcc >= 94.01 && tempAcc <= 98.00) {
                tempGrade = "A"
              } else if (tempAcc >= 90.01 && tempAcc <= 94.00) {
                tempGrade = "B"
              } else if (tempAcc >= 85.01 && tempAcc <= 90.00) {
                tempGrade = "C"
              } else if (tempAcc <= 85.00) {
                tempGrade = "D"
              }
            }
            if (mode === 3) {
              if (tempAcc == 100.00) {
                tempGrade = "SS"
              } else if (tempAcc >= 95.00 && tempAcc <= 99.99) {
                tempGrade = "S"
              } else if (tempAcc >= 90.00 && tempAcc <= 94.99) {
                tempGrade = "A"
              } else if (tempAcc >= 80.00 && tempAcc <= 89.99) {
                tempGrade = "B"
              } else if (tempAcc >= 70.00 && tempAcc <= 79.99) {
                tempGrade = "C"
              } else if (tempAcc <= 69.99) {
                tempGrade = "D"
              }
            } 
            if (tempAcc == 0) {
              tempGrade = ""
            }
            if (grade != tempGrade) {
              grade.innerText = tempGrade
            }
          }

          // standard and taiko grade system from gosumemory
          if (mode === 0 || mode === 1) {
            if (grade != hits.grade.current) {
              grade.innerText = hits.grade.current
              tempGrade = hits.grade.current
            }
          }

          // if acc is 0, grade is --
          if (tempGrade == "") {
            grade.innerText = "--"
          }

          // changes color of grade 
          if (tempGrade == "SS") {
            if (hdfl == true) {
              grade.style.color = "#E4E4E4"
            } else {
              grade.style.color = "#FFFB8B"
            }
          }
          if (tempGrade == "S") {
            if (hdfl == true) {
              grade.style.color = "#E4E4E4"
            } else {
              grade.style.color = "#FFFB8B"
            }
          }
          if (tempGrade == "A") {
            grade.style.color = "#9DF9AA"
          }
          if (tempGrade == "B") {
            grade.style.color = "#9DACF9"
          }
          if (tempGrade == "C") {
            grade.style.color = "#ED9DF9"
          }
          if (tempGrade == "D") {
            grade.style.color = "#F99D9D"
          }
          if (tempGrade == "") {
            grade.style.color = "#FFFFFF"
          }

          // changes text again
          if ($c3 != hits.geki) {
            $c3.innerText = hits.geki
          }

          if (mode === 3 || mode === 2) {
            if ($c4 != hits[300]) {
              $c4.innerText = hits[300]
            } 
          } else {
            if ($c4 != hits[300] + hits.geki) {
              $c4.innerText = hits[300] + hits.geki
            }
          }
          
          if ($c5 != hits.katu) {
            $c5.innerText = hits.katu
          }

          if (mode === 3 || mode === 2) {
            if ($c6 != hits[100]) {
              $c6.innerText = hits[100]
            } 
          } else {
            if ($c6 != hits[100] + hits.katu) {
              $c6.innerText = hits[100] + hits.katu
            }
          }

          if (mode === 2) {
            if ($c7 != hits.katu) {
              $c7.innerText = hits.katu
            }
          } else {
            if ($c7 != hits[50]) {
              $c7.innerText = hits[50]
            }
          }

          if ($c8 != hits[0]) {
            $c8.innerText = hits[0]
          }
        }
    } catch (err) { console.log(err); };
};