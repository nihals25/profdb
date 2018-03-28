var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('Account');

module.exports.userexists = function(req, res) {  
  User.findOne({username : req.body.username}, function(err, account) {
    if(err) {
      res.json({result: false});
      throw err;
    }
    if(account)
      res.json({result: true});
    else
      res.json({result: false});
  }); 
  delete user;
};

module.exports.signup = function(req, res) {
  var user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.isregistered = false;
  user.isadmin = false,
  user.setPassword(req.body.password);
  user.save(function(err) {    
    var token;
    token = user.generateJwt();  
    res.json({
      success: true,
      token : token
    });    
    res.status(200);
  });
  delete user;
};

module.exports.login = function(req, res) {
  passport.authenticate('local', function(err, user, info){    
    var token;
    if (err) {
      res.status(404);
      res.json({message: err});
      return;
    }
    if(user){
      token = user.generateJwt();       
      res.json({
        success: true,
        token: token,
        redirecturl: user.isregistered ? '/#/userdetails' : '/#/register/'
      });
      res.status(200);
    } else {                 
      res.json({
        success: false,
        message: info.message
      });
      console.log(res.json);
      res.status(401);
    }
  })(req, res);
};

module.exports.logout = function(req, res) {
  req.logout();
  res.json({success: true});  
};

module.exports.update = function(req, res) {
   User.findOne({username : global.user.username}, function(err, account) {
        if(err) throw err;
        User.update({
          username: global.user.username
        },{
          $set: {isregistered: true}
        }, function(err, acc) {
          if(err) {
            res.json({success: false, message: 'An error occured. Please send a mail to {{mail_id}}'});
            throw err;
          }
          res.json({success: true, message: 'Student details added successfully'});
        });          
    });
};