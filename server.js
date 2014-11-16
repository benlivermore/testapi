var root = __dirname,
	express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path'),
	mongoose = require('mongoose'),
	port = 3000;


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


mongoose.connect( 'mongodb://localhost/test' );

var EntrySchema = new mongoose.Schema({
		body: String,
		createdDate: Date
	});

var EntryModel = mongoose.model('Entry', EntrySchema);

app.get('/entries', function (req, res) {

	return EntryModel.find(function (err, entries) {
		if (!err) {
			res.send(entries);
		} else {
			res.send('error');
		}
	});

});

app.post('/entries', function(request, response) {
	var postedEntry = new EntryModel({
		body: request.body.entry,
		createdDate: Date.now()
	});

	postedEntry.save(function (err) {
		if (!err) {
			console.log('saved!');
			return response.send( postedEntry );
		} else {
			return response.send("ERROR");
		}
	});

});

app.put('/entries/:id', function (request, response) {
	EntryModel.update({_id: request.params.id}, {$set:{body:request.body.entry}}, function (err) {
		return response.send("UPDATED");
	});
});


app.delete('/entries/:id', function(request, response) {
	var message = "NOT UPDATED"
	EntryModel.find({_id: request.params.id}).remove(function (err) {
		if(!err) {
			message = response.send("REMOVED")
		} else {
			message = response.send("ERROR")
		}
	});
})

app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});