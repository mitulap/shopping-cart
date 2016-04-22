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



app.get('/allItems', function (req, res) {
   console.log( "Got a request for allItems" );
   var data = {
        "items":[
        {
            "id": 1,
            "name": "A green t-shirt",
            "price": 12.50,
            "tags": ["t-shirt", "green"]            
        },
        {
            "id": 2,
            "name": "A blue jeans",
            "price": 12.50,
            "tags": ["jeans", "blue"]
        }
        ]
    };
   res.end( JSON.stringify(data) );
});

app.post('/item', function (req, res) {
   console.log( "Got a post request for creating a new item" );
   var data = {
        "Message" : "Data Saved Successfully",
        "id": 1,
        "name": "A green t-shirt",
        "price": 12.50,
        "tags": ["t-shirt", "green"]
    };
   res.end( JSON.stringify(data) );
});

module.exports = app;