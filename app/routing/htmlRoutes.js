var path = require("path");

module.exports = function(app){
	app.get("/survey", function(req, res){
		res.sendFile(path.join(__direname, + "/../public/survey.html"));
	});

	app.get("/home", function(req, res){
		res.sendFile(path.join(__direname, + "/../public/home.html"));
	});




}