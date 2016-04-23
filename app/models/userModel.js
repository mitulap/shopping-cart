var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
	username : { type: String, required : true, unique : true},
	password : { type : String, required : true},
	email : {type : String, required : true },
	phone : { type : String}

}, { strict : false});


var userModel = mongoose.model('Users', schema);

module.exports = userModel;