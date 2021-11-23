const axios = require('axios');
const CONSTANTS = require('./constants.json');
const aoe2queries = require('./apiQueries/aoe2netQueries.js');
const steamqueries = require('./apiQueries/steamQueries.js');
const steamQueries = require('./apiQueries/steamQueries.js');

/**
 * Affiche le dernier mache joué/en cours d'un joueur steam
 * @param {string} vanityurl L'url custom du compte steam ciblé
 */
async function getLastMatch(vanityurl) {
    let steamId = await steamqueries.querySteamId(vanityurl);
    let pseudo = await steamQueries.querySteamName(steamId);

    const responseaoe2net = await aoe2queries.queryLastMatch(steamId);
    if (responseaoe2net != null) {
        return logPlayersParticipating(responseaoe2net.last_match.players, pseudo, responseaoe2net.profile_id);
    } else {
        throw new Error("Impossible de récupérer le dernier match du joueur !!")
    }
}

/**
 * Affiche l'elo actuel d'un joueur steam dans tous les classements du jeu
 * @param {string} vanityurl 
 */
async function getCurrentPlayerInfos(vanityurl) {
    let steamId = await steamqueries.querySteamId(vanityurl);
    let pseudo = await steamQueries.querySteamName(steamId);

    const ew1v1response = await aoe2queries.queryRatingHistory(13, steamId, 1);
    const ewteamresponse = await aoe2queries.queryRatingHistory(14, steamId, 1);
    const rm1v1response = await aoe2queries.queryRatingHistory(3, steamId, 1);
    const rmteamresponse = await aoe2queries.queryRatingHistory(4, steamId, 1);

    if (rm1v1response != null && rm1v1response.length > 0) {
        console.log("Rating actuel de " + pseudo + " en RM 1v1 : " + rm1v1response[0].rating);
    }
    if (rmteamresponse != null && rmteamresponse.length > 0) {
        console.log("Rating actuel de " + pseudo + " en RM Team : " + rmteamresponse[0].rating);
    }
    if (ew1v1response != null && ew1v1response.length > 0) {
        console.log("Rating actuel de " + pseudo + " en EW 1v1 : " + ew1v1response[0].rating);
    }
    if (ewteamresponse != null && ewteamresponse.length > 0) {
        console.log("Rating actuel de " + pseudo + " en EW Team : " + ewteamresponse[0].rating);
    }
}

function logPlayersParticipating(players, vanityurl, profileId) {
    let team1 = players.filter(x => x.team == 1);
    let team2 = players.filter(x => x.team == 2);
    let res = "";
    res += `${vanityurl} a joué son dernier match en ${players.length / 2}v${players.length / 2}.\n`;
    res += `Equipe 1 : ${getStrPlayersOfTeam(team1)}\n`;
    res += `Equipe 2 : ${getStrPlayersOfTeam(team2)}\n`;
    if (players.length / 2 > 1) {
        res += (players[0].won != null ? `${"L'équipe de " + players.filter(x => x.won).some(e => e.profile_id == profileId) ? vanityurl : "L'équipe adverse"} a gagné !` : "La partie est toujours en cours.");
    } else {
        res += (players[0].won != null ? `${players.filter(x => x.won).some(e => e.profile_id == profileId) ? vanityurl : "L'adversaire"} a gagné !` : "La partie est toujours en cours.");
    }
    return res;
}

function getStrPlayersOfTeam(team) {
    let toret = "";
    for (let player of team) {
        toret += `${player.name} (${CONSTANTS.mappings.colors[player.color]}, ${CONSTANTS.mappings.civs[player.civ_alpha]}), `;
    }
    toret = toret.slice(0, -1);
    return toret;
}

module.exports = {
    getLastMatch: getLastMatch,
    getCurrentPlayerInfos: getCurrentPlayerInfos
}