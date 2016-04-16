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


//verify username and password is correct
passport.use(new passportLocal.Strategy(function(username, passowrd, done){
	
	console.log("Coming here....");

	//will check from data base for authentication

	//as of now I am doing normal authentication and pretending that this is using real database
	if(username === passowrd){
		done(null, {id: username, name: username});
	} else {
		done(null, null);
	}


	//done(null, user);//if user is authenticated then we will pass user object and null error
	//done(null, null);//if user is not authenticated then we will pass null object and null error 
	//done(new Error('ouch!'));

}));


passport.serializeUser(function(user, done){
	done(user.id);
});


passport.deserializeUser(function(id, done){
	//query database or cache
	done({id: id, name: id});

});

app.get('/', function(req, res){
	res.render('index', {
		isAuthenticated: req.isAuthenticated(),
		user: req.user
	});
});


app.get('/login', function(req, res){
	
	res.render('login');
});


//call where we are authenticating user
app.post('/login', passport.authenticate('local') , function(req, res){
	console.log("Coming here....");
	res.redirect('/');
});

var port  = process.env.port || 1337;

app.listen(port, function(){
	console.log('http://127.0.0.1:' + port + '/' );
});