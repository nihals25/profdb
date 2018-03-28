var express = require('express');
var monk = require('monk');
var db = monk('localhost:27017/profdb');
var multiparty = require('connect-multiparty')();
var User = require('../../models/file');
var fs = require('fs');
var mongoose1 = require('mongoose');
var Gridfs = require('gridfs-stream');
var router = express.Router();

router.post('/upload', multiparty, function(req, res){	
	//console.log(req);
	//mongoose1.connect('mongodb://localhost:27017/profdb')	
	//console.log(mongoose1.connection);
	//var db1 = mongoose1.connection.db;
	//console.log(db1);
	//console.log(db);
	//var mongoDriver = mongoose1.mongo;
	//console.log(mongoDriver);
	//var gfs = new Gridfs(db, mongo);
	//console.log(gfs);
	console.log(mongoose1.mongo);
	console.log(monk);
	console.log("New");
	//console.log(req.body);
	var writestream = gfs.createWriteStream({
	 filename: req.files.file.name,
	 mode: 'w',
	 content_type: req.files.file.mimetype,
	 metadata: req.body
	});
	fs.createReadStream(req.files.file.path).pipe(writestream);
	writestream.on('close', function(file) {
	  User.findById(req.params.id, function(err, user) {
	    // handle error
	    user.file = file._id;
	    user.save(function(err, updatedUser) {
	      // handle error
	      return res.json(200, updatedUser)
	    })
	  });
	  fs.unlink(req.files.file.path, function(err) {
	    // handle error
	    console.log('success!')
	  });
	});
});

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
			res.json({success: true, message: 'Student details added successfully', id: global.user._id});
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