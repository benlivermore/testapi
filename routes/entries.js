var express = require('express'),
	EntryModel = require('../entryModel'),
	getEntries = require('./getEntries'),
	isValidMongoId = require('mongoose').Types.ObjectId.isValid;

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
			return response.json( postedEntry );
		} else {
			return response.json({error:"problem"});
		}
	});

}

function handlePut (request, response) {
	var id = request.params.id;
	if(!isValidMongoId(id)) {
		response.status(404);
		return response.json({error:"there was no such id to update"});
	}

	EntryModel.findByIdAndUpdate(id, {body:request.body.entry}, function (err, entry) {
		if(!err) {

			if(entry) {
				return response.send(entry);
			} else {
				response.status(404);
				response.json({error:"there was no such id to update"});
			}

		} else {

			response.json({error:"problem"});
		}
	});
}


function handleDelete(request, response) {
	var id = request.params.id;
	if(!isValidMongoId(id)) {
		response.status(404);
		return response.json({error:"there was no such id to update"});
	}
	EntryModel.find({_id: id}).remove(function (err, numDeleted) {
		if(!err) {
			if(numDeleted) {
				response.json({_id: request.params.id});
			} else {
				response.status(404);
				response.json({error:"could not find to delete"});
			}
		} else {
			response.json({error:"problem"});
		}
	});
}


module.exports = entryRouter;