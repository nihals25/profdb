var express = require('express');
var monk = require('monk');
var db = monk('localhost:27017/profdb');
var router = express.Router();

router.get('/getstudentsmajor', function(req, res) {	
	console.log(req.body);
	db.get('users').find({major: req.query.major}, {firstname: 1, lastname: 1, degree:1, jobtype:1, resumefile: 1} ,function(err, result) {
		if(err) {
			res.json({success:false, students: null});
			throw err;
		}
		res.json({success:true, students: result, header: ['First Name', 'Last Name', 'Degree', 'Interested In', 'Resume']});
	});
});

router.get('/getstudentsdegree', function(req, res) {
	db.get('users').find({degree: req.body.degree}, function(err, result) {
		if(err) {
			res.json({success:false, students: null});
			throw err;
		}
		res.json({success:true, students: result});
	});
});

module.exports = router;