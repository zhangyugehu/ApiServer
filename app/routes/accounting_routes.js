
const { DBTables } = require('../../config/db')

module.exports = function(app, db) {
  app.post('/accounting', (req, res) => {
    res.send(req.body)
  })

  app.get('/accounting', (req, res) => {
    res.send(req.query)
  })
}
