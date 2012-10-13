var http = require('http');
var util = require('util');
var fs = require('fs');
var timer = require('timers');

function createDB(opts, designPath, cb) {
	util.puts('Creating DB: ' + opts.path);	
	util.puts(JSON.stringify(opts));
	var req = http.request(opts, function(res) {
		res.on('data', function(data) {
			util.puts(data);
		});
		res.on('end', function() {
			cb(opts, designPath);
		});
	});
	req.end();
};


function putDesign(opts, designPath) {
	opts.path = opts.path + designPath;
	opts.method = 'PUT';
	util.puts(JSON.stringify(opts));
	var req = http.request(opts, function(res) {
		res.on('data', function(data) {
			util.puts(data);
		});
	});

	fs.readFile('./'+designPath+'.json', 'utf8', function(err, data) {
		if(err) {
			util.puts('ERROR while reading File: ' + err);
			req.end();
		}
		else {
			util.puts(data);
			req.write(data);
			req.end();
		}
	});
}

var opts1 = {
	host : 'localhost',
	port : 5984,
	method: 'PUT',
	path : '/components/'
}
createDB(opts1, '_design/components',  putDesign);

var opts2 = {
	host : 'localhost',
	port : 5984,
	method: 'PUT',
	path : '/recipes/'
}
createDB(opts2, '_design/recipes',  putDesign);
