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
		if(!err) {

			if(entry) {
				return response.send(entry);
			} else {
				response.status(404);
				response.send({error:"there was no such id to update"});
			}
		} else {
			response.send({error:"problem"});
		}
	});
}


function handleDelete(request, response) {
	var message = "NOT UPDATED";
	EntryModel.find({_id: request.params.id}).remove(function (err, numDeleted) {
		if(!err) {
			if(numDeleted) {
				response.send({_id: request.params.id});
			} else {
				response.status(404);
				response.send({error:"could not find to delete"});
			}
		} else {
			response.send({error:"problem"});
		}
	});
}


module.exports = entryRouter;