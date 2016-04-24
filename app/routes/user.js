/*
Router for 'User' resource.
It handles the request of (1) Creating a new user in the system.
(2) Retrieving a user by username
*/

var user = require('../models/userModel');
var redisClient = require('../routes/redisConn');

module.exports = function(app) {
	//Return user input as response till db gets integrated
	app.post('/users', function(req, res) {
						console.log("session data : "+JSON.stringify(req.session));

		console.log(req.body);
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
			if(err) throw err;

			console.log("user "+userName+" saved successfully");
			req.session = userName;
//			req.session.regenerate();
	//	console.log(req.session.regenerate());
			 redisClient.set(userName, req.session, function(err,reply){
			 console.log("reply from redis -> "+reply)
			//	console.log("redis stored user : " +userName);
		});

		});

		return res.json({username: userName, password : userPass, emails: userEmail , phone : userPhone , address : userAddress, saved :" successfully!"});

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
    res.json(data);
	});

	});



	app.put('/users/:userName', function(req, res) {
		// return res.json({username:"John Doe", email:"johndoe@gmail.com"});

	});
}