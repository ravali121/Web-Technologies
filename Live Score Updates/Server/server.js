var WebSocketServer = require('ws').Server;
var PORT = 8080;
var runs = [4,6];
var comments = ["Good Shot", "Missed to field", "Classic Text Book Shot", "Hat trick", " Classical Shot", "Unbelievable miss", "Very good catch by mid-on player"];
var currentScore = 0;
var getOneComment = "Classical Text Book Shot";
var openWebSocket = new WebSocketServer({port: PORT},function(){
	 console.log((new Date()) + ' Server is listening on port: '+ PORT);
});

function getRandomIndex (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

setInterval(function() {
 currentScore = currentScore  + runs[getRandomIndex(0,1)];
 getOneComment = comments[getRandomIndex(0,6)];
},4000);

openWebSocket.on('connection', function (liveUpdates) {
           setInterval(function() {
		liveUpdates.send(JSON.stringify({
			score: currentScore,
	   		comment: getOneComment    
     		}), function ack(error){
			
		});
	   },4000);
openWebSocket.on('close', function () {
	openWebSocket.disconnect(0);
});
});
