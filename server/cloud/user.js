var request = require("request");
var _ = require("underscore");
var path = require("path");

var client = require(__dirname + '/helpers/nodemailer.js'),
	h = require(path.join(__dirname, '../helpers/service.helper.js'))
speakeasy = require('speakeasy');

var Q = require('q');

var env = process.env.NODE_ENV || "dev";
var phone = process.env.phone;

var Box = Parse.Object.extend("Box");

// Parse.Cloud.beforeFind(Parse.User, function (req) {
// 	let query = req.query; // the Parse.Query
// 	let user = req.user; // the user
// 	let triggerName = req.triggerName; // beforeFind
// 	let isMaster = req.master; // if the query is run with masterKey
// 	let logger = req.log; // the logger
// 	let installationId = req.installationId; // The installationId

// 	console.log(query);
// });

Parse.Cloud.define("verify", (req, res) => {
	let user = req.user;
	let code = req.params.code;
	if (user && user.get("authCode") && user.get("authCode") === code) {
		user.set("active", true);
		return user.save(null, { useMasterKey: true }).then((user) => {
			var cQ = new Parse.Query("Count");
			cQ.equalTo("type", "users");
			return cQ.first().then((count) => {
				if (!count) {
					var Count = Parse.Object.extend("Count");
					var count = new Count();
					count.set("type", "users");
				}
				count.increment("count");
				return count.save();
			}).then(() => {
				var Thread = Parse.Object.extend("Thread");
				var thread = new Thread();
				thread.set("from", user);
				return thread.save();
			}).then((t) => {
				return res.success();
			});
		});
	} else {
		return res.error();
	}
});



Parse.Cloud.define("searchUsers", (req, res) => {
	let key = req.params.q;

	let uQuery = new Parse.Query(Parse.User);
	uQuery.startsWith('username', key.toLowerCase());
	uQuery.equalTo("suspended", false);
	uQuery.equalTo("active", true);
	let eQuery = new Parse.Query(Parse.User);
	eQuery.startsWith('email', key.toLowerCase());
	eQuery.equalTo("suspended", false);
	eQuery.equalTo("active", true);

	var mainQuery = Parse.Query.or(uQuery, eQuery);
	mainQuery.limit(5);
	mainQuery.find().then((users) => {
		res.success(users);
	});
});

Parse.Cloud.define("resendCode", (req, res) => {
	var user = req.user;
	if (!user) {
		return res.error({ message: "User not found" });
	}
	var code = speakeasy.totp({ secret: user.id });
	let message = 'Your security code is: ' + code;
	let opt = sms(user, message, code);

	user.set("authCode", code);

	user.save(null, { useMasterKey: true }).then((user) => {
		send(opt, res);
	});
});

Parse.Cloud.define('sendCode', (req, res) => {
	var user = req.user;
	var code = speakeasy.totp({ secret: user.id });
	user.set("authCode", code);
	return user.save(null, { useMasterKey: true }).then((user) => {
		let message = 'Your security code is: ' + code;
		let opt = sms(user, message, code);
		return send2(opt);
	}).then(() => {
		return res.success();
	});
});


Parse.Cloud.beforeSave(Parse.User, (req, res) => {
	var user = req.object;

	if (!user.has("role")) {
		user.set("role", 4);
	}

	if (!user.has("confirmation_count")) {
		user.set("confirmation_count", 0);
	}

	if (!user.has("benefit_count")) {
		user.set("benefit_count", 0);
	}

	if (!user.has("active")) {
		user.set("active", false);
	}

	if (!user.has("suspended")) {
		user.set("suspended", false);
	}

	if (!user.has("plan")) {
		user.set("plan", 1);
	}

	if (!user.has("in_box_count")) {
		user.set("in_box_count", 0);
	}

	if (!user.has("lemail")) {
		user.set("lemail", user.get("email").toLowerCase());
	}

	if (!user.has("fname")) {
		user.set("fname", user.get("firstname").toLowerCase());
	}

	res.success();

});

Parse.Cloud.afterSave(Parse.User, (req, res) => {
	// Send Email
	var user = req.object;
	if (!user.existed()) {
		sendEmail(user, getMailOptions(user)).then((info) =>{
			return res.success(info);
		});
	}

	if (user.get("confirmation_count") == 2 && user.get("benefit_count") == 3) {
		user.set("recycleTicker", new Date());
		return user.save(null, {useMasterKey: true}).then((u) => {
			return res.success();
		})
	}


});

