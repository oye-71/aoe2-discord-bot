const CONFIG = require('./local.config.json') // TODO : Seulement en local, faire ça avec les variables d'environnement
const functions = require('./functions.js');
const { Client, Intents } = require('discord.js');

// Nouveau client discord
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.once('ready', () => {
    console.log('Discord client is ready!');
});

// Login en tant que bot discord
client.login(CONFIG.discordToken);

client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        if (interaction.commandName == "match") {
            let vanilla = interaction.options.getString("username");
            try {
                await interaction.reply("Requête en cours...")
                let result = await functions.getLastMatch(vanilla);
                await interaction.editReply(result);
            } catch (e) {
                console.error("Erreur en utilisant la commande /match : " + e);
                interaction.reply("Je n'ai rien trouvé qui corresponde à ce pseudo, ou une erreur s'est produite. Réessaye plus tard !");
            }
        }
        else if (interaction.commandName == "rank") {
            interaction.reply("Vous avez demandé votre elo. Cette commande est en construction.");
        }
    }
})

// // TODO IMPLEMENT DISCORD BOT
// (async() => {
//     await functions.getLastMatch(CONFIG.vanityUrl);
//     await functions.getCurrentPlayerInfos(CONFIG.vanityUrl);
// })();