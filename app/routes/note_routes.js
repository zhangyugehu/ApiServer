// routes/note_routes.js

const LIMIT_DEFAULT = 10;

module.exports = function(app, db) {
    app.post('/notes', (req, res) => {
      req.body.timestamp = new Date().getTime();
      console.log('body====>', req.body)
      db.collection('notes')
      .insert(req.body, (err, rst) => {
        res.send(rst.result)
      })
    })

    // app.get('/notes', async (req, res) => {
    //   const cursor = db.collection('notes').find()
    //   const list = [];
    //   while(await cursor.hasNext()) {
    //     const item = await cursor.next();
    //     list.push(item);
    //   }
    //   res.send(list)
    // })

    app.get('/notes', async (req, res) => {
      const limit = parseInt(req.query.limit || LIMIT_DEFAULT);
      const cursor = db.collection('notes').find().sort({ timestamp: -1 }).limit(limit)
      const list = [];
      while(await cursor.hasNext()) {
        const item = await cursor.next();
        list.push(item);
      }
      res.send(list)
    })
    app.get('/notes/simple', async (req, res) => {
      const limit = parseInt(req.query.limit || LIMIT_DEFAULT);
      const cursor = db.collection('notes').find().sort({ timestamp: -1 }).limit(limit)
      // const list = [];
      let html = ''
      while(await cursor.hasNext()) {
        const item = await cursor.next();
        if (!item) continue
        html += '<p>[' + item.desp + ']' + item.text + '</p>'
      }
      res.send(html)
      // res.send(list)
    })

    app.delete('/notes', async (req, res) => {
      // const cursor = db.collection('notes').find()
      // const list = [];
      // while(await cursor.hasNext()) {
      //   const item = await cursor.next();
      //   list.push(item);
      // }
      if (req.body.pwd === 'hth123456') {
        db.collection('notes').remove({})
        res.send(JSON.stringify({message: 'success'}))
      } else {
        console.log(req.body)
        res.send(JSON.stringify({message: 'pwd error.'}))
      }
    })
};
