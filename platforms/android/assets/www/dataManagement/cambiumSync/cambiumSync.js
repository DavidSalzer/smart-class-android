var  ioPort= 3000
  , serverPort = 3306
  , http = require('http')
  , app = http.createServer()
  , io = require('socket.io').listen(app,{ log: false })
  , request = require('request')
app.listen(ioPort);


//var siteUrl = 'http://smart-class.local/dataManagement/cambiumSync_link.php'
var siteUrl = 'http://smart-class.cambium-team.com/dataManagement/cambiumSync_link.php'
var socketArray=[];


/////-----------------------------app client socket ---------------------------------
io.sockets.on('connection', function (socket) {
	socket.on('sendKey', function (data) {
		if (socketArray[data.key]===true){
			socketArray[data.key]=socket;
			socket.key=data.key;
			console.log("user: new user. key: " + data.key);
		}
		else{ 
			socket.emit('error', { "code": '1',"type":"not valid key" });
			console.log("user: not valid key, key: " + data.key);
		}
	});
	socket.on ( "disconnect" , function () {
		var key = socket.key;		
		keyDisconnect(key);
	});
});

/////--------------------------------server lisner------------------------------

http.createServer(function(request, response) {
	if(request.method === "POST") {
		var data = "";

		request.on("data", function(chunk) {
			data += chunk;
		});

		request.on("end", function() {
			var resDate="";
			data=JSON.parse(data);
			switch(data.type) {
			case "addKey":
				socketArray[data.key]=true;
				console.log("server: new key. key: " + data.key);
				break;
			case "sendMmessage":
				console.log("server: sendMessage. event: " + data.event);
				messageHandler(data.event,data.message,data.keyArray);
				break;
			case "ping":
				console.log("ping test. php server ip: "+request.connection.remoteAddress);
				resDate='Hello cambiumSync!';
				break;
			}
			response.end(resDate);
		});
		
		
	}
}).listen(serverPort);

function messageHandler(event,message,keyArray){
	keyArray.forEach(function(key) {
		if(typeof socketArray[key] === 'object'){
			console.log("server: server send message . key: " + key);
			socketArray[key].emit(event,message);
		}
		else{
			console.log("server: server send message to unvalid key . key: " + key);
			keyDisconnect(key);
			}
	});
}

function keyDisconnect(key){
	console.log ("keyDisconnect: "+key);
	socketArray[key]=undefined;
	var options = {
		uri: siteUrl,
		method: 'POST',
		json: {
			type: "keyDisconnect",	key: key
		}
	};

	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			//console.log(body)
		}
	});

}


//-------------------------------------------------------------------------------------
console.log("listen to port: "+ ioPort +" , "+ serverPort);

