var app = require('../../express.js');

var pages = [
          { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
          { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
          { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

app.post('/api/website/:websiteId/page', createPage);
app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
app.get('/api/page/:pageId', findPageById);
app.put('/api/page/:pageId', updatePage);
app.delete('/api/page/:pageId', deletePage);

function findAllPagesForWebsite(req, res){
    var websiteId = req.params['websiteId'];
    var pageList = [];
    for (var p in pages){
        var page = pages[p];
        if (page.websiteId === websiteId){
            pageList.push(page)
        }
    }
    res.json(pageList);
}

function findPageById(req, res){
    var pageId = req.params['pageId'];
    for (var p in pages) {
        if (pages[p]._id === pageId){
            res.json(pages[p]);
            return;
        }
    }
    res.sendStatus(404);
}

function createPage(req, res){
    var websiteId = req.params['websiteId'];
    var page = req.body;
    lastId = pages[pages.length - 1]._id;
    id = parseInt(lastId) + 111 + '';
    page._id = id;
    page.websiteId = websiteId;
    pages.push(page);
    res.json(page)
}

function updatePage(req, res){
    var pageId = req.params['pageId']
    var page = req.body;
    for(var p in pages){
        if(pages[p]._id === pageId){
            pages[p] = page;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deletePage(req, res){
    var pageId = req.params['pageId'];
    for (var p in pages) {
        if (pages[p]._id === pageId){
            pages.splice(p,1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

