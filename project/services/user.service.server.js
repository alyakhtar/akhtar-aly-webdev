var app = require('../../express.js');
var UserModel = require('../models/user/user.model.server.js');
var WallModel = require('../models/wall/wall.model.server.js');
var TeamModel = require('../models/team/team.model.server.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + "/../../public/uploads")
    },
    filename: function (req, file, cb) {
        var extArray = file.mimetype.split("/");
        var extension = extArray[extArray.length - 1];
        cb(null, 'projectImage_' + Date.now() + '.' + extension)
    }
});
var upload = multer({storage: storage});

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GitHubStrategy = require('passport-github2').Strategy;

var bcrypt = require("bcrypt-nodejs");

var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};

var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name']
};

var githubConfig = {
    clientID     : process.env.GITHUB_CLIENT_ID,
    clientSecret : process.env.GITHUB_CLIENT_SECRET,
    callbackURL  : process.env.GITHUB_CALLBACK_URL,
};

passport.use(new GoogleStrategy(googleConfig, googleStrategy));
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
passport.use(new GitHubStrategy(githubConfig, githubStrategy));


app.post('/api/project/login', passport.authenticate('local'), login);
app.get('/api/project/loggedin', loggedin);
app.post('/api/project/logout', logout);
app.post('/api/project/register', register);
app.get('/api/project/checkAdmin', checkAdmin);

