var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  //res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname+'/index.html')
});

/*** Connect to Socket ***/
io.on('connection', (socket)=>{
	console.log("User Connected {"+socket.id+'}');

	/*** Disconnect with Seocket ***/
	socket.on('disconnect', ()=>{
		console.log("User Disconnect: {"+socket.id+'}');
	});

	/*** 'chat_message' event received from client ***/
	socket.on('to-server', (msg)=>{
		console.log("Chat message {"+msg+'}');
		
		console.log(socket)
		/*** BroadCasting to every clients ***/
		socket.broadcast.emit('to-client', msg);


	});

});





http.listen(3000, () => {
  console.log('listening on *:3000');
});
