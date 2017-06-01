var app = require('./express.js');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

require ("./test/app.js")(app);
require ("./assignment/app.js");

var port = process.env.PORT || 3000;

app.listen(port);