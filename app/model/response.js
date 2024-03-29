function createResponse(data, other) {
  return { data, ...other }
}

function createMessage(message, code) {
  return { message, code }
}

const Code = {
  SUCCESS: 0,
  REGISTER_ERR: 1001,
  REGISTER_EXISTS: 1003,
  LOGIN_ERR: 1002,
  LOGIN_EMPTY: 1004,
  LOGOUT_ERR: 1005,
  TOKEN_ERR: 1006,
  USER_INVALIDATE: 1007,
  PARAMS_ERR: 1008,
  RECORD_EXISTS: 1009,
}
const Tips = {
  success: (data) => createResponse(data, {code: Code.SUCCESS}),
  fail: (reason) => createMessage(reason, Code.ERR_COMMON),
  [Code.SUCCESS]: createMessage('success', Code.SUCCESS),
  [Code.REGISTER_ERR]: createMessage('register error.', Code.REGISTER_ERR),
  [Code.REGISTER_EXISTS]: createMessage('user already exists.', Code.REGISTER_EXISTS),
  [Code.LOGIN_ERR]: createMessage('login error', Code.LOGIN_ERR),
  [Code.LOGIN_EMPTY]: createMessage('user unavailable', Code.LOGIN_EMPTY),
  [Code.LOGOUT_ERR]: createMessage('user logout err', Code.LOGOUT_ERR),
  [Code.TOKEN_ERR]: createMessage('token err', Code.TOKEN_ERR),
  [Code.USER_INVALIDATE]: createMessage('login first!!!', Code.USER_INVALIDATE),
  [Code.RECORD_EXISTS]: createMessage('record already exists.', Code.RECORD_EXISTS),
}

module.exports = {
  createResponse, Tips, Code, createMessage
}
