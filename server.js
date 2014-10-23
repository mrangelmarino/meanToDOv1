// CONFIGURATION

var express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override');
	
mongoose.connect('mongodb://localhost/todoApp');

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

// DATABASE & MODEL

var Todo = mongoose.model('Todo', {
	text : String
});

// SERVER ROUTES

app.get('/api/todos', function(req, res){
	
	Todo.find(function(err, todos) {
		if(err){
			res.send(err);
		}else{
			res.json(todos);
		}
	});
	
});


app.post('/api/todos', function(req, res) {
	
	Todo.create({
		text : req.body.text,
		done : false
	}, function(err, todo) {
		if(err){
			res.send(err);
		}else{
			
			Todo.find(function(err,todos){
				if(err){
					res.send(err);
				}else{
					res.json(todos);
				}
			});
					
		}
	
	});
	
});

app.delete('/api/todos/:todo_id', function(req, res){
	
	Todo.remove({
		_id : req.params.todo_id
	}, function(err, todo){
		if(err){
			res.send(err);
		}else{
			Todo.find(function(err, todos){
				if(err){
					res.send(err);
				}else{
					res.json(todos);
				}
			});
		}	
	});

});

// APPLICATION ROUTES

app.get('*', function(req, res){
	res.sendfile('./public/index.html');	
});

// START SERVER
app.listen(8080, function(){
	console.log('App listening on port 8080');
});