var Mongoose = require('mongoose'),
    Passport = require('passport'),
    User = Mongoose.model('User'),
    Errors = require('../../config/errors.js'),
    Utils = require('../../config/middlewares/utils.js');


exports.authCallback = function(req, res, next) {
    res.redirect('/');
};

exports.signin = function(req, res) {
    Passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: 'Invalid email or password.'
    });
};

exports.signout = function(req, res) {
    req.logout();
};

exports.session = function(req, res) {
    res.redirect('/');
};

exports.create = function(req, res) {
      
    User.findOne({ email: req.body.email }, function(err, user) {

        if ( err ) throw err;

        // existing user found, stop registration
        if ( user ) {
            Utils.sendResponse(res, null, false, Errors.errors.USER_ALREADY_EXISTS);
            return;
        }

        // create new user
        user = new User(req.body);
        user.provider = 'local';

        user.save(function(err){

            if ( err ) throw err;

            Utils.sendResponse(res, user, true, null);
            return;
        });
    });
};

exports.update = function(req, res) {

    var updateId = req.body._id;
    var newUserData = req.body;
    delete newUserData._id;
    
    User.findByIdAndUpdate(updateId, newUserData, function(err, user){

        if ( err ) throw err;

        Utils.sendResponse(res, user, true, null);
        return;
    });
};


exports.getUser = function(req, res) {
    var user = req.profile;
    Utils.sendResponse(res, user, true, null);
};

exports.me = function(req, res) {
    res.jsonp(req.user || null);
};


exports.populateProfile = function(req, res, next, id) {
    User.findOne({
            _id: id
        })
        .exec(function(err, user) {

            if (err) {

                if( err.name == "CastError" ) {
                    err = Errors.errors.USER_NOT_FOUND;
                } else {
                    err = err.message;
                }
                
                Utils.sendResponse(res, null, false, err);
                return;
            }

            if (!user) {
                Utils.sendResponse(res, null, false, Errors.errors.USER_NOT_FOUND);
                return;
            }
            
            req.profile = user;
            next();
        });
};