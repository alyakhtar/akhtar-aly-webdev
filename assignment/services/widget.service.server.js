const app = require('../../express.js');

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

var widgets = [
          { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": "2", "text": "GIZMODO"},
          { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": "4", "text": "Lorem ipsum"},
          { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/1900/1200/"},
          { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
          { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": "4", "text": "Lorem ipsum"},
          { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
          { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

app.post('/api/page/:pageId/widget', createWidget);
app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
app.get('/api/widget/:widgetId', findWidgetById);
app.put('/api/widget/:widgetId', updateWidget);
app.delete('/api/widget/:widgetId', deleteWidget);
app.post('/api/upload', upload.single('myFile'), uploadImage);

function findAllWidgetsForPage(req, res){
    var pageId = req.params['pageId'];
    var widgetList = [];
    for (var w in widgets) {
        var widget = widgets[w];
        if (widget.pageId === pageId)
            widgetList.push(widget);
    }
    res.json(widgetList);
}

function findWidgetById(req, res){
    var widgetId = req.params['widgetId'];
    for (var w in widgets){
        var widget = widgets[w];
        if (widget._id === widgetId){
            res.json(widget);
            return;
        }
    }
    res.sendStatus(404);
}

function createWidget(req, res){
    var pageId = req.params['pageId'];
    var widget = req.body;
    lastId = widgets[widgets.length - 1]._id;
    id = parseInt(lastId) + 111 + '';
    widget._id = id;
    widget.pageId = pageId;
    widgets.push(widget);
    res.json(widget)
}

function updateWidget(req, res){
    var widgetId = req.params['widgetId']
    var widget = req.body;
    for(var w in widgets){
        if(widgets[w]._id === widgetId){
            widgets[w] = widget;
            res.sendStatus(200);
            return;
        }
    }       
    res.sendStatus(404);
}

function deleteWidget(req, res){
    var widgetId = req.params['widgetId'];
    for (var w in widgets){
        var widget = widgets[w];
        if (widget._id === widgetId){
            widgets.splice(w,1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function getWidget(widgetId){
    for(var w in widgets){
        if(widgets[w]._id === widgetId){
            return widgets[w];
        }
    }
}

function uploadImage(req, res){
    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname;
    var filename      = myFile.filename;
    var path          = myFile.path;
    var destination   = myFile.destination;
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    widget = getWidget(widgetId);
    widget.url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;

    var callbackUrl   = "/assignment/#!/user/"+userId+"/website/"+websiteId+'/page/'+pageId+'/widget/'+widgetId;

    res.redirect(callbackUrl);
}


