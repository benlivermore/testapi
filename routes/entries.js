
var mongoose = require('mongoose'),
	express = require('express');


var EntrySchema = new mongoose.Schema({
	body: String,
	createdDate: Date
});

var EntryModel = mongoose.model('Entry', EntrySchema);

var entryRouter = express.Router();

var baseRoute = entryRouter.route('/');
baseRoute.get(handleGet);
baseRoute.post(handlePost);

var baseRouteWithId = entryRouter.route('/:id');
baseRouteWithId.put(handlePut);
baseRouteWithId.delete(handleDelete);


function handleGet (req, res) {

	return EntryModel.find(function (err, entries) {
		if (!err) {
			res.send(entries);
		} else {
			res.send('error');
		}
	});
}

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
	EntryModel.update({_id: request.params.id}, {$set:{body:request.body.entry}}, function (err) {
		return response.send("UPDATED");
	});
}


function handleDelete(request, response) {
	var message = "NOT UPDATED";
	EntryModel.find({_id: request.params.id}).remove(function (err) {
		if(!err) {
			message = response.send("REMOVED");
		} else {
			message = response.send("ERROR");
		}
	});
}


module.exports = entryRouter;