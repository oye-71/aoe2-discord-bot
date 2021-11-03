const axios = require('axios');
const constants = require('./constants.json');

/**
 * Affiche le dernier mache joué/en cours d'un joueur steam
 * @param {string} vanityurl L'url custom du compte steam ciblé
 */
async function getLastMatch(vanityurl) {
    let steamId = await getSteamIdFromVanity(vanityurl);
    console.log("Steam id is : " + steamId + "\n ----------------------");
    const responseaoe2net = await axios.get("https://aoe2.net/api/player/lastmatch", {
        params: {
            game: "aoe2de",
            steam_id: steamId
        }
    });
    if (responseaoe2net != null && responseaoe2net.status == 200) {
        logPlayersParticipating(responseaoe2net.data.last_match.players, vanityurl, responseaoe2net.data.profile_id);
    } else {
        throw new Error("Impossible de récupérer le dernier match du joueur !!")
    }
}

/** TODO */
function getCurrentPlayerInfos(vanityurl) {
    let steamId = await getSteamIdFromVanity(vanityurl);
    console.log("Steam id is : " + steamId + "\n ----------------------");
    const responseaoe2net = await axios.get("https://aoe2.net/api/player/ratinghistory", {
        params: {
            game: "aoe2de",
            leaderboard_id: 3,
            steam_id: steamId,
            count: 1
        }
    });
    /* TODO la suite (ici on ne recupere que le rank, nb de victoires et nb de defaites => faire un recap des 4 lobbies ?) */
}

/**
 * Retourne le steam id en fonction de la vanity url
 * @param {string} vanityurl L'url custom du compte steam ciblé
 */
async function getSteamIdFromVanity(vanityurl) {
    const response = await axios.get("http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/", {
        params: {
            key: constants.steamApiKey,
            vanityurl: vanityurl
        }
    });
    if (response != null && response.status == 200) {
        return response.data.response.steamid;
    } else {
        throw new Error("Impossible de récupérer le steam id !!");
    }
}

function logPlayersParticipating(players, vanityurl, profileId) {
    let team1 = players.filter(x => x.team == 1);
    let team2 = players.filter(x => x.team == 2);
    console.log(`${vanityurl} played a ${players.length/2}v${players.length/2} most recently.`);
    console.log(`team1: ${getStrPlayersOfTeam(team1)}`);
    console.log(`team2: ${getStrPlayersOfTeam(team2)}`);
    console.log(players[0].won != null ? `${players.filter(x => x.won).some(e => e.profile_id == profileId) ? vanityurl : "opponents"} won the game !` : "They are still playing the game.");
}

function getStrPlayersOfTeam(team) {
    let toret = "";
    for (let player of team) {
        toret += `${player.name} (${constants.mappings.colors[player.color]}, ${constants.mappings.civs[player.civ_alpha]}), `;
    }
    toret = toret.slice(0, -1);
    return toret;
}

module.exports = {
    getLastMatch: getLastMatch
}