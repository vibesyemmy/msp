var client = require('twilio')(process.env.account_sid, process.env.auth_token),
    q 					= require('q');

var service = {};

service.send = SendMessage;

module.exports = service;

function SendMessage(options) {
  console.log("Got here", options, process.env.account_sid, process.env.auth_token);
  var defer = q.defer();
  client.messages.create(options, function(err, res){
    if(err) {
      defer.reject(err);
    } else {
      defer.resolve(res);
    }
  });
  return defer.promise;
}