function sendEmail(user, opts) {
	opts.to = user.get("email");
	return client.send(opts).then((info) =>{
		return;
	});
}

function createTextEmail(user) {
	var text = "Hello, "+user.get("username")+"\n";
	text += "Thank you for your interest in becoming a member of Myswyfypay. We are pleased to welcome you into our community. We assure you that your decision to be part of us, is one you will always live to celebrate. \n";
	text += "Myswyfypay is not just an added number to the already existing donation platforms, rather we are here with an ideology that is resilient and represents who we are and what we stand for. \n";
	text += "Myswyfypay peer to peer donation platform have improved on the flaws of other platforms. In other words, our principle, ideology and structure is one that will withstand the deluge of challenges that has led to the cessation of other platforms. \n";
	text += "Take a step in achieving your dreams. Feel free to contact us and ensure to like us on Facebook so as to get updated with new developments on Myswyfypay. \n \n";
	text += "Regards, \n";
	text += "TEAM Myswyfypay \n";
	text += "NOTE:  In this platform, recycling is the cornerstone, thus, hit and run is clipped, you either hit and stay or hit but while running away, you leave something behind for other members. \n";
	text += "support@myswyftpay.com\n";
	text += "https://facebook.com/myswyftpayng \n";
	text += "Myswyfypay copyright 2017";
	text += "Follow this link to join our Telegram group: https://t.me/joinchat/AAAAAEGo_fEW0U22V8l3Qw";

	return text;
}

function createHTMLEmail(user) {
	var html = "<p>Hello, <b>"+user.get("username")+"</b></p>";
	html += "<p>Thank you for your interest in becoming a member of <b>Myswyfypay</b>. We are pleased to welcome you into our community. We assure you that your decision to be part of us, is one you will always live to celebrate.</p>";
	html += "<p><b>Myswyfypay</b> is not just an added number to the already existing donation platforms, rather we are here with an ideology that is resilient and represents who we are and what we stand for.</p>";
	html += "<p><b>Myswyfypay</b> peer to peer donation platform have improved on the flaws of other platforms. In other words, our principle, ideology and structure is one that will withstand the deluge of challenges that has led to the cessation of other platforms.</p>";
	html += "<p>Take a step in achieving your dreams. Feel free to contact us and ensure to like us on Facebook so as to get updated with new developments on Myswyfypay.</p>";
	html += "<p>Regards,</p>";
	html += "<p><b>TEAM Myswyfypay</b></p>";
	html += "<br/>";
	html += "<p><b>NOTE:</b> In this platform, recycling is the cornerstone, thus, hit and run is clipped, you either hit and stay or hit but while running away, you leave something behind for other members.</p>";
	html += "<p><a mailto=\"support@myswyftpay.com\">support@myswyftpay.com</a> </p>";
	html += "<p><a href=\"https://facebook.com/myswyftpayng\">https://facebook.com/myswyftpayng</a></p>";
	html += "<p><b>Myswyfypay</b> copyright 2017</p>";
	html += "<p>Follow this link to join our Telegram group: <a href=\"https://t.me/joinchat/AAAAAEGo_fEW0U22V8l3Qw\">https://t.me/joinchat/AAAAAEGo_fEW0U22V8l3Qw</a><p>";

	return html;
}

function getMailOptions(user) {
	let opt = {
		from: '"Myswyfypay Admin" <support@myswyftpay.com>', // sender address
		// to: user.get("email"), // list of receivers
		subject: 'Welcome ✔', // Subject line
		text: createTextEmail(user), // plain text body
		html: createHTMLEmail(user) // html body
	};

	return opt;
}



function sms(user, message, code) {
	let m = {
		"SMS": {
			"auth": {
				"username": "verygreenboi@yahoo.com",
				"apikey": "55d46d59dbadbd21fdf7e601c60fad68c48670de"
			},
			"message": {
				"sender": "MSP",
				"messagetext": message,
				"flash": "0"
			},
			"recipients": {
				"gsm": [
					{
						"msidn": user.get("phone").replace("+", ""),
						"msgid": code
					}
				]
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

	return options;
}



function send(op, res) {
	request(op, function (error, response, body) {
		if (error) {
			res.error(error);
		};
		console.log(body);
		return res.success(body);
	});
}

function send2(op, res) {
	var deferred = Q.defer();
	request(op, function (error, response, body) {
		if (error) {
			deferred.reject(error);
		};
		deferred.resolve();
	});

	return deferred.promise;
}
