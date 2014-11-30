var express = require('express'),
	EntryModel = require('../entryModel'),
	getEntries = require('./getEntries');

var entryRouter = express.Router();

var baseRoute = entryRouter.route('/');
baseRoute.get(getEntries);
baseRoute.post(handlePost);

var baseRouteWithId = entryRouter.route('/:id');
baseRouteWithId.put(handlePut);
baseRouteWithId.delete(handleDelete);


function handlePost(request, response) {
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

}

function handlePut (request, response) {
	EntryModel.findByIdAndUpdate(request.params.id, {body:request.body.entry}, function (err, entry) {
		return response.send(entry);
	});
}


function handleDelete(request, response) {
	var message = "NOT UPDATED";
	EntryModel.find({_id: request.params.id}).remove(function (err) {
		if(!err) {
			response.send({_id: request.params.id});
		} else {
			response.send({id:"ERROR"});
		}
	});
}


module.exports = entryRouter;