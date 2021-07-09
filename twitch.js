
let olddata=undefined;
//----------------------------------------
const username = "c0d3_m4513r"; //Your own username
const token = "${{TWITCH_API_TOKEN}}"; //Your twitch token, for the username above
const channel = "c0d3_m4513r" //The channel, the bot should reply to commands.
const enabled =  true
const deleteAfterDone = false 
//This can get messy in chat view. 

const run = async ()=>{
    const chat = new window.TwitchJs.Chat(
    {username,
     token,
     log: { level: "warn" }
    });  
  
  chat.on("*", async (message) => {
    const time = new Date(message.timestamp).toTimeString();
    const event = message.event || message.command;
    const channel = message.channel;
    const msg = message.message || "";

    console.log(time+","+event+","+channel+","+msg)
    let send=undefined;
    let bpm="";
    let tmp=""
    switch(msg){
	case "!commands":
	    send="!np,!link,!id,!set,!igpp,!pp,!status,!ar,!cs,!od,!hp,!diff,!bpm,!combo"
	    break;
	case "!ping":
	    if(message.username===username) send = "Pong!"
	    break;
        case "!np":
            send=`${olddata.menu.bm.metadata.title} Artist:${olddata.menu.bm.metadata.artist} Mapper:${olddata.menu.bm.metadata.mapper} Diff:${olddata.menu.bm.metadata.difficulty} Mods:${olddata.menu.mods.str}`
            break;
	case "!link":
	    switch(olddata.menu.gameMode){
	    	case 0:
		    tmp="osu"
		    break;
		case 1:
		   tmp="taiko"
		   break;
		case 2:
		   tmp="fruits"
		   break;
		case 3:
		   tmp="mania"
		   break;
            }
	    send=`https://osu.ppy.sh/beatmapsets/${olddata.menu.bm.set}#${tmp}/${olddata.menu.bm.id}`
	    break;
        case "!id":
            send=`${olddata.menu.bm.id}`
            break;
	case "!set":
            send=`${olddata.menu.bm.set}`
            break;
	case "!igpp":
	    if(olddata.menu.state===2)
	    send=`Current: ${olddata.gameplay.pp.current} Possible max: ${olddata.gameplay.pp.maxThisPlay} FC: ${olddata.gameplay.pp.fc}`
	    break;
        case "!pp":
	    send=`95%: ${olddata.menu.pp[95]}pp, 96%: ${olddata.menu.pp[96]}pp,97%: ${olddata.menu.pp[97]}pp, 98%: ${olddata.menu.pp[98]}pp,99%: ${olddata.menu.pp[99]}pp, 100%: ${olddata.menu.pp[100]}pp`
	    break;
	case "!status":
	case "!stats":
	    switch(olddata.menu.bm.rankedStatus){
		case 1:
		    tmp="unsubmitted, "
		    break;
		case 2:
		    tmp="Pending/WIP/Graveyard, "
		    break;
		case 4:
		    tmp="Ranked, "
		    break;
		case 5:
		    tmp="Approved, "
		    break;
		case 6:
		    tmp="Qualified, "
		    break;
	    }
	    if(olddata.menu.bm.stats.BPM.min===olddata.menu.bm.stats.BPM.max) bpm=`${olddata.menu.bm.stats.BPM.min}`
	    else bpm=`${olddata.menu.bm.stats.BPM.min}-${olddata.menu.bm.stats.BPM.max}`
	    send=`${tmp}AR: ${olddata.menu.bm.stats.AR},CS: ${olddata.menu.bm.stats.CS},OD: ${olddata.menu.bm.stats.OD},HP: ${olddata.menu.bm.stats.HP},Diff: ${olddata.menu.bm.stats.fullSR}, BPM: ${bpm}`
	    break;
	case "!ar":
	    send=`AR: ${olddata.menu.bm.stats.AR}`
	    break;
	case "!cs":
	    send=`CS: ${olddata.menu.bm.stats.CS}`
	    break;
	case "!od":
	    send=`OD: ${olddata.menu.bm.stats.OD}`
	    break;
	case "!hp":
	    send=`HP: ${olddata.menu.bm.stats.HP}`
	    break;
	case "!diff":
	    send=`Diff: ${olddata.menu.bm.stats.fullSR}`
	    break;
	case "!bpm":
	    if(olddata.menu.bm.stats.BPM.min===olddata.menu.bm.stats.BPM.max) bpm=`${olddata.menu.bm.stats.BPM.min}`
	    else bpm=`${olddata.menu.bm.stats.BPM.min}-${olddata.menu.bm.stats.BPM.max}`
	    send=`BPM: ${bpm}`
	    break;
	case "!combo":
           if(olddata.menu.state===2)
	   send=`Current: ${olddata.gameplay.combo.current}, Max: ${olddata.gameplay.combo.max}`
	   break;
    }
    if(send!==undefined){
	console.log("trying to send msg. with content:"+send)
	chat.say(channel,send)
		.then(
		()=>{
			console.log("sucess")
			if(deleteAfterDone){
				return chat.delete(channel, message.tags.id).then(()=>{console.log("success delete")})
			}
	});
    }
  });
  
  await chat.connect();
  await chat.join("#"+channel);
}

if (enabled) run()
