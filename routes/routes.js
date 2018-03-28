var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);
router.get('/', ctrlProfile.loadHeader);

// authentication
router.post('/userexists', ctrlAuth.userexists);
router.post('/signup', ctrlAuth.signup);
router.post('/login', ctrlAuth.login);
router.get('/logout', ctrlAuth.logout);

module.exports = router;