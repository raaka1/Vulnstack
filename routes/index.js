var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var passportLocalMongoose = require('passport-local-mongoose');
var Account = require('./account');



passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
//

mongoose.connect('mongodb://127.0.0.1/passport_local_mongoose');


/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {})
});


router.get('/login', function(req, res) {

    res.render('login', {})
});


router.get('/stack', function(req, res) {
if (req.isAuthenticated())
  res.render('stack', {
        usrnme: req.user.username
    })
  else
      res.redirect('/login')
});



router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
         res.redirect('/login');
    
        }
           passport.authenticate('local')(req, res, function () {
              // res.redirect('/stack');
          res.render('stack', {
        usrnme:req.user.username
  
    })
        });
    });
  });




 router.post('/login',passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
      res.render('stack', {
        usrnme:req.user.username
  
    })
  });

router.post('/createproject', function(req,res){
    res.render('stack,#feature-2',{        // can we render a tab is it possible ?
        image1:"working"
    })
});



router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;