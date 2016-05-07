/*
Router for 'Product' resource.
It handles the request of (1) Creating a new product.
(2) Retrieving a product by product name
*/

/*
CREATE TABLE product(productname text, productprice float, productid text, productcategory text, productimageurl text, userid text, quantity int, PRIMARY KEY((userid), productid));
INSERT INTO product(productname, productprice, productid, productcategory, productimageurl, userid ) VALUES ('mobile', 15.2, '1234', 'electronics', 'http://example.com/product', '123hash');
*/

const cassandra = require('cassandra-driver');
const client=new cassandra.Client({contactPoints : ['localhost:9042']});
var getAllProductsOfUser = 'SELECT * FROM products.product WHERE userid=?';
var createProductOfUser = 'INSERT INTO products.product(productname, productprice, productid, productcategory, productimageurl, userid, quantity) VALUES(?, ?, ?, ?, ?, ?, ?)';
var deleteProductOfUser = 'DELETE FROM products.product WHERE userid=? AND productid=?'
var getParticularProductOfUser = 'SELECT * FROM products.product WHERE userid=? AND productid=?'
var updateParticularProductOfUser = 'UPDATE products.product SET quantity=? WHERE userid=? AND productid=?';
var redisClient = require('../routes/redisConn');
var errorResponse = require('./errorResponse');

module.exports = function(app) {
    app.post('/products/:userid', function(req, res) {
        
        var body = req.body;
        var productName = body.product.name;
        var productPrice = body.product.price;
        var productId = body.product.id;
        var productCategory = body.product.category;
        var productImageUrl = body.product.imageurl;
        var userid = req.params.userid;
        var token = req.get('token');
        var intialValues = [productName, productPrice, productId, productCategory, productImageUrl, userid, 1];

        if(token){
            redisClient.get(userid, function(err, reply){
                if(reply === token) {
                    client.execute(getParticularProductOfUser,[userid, productId],{ prepare: true }, function(err, getresult){
                        if(getresult.rows.length === 0) {
                            client.execute(createProductOfUser,intialValues, { prepare: true }, function(err, result) {
                                if(err) {
                                    res.status(404).send({msg: err});
                                }
                                else {
                                    res.status(201).json({productname:productName, productprice: productPrice, productid: productId, productcategory:productCategory, productimageurl: productImageUrl, userid:userid, quantity:1, saved:'true'});
                                }
                            });
                        }
                        else {
                            var itemquantity = getresult.rows[0].quantity;
                            var updateitemquantity = itemquantity + 1;
                            var updatedvalues = [updateitemquantity, userid, productId];
                            client.execute(updateParticularProductOfUser,updatedvalues, { prepare: true }, function(err, result) {
                                if(err) {
                                    res.status(404).send({msg: err});
                                }
                                else {
                                    res.status(201).json({productname:productName, productprice: productPrice, productid: productId, productcategory:productCategory, productimageurl: productImageUrl, userid:userid, quantity:updateitemquantity, saved:'true'});
                                }
                            });                            
                        }
                    });
                }
                else {
                    return res.status(401).json(errorResponse('Invalid Input!', 401));
                }
            });
        }
        else {
            return res.status(401).json(errorResponse('Invalid Input!', 401));
        }

    });

    app.get('/products/:userid/', function(req, res) {
        var userid = req.params.userid;
        var token = req.get('token');

        if(token){
            redisClient.get(userid, function(err, reply){
                if(reply === token) {
                    client.execute(getAllProductsOfUser,[userid],{ prepare: true }, function(err, result){
                        if(err){
                            res.status(404).send({msg: err});
                        }
                        else {
                            res.status(200).json({ products: result.rows });
                        }
                    });
                }
                else {
                    return res.status(401).json(errorResponse('Invalid Query!', 401));
                }
            });
        }
        else {
            return res.status(401).json(errorResponse('Invalid Query!', 401));
        }

    });

    app.get('/products/:userid/count', function(req, res) {
        var userid = req.params.userid;
        var token = req.get('token');

        if(token){
            redisClient.get(userid, function(err, reply){
                if(reply === token) {
                    client.execute(getAllProductsOfUser,[userid],{ prepare: true }, function(err, result){
                        if(err){
                            res.status(404).send({msg: err});
                        }
                        else {
                            res.status(200).json({ count: result.rows.length});
                        }
                    });
                }
                else {
                    return res.status(401).json(errorResponse('Invalid Query!', 401));
                }
            });
        }

        else {
            return res.status(401).json(errorResponse('Invalid Query!', 401));
        }

    });

    app.put('/products/:productName', function(req, res) {
        return res.json({name:'XYZ', price:'123', category: 'dummy'});
    });

    app.delete('/products/:userid/:productid', function(req, res) {
        var body = req.body;
        var userid = req.params.userid;
        var productid = req.params.productid;
        var token = req.get('token');

        if(token){
            redisClient.get(userid, function(err, reply){
                if(reply === token) {
                    client.execute(deleteProductOfUser, [userid, productid], { prepare: true }, function(err, result) {
                        if(err){
                            res.status(404).json(errorResponse(err, 404));
                        }
                        else {
                            res.status(200).json({delete:"true"});
                        }           
                    });
                }
                else {
                    return res.status(401).json(errorResponse('Invalid Input!', 401));
                }
            });
        }
        else {
            return res.status(401).json(errorResponse('Invalid Input!', 401));
        }
    });
}