app.put('/api/project/user/:userId', updateUserByUserId);
app.delete('/api/project/user/:userId', deleteUserByUserId);
app.get('/api/project/user/:userId', findUserById);
app.post('/api/project/user/:userId/newPost', createPost);
app.get('/api/project/posts/:team', findAllPostsByTeam);
app.delete('/api/project/user/:userId/post/:postId', deletePostById);
app.put('/api/project/post/:postId', updatePostById);
app.get('/api/project/user/:userId/post/:postId/like', likePostById);
app.post('/api/project/user/post/:postId/comment', commentPostById);
app.delete('/api/project/user/:userId/post/:postId/comment/:commentId', deleteCommentById);
app.get('/api/project/user/:userId/unfollow/:followId', unfollowUserById);
app.put('/api/project/user/:userId/follow/:followId', followUserById);
app.post('/api/project/upload', upload.single('myFile'), uploadImage);
app.get('/api/project/admin/users', isAdmin, findAllUsers);
app.get('/api/project/admin/posts', isAdmin, findAllPosts);
app.delete('/api/project/admin/post/:postId', isAdmin, deletePost);
app.post('/api/project/admin/createUser', isAdmin, createUser);
app.get('/api/project/admin/teams', getTeams);
app.post('/api/project/admin/team/:teamId', isAdmin, updateTeam);

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
app.get ('/auth/github', passport.authenticate('github', { scope : [ 'user:email' ] }));
app.get('/auth/github/callback',
    passport.authenticate('github', {
        successRedirect: '/project/index.html#!/profile',
        failureRedirect: '/project/index.html#!/login'
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

function register(req, res) {
    var user = req.body;

    user.roles = [];
    user.roles.push('USER');
    user.image = 'https://openclipart.org/download/233689/north-korean-maze-mobile-casino.svg';

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

function createUser(req, res){
    var user = req.body;

    if(!user.roles){
        user.roles = [];
        user.roles.push('USER');
    }
    user.image = 'https://openclipart.org/download/233689/north-korean-maze-mobile-casino.svg';

    UserModel
        .createUser(user)
        .then(function(user){
            if(user){
                res.json(user);
            } else{
                res.sendStatus(400);
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

function checkAdmin(req, res) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        res.json(req.user);
    } else {
        res.send('0');
    }
}

function localStrategy(username, password, done) {
    UserModel
        .findUserByCredentials(username,password)
        .then(
            function(user) {
                if(user) {
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


function findUserById(req, res) {
    var userId = req.params['userId'];
    UserModel
        .findUserById(userId)
        .then(function(user){
            if(user){
                res.json(user);
            } else{
                res.sendStatus(400).send(err);
            }
        });
}

function findAllUsers(req, res){
    
    UserModel
        .findAllUsers()
        .then(function(users){
            res.json(users);
            return;
        });
}

function findAllPosts(req, res){
    
    WallModel
        .findAllPosts()
        .then(function(posts){
            res.json(posts);
            return;
        });
}

function isAdmin(req, res, next){
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        next();
    } else{
        res.sendStatus(401);
    }
}

function updateUserByUserId(req, res) {
    var user = req.body;
    var userId = req.params['userId'];

    UserModel
        .updateUser(userId, user)
        .then(function(user){
            if(user){
                res.json(user);
            } else{
                res.sendStatus(400).send(err);
            }
        });
}

function deleteUserByUserId(req, res){
    var userId = req.params['userId'];

    UserModel
        .deleteUser(userId)
        .then(function(){
            res.sendStatus(200);
        });
}

function createPost(req, res) {
    var post = req.body;
    var userId = req.params['userId'];

    WallModel
        .createPost(post)
        .then(function(){
            WallModel
                .findPostsByTeamName(post.team)
                .then(function(posts){
                    res.json(posts);
                    return;
                });
        });
}

function findAllPostsByTeam(req, res) {
    var team = req.params['team'];
    WallModel
        .findPostsByTeamName(team)
        .then(function(posts){
            res.json(posts);
            return;
        });
}

function deletePost(req, res){
    var postId = req.params['postId'];
    WallModel
        .deletePost(postId)
        .then(function(){
            res.sendStatus(200);
            return;
        });
}

function deletePostById(req, res) {
    var postId = req.params['postId'];
    var userId = req.params['userId'];

    WallModel
        .findPostById(postId)
        .then(function(post){
            if(post.userId === userId){
                WallModel
                    .deletePost(postId)
                    .then(function(){
                        res.sendStatus(200);
                        return;
                    });
            } else{
                res.sendStatus(404);
            }
        });
}

function updatePostById(req, res) {
    var postId = req.params['postId'];
    var post = req.body;

    WallModel
        .updatePost(postId, post)
        .then(function(){
            res.sendStatus(200);
        });
}

function likePostById(req, res) {
    var postId = req.params['postId'];
    var userId = req.params['userId'];
    
    WallModel
        .likePost(postId, userId)
        .then(function(post){
            res.sendStatus(200);
        });
}

function commentPostById(req, res) {
    var postId = req.params.postId;
    var comment = req.body;

    WallModel
        .commentPostById(postId, comment)
        .then(function(){
            res.sendStatus(200);
        });
}

function deleteCommentById(req, res) {
    var postId = req.params['postId'];
    var commentId = req.params['commentId'];
    var userId = req.params['userId'];

    WallModel
        .deleteComment(postId, commentId, userId)
        .then(function(){
            res.sendStatus(200);
            return;
        });
}

function unfollowUserById(req, res) {
    var userId = req.params['userId'];
    var followId = req.params['followId'];

    UserModel
        .unfollowUser(userId, followId)
        .then(function(){
            res.sendStatus(200);
        });
}

function followUserById(req, res) {
    var userId = req.params['userId'];
    var followId = req.params['followId'];
    var followUser = req.body;

    UserModel
        .findUserById(userId)
        .then(function(user){
            var name = user.first_name + ' ' + user.last_name;
            var newUser = {
                name: name,
                id: user._id
            }
            var flag = false;
            for(i = 0; i < user.following.length ; i++){
                if(user.following[i].id == followId){
                    flag = true;
                }
            }
            if(!flag){
                user.following.push(followUser);
                UserModel
                    .updateUser(userId, user)
                    .then(function(){
                        UserModel
                            .followUser(followId, newUser)
                            .then(function(){
                                res.sendStatus(200);
                                return;
                            });
                    });

            }
            res.sendStatus(200);
            return;
        });
    res.sendStatus(404);
}

function getTeams(req, res){
    TeamModel
        .getTeams()
        .then(function(teams){
            res.json(teams);
        });
}

function updateTeam(req, res){
    var team = req.body;
    var teamId = req.params['teamId'];

    TeamModel
        .updateTeam(teamId, team)
        .then(function(teams){
            res.sendStatus(200);
        });
}


function uploadImage(req, res){
    var myFile        = req.file;
    var userId = req.body.userId;

    var filename      = myFile.filename;
    var path          = myFile.path;
    var destination   = myFile.destination;
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    UserModel
        .findUserById(userId)
        .then(function (user){
            user.image = req.protocol + '://' + req.get('host') + "/uploads/" + filename;

            UserModel
                .updateUser(user._id, user)
                .then(function(user){
                    var callbackUrl = "/project/#!/profile";
                    res.redirect(callbackUrl);
                }, function(err){
                    res.sendStatus(404);
                });
        }, function (error) {
            res.sendStatus(400).send(error);
        });
}