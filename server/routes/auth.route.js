var path = require('path');
var speakeasy = require('speakeasy');
var request = require("request");
var _ = require("underscore");
var Q = require('q');

const routes = require('express').Router();

var h = require(path.join(__dirname, '../services/auth.service'));
var m = require(path.join(__dirname, '../services/message.service'));

routes.post('/', login);
routes.post('/new', register);
routes.post('/notify', notify);
routes.post('/sms', sms);
routes.put('/', confirm);

module.exports = routes;

function notify(req, res) {
  h.notify(req.body).then((r) => {
    return res.status(200).json({ status: "success" });
  }).catch((err) => {
    return res.status(401).json({ status: "ValidationError" });
  })
}

function login(req, res) {
  var cred = req.body;
  console.log(cred);
  return h.login(cred).then((token) => {
    var t = JSON.parse(token);
    if (t.code == 101) {
      return res.status(401).json(token);
    }
    return h.me(t.sessionToken);
  }).then((user) => {
    var u = JSON.parse(user);
    var token = {
      "id": u.objectId,
      "token": u.sessionToken,
      "username": u.username,
      "email": u.email,
      "role": u.role,
      "active": u.active,
      "suspended": u.suspended
    };
    return res.status(201).json(JSON.stringify(token));
  }).catch((err) => {
    return res.status(401).json(err);
  });
}
function register(req, res) {
  var cred = req.body;
  cred.plan = parseInt(cred.plan);
  return h.signup(cred).then((user) => {
    if (user.code == 209 || user.code == 202) {
      return res.status(401).json(user);
    }
    return h.me(user.sessionToken);
  }).then((user) => {
    var u = JSON.parse(user);
    var token = {
      "id": u.objectId,
      "token": u.sessionToken,
      "username": u.username,
      "email": u.email,
      "role": u.role,
      "active": u.active
    };
    console.log(u, token);
    return res.status(200).json(JSON.stringify(token));
  }).catch((err) => {
    console.error(err);
    return res.status(401).json(err);
  });
}
function confirm(req, res) {
  res.status(200).json({ message: 'Connected!' });
}

function sms(req, res) {
  let type = req.body.type;
  let gsm = [];

  if (type == 0) {
    m.sendOne(req.body).then((r) => {
      let user = JSON.parse(r).results[0];
      if (user) {
        gsm.push(getGsm(user.phone, user.objectId));
        let opt = makeSMS(gsm, req.body.message);
        // console.log(JSON.stringify(opt));
        return send2(opt).then(() =>{
          return res.status(200).json({ status: 200 });
        });
      }
    }).catch((err) => {
      console.log(err);
      return res.status(400).json({ status: 400 });
    });
  } else {
    m.sendMany(req.body).then((r) => {
      if (r) {
        let users = JSON.parse(r).results;
        // console.log(users);
        if (users.length == 0) {
          return res.status(404).json({ status: 404 });
        }
        for (var i = 0; i < users.length; i++) {
          console.log(users[i]);
          let user = users[i];
          let g    = getGsm(user.phone, user.objectId);
          if (g) {
            gsm.push(g);
          }
        }
        var list = _.map(_.groupBy(gsm, (doc) =>{
          return doc.msidn;
        }), (grouped) =>{
          return grouped[0];
        });

        console.log(list);
        let opt = makeSMS(list, req.body.message);
        return send2(opt).then(() =>{
          return res.status(200).json({ status: 200 });
        }).catch((err) => {
          console.log(err);
          return res.status(400).json({ status: 400 });
        });
      } else {
        console.log(err);
        return res.status(400).json({ status: 400 });
      }
    }).catch((err) => {
      console.log(err);
      return res.status(400).json({ status: 400 });
    });
  }
}

function getDirection(key, box) {
  console.log(box);
  if ( key == 1) {
    console.log(box.beneficiary);
    return box.beneficiary;
  } else {
    return box.donor;
  }
}

function makeSMS(numbers, message) {
  let m = {
    "SMS": {
      "auth": {
        "username": "verygreenboi@yahoo.com",
        "apikey": "55d46d59dbadbd21fdf7e601c60fad68c48670de"
      },
      "message": {
        "sender": "INSTTOUCH",
        "messagetext": message,
        "flash": "0"
      },
      "recipients": {
        "gsm": numbers
      }
    }
  };

  var options = {
    method: 'POST',
    url: 'http://api.ebulksms.com:8080/sendsms.json',
    headers:
    {
      'postman-token': '62a12b21-a3dd-e35f-8747-48db6482ba16',
      'cache-control': 'no-cache',
      'content-type': 'application/json'
    },
    body: m,
    json: true
  };

  console.log(JSON.stringify(options));

  return options;
}

function getGsm(phone, id) {
  var code = speakeasy.totp({ secret: id });
  if (phone) {
    return {
      "msidn": phone.replace("+", ""),
      "msgid": code
    };
  }
  return null;
}

function send2(op, res) {
  // console.log(JSON.stringify(op));
	var deferred = Q.defer();
	request(op, function (error, response, body) {
    // console.log(error, response, body);
		if (error) {
			deferred.reject(error);
		};
		deferred.resolve();
	});

	return deferred.promise;
}