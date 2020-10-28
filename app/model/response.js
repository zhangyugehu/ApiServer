function createResponse(data, other={}) {
  return { data, ...other }
}

function createMessage(message, code) {
  return { message, code }
}

const Code = {
  SUCCESS: 0,
  ERR_COMMON: -1,
  ERR_UNKNOW: 1000,
  REGISTER_ERR: 1001,
  REGISTER_EXISTS: 1003,
  LOGIN_ERR: 1002,
  LOGIN_EMPTY: 1004,
  LOGOUT_ERR: 1005,
  TOKEN_ERR: 1006,
  PARAM_ERR: 1007
}
const Tips = {
  success: (data) => createResponse(data, {code: Code.SUCCESS}),
  fail: (reason) => createMessage(reason, {code: Code.ERR_COMMON}),
  [Code.SUCCESS]: createMessage('success', Code.SUCCESS),
  [Code.ERR_UNKNOW]: createMessage('unknow error', Code.ERR_UNKNOW),
  [Code.REGISTER_ERR]: createMessage('register error', Code.REGISTER_ERR),
  [Code.REGISTER_EXISTS]: createMessage('user already exist', Code.REGISTER_EXISTS),
  [Code.LOGIN_ERR]: createMessage('login error', Code.LOGIN_ERR),
  [Code.LOGIN_EMPTY]: createMessage('user unavailable', Code.LOGIN_EMPTY),
  [Code.LOGOUT_ERR]: createMessage('user logout error', Code.LOGOUT_ERR),
  [Code.TOKEN_ERR]: createMessage('token error', Code.TOKEN_ERR),
  [Code.PARAM_ERR]: createMessage('params error', Code.PARAM_ERR),
}

module.exports = {
  createResponse, Tips, Code
}
