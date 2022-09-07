const CONFIG = require("./local.config.json"); // TODO : Seulement en local, faire ça avec les variables d'environnement
const functions = require("./functions.js");
const { Client, Intents } = require("discord.js");

// Nouveau client discord
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.once("ready", () => {
    console.log("Discord client is ready!");
});

// Login en tant que bot discord
client.login(CONFIG.discordToken);

client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        // Commande match
        if (interaction.commandName == "aoematch") {
            let vanilla = interaction.options.getString("username");
            await interaction.reply("Requête en cours...");
            try {
                let result = await functions.getLastMatch(vanilla);
                await interaction.editReply(result);
            } catch (e) {
                console.error("Erreur en utilisant la commande /match : " + e);
                interaction.editReply(
                    "Je n'ai rien trouvé qui corresponde à ce pseudo, ou une erreur s'est produite. Réessaye plus tard !"
                );
            }
        }
        // Commande rank
        else if (interaction.commandName == "aoerank") {
            let vanilla = interaction.options.getString("username");
            await interaction.reply("Requête en cours...");
            try {
                let result = await functions.getCurrentPlayerInfos(vanilla);
                await interaction.editReply(result);
            } catch (e) {
                console.error("Erreur en utilisant la commande /rank : " + e);
                interaction.editReply(
                    "Je n'ai rien trouvé qui corresponde à ce pseudo, ou une erreur s'est produite. Réessaye plus tard !"
                );
            }
        }
        // Commande winrate
        else if (interaction.commandName == "aoewinrate") {
            let vanilla = interaction.options.getString("username");
            let civ = interaction.options.getString("civ");
            await interaction.reply("Requête en cours...");
            try {
                let result = await functions.getWinrate(vanilla, civ);
                await interaction.editReply(result);
            } catch (e) {
                console.error("Erreur en utilisant la commande /winrate : " + e);
                interaction.editReply(
                    "Je n'ai rien trouvé qui corresponse à ce pseudo, ou une erreur s'est produite. Réessaye plus tard !"
                );
            }
        }
        // Tacos ??
        else if (interaction.commandName == "quiestlemeilleurtacos") {
            await interaction.reply("Le tacos du Creusot bien sûr !! :taco:");
        }
    }
});

// // TODO IMPLEMENT DISCORD BOT
// (async() => {
//     await functions.getLastMatch(CONFIG.vanityUrl);
//     await functions.getCurrentPlayerInfos(CONFIG.vanityUrl);
// })();
