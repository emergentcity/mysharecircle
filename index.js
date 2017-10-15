var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
var sentiment = require('sentiment');
var test = 0;
var clientId = 0;
var counter = 0;



app.use('/images',express.static(__dirname + '/images'));
app.use('/css',express.static(__dirname + '/css'));
app.get('/', function(req
	,res){

	res.sendFile(path.join(__dirname,'index.html'));

});

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user diconnected');
	});
});

io.on('connection', function(socket){
	socket.on('score assessment', function(msg){
		test = sentiment(msg);
		io.emit('score assessment', test.comparative);
		console.log(test);
		//counter+=test.score;
		//console.log(counter);

	});
});

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
		clientId = msg;
		socket.emit('clientId', msg);

	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
})