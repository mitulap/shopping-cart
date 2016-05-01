/*
Router for 'Product' resource.
It handles the request of (1) Creating a new product.
(2) Retrieving a product by product name
*/

/*
CREATE TABLE product(productname text, productprice float, productid text, productcategory text, productimageurl text, userid text, PRIMARY KEY((userid), productid));
INSERT INTO product(productname, productprice, productid, productcategory, productimageurl, userid ) VALUES ('mobile', 15.2, '1234', 'electronics', 'http://example.com/product', '123hash');
*/

const cassandra = require('cassandra-driver');
const client=new cassandra.Client({contactPoints : ['localhost:9042']});
var getAllProductsOfUser = 'SELECT * FROM products.product WHERE userid=?';
var createProductOfUser = 'INSERT INTO products.product(productname, productprice, productid, productcategory, productimageurl, userid) VALUES(?, ?, ?, ?, ?, ?)';
var deleteProductOfUser = 'DELETE FROM products.product WHERE userid=? AND productid=? AND productname=?'
var redisClient = require('../routes/redisConn');

module.exports = function(app) {
	app.post('/products/:userid', function(req, res) {
		
		if(req.body.token){
			redisClient.get(req.body.username, function(err, reply){
				console.log(reply);
			});
		}
		
		var body = req.body;
		var productName = body.product.name;
		var productPrice = body.product.price;
		var productId = body.product.id;
		var productCategory = body.product.category;
		var productImageUrl = body.product.imageurl;
		var userid = req.params.userid;
		var values = [productName, productPrice, productId, productCategory, productImageUrl, userid];

		client.execute(createProductOfUser,values, { prepare: true }, function(err, result) {
			if(err) {
				res.status(404).send({msg: err});
			}
			else {
				res.status(201).json({productname:productName, productprice: productPrice, productId: productid, productCategory:productcategory, productimageurl: productImageUrl, userid:userid, saved:'true'});
			}
		});
	});

	app.get('/products/:userid/', function(req, res) {
		var userid = req.params.userid;
		client.execute(getAllProductsOfUser,[userid],{ prepare: true }, function(err, result){
    		if(err){
        		res.status(404).send({msg: err});
    		}
    		else {
        		res.status(200).json({ products: result.rows });
        	}
    	});
	});

	app.put('/products/:productName', function(req, res) {
		return res.json({name:'XYZ', price:'123', category: 'dummy'});
	});

	app.delete('/products/:userid/:productid/:productname', function(req, res) {
		var body = req.body;
		var userid = req.params.userid;
		var productid = req.params.productid;
		var productname = req.params.productname;

		client.execute(deleteProductOfUser, [userid, productid, productname], { prepare: true }, function(err, result) {
    		if(err){
        		res.status(404).send({msg: err});
    		}
    		else {
        		res.status(200).json(result);
        	}			
		});
	});
}