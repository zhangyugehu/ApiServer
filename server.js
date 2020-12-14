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

const PORT_HTTP = 8000;
const PORT_HTTPS = 3000;

DateUtil.injectExt()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
  
  // const key = fs.readFileSync(path.join(__dirname, './cer/home.thssh.top.key'), 'utf-8');
  // const cert = fs.readFileSync(path.join(__dirname, './cer/home.thssh.top.pem'), 'utf-8');
  // const certs = {key, cert};
  // const httpsServer = https.createServer(certs, app);
  // httpsServer.listen(PORT_HTTPS, function() {
  //   console.log('https listen on ' + PORT_HTTPS);
  // });
});
