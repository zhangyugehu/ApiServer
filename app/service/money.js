const { DBTables } = require('../../config/db')
const { Tips, Code, createResponse } = require('../model/response');
const { uuid } = require('../util/crypto');
const { getDaysOfMonth } = require('../util/date');

class MoneyRecord {
  static TYPE_IN = 'money_in';
  static TYPE_OUT = 'money_out';
  static create(date, money, type, desc, category, ext) {
    const record = new MoneyRecord();
    record.d = date;
    record.money = parseFloat(money).toFixed(2);
    record.type = type;
    record.desc = desc;
    record.category = category;
    record.ext = ext;
    return record;
  }
  date;
  month;
  day;
  money;
  type;
  desc;
  category;
  ext;
  set d(d) {
    this.date = d.getTime();
    this.month = d.format('yyyy-MM');
    this.day = d.format('yyyy-MM-dd');
  }
}

function getTable(db) {
  return db.collection(DBTables.MONEY)
}

function createRecord(uid, id, record) {
  return {
    uid, id, ...record,
    timestamp: Date.now()
  }
}

function verifyRecord(record) {
  if (isNaN(record.money)) {
    return `金额格式错误. ${record.money}`
  }
  return null
}

async function addOne(db, content, uid) {
  if (!content) {
    console.log(uid, '+++', Code.PARAM_ERR);
    return Tips[Code.PARAM_ERR]
  } else {
    const table = getTable(db)
    const record = createRecord(uid, uuid(), content)
    const error = verifyRecord(record)
    if (error) {
      console.log(uid, '+++', error);
      return Tips.fail(error)
    }
    console.log(uid, '+++', record);
    const {result: {ok}} = await table.insert(record)
    if (ok === 1) {
      return Tips[Code.SUCCESS]
    } else {
      return Tips[Code.ERR_UNKNOW]
    }
  }
}

async function getAll(db, uid) {
  const cursor = getTable(db).find({uid}).sort({ timestamp: -1 })
  const result = [];
  while (await cursor.hasNext()) {
    const record = await cursor.next();
    if (record) {
      result.push(record)
    }
  }
  cursor.close();
  console.log('result count>>>', result.length);
  return result;
}

async function query(db, uid, record) {
  const filter = {uid}
  const {date, day, month, id} = record
  if (date) {
    filter.date = date
  }
  if (month) {
    filter.month = month;
  }
  if (day) {
    filter.day = day;
  }
  if (id) {
    filter.id = id;
  }
  const cursor = getTable(db).find(filter).sort({ timestamp: -1 })
  const result = [];
  while (await cursor.hasNext()) {
    const record = await cursor.next();
    if (record) {
      delete record._id;
      delete record.timestamp;
      delete record.uid;
      result.push(record)
    }
  }
  cursor.close();
  return result;
}

async function deleteById(db, uid, id) {
  const filter = {uid, id};
  const {result} = await getTable(db).updateOne(filter, {$set: {del: true}})
  return result;
}

async function getDailyRecords(db, uid, month, showDel) {
  const moy = new Date(month)
  if (!moy) {
    return null;
  }
  const records = await query(db, uid, {month})
  const daysRecords = getDaysOfMonth(moy).map((it) => ({
    day: it.format('yyyy-MM-dd'),
    total: 0.0,
    cTotal: {},
    records: []
  }))
  records.filter(({del}) => showDel ? true : !del).forEach(it => {
    delete it._id;
    delete it.timestamp;
    delete it.uid;
    const d = new Date(it.date)
    const idx = d.getUTCDate() - 1
    if (d instanceof Date && idx < daysRecords.length) {
      const {money = '0', category} = it
      const mny = parseFloat(money)
      daysRecords[idx].total += mny
      daysRecords[idx].records.push(it)
      daysRecords[idx].cTotal[category] = daysRecords[idx].cTotal[category] ? daysRecords[idx].cTotal[category] + mny : mny;
    }
  })
  return daysRecords;
}

module.exports = {
  MoneyRecord,
  getAll, addOne, deleteById, query, getDailyRecords
}
