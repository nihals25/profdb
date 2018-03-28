var mongoose = require('mongoose');
var	Schema = mongoose.Schema;
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
	username: String,
	email: String,
	isregistered: Boolean,
	isadmin: Boolean,
	hash: String,
  	salt: String	
});

Account.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

Account.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

Account.methods.generateJwt = function () {
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);
	return jwt.sign({
		_id: this._id,
		username: this.username,
		email: this.email,
		exp: parseInt(expiry.getTime() / 1000),
	}, "DB_SECRET");	
};

module.exports = mongoose.model('Account', Account);