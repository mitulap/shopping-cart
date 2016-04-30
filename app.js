var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var session = require('express-session');
var redisStore = require("connect-redis")(session);
var redis = require('redis');
var redisClient = redis.createClient(6379, "localhost");
var jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt');

mongoose.connect('mongodb://localhost/ShopCart');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.all(expressJWT({ secret: 'Ebay Shopping cart'}). unless({ path: ['/users/login']}));

//Modified express later on
/*app.use(session({
    key : 'redis key',
    secret: 'ssshhhhh',
    // create new redis store.
    store: new redisStore({ host: 'localhost', port: 6379, client: redisClient,ttl :  260}),
    saveUninitialized: false,
    resave: false
}));*/


require('./app/routes/product')(app);
require('./app/routes/user')(app);

app.get('*', function(req, res, next) {
  var err = new Error();
  err.status = 404;
  next(err);
});

app.post('*', function(req, res, next) {
  var err = new Error();
  err.status = 404;
  next(err);
});

module.exports = app;