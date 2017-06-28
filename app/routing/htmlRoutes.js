var path = require("path");

module.exports = function(app){
	app.get("/survey", function(req, res){
		res.sendFile(path.join(__direname + "/../public/survey.html"));
	}






}