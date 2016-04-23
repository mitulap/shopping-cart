var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var users = require('./routes/users');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ShopCart');

app.use(bodyParser.json());

require('./app/routes/product')(app);
require('./app/routes/user')(app);

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

module.exports = app;