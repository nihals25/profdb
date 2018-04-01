var express = require('express');
var monk = require('monk');
var db = monk('localhost:27017/profdb');
var router = express.Router();

router.get('/:id', function(req, res) {
	var collection = db.get('users');		
	collection.findOne({accountid: req.params.id}, function(err, user) {
		if(err) throw err;		
		res.json({success: true, message:"Successfully retrieved", user: user});
	});	
});

module.exports = router;