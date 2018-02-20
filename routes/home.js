var express = require('express');
var monk = require('monk');
var db = monk('localhost:27017/profdb');
var router = express.Router();

router.post('/adduser', function(req, res) {
	var collection = db.get('users');
	collection.insert({
		accountid: global.user._id,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		dateofjoining: req.body.dateofjoining,
		degree: req.body.degree,
		major: req.body.major,
		gpa: req.body.gpa,
		position: req.body.position,
		company: req.body.company,
		years: req.body.years,
		sex: req.body.sex,
		dob: req.body.dob,
		streetaddress: req.body.streetaddress,
		apthousenumber: req.body.apthousenumber,
		city: req.body.city,
		state: req.body.state,
		zipcode: req.body.zipcode,
		mobile: req.body.mobile,
		visastatus: req.body.visastatus,
		disability: req.body.disability,
		veteran: req.body.veteran,
		linkedin: req.body.linkedin,
		portfolio: req.body.portfolio,
		graddate: req.body.graddate,
		jobtype: req.body.jobtype
	}, function(err, userObj) {
		if (err) throw err;
		res.json(true);
	});
})

module.exports = router;