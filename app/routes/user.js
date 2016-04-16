/*
Router for 'User' resource.
It handles the request of (1) Creating a new user in the system.
(2) Retrieving a user by username
*/

module.exports = function(app) {
	//Return user input as response till db gets integrated
	app.post('/users', function(req, res) {
		var body = req.body;
		var userName = body.user.name;
		var userEmail = body.user.email;
		return res.json({username: userName, emails: userEmail});
	});

	app.get('/users/:userName', function(req, res) {
		return res.json({username:"John Doe", email:"johndoe@gmail.com"});
	});

	app.put('/users/:userName', function(req, res) {
		return res.json({username:"John Doe", email:"johndoe@gmail.com"});
	});
}