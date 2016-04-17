module.exports = function(app){
	app.get('/register', function(req, res){
		res.render('register', {messages: req.flash()})
	});
};