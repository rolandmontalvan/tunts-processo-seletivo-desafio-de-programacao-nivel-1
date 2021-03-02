const { client } = require('./app/validations/auth');
const { gSheetAnalysis } = require('./app/services/gSheetAnalysis');

client.authorize(function (err, tokens) {
    if (err) {
        console.log(err);
    } else {
        console.log('conectado');
        gSheetAnalysis(client);
    }
});