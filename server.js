//These are the Dependencies
var express = require ("express");
var path = require ("path");
var bothParser = require ("body-parser");

//Sets up the express app
var app = express ();
var Port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));