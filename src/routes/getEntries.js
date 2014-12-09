var EntryModel = require('../entryModel');

function getEntries(req, res) {

    return EntryModel.find(function(err, entries) {
        if (!err) {
            res.send(entries);
        } else {
            res.send('error');
        }
    });
}

module.exports = getEntries;