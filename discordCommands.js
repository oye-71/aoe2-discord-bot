const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { discordClientId, discordGuildId, discordToken } = require("./local.config.json");

const commands = [
    new SlashCommandBuilder()
        .setName("aoematch")
        .setDescription("Renvoie le match en cours d'un joueur")
        .addStringOption((option) =>
            option.setName("username").setDescription("L'url custom steam du joueur ciblé").setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName("aoerank")
        .setDescription("Renvoie les classements d'un joueur")
        .addStringOption((option) =>
            option.setName("username").setDescription("L'url custom steam du joueur ciblé").setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName("aoewinrate")
        .setDescription("Renvoie le winrate d'un joueur pour une civilisation donnée")
        .addStringOption((option) =>
            option.setName("username").setDescription("L'url custom steam du joueur ciblé").setRequired(true)
        )
        .addStringOption((option) =>
            option.setName("civ").setDescription("Le nom de la civilisation ciblée").setRequired(true)
        ),
    new SlashCommandBuilder().setName("quiestlemeilleurtacos").setDescription("Qui est le meilleur tacos ??"),
].map((com) => com.toJSON());

const rest = new REST({ version: "9" }).setToken(discordToken);

rest.put(Routes.applicationGuildCommands(discordClientId, discordGuildId), { body: commands })
    .then(() => console.log("Les commandes du bot ont été déclarées avec succès."))
    .catch(console.error);
