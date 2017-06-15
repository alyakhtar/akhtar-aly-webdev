const app = require('../../express.js');
var widgetModel = require('../models/widget/widget.model.server.js');

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + "/../../public/uploads")
    },
    filename: function (req, file, cb) {
        var extArray = file.mimetype.split("/");
        var extension = extArray[extArray.length - 1];
        cb(null, 'widgetImage_' + Date.now() + '.' + extension)
    }
});
var upload = multer({storage: storage});

app.post('/api/page/:pageId/widget', createWidget);
app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
app.get('/api/widget/:widgetId', findWidgetById);
app.put('/api/widget/:widgetId', updateWidget);
app.delete('/api/widget/:widgetId', deleteWidget);
app.post('/api/upload', upload.single('myFile'), uploadImage);
app.put('/page/:pageId/widget', updatePosition);

function findAllWidgetsForPage(req, res){
    var pageId = req.params['pageId'];
    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function(widgets){
            res.json(widgets);
        }, function(err){
            res.sendStatus(404);
        });
}

function findWidgetById(req, res){
    var widgetId = req.params['widgetId'];
    widgetModel
        .findWidgetById(widgetId)
        .then(function(widget){
            res.json(widget);
        }, function(err){
            res.sendStatus(404);
        });
}

function createWidget(req, res){
    var pageId = req.params['pageId'];
    var widget = req.body;
    widgetModel
        .createWidget(pageId, widget)
        .then(function(widget){
            res.json(widget);
        }, function(err){
            res.sendStatus(400);
        });
}

function updateWidget(req, res){
    var widgetId = req.params['widgetId'];
    var widget = req.body;
    widgetModel
        .updateWidget(widgetId, widget)
        .then(function(){
            res.sendStatus(200);
        }, function(){
            res.sendStatus(404);
        });
}

function deleteWidget(req, res){
    var widgetId = req.params['widgetId'];
    widgetModel
        .deleteWidget(widgetId)
        .then(function(){
            res.sendStatus(200);
        }, function(){
            res.sendStatus(404);
        });
}

function uploadImage(req, res){
    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    // var originalname  = myFile.originalname;
    var filename      = myFile.filename;
    var path          = myFile.path;
    var destination   = myFile.destination;
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget){
            widget.width = '100%';
            widget.url = req.protocol + '://' + req.get('host') + "/uploads/" + filename;
            pageId = widget._page;

            widgetModel
                .updateWidget(widget._id, widget)
                .then(function(widget){
                    var callbackUrl = "/assignment/#!/website/"+websiteId+'/page/'+pageId+'/widget/'+widgetId;
                    res.redirect(callbackUrl);
                }, function(err){
                    res.sendStatus(404);
                });
        }, function (error) {
            res.sendStatus(400).send(error);
        });
}

function updatePosition(req,res){
    start = req.query.initial;
    end = req.query.final;
    pageId = req.params['pageId'];

    widgetModel
        .reorderWidget(pageId, start, end)
        .then(function(){
            res.sendStatus(200);
        }, function(){
            res.sendStatus(404);
        });
}


