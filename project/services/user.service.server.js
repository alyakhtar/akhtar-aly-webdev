var app = require('../../express.js');
var UserModel = require('../models/user/user.model.server.js');
var WallModel = require('../models/wall/wall.model.server.js');

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

app.get('/api/project/user', login);
app.post('/api/project/user', register);
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

var users = [
    { "_id": 123, "username": "aly", "password": "123", 
    "first_name": "Aly", "last_name": "Akhtar", 
    "following": [{ "name": "admin admin", "id": 21 }], 
    "followers": [{ "name": "admin admin" }],
    "image" : "https://openclipart.org/download/233689/north-korean-maze-mobile-casino.svg"},
    { "_id": 234, "username": "admin", "password": "admin" }
];

var posts = [];

function login(req, res) {
    var username = req.query.username;

    var password = req.query.password;

    UserModel
        .findUserByCredentials(username, password)
        .then(function(user){
            if(user){
                res.json(user);
            } else{
                res.sendStatus(400).send(err);
            }
        });

    // for (var u in users) {
    //     if (users[u].username === username &&
    //         users[u].password === bcrypt.hashSync(password)) {
    //         res.json(users[u]);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function register(req, res) {
    var user = req.body;
    
    user.password = user.password;
    user.image = 'https://openclipart.org/download/233689/north-korean-maze-mobile-casino.svg';
    UserModel
        .createUser(user)
        .then(function(user){
            if(user){
                res.json(user);
            } else{
                res.sendStatus(400).send(err);
            }
        });
    // users.push(user);
    // res.json(user);
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
    // for (var u in users) {
    //     if (users[u]._id === parseInt(userId)) {
    //         res.json(users[u]);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
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
    // for (var u in users) {
    //     if (users[u]._id === parseInt(userId)) {
    //         user._id = users[u]._id;
    //         user.username = users[u].username;
    //         user.password = users[u].password;
    //         users[u] = user;
    //         res.json(user);
    //         return
    //     }
    // }
    // res.sendStatus(404);
}

function deleteUserByUserId(req, res){
    var userId = req.params['userId'];

    UserModel
        .deleteUser(userId)
        .then(function(){
            res.sendStatus(200);
        });
    // for (var u in users) {
    //     if (users[u]._id === parseInt(userId)) {
    //         users.splice(u, 1);
    //         res.sendStatus(200);
    //         return
    //     }
    // }
    // res.sendStatus(404);
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
    // if (posts.length >= 1) {
    //     for (var p in posts) {
    //         var id = posts[p]._id;
    //     }
    //     newId = id + 111;
    //     post._id = newId;
    //     posts.push(post);
    //     res.json(posts);
    //     return;
    // } else {
    //     post._id = 111;
    //     posts.push(post);
    //     res.json(posts);
    //     return;
    // }
    // res.sendStatus(404);
}

function findAllPostsByTeam(req, res) {
    var team = req.params['team'];
    WallModel
        .findPostsByTeamName(team)
        .then(function(posts){
            res.json(posts);
            return;
        });
    // res.json(posts);
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
    // for (var p in posts) {
    //     if (posts[p]._id === parseInt(postId)) {
    //         posts.splice(p, 1);
    //         res.json(posts);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function updatePostById(req, res) {
    var postId = req.params['postId'];
    var post = req.body;

    WallModel
        .updatePost(postId, post)
        .then(function(){
            res.sendStatus(200);
        });
    // for (var p in posts) {
    //     if (posts[p]._id === parseInt(postId)) {
    //         posts[p] = post;
    //         res.json(posts);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function likePostById(req, res) {
    var postId = req.params['postId'];
    var userId = req.params['userId'];
    
    WallModel
        .likePost(postId, userId)
        .then(function(post){
            res.sendStatus(200);
        });
    // for (var p in posts) {
    //     if (posts[p]._id === parseInt(postId)) {
    //         if (posts[p].likesBy.indexOf(userId) > -1) {
    //             posts[p].like -= 1;
    //             var ind = posts[p].likesBy.indexOf(userId);
    //             posts[p].likesBy.splice(ind, 1);
    //             res.json(posts);
    //             return;
    //         } else {
    //             posts[p].like += 1;
    //             posts[p].likesBy.push(userId);
    //             res.json(posts);
    //             return;
    //         }
    //     }
    // }
    // res.sendStatus(404);
}

function commentPostById(req, res) {
    var postId = req.params.postId;
    var comment = req.body;

    WallModel
        .commentPostById(postId, comment)
        .then(function(){
            res.sendStatus(200);
        });
    // for (var p in posts) {
    //     if (posts[p]._id === parseInt(postId)) {
    //         if (posts[p].comments.length >= 1) {
    //             for (var c in posts[p].comments) {
    //                 var id = posts[p].comments[c]._id;
    //             }
    //             newId = id + 11;
    //             comment._id = newId;
    //             posts[p].comments.push(comment);
    //             res.json(posts);
    //             return;
    //         } else {
    //             comment._id = 11;
    //             posts[p].comments.push(comment);
    //             res.json(posts);
    //             return;
    //         }
    //     }
    // }
    // res.sendStatus(404);
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
    // for (var p in posts) {
    //     if (posts[p]._id === parseInt(postId)) {
    //         for (var c in posts[p].comments) {
    //             if (posts[p].comments[c]._id === parseInt(commentId)) {
    //                 if (posts[p].comments[c].userId === userId) {
    //                     posts[p].comments.splice(c, 1);
    //                     res.json(posts);
    //                     return;
    //                 }
    //             }
    //         }

    //     }
    // }
    // res.sendStatus(404);
}

function unfollowUserById(req, res) {
    var userId = req.params['userId'];
    var followId = req.params['followId'];

    UserModel
        .unfollowUser(userId, followId)
        .then(function(){
            res.sendStatus(200);
        });
    // for (var u in users) {
    //     if (users[u]._id === parseInt(userId)) {
    //         for (var f in users[u].following) {
    //             if (users[u].following[f].id === parseInt(followId)) {
    //                 users[u].following.splice(f, 1);
    //                 res.json(users[u]);
    //                 return;
    //             }
    //         }
    //     }
    // }
    // res.sendStatus(404);
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
                            });
                    });

            }
            res.sendStatus(200);
        });
    // for (var u in users) {
    //     if (users[u]._id === parseInt(userId)) {
    //         if(!users[u].following){
    //             users[u].following = [];
    //         }
    //         users[u].following.push(user);
    //         res.json(users[u]);
    //         return;
    //     }
    // }
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