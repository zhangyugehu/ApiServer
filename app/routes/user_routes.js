const UserService = require('../service/user')

module.exports = function(app, db) {
  app.post('/register', async (req, res) => {
    res.send(await UserService.register(req.body, db))
  })

  app.post('/login', async (req, res) => {
    res.send(await UserService.login(req.body, db))
  })

  app.post('/token', async (req, res) => {
    const { token } = req.headers
    res.send(await UserService.tokenLogin(token, db))
  })

  app.post('/logout', async (req, res) => {
    const { token } = req.headers
    res.send(await UserService.logout(token, db))
  })
}
