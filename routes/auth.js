var express = require('express');
var router = express.Router();
var User = require('../models/users');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var usernameStatus;

var username;
var first_name;
var last_name;
var email;
var password;
var loginStatus;


router.get('/register', function(req, res) {
  if(!req.user) {
    var data = {
      title: 'Sign Up',
      status: usernameStatus,
      username: username,
      firstName: first_name,
      lastName: last_name,
      email: email,
      password: password
    }
    res.render('sign_up', data);
    usernameStatus = "";
    username = "";
    first_name = "";
    last_name = "";
    email = "";
    password = "";
  }
  else {
    res.redirect('/');
  }
});

router.post('/register', function(req,res) {
  
  username = req.body.username;
  first_name = req.body.firstName;
  last_name = req.body.lastName;
  email = req.body.email;
  password = req.body.password;

  var newAccount = {
    username: username,
    first_name: first_name,
    last_name: last_name,
    email: email
    //password: password
  };

  User.findOne({username: newAccount.username}, function(err, getUsername){
    if(!getUsername) {
      User.register(new User(newAccount), req.body.password, function(err, account){
        if (err) throw err;

        console.log(account);
        passport.authenticate('local')(req, res, function(){
          res.redirect('/');
        })
        //res.redirect('/auth/login')

        usernameStatus = "";
        username = "";
        first_name = "";
        last_name = "";
        email = "";
        password = "";
      });
    }
    else {
      console.log(getUsername)
      usernameStatus = 'Username already exist';
      res.redirect('/auth/register');
    }
  });
});

router.get('/login', function(req, res) {
  if(!req.user) {
    var data = {
      title: 'Login',
      //loginStatus: loginStatus
    }

    res.render('login', data);
    loginStatus = "";
  }
  else {
    res.redirect('/');
  }
});

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: {type: 'error', message: 'Invalid username or password'}
  }),
  function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/')
});

module.exports = router;