var express = require('express');
var app = express();

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

// Start the server
app.set('port', process.env.PORT || 3000);
 
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});