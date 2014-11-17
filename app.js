var root = __dirname,
	express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path'),
	mongoose = require('mongoose'),
	entryRouter = require('./routes/entries');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/entries', entryRouter);

mongoose.connect( 'mongodb://localhost/test' );

module.exports = app;