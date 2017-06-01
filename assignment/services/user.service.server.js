var app = require('../../express.js');

var users = [
        { _id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        { _id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        { _id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        { _id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

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
	for(var u in users){
		if(users[u].username === username){
			res.send(users[u]);
			return;
		}
	}
	res.sendStatus(404);
}

function findUserByCredentials(req,res){
	var username = req.query.username;
	var password = req.query.password;
	for(var u in users){
		if (users[u].username === username &&
			users[u].password === password){
			res.json(users[u]);
			return;
		}
	}
	res.sendStatus(404);
}


function findUserById(req,res){
	var userId = req.params['userId'];
	for(u in users){
		if (users[u]._id === userId){
			res.send(users[u]);
			return;
		}
	}
	res.sendStatus(404);
}

function createUser(req, res){
    var user = req.body;
    if (users.length > 0){
        id = users[users.length - 1]._id;
    } else{
        id = 0;
    }
    id = parseInt(id) + 111 + '';
    user._id = id
    users.push(user);
    res.json(user);
}

function updateUser(req, res){
    var user = req.body;
    var userId = req.params['userId']
    for(var u in users){
        if(users[u]._id === userId){
            users[u] = user;
            res.json(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteUser(req, res){
    var userId = req.params['userId'];
    for(u in users){
        if (users[u]._id === userId){
            users.splice(u, 1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}
