var util = require('util');
var http = require('http');

exports.addRecipe = addRecipe;
exports.getRecipes = getRecipes;
exports.addComponent = addComponent;
exports.getComponents = getComponents;
exports.getCategories = getCategories;

var opts = {
	host : 'localhost',
	port : 5984,
}

function addRecipe(recipe,cb) {
	putDB(recipe, 'recipes');
	if(cb) cb();
};

function getRecipes(cb) {
	getView('/recipes/_design/recipes/_view/json', cb);
};

function addComponent(compontent, cb) {
	putDB(compontent, 'components');
	if(cb) cb();
};

function getComponents(cb, key) {
	getView('/components/_design/components/_view/json', cb, key);
};

function getCategories(cb) {
//	getComponents(
}

function getView(path, cb, key) {
	opts.method = 'GET';
	opts.path = path;
	if(key) {
		opts.path = opts.path + '?key=%22' + key +'%22'
	}
	var req = http.request(opts, function(res) {
		var data = "";
		res.on('data', function(chunk) {
			data = data + chunk;
		});
		res.on('end', function() {
			try {
				cb(JSON.parse(data).rows);
			} catch (err){
				util.puts('ERROR: ' + err);
				cb();
			}
		});
	});
	req.on('error', function(error) {util.puts('Couchdb up and running?\n' + error)});
	req.end();
};

function putDB (dbObject, dbName) {
	opts.method = 'GET';
	opts.path = '/_uuids';
	
	var req = http.request(opts, function(res) {
		res.on('data', function(data) {
			var uuid = JSON.parse(data).uuids[0];
			opts.path = '/' + dbName + '/' + uuid;
			opts.method = 'PUT';
			var req = http.request(opts, function(res) {
				res.on('data', function(data) {
					util.puts(data);
				});
			});

			req.on('error', function (err) {
				util.puts(JSON.stringify(err));
				req = http.request(opts, function(res) {
					res.on('data', function(data) {
						util.puts(data);
					});
				});
			});
			util.puts(JSON.stringify(dbObject));
			req.write(JSON.stringify(dbObject));
			req.end();	
		});
	});
	req.on('error', function(error) {util.puts('Couchdb up and running?\n' + error)});
	req.end();
}


