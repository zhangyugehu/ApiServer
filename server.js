// server.js
const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const app            = express();

const port = 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const uri = "mongodb+srv://u-notification:<password>@cluster0-ntqve.azure.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   const database = client.db("test")
//   require('./app/routes')(app, database);
//   app.listen(port, () => {
//     console.log('We are live on ' + port);
//   });
// });

MongoClient.connect(db.url, function(err, client) {
  if (err) {
    console.log(err);
    return;
  }
  const database = client.db("test")
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });          
});
