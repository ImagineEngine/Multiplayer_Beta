const webSocketsServerPort = 8000 || process.env.PORT;
const webSocketServer = require('websocket').server;
const http = require('http');
var n = 0;

const server = http.createServer();
server.listen(webSocketsServerPort, (err) => {
  if (err) {
    console.log(`There was an error starting the port at ${webSocketsServerPort}...`);
  } else {
    console.log(`Server is listening on port ${webSocketsServerPort}...`);
  }
});
//console.log('listening on port 8000');

const wsServer = new webSocketServer({
  httpServer: server
});

var game = {}
var players = {}
var playerTerminal = {}

wsServer.on('request', function (request) {
  var userID = String(Object.keys(players).length+1);
  //name Name name Name

  const connection = request.accept(null, request.origin);


  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      data = JSON.parse(message.utf8Data)
      if (data.status == 'register'){
        players[userID] = {position: {x: 0, y: 0}, name: data.name}
        playerTerminal[userID] = connection
        playerTerminal[userID].sendUTF(JSON.stringify({status: 'registered', id: userID}));
        console.log('new user')
      }
      if (data.status == 'update') {
        players[String(data.userID)].position.x = data.position.x;
        players[String(data.userID)].position.y = data.position.y;
        sendAll(JSON.stringify(players));
        console.log('updated'+String(n));
        n += 1;
      }
    }
  })

});

function sendAll(message) {
  for (var player in playerTerminal) {
    playerTerminal[player].sendUTF(message);
  }
}

/*

connection.sendUTF('hi');
if (message.utf8Data.split(':')[0] == 'r'){
        players[userID] = {position: {x: 0, y: 0}, name: message.utf8Data.split(':')[1]}
        playerTerminal[userID] = connection
        playerTerminal[userID].sendUTF('r:'+userID);
        console.log('new user')
      }
      if (message.utf8Data.split(':')[0] == 'u'){
        players[message.utf8Data.split(':')[1]].position.x = Number(message.utf8Data.split(':')[2])
        players[message.utf8Data.split(':')[1]].position.y = Number(message.utf8Data.split(':')[3])
        //players[message.utf8Data.split(':')[1]].terminal.sendUTF(JSON.stringify(players));
        sendAll(JSON.stringify(players))
        console.log(players)
      }

*/
