var express = require('express');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSesssion = require('express-session');


var passport = require('passport');
var passportLocal = require('passport-local');

var app = express();

app.set('view engine','ejs');


app.use(bodyParser.urlencoded( { extended: false } ));
app.use(cookieParser());
app.use(expressSesssion({
	secret: process.env.SESSION_SECRET || 'secret', 
	resave: false,
	saveUninitialized: false
}));



app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res){
	res.render('index', {
		isAuthenticated: false,
		user: req.user
	});
});


app.get('/login', function(req, res){
	res.render('login');
});

app.get('/post', function(req, res){
		
});

var port  = process.env.port || 1337;

app.listen(port, function(){

	console.log('http://127.0.0.1:' + port + '/' );
});