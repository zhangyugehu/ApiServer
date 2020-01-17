const crypto = require('crypto')

function md5Str(str, { salt } = { salt: '' }) {
  const md5 = crypto.createHash('md5');
  const result = md5.update(str + salt).digest('hex');
  console.log(result);
  return result;
}

module.exports = {
  md5Str
}
