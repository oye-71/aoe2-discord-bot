const axios = require('axios');
const CONSTANTS = require('../constants.json');

/**
 * Retourne le steam id en fonction de la vanity url
 * @param {string} vanityurl L'url custom du compte steam ciblé
 */
 async function querySteamId(vanityurl) {
    const response = await axios.get("http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/", {
        params: {
            key: CONSTANTS.steamApiKey,
            vanityurl: vanityurl
        }
    });
    if (response != null && response.status == 200) {
        return response.data.response.steamid;
    } else {
        throw new Error("Impossible de récupérer le steam id !!");
    }
}

/**
 * Retourne le pseudo steam en fonction de l'id
 * @param {*} steamid L'id du compte steam ciblé
 * @returns 
 */
async function querySteamName(steamid) {
    const response = await axios.get("http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/", {
        params: {
            key: CONSTANTS.steamApiKey,
            steamids: steamid
        }
    });
    if(response != null && response.status == 200){
        return response.data.response.players[0].personaname;
    } else {
        throw new Error("Impossible de récupérer le pseudo !!");
    }
}

module.exports = {
    querySteamId: querySteamId,
    querySteamName: querySteamName
}