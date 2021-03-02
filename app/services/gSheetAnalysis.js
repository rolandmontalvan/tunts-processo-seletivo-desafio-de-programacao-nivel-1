const { google } = require('googleapis');

async function gSheetAnalysis(client) {
    const googleSheetAPi = google.sheets({
        version: 'v4',
        auth: client
    });
    const sheetPass = '1dgOvXTQ0cyWHA5hbDOOpbDL4V7QVoZxt5kVykGK5jfw'
    const options = {
        spreadsheetId: sheetPass,
        range: 'engenharia_de_software!A4:H27'
    };
    let sheet = await googleSheetAPi.spreadsheets.values.get(options);
    let collectedData = sheet.data.values;
    let newCollectedData = [];

    collectedData.map(function (row) {

        let rowUpdate = [];
        const gradeAverage = (parseInt(row[3]) + parseInt(row[4]) + parseInt(row[5])) / 3;

        if (row[2] >= 15) {
            rowUpdate.push('Reprovado por Falta');
            rowUpdate.push(0);
            newCollectedData.push(rowUpdate);
        } else if (gradeAverage < 50) {
            rowUpdate.push('Reprovado por Nota');
            rowUpdate.push(0);
            newCollectedData.push(rowUpdate);
            return
        } else if (gradeAverage > 70) {
            rowUpdate.push('Aprovado');
            rowUpdate.push(0);
            newCollectedData.push(rowUpdate);
            return
        } else {
            rowUpdate.push('Exame Final');
            let naf = Math.ceil(100 - gradeAverage);
            rowUpdate.push(naf);
            newCollectedData.push(rowUpdate);
        }
    });
    console.log(newCollectedData);
    const updateOptions = {
        spreadsheetId: sheetPass,
        range: 'engenharia_de_software!G4',
        valueInputOption: 'USER_ENTERED',
        resource: { values: newCollectedData }
    };
    await googleSheetAPi.spreadsheets.values.update(updateOptions);
}

module.exports = { gSheetAnalysis };