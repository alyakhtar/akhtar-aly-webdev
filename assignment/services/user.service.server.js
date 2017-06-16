var app = require('../../express.js');
var UserModel = require('../models/user/user.model.server.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GitHubStrategy = require('passport-github2').Strategy;

// clientID     : '908038950509-4odl0opfhho1rov96dsjl0itbbt4ovc7.apps.googleusercontent.com',
// clientSecret : 'uwktoBhRX6V5jchmjokbAYSk',
// callbackURL  : 'http://127.0.0.1:3000/auth/google/callback'
var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};

// clientSecret : 'ab378ba7fcd5f21c2eb62eec56901263',
// clientID     : '440912039627944',
// callbackURL  : 'http://127.0.0.1:3000/auth/facebook/callback',

var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name']
};

var githubConfig = {
    // clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientID     : 'af112fbb291a8f2556b9',
    // clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    clientSecret : 'cb4f1b2db424c757a1ab050856ed3dda548c7b29',
    // callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
    callbackURL  : 'http://127.0.0.1:3000/auth/github/callback',
};

passport.use(new GoogleStrategy(googleConfig, googleStrategy));
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
passport.use(new GitHubStrategy(githubConfig, githubStrategy));

app.get('/api/user', findUserByUsername);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);
app.post('/api/login', passport.authenticate('local'), login);
app.get('/api/loggedin', loggedin);
app.post('/api/logout', logout);
app.post('/api/register', register);

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/assignment/index.html#!/profile',
        failureRedirect: '/assignment/index.html#!/login'
    }));
app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/assignment/index.html#!/profile',
        failureRedirect: '/assignment/index.html#!/login'
}));
app.get ('/auth/github', passport.authenticate('github', { scope : [ 'user:email' ] }));
app.get('/auth/github/callback',
    passport.authenticate('github', {
        successRedirect: '/assignment/index.html#!/profile',
        failureRedirect: '/assignment/index.html#!/login'
}));

function githubStrategy(token, refreshToken, profile, done) {
    UserModel
        .findUserByGithubId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var displayName = profile.displayName.split(" ");
                    var newGithubUser = {
                        username:  profile.username,
                        firstName: displayName[0],
                        lastName:  displayName[1],
                        email:     email,
                        github: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return UserModel.createUser(newGithubUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

function facebookStrategy(token, refreshToken, profile, done) {
    UserModel
        .findUserByFacebookId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newFacebookUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        facebook: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return UserModel.createUser(newFacebookUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}


function googleStrategy(token, refreshToken, profile, done) {
    UserModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return UserModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

function register(req, res){
    var user = req.body;
    UserModel
        .createUser(user)
        .then(function(user){
            if(user){
                req.login(user, function(err) {
                    if(err){
                        res.status(400).send(err);
                    } else{
                        res.json(user);
                    }
                });
            }

        });
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function loggedin(req, res) {
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function localStrategy(username, password, done) {
    UserModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if (!user) {
                    return done(null, false); 
                }
                return done(null, user);
            },
            function(err) {
                if (err) {
                    return done(err); }
            }
        );
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    UserModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function findUserByUsername(req, res) {
    var username = req.query.username;
    UserModel
        .findUserByUsername(username)
        .then(function(user) {
            res.json(user);
        }, function(err) {
            res.sendStatus(404);
        });
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params['userId']
    UserModel
        .updateUser(userId, user)
        .then(function(user) {
            res.sendStatus(200);
        }, function(err) {
            res.sendStatus(err);
        });
}

function deleteUser(req, res) {
    var userId = req.params['userId'];
    UserModel
        .deleteUser(userId)
        .then(function() {
            res.sendStatus(200);
        }, function() {
            res.sendStatus(404);
        });
}