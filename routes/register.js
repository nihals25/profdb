var express = require('express');
var monk = require('monk');
var db = monk('localhost:27017/profdb');
var router = express.Router();

router.post('/adduser', function(req, res) {
	if(global.user != undefined && global.user._id != undefined && global.user._id != '') {
		var collection = db.get('users');	
		collection.insert({
			accountid: global.user._id,
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			sex: req.body.sex,
			dob: req.body.dob,
			dateofjoining: req.body.dateofjoining,	
			jobtype: req.body.jobtype,
			visastatus: req.body.visastatus,							
			streetaddress: req.body.streetaddress,
			apthousenumber: req.body.apthousenumber,
			city: req.body.city,
			state: req.body.state,
			zipcode: req.body.zipcode,
			mobile: req.body.mobile,
			degree: req.body.degree,
			major: req.body.major,
			gpa: req.body.gpa,
			graddate: req.body.graddate,
			position: req.body.position,
			company: req.body.company,
			years: req.body.years,										
			disability: req.body.disability,
			veteran: req.body.veteran,
			linkedin: req.body.linkedin,
			portfolio: req.body.portfolio,
			isauthenticated: false		
		}, function(err, userObj) {
			if (err) throw err;
			res.json({success: true, message: 'Student details added successfully'});
		});
	}
	else {
		res.json({success: false, message: 'Please signup/login to add Student details'});
	}	
})

module.exports = router;