// routes/note_routes.js

const { DBTables } = require('../../config/db')
const TokenHelper = require('../util/token')
const { Tips, Code } = require('../model/response')

const LIMIT_DEFAULT = 10;

module.exports = function(app, db) {
    app.post('/notes', async (req, res) => {
      // const success = await TokenHelper.isTokenAvailable(db, req.headers.token)
      // if (!success) {
      //   res.send(Tips[Code.TOKEN_ERR])
      //   return
      // }
      req.body.timestamp = new Date().getTime();
      console.log('body====>', req.body)
      db.collection(DBTables.NOTE)
      .insert(req.body, (err, rst) => {
        res.send(Tips[Code.SUCCESS])
      })
    })

    app.get('/notes', async (req, res) => {
      const success = await TokenHelper.isTokenAvailable(db, req.headers.token)
      if (!success) {
        res.send(Tips[Code.TOKEN_ERR])
        return
      }
      const limit = parseInt(req.query.limit || LIMIT_DEFAULT);
      const cursor = db.collection(DBTables.NOTE).find().sort({ timestamp: -1 }).limit(limit)
      const list = [];
      while(await cursor.hasNext()) {
        const item = await cursor.next();
        list.push(item);
      }
      res.send(list)
    })

    app.get('/notes/simple', async (req, res) => {
      const limit = parseInt(req.query.limit || LIMIT_DEFAULT);
      const cursor = db.collection(DBTables.NOTE).find().sort({ timestamp: -1 }).limit(limit)
      // const list = [];
      let html = '<!DOCTYPE html>'
      html += '<html xmlns="http://www.w3.org/1999/xhtml">'
      html += '<head><meta http-equiv="Content-Type" content="text/html;charset=utf-8"></head>'
      html += '<div>'
      let counter = 0;
      while(await cursor.hasNext()) {
        const item = await cursor.next();
        if (!item) continue
        if (counter < 5) {
          html += '<div style="color: grey">' + item.desp + '<div><h1 style="color: black">' + item.text + '</h1>'
        } else {
          html += '<div style="color: grey">' + item.desp + '<div><p style="color: black">' + item.text + '</p>'
        }
        counter ++;
      }
      html += '</div>'
      html += '</html>'
      res.send(html)
      // res.send(list)
    })

    app.delete('/notes', async (req, res) => {
      const success = await TokenHelper.isTokenAvailable(db, req.headers.token)
      if (!success) {
        res.send(Tips[Code.TOKEN_ERR])
        return
      }
      db.collection(DBTables.NOTE).remove({})
      res.send(Tips[Code.SUCCESS])
      // if (req.body.pwd === 'hth123456') {
      //   db.collection(DBTables.NOTE).remove({})
      //   res.send(JSON.stringify({message: 'success'}))
      // } else {
      //   console.log(req.body)
      //   res.send(JSON.stringify({message: 'pwd error.'}))
      // }
    })
};
