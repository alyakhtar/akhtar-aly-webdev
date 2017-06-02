var app = require('../../express.js');

var websites = [
      { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
      { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
      { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
      { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
      { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
      { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
      { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];

app.post('/api/user/:userId/website', createWebsite);
app.get('/api/user/:userId/website', findAllWebsitesForUser);
app.get('/api/website/:websiteId', findWebsiteById);
app.put('/api/website/:websiteId', updateWebsite);
app.delete('/api/website/:websiteId', deleteWebsite);

function findAllWebsitesForUser(req, res){
    var userId = req.params['userId'];
    var websiteList = [];
    for(var w in websites){
        var website = websites[w];
        if (website.developerId === userId){
            websiteList.push(website)
        }
    }
    res.json(websiteList);
}

function findWebsiteById(req, res){
    var websiteId = req.params['websiteId'];
    for(var w in websites){
        if(websites[w]._id === websiteId){
            res.json(websites[w]);
            return;
        }
    }
    res.sendStatus(404);
}

function createWebsite(req, res){
    var userId = req.params['userId'];
    var website = req.body;
    lastId = websites[websites.length - 1]._id;
    id = parseInt(lastId) + 111 + '';
    website._id = id;
    website.developerId = userId;
    websites.push(website);
    res.json(website)
}

function updateWebsite(req, res){
    var websiteId = req.params['websiteId']
    var website = req.body;
    for(var w in websites){
        if(websites[w]._id === websiteId){
            websites[w] = website;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteWebsite(req, res){
    var websiteId = req.params['websiteId'];
    for (var w in websites) {
        if (websites[w]._id === websiteId){
            websites.splice(w,1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

