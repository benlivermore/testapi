var app = require('./app'),
	port = 3000,
	mongoPath = 'mongodb://localhost/test';

app.start(mongoPath, port);
