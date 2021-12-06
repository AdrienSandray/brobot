import tmi from 'tmi.js'
import { BOT_USERNAME , OAUTH_TOKEN, OAUTH_TOKEN_BOT, CHANNEL_NAME} from './constants'

const options = {
	options: { debug: true },
	connection: {
    reconnect: true,
    secure: true,
    timeout: 180000,
    reconnectDecay: 1.4,
    reconnectInterval: 1000,
	},
	identity: {
		username: BOT_USERNAME,
		password: OAUTH_TOKEN_BOT
	},
	channels: [ CHANNEL_NAME ]
}

const client = new tmi.Client(options)
client.connect();

client.on('message', (channel, userstate, message, self) => {
	if(self) {
	  return
	}
  
	if (userstate.username === BOT_USERNAME) {
	  console.log(`Not checking bot's messages.`)
	  return
	}
  
	if(message.toLowerCase() === '!help') {
  	help(channel, userstate)
	return
	}

	if(message.toLowerCase() === '!disc') {
		client.say(channel, `@${userstate.username}, Rejoint notre discord : https://discord.gg/GjCmGxXYDb`)
		return
	}

	if(message.toLowerCase() === '!yt') {
		client.say(channel, `@${userstate.username}, Abonne toi à la chaîne : https://www.youtube.com/channel/UCzaEkz20p-Vg1FEXxpSVumw`)
		return
	}

	let msg = message.split(" ")
	if(msg[0] === '!shot'){
		if(msg[1] === undefined){client.say(channel, `@${userstate.username} faut mettre un blaze apres la commande.`)}
		else {shot(channel, userstate, msg[1])}
		return
	}

	if(userstate.username === 'darkness341') {
		client.say(channel, `@${userstate.username} enculé`)
		return
	}
})

setInterval(updateTime, 60000);

/*definitions des fonctions */

function help (channel, userstate) {
	client.say(channel, `@${userstate.username}, Liste des commandes : 
	\n !disc
	\n !yt
	\n !shot`)
}

function shot(channel, userstate, pseudo){
	var num = Math.floor(Math.random()*10+1);
	if(num%2===0){
		client.say(channel, `mmmmh nn, @${userstate.username} tu prends ` + num + ' shots allez hophophop.')
	}
	else{
		client.say(channel, `c réel, @`+ pseudo + ' tu prends ' + num + ' shots.')
	}
}

function updateTime() {
    const date = new Date();
    const minutes = date.getMinutes();
	if (minutes % 15 === 0){
		client.say(CHANNEL_NAME, 'oeeeeeeeeeeeee bien ?')
	}
}


