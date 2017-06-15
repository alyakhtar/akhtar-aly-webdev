var app = require('../../express.js');
var UserModel = require('../models/user/user.model.server.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.get('/api/user', findUserByUsername);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);
app.post('/api/login', passport.authenticate('local'), login);
app.get('/api/loggedin', loggedin);
app.post('/api/logout', logout);
app.post('/api/register', register);

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