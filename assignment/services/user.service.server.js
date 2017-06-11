var app = require('../../express.js');
var UserModel = require('../models/user/user.model.server.js');

app.post('/api/user', createUser);
app.get('/api/user', findUser);
app.get('/api/user/:userId', findUserById);
app.put('/api/user/:userId', updateUser);
app.delete('/api/user/:userId', deleteUser);

function findUser(req,res){
	var query = req.query;
	if(query.username && query.password){
		findUserByCredentials(req,res);
	} else if (query.username){
		findUserByUsername(req,res);
	}
}

function findUserByUsername(req,res){
	var username = req.query.username;
    UserModel
        .findUserByUsername(username)
        .then(function(user){
            res.json(user);
        }, function(err){
            res.sendStatus(404);
        });
}

function findUserByCredentials(req,res){
    var username = req.query.username;
    var password = req.query.password;
    UserModel
        .findUserByCredentials(username,password)
        .then(function(user){
            res.json(user);
        }, function(err){
            res.senStatus(404);
        });
}


function findUserById(req,res){
	var userId = req.params['userId'];
    UserModel
        .findUserById(userId)
        .then(function(user){
            res.json(user);
        }, function(err){
            res.send(err);
        });
}

function createUser(req, res){
    var user = req.body;
    UserModel
        .createUser(user)
        .then(function(user){
            res.json(user);
        }, function(err){
            res.send(err);
        });
}

function updateUser(req, res){
    var user = req.body;
    var userId = req.params['userId']
    UserModel
        .updateUser(userId,user)
        .then(function(user){
            res.sendStatus(200);
        }, function(err){
            res.sendStatus(err);
        });
}

function deleteUser(req, res){
    var userId = req.params['userId'];
    UserModel
        .deleteUser(userId)
        .then(function(){
            res.sendStatus(200);
        }, function(){
            res.sendStatus(404);
        });
}
