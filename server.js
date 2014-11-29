var app = require('./app'),
	port = 3000,
	mongoPath = 'mongodb://localhost/testapi',
	cluster = require('cluster');

function startWorker() {
	var worker = cluster.fork();
	console.log('worker %d started', worker.id);
}

if(cluster.isMaster) {
	require('os').cpus().forEach(function () {
		startWorker();
	});

	cluster.on('disconnect', function (worker) {
		console.log('worker %d was disconnected', worker.id);
	});

	cluster.on('exit', function (worker, code, signal) {
		console.log('worker %d died with exit code %d (%s)', worker.id, code, signal);
		startWorker();
	});
	
} else {
	app.start(mongoPath, port);
}


