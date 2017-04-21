var nodemailer = require('nodemailer');
var q = require('q');
var handlebars = require('handlebars');
var mg = require('nodemailer-mailgun-transport');

var service = {};

service.send = SendMessage;

module.exports = service;

var auth = {
	auth: {
		api_key: 'key-501d4bc0308a9d02be2cb02910a2330d',
		domain: 'myswyftpay.com'
	}
}

let smtpConfig = {
	pool: true,
	host: 'smtp.zoho.com',
	port: 465,
	secure: true, // upgrade later with STARTTLS
	auth: {
		user: 'support@myswyftpay.com',
		pass: 'Chestnut2012@'
	}
};

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport(smtpConfig);

function SendMessage(mailOptions) {
	var defer = q.defer();
	transporter.sendMail(mailOptions, function (err, info) {
		if (err) {
			defer.reject(err);
		} else {
			defer.resolve(info);
		}
	});
	return defer.promise;
}