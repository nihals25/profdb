var express = require('express');
var monk = require('monk');
var db = monk('localhost:27017/profdb');
var router = express.Router();

router.post('/adduser', function() {
	var collection = db.get('users');
	collection.insert({
		username: global.username,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		dateofjoining: req.body.dateofjoining
	});
})

module.exports = router;