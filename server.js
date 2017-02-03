var express = require('express');
var path = require('path');
var app = express();
var server = require('http').createServer(app);


users = [];
connections = [];

server.listen(process.env.PORT || 8080);
console.log('Server running...');

app.use(express.static(path.join(__dirname, 'src')));
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/src/index.html');
});