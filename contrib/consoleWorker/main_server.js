importScripts('consoleWorkerWorker.js');
importScripts('../vendor/microevent.js');
importScripts('../lib/socketioServer.js');

// import all the server

//importScripts('../../vendor/brequire.js');
//importScripts('../../brequired/server.js');
//importScripts('../../brequired/gameSrv.js');
//require('./server')


var socketio	= io.listen();

socketio.on('connection', function(socket){
	console.log("server received a socket")
	socket.on('message', function(message){
		console.log("server boundsocket received ", message)
		socket.send(message)
	})
	socket.send({ hello: 'world' });
});

console.log("Server is listening")