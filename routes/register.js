var express = require('express');
var monk = require('monk');
var db = monk('localhost:27017/profdb');
var router = express.Router();

router.post('/adduser', function(req, res) {
	if(global.user != undefined && global.user._id != undefined && global.user._id != '') {
		var collection = db.get('users');
		console.log(req.body.workexperience);
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
			state: req.body.state.state,
			zipcode: req.body.zipcode,
			mobile: req.body.mobile,
			degree: req.body.degree.degree!='Other'?req.body.degree.degree:req.body.newdegree,
			major: req.body.major.major!='Other'?req.body.major.major:req.body.newmajor,
			gpa: req.body.gpa,
			graddate: req.body.graddate,
			workexperience: req.body.workexperience,										
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

router.get('/states', function(req, res) {
	var collection = db.get('usstates');
	collection.find({}, function(err, states) {
		if(err) throw err;
		res.send(states);
	});
});

router.get('/degrees', function(req, res) {
	var collection = db.get('degrees');
	collection.find({}, function(err, degrees) {
		if(err) throw err;
		res.send(degrees);
	});
});

router.get('/majors', function(req, res) {
	var collection = db.get('majors');
	collection.find({}, function(err, majors) {
		if(err) throw err;
		res.send(majors);
	});
});

module.exports = router;