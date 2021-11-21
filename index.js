const functions = require('./functions.js');

// Pour les tests uniquement
// A voir pour map ça sur une requete de bot discord
const vanityurl = 'oye71';

(async() => {
    await functions.getLastMatch(vanityurl);

    await functions.getCurrentPlayerInfos(vanityurl);
})();