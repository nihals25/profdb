var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('Account');
global.user = {};
global.loggedIn = false;

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
    global.user = user;
    global.loggedIn = true;    
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
      global.user = user;
      global.loggedIn = true;           
      res.json({
        success: true,
        token: token,
        redirecturl: user.isregistered ? '/#/userdetails/'+ user._id : '/#/register/'
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
  global.loggedin = false;
  global.user={};
  req.logout();
  res.redirect('/#/login');
};