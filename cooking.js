var util = require('util');
var http = require('http');
var fs = require('fs');
var db = require('./cooking_db.js');

exports.getRandomRecipe = getRandomRecipe;
exports.randomizedRecipe = randomizedRecipe;
function randomizedRecipe(cb) {
	getRandomRecipe(function(recipe) {
		var result=[];
		var category = recipe.value.components;
		for(i in category) {
			db.getComponents(function(components) {
				var z = Math.random() * components.length;
//				util.puts(components[Math.floor(z)].value.name);
				result.push(components[Math.floor(z)].value.name);
//				util.puts(JSON.stringify(result));
				if(result.length == category.length) cb(result);
			}, category[i]);
		}
	});
}

function getRandomRecipe(cb) {
	db.getRecipes(function(recipes) {
		var i = Math.random() * recipes.length;
		cb(recipes[Math.floor(i)]);
	});
}
