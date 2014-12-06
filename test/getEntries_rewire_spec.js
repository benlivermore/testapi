var rewire = require('rewire');
var should = require("should");
var getEntries = rewire('../routes/getEntries');

describe('getEntries with rewire', function() {
    it('should send an error when there is one', function() {
        var res = {};
        var sentMsg;

        getEntries.__set__({
            "EntryModel": { //replaces global variable in module
                find: function(callback) {
                    callback("yikes");
                }
            }
        });


        res.send = function(msg) {
            sentMsg = msg;
        };

        getEntries({}, res);

        sentMsg.should.equal("error");

    });
});