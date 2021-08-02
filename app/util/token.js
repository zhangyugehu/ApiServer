const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
const { DBTables } = require('../../config/db')
const { Tips, Code } = require('../model/response')

const MINTUES = 60
const HOUR = 60 * MINTUES
const DAY = HOUR * 24

const ALGORITHM = 'RS256'
// 过期时间30天
const EXP = DAY * 30

const GUEST = {
  'username': 'guest'
}

function createToken(uid) {
  try {
    let created = Math.floor(Date.now() / 1000)
    let cert = fs.readFileSync(path.join(__dirname, '../../config/pem/pri.pem'))//私钥
    let token = jwt.sign({
        data: { uid },
        exp: created + EXP
    }, cert, {algorithm: ALGORITHM});
    return token
  } catch(e) {
    console.error(e)
    return undefined
  }
}

function verifyToken(token) {
  try {
    let cert = fs.readFileSync(path.join(__dirname, '../../config/pem/pub.pem'))//公钥
    let result = jwt.verify(token, cert, {algorithms: [ALGORITHM]}) || {}
    let {exp = 0} = result,current = Math.floor(Date.now()/1000)
    return exp > 0
  } catch(e) {
    return false
  }
}

function createTokenDBModel(token, username) {
  return { token, username }
}
function getTokenTable(db) {
  return db.collection(DBTables.TOKEN)
}

function _getUserTable(db) {
  return db.collection(DBTables.USER)
}
async function _findUser(db, params) {
  const table = _getUserTable(db)
  const cursor = table.find(params)
  let user = false
  while(await cursor.hasNext()) {
    user = await cursor.next()
    if (!user) continue
  }
  cursor.close()
  return user
}
async function clearTokenByUserName(db, username) {
  const {result} = await getTokenTable(db).remove({ username })
  console.log('>>>clearToken result: ', result)
}
async function findUserByToken(db, token) {
  const cursor = getTokenTable(db).find({ token })
  let info = false
  while(await cursor.hasNext()) {
    // 可能有冗余数据
    info = await cursor.next()
    if (!info) continue
  }
  cursor.close()
  console.log('>>>findUserByToken', 'token', !!info)
  if (!info) return false
  const user = await _findUser(db, { username: info.username })
  console.log('>>>findUserByToken', 'user', !!user)
  return user
}

function validateTokenAndGetUser(db, token) {
  if (verifyToken(token)) {
    return findUserByToken(db, token)
  }
  getTokenTable(db).remove({ token }).then(_ => console.log('validateTokenAndGetUser and delete incalidate token'))
  return false;
}

async function validateToken(db, req, res, callback) {
  const token = req.headers.token
  const user = await validateTokenAndGetUser(db, token)
  if (user) {
    callback(user)
  } else if (token) {
    // 登录用户，token失效
    res.send(Tips[Code.TOKEN_ERR])
  } else {
    // guest
    callback(GUEST)
  }
}

module.exports = {
  createToken, verifyToken,
  createTokenDBModel, clearTokenByUserName, getTokenTable,
  findUserByToken, isTokenAvailable: validateTokenAndGetUser, validateToken
}
