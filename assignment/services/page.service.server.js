var app = require('../../express.js');
var pageModel = require('../models/page/page.model.server.js');

app.post('/api/website/:websiteId/page', createPage);
app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
app.get('/api/page/:pageId', findPageById);
app.put('/api/page/:pageId', updatePage);
app.delete('/api/page/:pageId', deletePage);

function findAllPagesForWebsite(req, res){
    var websiteId = req.params['websiteId'];
    pageModel
        .findAllPagesForWebsite(websiteId)
        .then(function(pages){
            res.json(pages);
        }, function(err){
            res.sendStatus(404);
        });
}

function findPageById(req, res){
    var pageId = req.params['pageId'];
    pageModel
        .findPageById(pageId)
        .then(function(page){
            res.json(page);
        }, function(err){
            res.sendStatus(404);
        });
}

function createPage(req, res){
    var websiteId = req.params['websiteId'];
    var page = req.body;
    pageModel
        .createPage(websiteId, page)
        .then(function(page){
            res.json(page);
        }, function(err){
            res.sendStatus(404);
        });
}

function updatePage(req, res){
    var pageId = req.params['pageId']
    var page = req.body;
    pageModel
        .updatePage(pageId, page)
        .then(function(){
            res.sendStatus(200);
        }, function(){
            res.sendStatus(404);
        });
}

function deletePage(req, res){
    var pageId = req.params['pageId'];
    pageModel
        .deletePage(pageId)
        .then(function(){
            res.sendStatus(200);
        }, function(){
            res.sendStatus(404);
        });
}

