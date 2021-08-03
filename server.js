// server.js
const DateUtil       = require('./app/util/date')
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();
const https          = require('https');
const fs             = require('fs');
const path           = require('path');
const cors           = require('express-cors')

const PORT_HTTP = 8000;
const PORT_HTTPS = 3000;

DateUtil.injectExt()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  allowedOrigins: ['localhost:3000'],
}))
// let static middleware do its job
app.use(express.static(__dirname + '/public'));

MongoClient.connect(db.url, function(err, client) {
  if (err) {
    console.log(err);
    return;
  }
  const database = client.db("test")
  require('./app/routes')(app, database);
  app.listen(PORT_HTTP, () => {
    console.log('http listen on ' + PORT_HTTP);
  });      
  
  try {
    const key = fs.readFileSync(path.join(__dirname, './cer/home.thssh.top.key'), 'utf-8');
    const cert = fs.readFileSync(path.join(__dirname, './cer/home.thssh.top.pem'), 'utf-8');
    const certs = {key, cert};
    const httpsServer = https.createServer(certs, app);
    httpsServer.listen(PORT_HTTPS, function() {
      console.log('https listen on ' + PORT_HTTPS);
    });
  } catch(e) {
    console.log(`start https error. ${e && e.message}`);
  }
});
