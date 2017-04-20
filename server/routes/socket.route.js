var express = require('express');

var router = express.Router();
var sio;

var path = require('path');
var h = require(path.join(__dirname, '../services/message.service'));

let returnRouter = (io) =>{
	sio = io;

	router.get('/', get);
	router.post('/', post);
	router.put('/', put);
	router.delete('/', destroy);

  router.post('/support', support);

	router.post('/pop', pop);
	router.post('/confirm', confirm);
	
	sio.on('connection', (socket) => {
		// console.log('User connected');
		socket.on('disconnect', function() {
			console.log('User disconnected');
		});
		socket.on('save-message', function (data) {
			console.log(data);
			io.emit('new-message', { message: data });
		});
		socket.on('pop-upload', (message) =>{
			io.emit('confirm-pop-upload', message);
		});
	});

	return router;
}

module.exports = returnRouter;

function pop(req, res) {
	console.log("pop-upload ", req.body);
	var message = req.body.message;
	sio.sockets.emit('confirm-pop-upload', message);
	res.status(200).json({ message: "Message sent" });
}

function confirm(req, res) {
	console.log("Pay confirm ", req.body);
	var message = req.body.message;
	sio.sockets.emit('pay-confirm', message);
	res.status(200).json({ message: "Confirmation sent" });
}

function get(req, res) {
	sio.sockets.emit("incoming_message", { message: "message", user: "user", created_at: "created_at" });
	res.status(200).json({ message: "Message received" });
}

function post(req, res) {
	sio.sockets.emit("incoming_message", { message: "message", user: "user", created_at: "created_at" });
	res.status(200).json({ message: "Message received" });
}

function put(req, res) {
	sio.sockets.emit("incoming_message", { message: "message", user: "user", created_at: "created_at" });
	res.status(200).json({ message: "Message received" });
}

function destroy(req, res) {
	sio.sockets.emit("global_reset", { message: "message", user: "user", created_at: "created_at" });
	res.status(200).json({ message: "Message received" });
}

// Create new support chat message
function support(req, res) {
  var message = req.body.message;
	console.log(req.body);
	sio.sockets.emit("incoming_message_chat", message);
	res.status(200).json({ message: "Message sent" });
}