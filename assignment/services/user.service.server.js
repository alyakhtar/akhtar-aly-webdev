var app = require('../../express.js');
var UserModel = require('../models/user/user.model.server.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use('assignment',new LocalStrategy(localStrategy));
// passport.serializeUser(serializeUser);
// passport.deserializeUser(deserializeUser);

var bcrypt = require("bcrypt-nodejs");

// var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// var FacebookStrategy = require('passport-facebook').Strategy;
// var GitHubStrategy = require('passport-github2').Strategy;

// var googleConfig = {
//     clientID     : process.env.GOOGLE_CLIENT_ID,
//     clientSecret : process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL  : process.env.GOOGLE_CALLBACK_URL
// };

// var facebookConfig = {
//     clientID     : process.env.FACEBOOK_CLIENT_ID,
//     clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
//     callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
//     profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name']
// };

// var githubConfig = {
//     clientID     : process.env.GITHUB_CLIENT_ID,
//     clientSecret : process.env.GITHUB_CLIENT_SECRET,
//     callbackURL  : process.env.GITHUB_CALLBACK_URL,
// };

// passport.use(new GoogleStrategy(googleConfig, googleStrategy));
// passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
// passport.use(new GitHubStrategy(githubConfig, githubStrategy));

app.get('/api/user', findUserByUsername);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);
app.post('/api/login', passport.authenticate('assignment'), login);
app.get('/api/loggedin', loggedin);
app.post('/api/logout', logout);
app.post('/api/register', register);

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/project/index.html#!/profile',
        failureRedirect: '/project/index.html#!/login'
    }));

app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/project/index.html#!/profile',
        failureRedirect: '/project/index.html#!/login'
}));
// app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
// app.get('/auth/google/callback',
//     passport.authenticate('google', {
//         successRedirect: '/assignment/index.html#!/profile',
//         failureRedirect: '/assignment/index.html#!/login'
//     }));
// app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
// app.get('/auth/facebook/callback',
//     passport.authenticate('facebook', {
//         successRedirect: '/assignment/index.html#!/profile',
//         failureRedirect: '/assignment/index.html#!/login'
// }));
// app.get ('/auth/github', passport.authenticate('github', { scope : [ 'user:email' ] }));
// app.get('/auth/github/callback',
//     passport.authenticate('github', {
//         successRedirect: '/assignment/index.html#!/profile',
//         failureRedirect: '/assignment/index.html#!/login'
// }));

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
    user.ProjectType = 'Assignment';
    user.password = bcrypt.hashSync(user.password);
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
        .findUserByUsername(username)
        .then(
            function(user) {
                if(user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else{
                    return done(null, false);
                }
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