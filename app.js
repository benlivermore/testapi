var root = __dirname,
	express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path'),
	mongoose = require('mongoose'),
	entryRouter = require('./routes/entries'),
	app = express(),
	testapi;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/entries', entryRouter);

testapi = {
	start: function (mongoPath, port) {
		mongoose.connect( mongoPath);
		app.listen( port, function() {
    		console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
		});
		return app;
	}

};

module.exports = testapi;