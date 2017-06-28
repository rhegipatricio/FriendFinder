//These are the Dependencies
var express = require ("express");
var path = require ("path");
var bothParser = require ("body-parser");

//Sets up the express app
var app = express ();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

require('/app/routing/apiRoutes.js')(app);
require('/app/routing/htmlRoutes.js')(app);

app.listen(Port, function () {
	console.log("App listening on PORT: " + PORT)
});