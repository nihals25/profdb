var mongoose = require('mongoose');
var User = mongoose.model('Account');

module.exports.profileRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User.findById(req.payload._id).exec(function(err, user) {
        res.status(200).json(user);
    });
  }

};

module.exports.loadHeader = function(req, res) {	
	var resultArray = [
    	{
        	href: "/#/update/",
        	tag: 'Update Details' 
      	}, 
      	{
        	href: "/#/resume",
        	tag: 'Add/Update Resume' 
      	},
    ];    
    /*if(global.user.isadmin) {
      	resultArray.push({
          	href: "/#/authenticate",
          	tag: 'Authenticate User'
        });
    }*/
    resultArray.push({
        //href: "/api/authentication/logout",
      	href: '/#/logout',
      	tag: 'Logout'
    });
    res.json({result: resultArray}); 
};