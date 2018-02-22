var express = require('express');
var monk = require('monk');
var objectid = require('mongodb').ObjectID;
var db = monk('localhost:27017/profdb');
var router = express.Router();

router.get('/:id', function(req, res) {
	var collection = db.get('users');	
	collection.findOne({accountid: new objectid(req.params.id)}, function(err, user) {
		if(err) throw err;
		res.json(user);
	});
});

module.exports = router;