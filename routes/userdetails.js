var express = require('express');
var monk = require('monk');
var objectid = require('mongodb').ObjectID;
var db = monk('localhost:27017/profdb');
var router = express.Router();

router.get('/:id', function(req, res) {
	if(global.loggedin) {
		var collection = db.get('users');	
		collection.findOne({accountid: new objectid(req.params.id)}, function(err, user) {
			if(err) throw err;
			res.json({success: true, message:"Successfully retrieved", user: user});
		});
	}
	else {
		res.json({success: false, message:"Please login to view the data", user: {}});
	}	
});

module.exports = router;