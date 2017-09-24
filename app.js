const portNumber = 2222;
var connectionList = [];
const webSocketServer = require("ws").Server;
const WSS = new webSocketServer({ port: portNumber});

WSS.on("connection", function(ws) {

    connectionList.push(ws);
    console.log("new connection (Number of connection " + connectionList.length + " )");
    
    ws.on("message", function (message) {
        console.log(message);
        for (var i = 0; i < connectionList.length; i++){
            connectionList[i].send(message);
        }
    });    

    ws.on("close", function () {
        console.log("Connection closed");
        connectionList.splice(connectionList.indexOf(ws), 1);
    });

});