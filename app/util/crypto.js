const crypto = require('crypto')

const KEY_PRIVATE = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCoWh+AC0BMF9Mj
emP0JRiZ4IQ0EAiY3q9th3+IRc0mT+NXWIGA3tL9Qpx/gADNigu/2QTc5a5cwfiP
Ih3s5eVNf4KCRrXlUFvw8JNtb4kJIRxhB7ks61JlGLOFu/L53heFIj7llVnRb0T9
B0m4DaYYk1C0ZfrsQadmSMpPSfAR2k4igPfjzvcTzyv/sM2EehM3fNhXaz3FNERb
a5/23O479i+TJ4HHgiFNAdrGn+gECDWeC5eDZ+h8FyPjKXJR9lZImQEMZmaWw7O9
UFVV8YmACqIn3AmhCkEQ3DVug61x7CG0B7LPKa1qPqM/mpvPwijaMBi/8nHwoXgv
w409YBlNAgMBAAECggEADclroPnK5zBgSxx/yQOssxVO3lCd058Q8MBS8l79APEz
5fhKiro0vybQWCSsbCis86YbHtf0YoZEC7y4hKkDEUiq8G5IASKGlQGuoRysNUIv
58ZRJNuUoNDYCtCsgkfs1ytJyVVkyKD7HlmVcOw1OPf/ePaNCQILanX1k26zqVJ8
WrYfwpy4ARgXWnB9x4gw5yTajnCH08AOH2/vezVMMLVge6G6m2qN9AsBk3RxMb35
QR1OfwGskhp/KjBdZPWTFbXEfqgNDMQnv2sYtzAqrrVbzxvEPl5ZxCIC1T08/hZt
KkhtHUe4c3IB8cfxVL0590GByM4savhB8tmh/lWSwQKBgQDb0qxUROYTORIti41s
6AbnZM5Nv50d8gq4NogA+5ONfX0esBffccoXgABFvhjdjRLixIKVVWFvt9fdVR5n
SHF9Pk3XZvB1eZ5MOuHQQ+s4Pwoyzi5jpZpgQeDtrmM9BkkfPaUKj1/NI9uO8HbB
ffz5xy62eSbqRx9hS4eeVCVLsQKBgQDEDu/yt9VaD63yjSPL1k9gUtAKURBFHKwC
jpZOE9B9aSkEoL/ewy4fheOZBJ2GF2jNhvEO8ro4q3z8NQ82ebVOy5Obh/TuKk0c
7cL8+MwtuWRKsf09tLgKSJOh137ra53kzr5Eko3WAwOptlFylug1fZcDb6zNGtsx
4kxllmW6XQKBgArHxCfF0Tq0G84b/+2NW3lRmkR51yy2yAvMsNLLg6r2soIkxKby
n6STZHAHKJUE7B4u4PCN5V9jNrTmDb2m8dngilS7+aLpOfgnExfxnMF/ZfKj5eaB
IpcB5BQD7134xvE/Rq7D5UDcN1JFPK20jgl52TKdsmje4A0XdSkwmzuhAoGAB73/
Q7p2tmPAHr/sFfSUld0vUfj5h4EmWcN/s/2cUheBAynF6eoTPDNxVW2VOuJZxSP7
CPgU2oALI3qE60XLHx1y6sVnqrAI84eAF7VLetLDXx/APFuSmPVcvxtfa7SIO6ze
Xp7a8wSTdHQ6qyfCa7pV6FDUphTVaxbgpXJW+hECgYEAtQTESsRvFdo25hqOAtsH
8phKdRhUPgfF2mkizwjLgk/ob+4lynasqQOBfxblWp75Gxj6wc6k95aa9OPhd184
1BOG7/n5zREfqdgs1Hc3WXNodBxVneq6GrtyN0d9lDZ2bFg6U2oNLugNesg/5vm8
IQz4e7qPXk+ED0GtE4GpTLY=
-----END PRIVATE KEY-----`
const KEY_PUBLIC = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqFofgAtATBfTI3pj9CUY
meCENBAImN6vbYd/iEXNJk/jV1iBgN7S/UKcf4AAzYoLv9kE3OWuXMH4jyId7OXl
TX+Cgka15VBb8PCTbW+JCSEcYQe5LOtSZRizhbvy+d4XhSI+5ZVZ0W9E/QdJuA2m
GJNQtGX67EGnZkjKT0nwEdpOIoD34873E88r/7DNhHoTN3zYV2s9xTREW2uf9tzu
O/YvkyeBx4IhTQHaxp/oBAg1nguXg2fofBcj4ylyUfZWSJkBDGZmlsOzvVBVVfGJ
gAqiJ9wJoQpBENw1boOtcewhtAeyzymtaj6jP5qbz8Io2jAYv/Jx8KF4L8ONPWAZ
TQIDAQAB
-----END PUBLIC KEY-----`

const EN_SECRET_DEFAULT = 'XcdwrFZl7XQex9agRdKvRrtGT4+H0n1wBvwT5BY9jYIpx2MQVFLEw69cQHMBVkjlCNMZi+pGohYLq9UP0SiVpR/FgP5r8/kFnSAQpEDjiuCX8E0q4Exf2uBdQr6l4PtWOtctInIHJfSmDxx/sPCUm1raLnM3CVyhXwqdsc9V0//BVW0iLouqLdit+uJrNv+1HoXA5Aw1oKxXrjp2EIbkRiaq/107KxSw5mHAKraScGwRZT8xT/Z73G84SLU0I8n7E9o2BzKxfhZxVLayWZ5eOLKYX1PMyA/dOVnp7XYw68gtaaX9O1Uh/CyR0lG3AHjbyI5fEezlcu85icdi/qCpOQ=='

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


module.exports = {
  md5Str,
  safeEncode,
  safeDecode
}
