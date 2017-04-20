var path = require('path');
var h = require(path.join(__dirname, '../helpers/service.helper'));

var service = {};

service.login = Login;
service.signup = Signup;
service.me = Me;
service.sendCode = SendCode;
service.notify = Notify;
module.exports = service;

var mountPath = process.env.PARSE_MOUNT || '/1';

var server_url;

if (process.env.PARSE_SERVER_URI) {
    server_url = process.env.PARSE_SERVER_URI + mountPath;
}

function Notify(data) {
  var s;
  if (server_url) {
    s = server_url + '/classes/Notify';
  }
  var options = {
    url: s  || 'http://localhost:3070/1/classes/Notify',
    headers: {
      'X-Parse-Application-Id': process.env.APP_ID || 'VMvhutWAGNpk78QXprTt',
      'Content-Type': 'application/json'
    },
    json: data
  };
  return h.post(options);
}

function SendCode(token) {
  var s;
  if (server_url) {
    s = server_url + '/functions/sendCode';
  }
  var options = {
    url: s  || 'http://localhost:3070/1/functions/sendCode',
    headers: {
      'X-Parse-Application-Id': process.env.APP_ID || 'VMvhutWAGNpk78QXprTt',
      'Content-Type': 'application/json',
      'X-Parse-Session-Token': token
    }
  };
  return h.post(options);
}

function Me(token) {
  var s;
  if (server_url) {
    s = server_url + '/users/me';
  }
  var options = {
    url: s  || 'http://localhost:3070/1/users/me',
    headers: {
      'X-Parse-Application-Id': process.env.APP_ID || 'VMvhutWAGNpk78QXprTt',
      'Content-Type': 'application/json',
      'X-Parse-Session-Token': token
    }
  };
  return h.get(options);
}

function Login(cred) {
  var s;
  if (server_url) {
    s = server_url + '/login?username='+cred.username+'&password='+cred.password;
  }
  var options = {
    url: s  || 'http://localhost:3070/1/login?username='+cred.username+'&password='+cred.password,
    headers: {
      'X-Parse-Application-Id': process.env.APP_ID || 'VMvhutWAGNpk78QXprTt',
      'Content-Type': 'application/json'
    }
  };
  return h.get(options);
}
function Signup(cred) {
  var s;
  if (server_url) {
    s = server_url + '/users';
  }
  var options = {
    url: s  || 'http://localhost:3070/1/users',
    headers: {
      'X-Parse-Application-Id': process.env.APP_ID || 'VMvhutWAGNpk78QXprTt',
      'Content-Type': 'application/json'
    },
    json: cred
  };
  return h.post(options);
}