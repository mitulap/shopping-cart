var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

require('./app/routes/product')(app);
require('./app/routes/user')(app);

module.exports = app;