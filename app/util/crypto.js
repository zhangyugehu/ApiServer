const crypto = require('crypto')

function md5Str(str, { salt } = { salt: '' }) {
  const md5 = crypto.createHash('md5');
  const result = md5.update(str + salt).digest('hex');
  return result;
}

function md5(text) {
  return crypto
      .createHash('md5')
      .update(text)
      .digest();
}

function deRsa(source) {
  return crypto.privateDecrypt(KEY_PRIVATE, Buffer.from(source, 'base64')).toString('utf-8')
}

function enRsa(source) {
  return crypto.publicEncrypt(KEY_PUBLIC, Buffer.from(source)).toString('base64')
}

function en3Des(source, secretKey) {
  secretKey = md5(secretKey);
  // console.log(secretKey.toString('base64'));
  secretKey = Buffer.concat([secretKey, secretKey.slice(0, 8)]);
  const cipher = crypto.createCipheriv('des-ede3', secretKey, '');
  const encrypted = cipher.update(source, 'utf8', 'base64');

  return encrypted + cipher.final('base64');
}

function de3Des(source, secretKey) {
  secretKey = md5(secretKey);
  // console.log(secretKey.toString('base64'));
  secretKey = Buffer.concat([secretKey, secretKey.slice(0, 8)]);
  const decipher = crypto.createDecipheriv('des-ede3', secretKey, '');
  let decrypted = decipher.update(source, 'base64');
  decrypted += decipher.final();
  return decrypted;
}

// function safeEncode(secret, content) {
//   let rsaSecret = EN_SECRET_DEFAULT
//   if (secret) {
//    rsaSecret = enRsa(secret)
//   } else {
//     secret = deRsa(rsaSecret)
//   }
//   const desContent = en3Des(content, secret)
//   return {
//     c: desContent,
//     s: rsaSecret
//   }
// }

// function safeDecode(enContent, enSecret = EN_SECRET_DEFAULT) {
//   return de3Des(enContent, deRsa(enSecret))
// }
function safeEncode(content) {
  return en3Des(content, deRsa(EN_SECRET_DEFAULT))
}

function safeDecode(enContent) {
  return de3Des(enContent, deRsa(EN_SECRET_DEFAULT))
}

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
}


module.exports = {
  md5Str,
  safeEncode,
  safeDecode,
  uuid,
}
