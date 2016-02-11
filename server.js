var http = require('http');
var controller = require('./lib/controller');
var server = http.createServer(controller);
server.listen(5000);
console.log("server is listening at port 5000");
