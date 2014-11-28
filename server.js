var app = require('./app'),
	port = 3000,
	mongoPath = 'mongodb://localhost/testapi';

app.start(mongoPath, port);
