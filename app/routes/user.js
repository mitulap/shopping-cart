/*
Router for 'User' resource.
It handles the request of (1) Creating a new user in the system.
(2) Retrieving a user by username
*/

var user = require('../models/userModel');
var redisClient = require('../routes/redisConn');
var jwt = require('jsonwebtoken');


module.exports = function(app) {
    //Return user input as response till db gets integrated
    app.post('/users', function(req, res) {
        // console.log(req.body);
        var body = req.body;
        var userName = body.user.username;
        var userPass = body.user.password;
        var userEmail = body.user.email;
        var userPhone = body.user.phone;
        var userAddress = body.user.address;

        var newUser = new user({
            username : userName,
            password : userPass,
            email : userEmail,
            phone : userPhone,
            address : userAddress
        });

        newUser.save(function(err){
            if(err) return next(err);
            console.log("user "+userName+" saved successfully");
            //req.session = userName;
            //req.session.regenerate();
            return res.json({username: userName, emails: userEmail , phone : userPhone , address : userAddress, saved :" successfully!"});
        });
    });

    app.post('/users/login', function(req,res){

            if(!req.body.username){
                return res.status(400).send('username required!');
            }
            if(!req.body.password){
                return res.status(400).send('password required!');
            }

            user.findOne({ username : req.body.username }, function(error, data){

                console.log("DATA : "+data);
                    if (error) throw error;

                    if(data != null){

                        if(req.body.password == data.password){
                        var myToken = jwt.sign({ username : req.body.username }, 'Ebay Shopping cart');
                //      res.status(200).json(myToken); 

                        redisClient.set(req.body.username, myToken, function(err,reply){
                            console.log("reply from redis -> "+reply);
                        });
                        res.status(200).json({token:myToken, userid:data.user_id}); 
                        }
                    }
                    /*data.comparePassword(req.body.password, function(error, isMatch){
                        if(error) throw error;
                        if(!isMatch){
                            res.status(401).send('Invalid Password');
                        } else{
                            var myToken = jwt.sign({ username : req.body.username }, 'Ebay Shopping cart');
                            res.status(200).json(myToken);
                        }

                    });

                    console.log(data);*/
                else
                    res.status(401).send('Invalid Input!');
                });
    });

    app.get('/users/:userName', function(req, res) {

        console.log("GET request for : "+req.params.userName);
        var name = req.params.userName;
        redisClient.get(name, function(err,reply){
                console.log(" Redis reply ->  userName : "+name+" password : "+reply);
        });

        //return res.json({username:"John Doe", email:"johndoe@gmail.com"});
        user.findOne({ username : req.params.userName }, function(error, data){
            console.log(data);
            res.json(data);
        });

    });

    app.get('/users/', function(req, res) {

    //return res.json({username:"John Doe", email:"johndoe@gmail.com"});
        user.find({}, function(error, data){
            console.log(data);
            res.status(200).json(data);
        });
    });

    app.put('/users/:userName', function(req, res) {
        //Put request is empty
        // return res.json({username:"John Doe", email:"johndoe@gmail.com"});

    });
}