const CONFIG = require('./local.config.json') // TODO : Seulement en local, faire ça avec les variables d'environnement
const functions = require('./functions.js');
const {Client, Intents} = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

// Nouveau client discord
const client =  new Client({ intents: [Intents.FLAGS.GUILDS] });
client.once('ready', () => {
	console.log('Discord client is ready!');
});

// Login en tant que bot discord
client.login(CONFIG.discordToken);

// Commandes acceptées par le bot 
// const commandes = [
//     new SlashCommandBuilder().setName('match').setDescription('Renvoie le match en cours d\'un joueur'),
// 	new SlashCommandBuilder().setName('rank').setDescription('Renvoie les classements d\'un joueur')
// ];

// TODO IMPLEMENT DISCORD BOT
(async() => {
    await functions.getLastMatch(CONFIG.vanityUrl);
    await functions.getCurrentPlayerInfos(CONFIG.vanityUrl);
})();