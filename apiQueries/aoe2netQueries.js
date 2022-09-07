const axios = require("axios");
const CONSTANTS = require("../constants.json");

/**
 * Requete aoe2.net pour avoir des détails du dernier match d'un joueur.
 * @param {*} steamid Id steam du joueur
 * @returns
 */
async function queryLastMatch(steamid) {
    let response = await axios.get("https://aoe2.net/api/player/lastmatch", {
        params: {
            game: CONSTANTS.game,
            steam_id: steamid,
        },
    });
    return response?.data;
}

/**
 * Requete aoe2.net pour avoir l'historique de l'elo des derniers matchs joués par un joueur
 * @param {int} leaderboardid Classement recherché (3 = RM 1v1, ...)
 * @param {*} steamid Id steam du joueur
 * @param {int} count Nombre de matchs requêtés
 * @returns
 */
async function queryRatingHistory(leaderboardid, steamid, count) {
    let response = await axios.get("https://aoe2.net/api/player/ratinghistory", {
        params: {
            game: CONSTANTS.game,
            leaderboard_id: leaderboardid,
            steam_id: steamid,
            count: count,
        },
    });
    return response?.data;
}

/**
 * Requête aoe2.net pour avoir la liste des {count} derniers matchs joués par un joueur
 * @param {*} steamid Id steam du joueur
 * @param {int} count Nombre de matches requêtés
 * @returns
 */
async function queryMatches(steamid, count) {
    let response = await axios.get("https://aoe2.net/api/player/matches", {
        params: {
            game: CONSTANTS.game,
            steam_id: steamid,
            count: count,
        },
    });
    // todo : quand trop de games, on arrive pas à filtrer et on tombe sur 0
    return response?.data;
}

module.exports = {
    queryLastMatch: queryLastMatch,
    queryRatingHistory: queryRatingHistory,
    queryMatches: queryMatches,
};
