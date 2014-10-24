// CONFIGURATION

var express = require('express'),
	app = express(),
	morgan = require('morgan'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	database = require('./config/database'),
	port = process.env.PORT || 8080;

// Connect to database
mongoose.connect(database.url);

app.use(express.static(__dirname + '/public'));
// set static files location

app.use(morgan('dev'));
// log every request to the console

app.use(bodyParser.urlencoded({
	'extended':'true'
}));
// parse application/x-www-urlencoded

app.use(bodyParser.json());
// parse application/json

app.use(bodyParser.json({
	type: 'application/vnd.api+json'
}));

require('./app/routes/routes.js')(app);

// START SERVER
app.listen(port, function(){
	console.log('App listening on port ' + port);
});