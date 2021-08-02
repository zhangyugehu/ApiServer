// routes/note_routes.js

const { DBTables } = require('../../config/db')
const TokenHelper = require('../util/token')
const { Tips, Code, createMessage } = require('../model/response')
const { Notification, createNotification, createNotificationFilter } = require('../model/notification');
const e = require('express');

const LIMIT_DEFAULT = 10;

const PATH = '/notification'

module.exports = function(app, db) {

  app.get(PATH, async (req, res) => await TokenHelper.validateToken(db, req, res, async (user) => {
    const { username } = user
    if (!username) {
      res.send(Tips[Code.USER_INVALIDATE])
      return
    }
    const limit = parseInt(req.query.limit || LIMIT_DEFAULT);
    const cursor = db.collection(DBTables.NOTIFICATION).find({ username }).sort({ timestamp: -1 }).limit(limit)
    const list = [];
    while(await cursor.hasNext()) {
      const item = await cursor.next();
      list.push(item);
    }
    res.send(list)
  }))
  
  app.post(PATH, async (req, res) => await TokenHelper.validateToken(db, req, res, async (user) => {
    const { username } = user
    if (!username) {
      res.send(Tips[Code.USER_INVALIDATE])
      return
    }
    const notificationOrError = createNotification(req.body, username)
    if (typeof notificationOrError === 'string') {
      res.send(createMessage(notificationOrError, Code.PARAMS_ERR))
      return
    }
    console.log(`token ${!!req.headers.token} | username ${username}`)
    const cursor = db.collection(DBTables.NOTIFICATION)
      .find(createNotificationFilter(notificationOrError))
      const exists = await cursor.hasNext()
      if (exists) {
        // 去重
        res.send(Tips[Code.RECORD_EXISTS])
      } else {
        db.collection(DBTables.NOTIFICATION).insert(notificationOrError, (err, rst) => res.send(Tips[Code.SUCCESS]))
      }
  }))

  app.get(`${PATH}/simple`, async (req, res) => await TokenHelper.validateToken(db, req, res, async (user) => {
    const { username } = user
    if (!username) {
      res.send(Tips[Code.USER_INVALIDATE])
      return
    }
    const limit = parseInt(req.query.limit || LIMIT_DEFAULT);
    const cursor = db.collection(DBTables.NOTIFICATION).find({ username }).sort({ timestamp: -1 }).limit(limit)
    // const list = [];
    let html = '<!DOCTYPE html>'
    html += '<html xmlns="http://www.w3.org/1999/xhtml">'
    html += '<head><meta http-equiv="Content-Type" content="text/html;charset=utf-8"></head>'
    html += '<div>'
    let counter = 0;
    while(await cursor.hasNext()) {
      const item = await cursor.next();
      if (!item) continue
      if (counter < 5) {
        html += '<div style="color: grey">' + item.desp + '<div><h1 style="color: black">' + item.text + '</h1>'
      } else {
        html += '<div style="color: grey">' + item.desp + '<div><p style="color: black">' + item.text + '</p>'
      }
      counter ++;
    }
    html += '</div>'
    html += '</html>'
    res.send(html)
    // res.send(list)
  }))

  app.delete(PATH, async (req, res) => await TokenHelper.validateToken(db, req, res, async () => {
    db.collection(DBTables.NOTIFICATION).remove({})
    res.send(Tips[Code.SUCCESS])
  }))
};
