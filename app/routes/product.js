/*
Router for 'Product' resource.
It handles the request of (1) Creating a new product.
(2) Retrieving a product by product name
*/

module.exports = function(app) {
	//Temporarily return json response as it is
	app.post('/products', function(req, res) {
		var body = req.body;
		var productName = body.product.name;
		var productPrice = body.product.price;
		var productCategory = body.product.category;

		return res.json({name: productName, price: productPrice, category: productCategory});
	});

	app.get('/products/:productName', function(req, res) {
		return res.json({name:"XYZ", price:"123", category: "dummy"});
	});

	app.put('/products/:productName', function(req, res) {
		return res.json({name:"XYZ", price:"123", category: "dummy"});
	});
}