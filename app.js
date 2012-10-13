var util = require('util');
var cooking = require('./cooking_db.js');

cooking.addRecipe({'foobar' : ['foo', 'bar', 'baz', 'blarg']});
cooking.getRecipes(function(recipes) {
	util.puts(JSON.stringify(recipes));
});

cooking.addComponent({'Kartoffel' : {'foo' : 'bar'}});
cooking.getComponents(function(components) {
	util.puts(JSON.stringify(components));
});
