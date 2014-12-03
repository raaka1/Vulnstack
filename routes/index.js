var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    fs = require('fs'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    passportLocalMongoose = require('passport-local-mongoose'),
    Account = require('../models/account'),
    credentials = require('../models/credentials.js'),
    cveid = require('../models/cve'),
    pkgcloud = require('pkgcloud');


//http://qtip2.com/demos

// passport
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose
var options = {
    user: credentials.user,
    pass: credentials.pass
}
mongoose.connect('mongodb://127.0.0.1/Vulnstack', options);

// routes

router.get('/', function(req, res) {
    res.render('index', {})
    //http://codecanyon.net/item/jquery-timelinexml/full_screen_preview/1448100
});

router.get('/disclosure', function(req, res, err) {
    res.render('disclosure', {})
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
//req.isUnauthenticated
router.get('/timeline', function(req, res) {
    if (req.isAuthenticated())
        res.render('timeline', {
            usrnme: req.user.username
        })
    else
        res.redirect('/login')
});


router.post('/register', function(req, res) {
    Account.register(new Account({
        username: req.body.username
    }), req.body.password, function(err, account) {
        if (err) {
            res.redirect('/login');
        }
        passport.authenticate('local')(req, res, function() {
            // res.redirect('/stack');
            res.render('stack', {
                usrnme: req.user.username
            })
        });
    });
});

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login'
}), function(req, res) {
    res.render('stack', {
        usrnme: req.user.username
    })
});

//<<<<<<< HEAD
var Bugdetail = mongoose.model('Bugdetail', cveid)
//res.render('stack#feature-2',{image1:"working"});

router.post('/createproject', function(req, res) {
    var bugid = req.body.CVEID,
        bugname = req.body.screenName;
    var bugproject =
        new Bugdetail({
            name: bugid,
            sname: bugname
        });
    // console.log(bugproject.name)
    bugproject.save();
    res.redirect('/stack')
});
/*
=======
router.get('/createproject', function(req, res) {
    res.render('stack#feature-2', {image1:"working"});
>>>>>>> FETCH_HEAD
});
*/
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;