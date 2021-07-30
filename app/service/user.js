const { DBTables } = require('../../config/db')
const {
  createToken, verifyToken,
  createTokenDBModel, clearTokenByUserName, getTokenTable,
  findUserByToken
} = require('../util/token')
const { md5Str } = require('../util/crypto')
const { Tips, Code, createResponse } = require('../model/response')


function getUserTable(db) {
  return db.collection(DBTables.USER)
}
async function findUser(db, params) {
  const table = getUserTable(db)
  const cursor = table.find(params)
  let user = false
  while(await cursor.hasNext()) {
    user = await cursor.next()
    if (!user) continue
  }
  cursor.close()
  return user
}
async function addUser(db, user) {
  const table = getUserTable(db)
  return await table.insert(user)
}

/**
 * register user
 * @param {object} param0 user info
 * @param {object} db db
 */
async function register({ username, passwd }, db) {
  const user = await findUser(db, { username })
  if (user) {
    console.log(username + ' exist')
    return Tips[Code.REGISTER_EXISTS]
  }
  try {
    passwd = md5Str(passwd)
  } catch(e) {
    return Tips[Code.REGISTER_EXISTS]
  }
  const token = createToken(username)

  if (token) {
    const insertRst = await addUser(db, { username, passwd })
    console.log('>>> insert user: ' + !!insertRst)

    const result = await getTokenTable(db).insert(createTokenDBModel(token, username))
    console.log(`>>> insert token: ${!!result}`)
    return Tips[Code.SUCCESS]
  } else {
    return Tips[Code.REGISTER_ERR]
  }
}

async function login({ username, passwd }, db) {
  const user = await findUser(db, { username })
  if (!user) {
    return Tips[Code.LOGIN_EMPTY]
  }
  const { passwd: except } = user || {}
  if (md5Str(passwd) !== except) {
    return Tips[Code.LOGIN_ERR]
  }
  delete user.passwd
  // 重新登陆删除之前token
  await clearTokenByUserName(db, user.username);
  const token = createToken(username)
  if (!!token) {
    const result = await getTokenTable(db).insert(createTokenDBModel(token, user.username))
    user.token = token
    console.log('>>>login add token: ' + !!result)
    return createResponse(user, Tips[Code.SUCCESS])
  }
  return Tips[Code.LOGIN_ERR]
}

async function tokenLogin(token, db) {
  const success = verifyToken(token)
  if (!success) return Tips[Code.LOGIN_ERR]
  const user = await findUserByToken(db, token)
  if (!user) return Tips[Code.LOGIN_ERR]
  delete user.passwd
  return createResponse(user, Tips[Code.SUCCESS])
}

async function logout(token, db) {
  const success = verifyToken(token)
  if (!success) return Tips[Code.TOKEN_ERR]
  const user = await findUserByToken(db, token)
  if (!user) return Tips[Code.TOKEN_ERR]
  const result = await getTokenTable(db).remove({ token })
  console.log('>>>logout remove token: ' + !!result)
  return Tips[Code.SUCCESS]
}
module.exports = {
  register, login, tokenLogin, logout
}
