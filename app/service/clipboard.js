const { DBTables } = require('../../config/db')
const { Tips, Code, createResponse } = require('../model/response')

function getTable(db) {
  return db.collection(DBTables.CLIPBOARD)
}

function createClipboard(uid, content) {
  return {
    uid, content,
    timestamp: new Date().getTime()
  }
}

async function addOne(db, content, uid) {
  if (!content) {
    return Tips[Code.PARAM_ERR]
  } else {
    const table = getTable(db)
    console.log(uid, '+++', content);
    const {result: {ok}} = await table.insert(createClipboard(uid, content))
    if (ok === 1) {
      return Tips[Code.SUCCESS]
    } else {
      return Tips[Code.ERR_UNKNOW]
    }
  }
}

async function getAll(db, uid) {
  const cursor = getTable(db).find({ uid }).sort({ timestamp: -1 })
  const result = [];
  while (await cursor.hasNext()) {
    const clipboard = await cursor.next();
    if (clipboard) {
      result.push(clipboard)
    }
  }
  cursor.close();
  console.log('query', uid, result);
  return result;
}
module.exports = {
  getAll, addOne
}
