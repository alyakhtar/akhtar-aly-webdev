var app = require('../../express.js');
var UserModel = require('../models/user/user.model.server.js');
var WallModel = require('../models/wall/wall.model.server.js');
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

app.post('/api/project/login', passport.authenticate('local'), login);
app.get('/api/project/loggedin', loggedin);
app.post('/api/project/logout', logout);
app.post('/api/project/register', register);

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

function register(req, res) {
    var user = req.body;
    
    user.password = user.password;
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
                    var callbackUrl = "/project/#!/user/"+userId;
                    res.redirect(callbackUrl);
                }, function(err){
                    res.sendStatus(404);
                });
        }, function (error) {
            res.sendStatus(400).send(error);
        });
}