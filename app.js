var util = require('util');
var db= require('./cooking_db.js');
var cooking = require('./cooking.js');
var fs = require('fs');
var http = require('http');
/*
 *
 * 1500 g	 Rindfleisch, 2 cm Würfel
 * 500 g	 Schweinefleisch, gehacktes
 * 500 g	 Wurst (Chorizo), in Scheiben
 * 4 	 Zwiebel(n), grob gehackt
 * 3 Zehe/n	 Knoblauch, grob gehackt
 * 6 	 Chilischote(n), mehr oder weniger, je nach Sorte
 * 250 g	 Tomatenmark
 * 500 g	 Tomate(n), Dose, gewürfelt
 * 3 TL	 Kreuzkümmel, gemahlen
 * 1 TL	 Estragon, gemahlen
 * 1 EL	 Zucker
 * 1 EL	 Salz
 * 1 EL	 Pfeffer, schwarz, gemahlen
 * 2 EL	 Oregano, gerebelt
 * 3 EL	 Chilipulver
 * 3 EL	 Petersilie, gehackt
 * 1 EL	 Worcestershiresauce
 * 1 EL	 Essig
 * 150 g	 Schokolade, zartbitter
 * 3 Dose/n	 Bier
 * 4 Dose/n	 Bohnen, rot oder Pinto
 *
 */
var index = "";

fs.readFile('./htdocs/index.html', 'utf-8', function(err, data) {
	if(err) 
		util.puts(err);
	else
		index = index + data;
});


if(false) {
	db.addRecipe({
		'name' : 'Eintopf',
		'components' : ['Fleisch', 'Fleisch', 'Wurzeln', 'Wurzeln', 'Obst', 'Kraut', 'Zucker', 'Flüssigkeit', 'Stärke']
	});
	addStuff('Rindfleisch', 'Fleisch');
	addStuff('Schweinefleisch', 'Fleisch');
	addStuff('Hase', 'Fleisch');
	addStuff('Hackfleisch', 'Fleisch');
	addStuff('Wiener Würstchen', 'Fleisch');
	addStuff('Zwiebel', 'Wurzeln');
	addStuff('Knoblauch', 'Wurzeln');
	addStuff('Möhre', 'Wurzeln');
	addStuff('Ingwer', 'Wurzeln');
	addStuff('Sellerie', 'Wurzeln');
	addStuff('Meerrettich', 'Wurzeln');
	addStuff('Tomate', 'Obst');
	addStuff('Orange', 'Obst');
	addStuff('Banane', 'Obst');
	addStuff('Apfel', 'Obst');
	addStuff('Birne', 'Obst');
	addStuff('Mango', 'Obst');
	addStuff('Petersilie', 'Kraut');
	addStuff('Kresse', 'Kraut');
	addStuff('Rukola', 'Kraut');
	addStuff('Schokolade', 'Zucker');
	addStuff('Gummibären', 'Zucker');
	addStuff('Zucker', 'Zucker');
	addStuff('Honig', 'Zucker');
	addStuff('Wasser', 'Flüssigkeit');
	addStuff('Bier', 'Flüssigkeit');
	addStuff('Wein', 'Flüssigkeit');
	addStuff('Met', 'Flüssigkeit');
	addStuff('Mate', 'Flüssigkeit');
	addStuff('Milch', 'Flüssigkeit');
	addStuff('Kaffee', 'Flüssigkeit');
	addStuff('Nudeln', 'Stärke');
	addStuff('Reis', 'Stärke');
	addStuff('Kartoffeln', 'Stärke');
	addStuff('Couscous', 'Stärke');
	addStuff('Mehl', 'Stärke'); 
} else {
	/*
	db.getRecipes(function(recipes) {
		util.puts('Recipes');
		util.puts(JSON.stringify(recipes));
	});

	db.getComponents(function(components) {
		util.puts('Components');
		util.puts(JSON.stringify(components));
	});

	db.getComponents(function(components) {
		util.puts('Components (Fleisch)');
		util.puts(JSON.stringify(components));
	}, 'Fleisch');
	*/
	cooking.getRandomRecipe(function(recipe) {
		util.puts('Random Recipe');
		util.puts(JSON.stringify(recipe));
	});

	cooking.randomizedRecipe(function(recipe) {
		util.puts('randomizedRecipe');
		util.puts(JSON.stringify(recipe));
	});

	function addStuff(name, category) {
		var dbObject = {
			'name' : name,
			'category' : category
		};
		db.addComponent(dbObject);

	}
	var srv = http.createServer(function (req, res) {
		req.on('end', function() {
			res.writeHead(200, {'content-type' : 'text/html; charset=utf-8'});
			replacement = "";
			cooking.randomizedRecipe(function(recipe) {
				for(i in recipe) {
					replacement = replacement + '<li>' + recipe[i] + '</li>\n'
				}
				res.end(index.replace('<replaceme>', replacement));
			});
		});
	});
	srv.listen(8080);
}
