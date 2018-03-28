var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var File = new Schema({
	userid: String,
	fileid: String	
});

module.exports = mongoose.model('file', File);