/*jshint expr: true*/
var request = require('supertest'),
	testApi = require('../app'),
	expect = require("chai").expect,
  	MongoClient = require('mongodb').MongoClient,
  	app = testApi.start('mongodb://localhost/test', 3000),
  	testDB;

before(function(done) {
	MongoClient.connect("mongodb://localhost/test", function (err, db) {
		testDB = db;
		done();
	});
});

after(function (done) {
	testDB.close(function() {
		done();
	});

});

beforeEach(function (done) {
	testDB.createCollection("entries", function () {		
 		done();
 	});
});

afterEach(function(done) {
	testDB.collection('entries', function (err, collection) {
		collection.remove({}, function () {});
		done();
	});
});

describe('GET /entries', function(){
  it('respond with 200', function(done){
    request(app)
      .get('/entries')
      .expect(200, '[]', done);
  });
});

describe('POST /entries', function(){
  it('respond with 200', function(done){
  	request(app)
      	.post('/entries')
      	.send({entry:'test post'})
      	.expect(200)
      	.end(function (err, response) {
      		if(err) {
      			return done(err);
      		}

      		expect(response.body.createdDate).to.be.ok;
      		expect(response.body.body).to.equal("test post");
      		done();
      	});

      	
  });
});

describe('PUT /entries', function(){
  it('respond with 200', function(done){

  	request(app)
      	.post('/entries/')
      	.send({entry:'pre post for put'})
      	.end(function (err, response) {
      		var id = response.body._id;

      		request(app)
		      	.put('/entries/' + id)
		      	.send({entry:'test put'})
		      	.expect(200)
		      	.end(function (err, response) {
		      		if(err) {
		      			return done(err);
		      		}

		      		expect(response.body.createdDate).to.be.ok;
		      		expect(response.body.body).to.equal("test put");
		      		done();
		      	});
      	});
      	
  });
});


describe('DELETE /entries', function(){
  it('respond with 200', function(done){

  	request(app)
      	.post('/entries/')
      	.send({entry:'pre post for put'})
      	.end(function (err, response) {
      		var id = response.body._id;

      		request(app)
		      	.del('/entries/' + id)
		      	.expect(200)
		      	.end(function (err, response) {
		      		if(err) {
		      			return done(err);
		      		}
		      		expect(response.body._id).to.equal(id);
		      		done();
		      	});
      	});
      	
  });
});
