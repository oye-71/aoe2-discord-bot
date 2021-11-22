const CONFIG = require('./local.config.json') // TODO : Seulement en local, faire ça avec les variables d'environnement
const functions = require('./functions.js');
const {Client, Intents} = require('discord.js');
const client =  new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
    console.log("Discord client is ready");
    client.login(CONFIG.token);
});

// TODO IMPLEMENT DISCORD BOT
(async() => {
    await functions.getLastMatch(CONFIG.vanityUrl);

    await functions.getCurrentPlayerInfos(CONFIG.vanityUrl);
})();