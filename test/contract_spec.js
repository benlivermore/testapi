var request = require('supertest'),
	testApi = require('../app')
  	;

describe('GET /entries', function(){
  it('respond with 200', function(done){
    request(testApi)
      .get('/entries')
      .expect(200, done);
  });
});

testApi