var app = require('../../express.js');
 
app.get('/api/project/user', login);
app.post('/api/project/user', register);
app.put('/api/project/user/:userId', update);
app.get('/api/project/user/:userId', findUserById)
app.post('/api/project/user/:userId/newPost', createPost)
app.get('/api/project/user/:userId/posts', findAllPostsByUserId)
app.get('/api/project/post/:postId', deletePostById)
app.post('/api/project/post/:postId', updatePostById)
app.get('/api/project/user/:userId/post/:postId/like', likePostById)
app.post('/api/project/user/post/:postId/comment', commentPostById)
app.get('/api/project/user/:userId/post/:postId/comment/:commentId', deleteCommentById)

var users = [
    {"_id":123,"username":"aly","password":"123"},
    {"_id":234,"username":"admin","password":"admin"}
];

var posts = [];

function login(req, res){
    var username = req.query.username;
    var password = req.query.password;
    for(var u in users){
        if(users[u].username === username && 
            users[u].password === password){
            res.json(users[u]);
            return;
        }
    }
    res.sendStatus(404);
}

function register(req,res){
    var user = req.body;
    users.push(user);
    res.json(user);
}

function update(req, res){
    var user = req.body;
    var userId = req.params['userId'];
    for(var u in users){
        if(users[u]._id === parseInt(userId)){
            user._id = users[u]._id;
            user.username = users[u].username;
            user.password = users[u].password;
            users[u] = user;
            res.json(user);
            return
        }
    }
    res.sendStatus(404);
}

function findUserById(req, res){
    var userId = req.params['userId'];
    for(var u in users){
        if(users[u]._id === parseInt(userId)){
            res.json(users[u]);
            return;
        } 
    }
    res.sendStatus(404);
}

function createPost(req, res){
    var post = req.body;
    var userId = req.params['userId'];

    if(posts.length >= 1){
        for(var p in posts){
            var id = posts[p]._id;
        }
        newId = id+111;
        post._id = newId;
        posts.push(post);
        res.json(posts);
        return;
    } else{
        post._id = 111;
        posts.push(post);
        res.json(posts);
        return;
    }
    res.sendStatus(404);
}

function findAllPostsByUserId(req, res){
    var userId = req.params['userId'];
    res.json(posts);
}

function deletePostById(req, res){
    var postId = req.params['postId'];
    for(var p in posts){
        if(posts[p]._id === parseInt(postId)){
            posts.splice(p, 1);
            res.json(posts);
            return;
        }
    }
    res.sendStatus(404);
}

function updatePostById(req, res){
    var postId = req.params['postId'];
    var post = req.body;
    for(var p in posts){
        if(posts[p]._id === parseInt(postId)){
            posts[p] = post;
            res.json(posts);
            return;
        }
    }
    res.sendStatus(404);
}

function likePostById(req, res){
    var postId = req.params.postId;
    var userId = req.params.userId;
    for(var p in posts){
        if(posts[p]._id === parseInt(postId)){
            if(posts[p].likesBy.indexOf(userId) > -1){
                posts[p].like -= 1;
                var ind = posts[p].likesBy.indexOf(userId);
                posts[p].likesBy.splice(ind, 1);
                res.json(posts);
                return;
            } else{
                posts[p].like += 1;
                posts[p].likesBy.push(userId);
                res.json(posts);
                return;
            }
        }
    }
    res.sendStatus(404);
}

function commentPostById(req, res){
    var postId = req.params.postId;
    var comment = req.body;

    for(var p in posts){
        if(posts[p]._id === parseInt(postId)){
            if(posts[p].comments.length >= 1){
                for(var c in posts[p].comments){
                    var id = posts[p].comments[c]._id;
                }
                newId = id+11;
                comment._id = newId;
                posts[p].comments.push(comment);
                res.json(posts);
                return;
            } else{
                comment._id = 11;
                posts[p].comments.push(comment);
                res.json(posts);
                return;
            }
        }
    }
    res.sendStatus(404);
}

function deleteCommentById(req, res){
    var postId = req.params['postId'];
    var commentId = req.params['commentId'];
    var userId = req.params['userId'];

    for(var p in posts){
        if(posts[p]._id === parseInt(postId)){
            for(var c in posts[p].comments){
                if(posts[p].comments[c]._id === parseInt(commentId)){
                    if(posts[p].comments[c].userId === userId){
                        posts[p].comments.splice(c, 1);
                        res.json(posts);
                        return;
                    }
                }
            }
            
        }
    }
    res.sendStatus(404);
}