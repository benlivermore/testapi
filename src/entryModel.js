var mongoose = require('mongoose');

var EntrySchema = new mongoose.Schema({
    body: String,
    createdDate: Date
});

var EntryModel = mongoose.model('Entry', EntrySchema);

module.exports = EntryModel;