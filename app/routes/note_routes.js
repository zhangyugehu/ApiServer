// routes/note_routes.js

module.exports = function(app, db) {
    app.post('/notes', (req, res) => {
      req.body.timestamp = new Date().getTime();
      console.log('body====>', req.body)
      db.collection('notes')
      .insert(req.body, (err, rst) => {
        res.send(rst.result)
      })
    })

    app.get('/notes', async (req, res) => {
      const cursor = db.collection('notes').find()
      const list = [];
      while(await cursor.hasNext()) {
        const item = await cursor.next();
        list.push(item);
      }
      res.send(list)
    })
};
