var http = require('http');
var util = require('util');
function deleteDB(dbname) {
	var opts = {
		host : 'localhost',
		path : '/' + dbname,
		port : 5984,
		method: 'DELETE'
	}
	util.puts(JSON.stringify(opts));
	var req = http.request(opts, function(res) {
		res.on('data', function(data) {
		util.puts(data);	
		});
	});
	req.end();
}
deleteDB('components');
deleteDB('recipes');
