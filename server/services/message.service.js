var path = require('path');
var h = require(path.join(__dirname, '../helpers/service.helper'));

var service = {};

service.send = Send;
service.read = Read;
service.sendOne = SendOne;
service.sendMany = SendMany;
module.exports = service;

var mountPath = process.env.PARSE_MOUNT || '/1';

var server_url;

if (process.env.PARSE_SERVER_URI) {
	server_url = process.env.PARSE_SERVER_URI + mountPath;
}

function SendOne(body) {
	var s;
	if (server_url) {
		s = server_url + '/classes/_User';
	}
	var options = {
		url: s || 'http://localhost:3070/1/classes/_User',
		headers: {
			'X-Parse-Application-Id': process.env.APP_ID || 'VMvhutWAGNpk78QXprTt',
			'Content-Type': 'application/json'
		},
		qs: {
			"where": {
				"username": body.username
			},
			limit: 1
		}
	};
	return h.get(options);
}

function SendMany(body) {
	var s;
	if (server_url) {
		s = server_url + '/classes/_User';
	}
	let options = {};
	if (body.type == 1) {
		options = getOptions(s, 3, 2);
	} else if (body.type == 2) {
		options = getOptions(s, 2, 0);
	} else if (body.type == 4) {
		options = {
			url: s || 'http://localhost:3070/1/classes/_User',
			headers: {
				'X-Parse-Application-Id': process.env.APP_ID || 'VMvhutWAGNpk78QXprTt',
				'Content-Type': 'application/json'
			},
			qs: {
				"where": {
					"in_box_count": {
						"$lte": ibc
					},
					"confirmation_count": {
						"$lte": cnc
					}
				},
				"limit": 999
			}
		};
		options = getOptions(s, 0, 0);
	}
	return h.get(options);
}

function Send(message) {

}

function Read(message) {

}

function getOptions(s, ibc, cnc) {
	var options = {
		url: s || 'http://localhost:3070/1/classes/_User',
		headers: {
			'X-Parse-Application-Id': process.env.APP_ID || 'VMvhutWAGNpk78QXprTt',
			'Content-Type': 'application/json'
		},
		params: {
			"where": {
				"in_box_count": {
					"$lte": ibc
				},
				"confirmation_count": {
					"$lte": cnc
				}
			},
			limit: 999
		}
	};

	return options;
}