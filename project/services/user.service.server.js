var app = require('../../express.js');
 
app.get('/api/project/user', login);
app.post('/api/project/user', register);
app.put('/api/project/user/:userId', update);
app.get('/api/project/user/:userId', findUserById)

var users = [
    {"_id":123,"username":"aly","password":"123"},
    {"_id":234,"username":"admin","password":"admin"}
]

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