var proxyquire = require('proxyquire');
var should = require("should");
var mockEntryModel = {
  find: function (callback) {
    callback("yikes");
  }
};

var getEntries = proxyquire('../routes/getEntries', {
  "../entryModel": mockEntryModel    
});

describe('getEntries with proxyrequire', function(){
    it('should send an error when there is one', function(){
      var res = {};
      var sentMsg = "";

      res.send = function (msg) {
      	sentMsg = msg;
      };

      getEntries({}, res);

      sentMsg.should.equal("error");
      
    });
});