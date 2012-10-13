var util = require('util');
var http = require('http');
var fs = require('fs');

var db = require('./cooking_db.js');

var index = "";

fs.readFile('./htdocs/index.html', 'utf-8', function(err, data) {
	if(err) 
		util.puts(err);
	else
		index = index + data;
});

var srv = http.createServer(function (req, res) {
	req.on('end', function() {
		res.writeHead(200);
		res.end(index);
	});
});
srv.listen(8080);
