var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
	username: String,
	email: String,
	password: String,
	isregistered: Boolean,
	isadmin: Boolean	
});

Account.plugin(passportLocalMongoose);

module.exports = {
	authentication: {
		account: Account
	},

	userdetails: {		
		file: "gridfs"
	}
}