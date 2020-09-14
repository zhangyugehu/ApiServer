const TokenHelper = require('../util/token')
const { Tips, Code } = require('../model/response')
const ClipboardService = require('../service/clipboard');

const UID_PUBLIC = 'public_clipboard';

module.exports = function(app, db) {
  app.post('/clipboard', async (req, res) => {
    const { headers: { token }, body: { content } } = req
    const {_id: uid} = await TokenHelper.isTokenAvailable(db, token)
    if (uid) {
      if (uid) {
        res.send(await ClipboardService.addOne(db, content, `${uid}`))
      } else {
        res.send(Tips[Code.ERR_UNKNOW])
      }
    } else {
      res.send(Tips[Code.TOKEN_ERR])
    }
  })

  app.get('/clipboard/add', async (req, res) => {
    res.send(await ClipboardService.addOne(db, req.query.content, UID_PUBLIC))
  })

  app.get('/clipboard', async (req, res) => {
    const { query: { uid: by } } = req
    const list = await ClipboardService.getAll(db, by || UID_PUBLIC)
    const content = list.map(({uid, content, timestamp}, i) => `<h${i+1}>${content}</h${i+1}>`).join('<br />')
    res.send(`${content}`)
  })

  app.delete('/clipboard', async (req, res) => {
    const { token } = req.headers
    // res.send(await UserService.tokenLogin(token, db))
  })
}
