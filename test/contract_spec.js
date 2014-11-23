var request = require('supertest'),
	testApi = require('../app')
  	;

describe('GET /entries', function(){
  it('respond with 200', function(done){

    request(testApi.start('mongodb://localhost/test', 3000))
      .get('/entries')
      .expect(200, done);
  });
});