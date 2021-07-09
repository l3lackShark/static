# About this Fork
This Fork will add a Twitch bot, which replies to various commands regarding the current state of osu!.
To make this bot work, you will need to add your twitch token to the [twitch.js](https://github.com/C0D3-M4513R/twitch-static/blob/master/twitch.js) file.
You can get a token two different ways:

- Using an Twitch app
- Just using your account

The upside of choosing the first way is, that the generated token will only be usable, for the things, that you want the bot to access. Therefore if the token is somehow leaked, it is no big deal. The downside is, that it is slightly harder to setup. Functionally it is all the same though.

## Getting a Token using a Twitch app
- Create a Twitch app at https://dev.twitch.tv/console/apps.
- Copy the `Client-ID`
- Add `https://twitchapps.com/tokengen/` as a `OAuth Redirect URLs`
- Go to https://twitchapps.com/tokengen/
- Paste the `Client-ID`, that you copied
- Enter `chat:read chat:edit` as the scope.
- If you want the Bot to be able to delete the Commands for the Bot (`deleteAfterDone`), you will additionally need the `channel:moderate` scope. If you are unsure, if you want this, just add the scope, as you can still enable/disable the feature from the JS file, as you like.
- Click `Connect` on the https://twitchapps.com Website
- Click `Authorize` on the https://id.twitch.tv Website, that opened. This link will NOT work!
- Copy the OAuth-Token. Keep it safe, because with that token, and your username, one could write chat messages, as you.

## Getting a Token without setting up a Twitch app
- Go to https://twitchapps.com/tmi
- Click `Connect` on the https://twitchapps.com Website
- Click `Authorize` on the https://id.twitch.tv Website, that opened. This link will NOT work!
- Copy the OAuth-Token. Keep it safe, because with that token, and your username, one could do pretty much anything, including: (sending chast messages, doing mod things, changing stream information, edit vods)

## Config
All of the config, for this fork is located in the twich.js file.
This Section will go over what each config does.

### Username and Token
```js
const username = "c0d3_m4513r";
const token = "${{TWITCH_API_TOKEN}}";
```
Those variables control the login of the bot.
It is essentially like a username/password combo, just for bots.

How to get a token is described above.

### Other
```js
const channel = "c0d3_m4513r"
const enabled =  true
const deleteAfterDone = true
```
* The variable `channel` is there, to specify, in which channel the bot should be active.
This allows you to have a seperate bot account for your Stream.
* `enabled` toggles, weather the bot is active at all.
If this is false, the bot will do nothing.
It won't login to your account.
* `deleteAfterDone`: This will delete a message, which caused a response, if the bot successfully replied, to the command.


# Counters

### InGame1

> Size: 240x133\
<img  src="https://user-images.githubusercontent.com/20248967/110195364-7337e280-7e5e-11eb-9bbb-8dadddf6e2bd.png"  width="250">\
By: [Dartandr][1]<br>

### InGame2

> Size: 370x120\
<img  src="https://cdn.discordapp.com/attachments/562954897163812865/817866179619192862/unknown.png"  width="280">\
By: [Dartandr][1]<br>

### InGame3

> Size: 150x70\
<img  src="https://cdn.discordapp.com/attachments/562954897163812865/817866299274559498/unknown.png"  width="150">\
By: [Dartandr][1]<br>


### reComfortaa

> Size: 1152x245\
> *Song Selection*\
<img src="https://i.imgur.com/r4AWqbH.png" width="500">\
>*Gameplay*\
<img src="https://i.imgur.com/7rEgtkH.png" width="500">\
By: [Xynogen][6]<br>

### MonokaiPane

> Size: 512x150\
> *Song Selection*\
<img src="https://i.imgur.com/T8p0R29.png" width="500">\
>*Gameplay 1*\
<img src="https://i.imgur.com/TAmHvFM.png" width="500">\
>*Gameplay 2*\
<img src="https://i.imgur.com/FpHkdLg.png" width="500">\
By: Xynogen<br>

### WaveTournament

> Size: 1920x1080\
> *Chat + Warmup (Team score disabled) view*\
<img src="https://user-images.githubusercontent.com/23419562/97575468-59554180-1a1f-11eb-8f63-c6db9dd621fa.png" width="500">\
> *Chat + Warmup (Team score disabled) view*\
<img src="https://user-images.githubusercontent.com/23419562/97575499-61ad7c80-1a1f-11eb-850d-9e8754a5cc93.png" width="500">\
> *Gameplay*\
<img src="https://user-images.githubusercontent.com/23419562/97575572-81dd3b80-1a1f-11eb-8e92-e0fb67fadeac.png" width="500">\
By: [VictimCrasher][4]<br>

### Classic

> Size: 550x300\
<img  src="https://cdn.discordapp.com/attachments/641255341245333514/731838930340544573/unknown.png"  width="500">\
By: [Dartandr][1]<br>

### OldClassic

> Size: 550x300\
<img  src="https://cdn.discordapp.com/attachments/530940222771560452/732545954468593664/unknown.png"  width="500">\
By: [Dartandr][1]<br>
  
### Simplistic

> Size: 750x150\
> *Song Selection*\
<img src="https://i.postimg.cc/zvN5nxTZ/download.png">\
>*Gameplay 1*\
<img src="https://i.postimg.cc/NMMhcLmV/Screenshot-1.png">\
By: [jassper0][5]<br>

### DarkAndWhite

> Size: 840x140\
<img  src="https://i.imgur.com/mBN375B.jpg"  width="500">\
By: [cyperdark][2]<br>

### Kerli1 & Kerli2

> Size (1)(2): 794x124 | 353x190\
<img  src="https://i.imgur.com/n2w260o.jpg"  width="500">\
By: [Dartandr][1]<br>

### Luscent

> Size: 1920x1080\
Open-Source Implementation of [Luscent's][3] overlay. No elements were stolen. This is a remake. Please [consider buying](https://gumroad.com/l/Luscent) his version!\
<img  src="https://media.discordapp.net/attachments/641255341245333514/731843129833160704/unknown.png"  width="500">\
Remake by: [Dartandr][1]

### VictimCrasherCompact

> Size: 560x150\
> *Song Selection*\
<img  src="https://i.imgur.com/1F1GK3Z.png" width="500">\
>
> *Gameplay*\
<img  src="https://i.imgur.com/epx6dij.png" width="500">\
By: [VictimCrasher][4]<br>
  
### VictimCrasherOverlay

> Size: 1920x1080\
<img  src="https://i.imgur.com/Wo6wI1B.png"  width="500">\
By: [VictimCrasher][4]<br>

### UnstableRate

> Size: 300x100\
Just a plain number that shows current UnstableRate, could be useful if you want to put it above your UR Bar.\
By: [Dartandr][1]

### MaximalLime

> Size: 800x306\
<img  src="https://cdn.discordapp.com/attachments/641255341245333514/731841741715669002/unknown.png"  width="500">\
By: [cyperdark][2]<br>

### MinimalLime

> Size: 640x130\
<img  src="https://cdn.discordapp.com/attachments/641255341245333514/731840161612300358/unknown.png"  width="500">\
By: [cyperdark][2]<br>

### TrafficLight

> Size: 458x380\
<img  src="https://cdn.discordapp.com/attachments/641255341245333514/731842011514011698/unknown.png">\
By: [cyperdark][2]<br>

[1]: https://github.com/Dartandr

[2]: https://github.com/cyperdark

[3]: https://github.com/inix1257

[4]: https://github.com/VictimCrasher

[5]: https://github.com/jassper0

[6]: https://github.com/Xyn0gen
