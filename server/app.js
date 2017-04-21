var express = require('express');
var path = require('path');
var ParseServer = require('parse-server').ParseServer;
var bodyParser = require('body-parser');

var moment = require('moment');

var port = process.env.PORT || 3080;

var app = express();

app.set('port', port);

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/1';

var databaseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ponzi';

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

if ('production' == app.settings.env) app.disable('verbose errors');

var serverUri;
if (process.env.PARSE_SERVER_URI) {
  serverUri = process.env.PARSE_SERVER_URI + process.env.PARSE_MOUNT;
} else {
  serverUri = 'http://localhost:'+port+mountPath;
}
var publicServerURL;
if (process.env.PUB_SERVER_URL) {
  publicServerURL = process.env.PUB_SERVER_URL + mountPath;
} else {
  publicServerURL = 'http://localhost:'+port+mountPath;
}

var api = new ParseServer({
  databaseURI: databaseUri,
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'VMvhutWAGNpk78QXprTt',
  masterKey: process.env.MASTER_KEY || '8zqndJmKVnQER6aXsnWR', //Add your master key here. Keep it secret!
  serverURL: serverUri,  // Don't forget to change to https if needed
  // Enable email verification
  appName: 'FxChangeClub',
  publicServerURL: publicServerURL,
  liveQuery: {
    classNames: ['_User', 'Pairing']
  }
});

app.use(mountPath, api);

// Use Middleware
app.use(bodyParser.urlencoded({
  extended: true
}));
// parse application/json 
app.use(bodyParser.json());

// Configure app
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Activate on Launch
app.use('/', express.static(path.join(__dirname, '../dist')));

// if(end()) {
//   console.log("Worked");
//   app.use('/', express.static(path.join(__dirname, '../dist')));
// } else {
//   app.get('/', (req, res) => {
//     return res.render("landing");
//   });
// }

app.use('/public', express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '/assets')));

app.get('/coming', (req, res) =>{
	res.render("landing");
});
// Auth routes
app.use('/api', require(path.join(__dirname, '/routes/auth.route.js')));

module.exports = app;

function end() {
  var ed = process.env.END_DATE;
  // var endDate = Date.parse("2017-04-19:12:00:00");
  console.log(ed);
  var endDate = Date.parse(ed);
  var t3 = endDate - Date.parse(new Date().toString());

  if (t3 > 0) {
    return false;
  } else {
    return true;
  }
}