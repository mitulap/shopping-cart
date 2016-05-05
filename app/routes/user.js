/*
Router for 'User' resource.
It handles the request of (1) Creating a new user in the system.
(2) Retrieving a user by username
*/

var user = require('../models/userModel');
var redisClient = require('../routes/redisConn');
var jwt = require('jsonwebtoken');
var errorResponse = require('./errorResponse');

module.exports = function(app) {
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
            if(err) return res.status(503).json(errorResponse(err, 503));
            console.log("user "+userName+" saved successfully");
            //req.session = userName;
            //req.session.regenerate();
            return res.status(200).json({username: userName, emails: userEmail , phone : userPhone , address : userAddress, saved :'true'});
        });
    });

    app.post('/users/:userid/login', function(req,res){
        var user_id = req.params.userid;

            if(!req.body.username){
                return res.status(400).json(errorResponse('username required!', 400));
            }
            if(!req.body.password){
                return res.status(400).json(errorResponse('password  required!', 400));
            }

            user.findOne({ username : req.body.username }, function(error, data){

                console.log("DATA : "+data);
                    if(error) return res.status(503).json(errorResponse(error, 503));;

                    if(data != null){

                        if(req.body.password == data.password){
                            var myToken = jwt.sign({ username : req.body.username }, 'Ebay Shopping cart');

                            redisClient.get(user_id, function(err,reply){

                                if(reply!=null) {
                                    return res.status(200).json({token:reply, userid:data.user_id});
                                }
                                else {
                                    redisClient.set(data.user_id, myToken, function(err,reply){
                                        console.log("reply from redis -> "+reply);
                                        if(reply!=null) {
                                           return res.status(200).json({token:myToken, userid:data.user_id});
                                        }
                                        else {
                                            return res.status(503).json(errorResponse('Redis Service is unavailable', 503));
                                        }
                                    });
                                } 
                            });

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
                    return res.status(401).json(errorResponse('Invalid Input!', 401));
                });
    });

    app.put('/users/:userid/logout', function(req, res) {
        var userid = req.params.userid;

        redisClient.del(userid, function(err, reply) {
            if(err) return res.status(401).json(errorResponse('Invalid Input!', 401));
            else {
                return res.status(200).json({logout:"true"});
            }
        });
    });

    app.get('/users/:userName', function(req, res) {

        console.log("GET request for : "+req.params.userName);
        var name = req.params.userName;
        redisClient.get(name, function(err,reply){

            if(reply!=null) {
                user.findOne({ username : req.params.userName }, function(error, data){
                    console.log(data);
                    return res.status(200).json(data);
                });
            }
            else {
                return res.status(401).json(errorResponse('No data available!', 401));
            }
        });
    });

    app.get('/users/', function(req, res) {
        user.find({}, function(error, data){
            return res.status(200).json(data);
        });
    });

    app.get('/users/:userid/authenticatesession', function(req, res) {
        var userid = req.params.userid;
        var token = req.get('token');

        redisClient.get(userid, function(err, reply){
            if(reply === token) {
                return res.status(200).json({login: "true"});
            }
            else {
                return res.status(404).json({login: "false"});
            }
        });
    });

    app.put('/users/:userName', function(req, res) {
        //Put request is empty
        // return res.json({username:"John Doe", email:"johndoe@gmail.com"});

    });
}