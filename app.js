var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var session = require('express-session');
var redisStore = require("connect-redis")(session);
// var redis = require('redis');
// var redisClient = redis.createClient(6379, "localhost");
var jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt');

mongoose.connect('mongodb://localhost/ShopCart');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
  next();
});
app.all(expressJWT({ secret: 'Ebay Shopping cart'}). unless({ path: ['/users/login']}));

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