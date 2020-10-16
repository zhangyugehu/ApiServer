// routes/note_routes.js

const { DBTables } = require('../../config/db')
const TokenHelper = require('../util/token')
const { Tips, Code } = require('../model/response');
const Html = require('../util/html')

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
      // const success = await TokenHelper.isTokenAvailable(db, req.headers.token)
      // if (!success) {
      //   res.send(Tips[Code.TOKEN_ERR])
      //   return
      // }
      const limit = parseInt(req.query.limit || LIMIT_DEFAULT);
      const cursor = db.collection(DBTables.NOTE).find().sort({ timestamp: -1 }).limit(limit)
      const list = [];
      while(await cursor.hasNext()) {
        const item = await cursor.next();
        if (!item) continue
        list.push(item)
      }
      res.send(
        Html.html(
          Html.head("SMS"),
          Html.ele('body',
          Html.ele('div',
              list.map(Html.beatify).join('\r\n')
            )
          )
        )
      )
    })

    app.delete('/notes', async (req, res) => {
      const success = await TokenHelper.isTokenAvailable(db, req.headers.token)
      if (!success) {
        res.send(Tips[Code.TOKEN_ERR])
        return
      }
      db.collection(DBTables.NOTE).remove({})
      res.send(Tips[Code.SUCCESS])
    })
};
