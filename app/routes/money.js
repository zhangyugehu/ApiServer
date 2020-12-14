const TokenHelper = require('../util/token')
const { Tips, Code } = require('../model/response')
const MoneyRecordService = require('../service/money');
const MoneyRecord = MoneyRecordService.MoneyRecord;

const UID_PUBLIC = 'guest';
const API_PATH = '/mny';

module.exports = function(app, db) {
  app.post(API_PATH, async (req, res) => {
    try {
      const { headers: { token }, body: { date, money, type, desc, category, ext } } = req
      const dateD = new Date(parseInt(date))
      if (!dateD) {
        res.send(Tips.fail(e.message))
        return
      }
      const {_id: uid = UID_PUBLIC} = await TokenHelper.isTokenAvailable(db, token)
      if (uid) {
        res.send(await MoneyRecordService.addOne(db, MoneyRecord.create(
          dateD,
          money,
          type == 0 ? MoneyRecord.TYPE_IN : MoneyRecord.TYPE_OUT,
          desc,
          category,
          ext
        ), `${uid}`))
      } else {
        res.send(Tips[Code.TOKEN_ERR])
      }
    } catch(e) {
      console.error(e)
      res.send(Tips.fail(e.message))
    }
  })

  app.get(API_PATH, async (req, res) => {
    const { query: { uid=UID_PUBLIC, day, date, month, showDel } } = req
    const filter = {date, month, day};
    const list = await MoneyRecordService.query(db, uid, filter)
    const data = list.filter(({del}) => showDel ? true : !del)
    console.log(`GET ${API_PATH}`, filter, '>>>', data)
    res.send(Tips.success(data))
  })

  app.get(`${API_PATH}/combined`, async (req, res) => {
    const { query: { uid=UID_PUBLIC, day, date, month, showDel } } = req
    const filter = {date, month, day};
    const data = await MoneyRecordService.getDailyRecords(db, uid, month, showDel)
    console.log('GET', `${API_PATH}/combined`, filter, '>>>', data.filter(({total}) => total > 0).map(({day, total, cTotal, records}) => `[${day}](${total})${records.length}${JSON.stringify(cTotal)}`))
    res.send(Tips.success(data))
  })

  app.post(`${API_PATH}/del`, async (req, res) => {
    const { token } = req.headers
    const { body: { uid=UID_PUBLIC, id } } = req
    const {ok, n} = await MoneyRecordService.deleteById(db, uid, id)
    
    const data = {'count': n}
    res.send(Tips.success())
    console.log('POST', `${API_PATH}/del`, '>>>', {uid, id}, data);
  })
}
