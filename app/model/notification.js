function Notification(title, message, timestamp, username, phone) {
  this.title = title
  this.message = message
  this.timestamp = timestamp
  this.username = username
  this.phone = phone
}

function createNotification(body, username) {
  if (!body) {
    return 'body null'
  }
  const { title, message, timestamp, phone } = body
  if (!timestamp) {
    return 'timestamp null'
  } else if (!title) {
    return 'title null'
  } else if (!message) {
    return 'message null'
  } else {
    return new Notification(title, message, timestamp, username, phone)
  }
}

function createNotificationFilter(notification) {
  return { timestamp: notification.timestamp }
}

module.exports = {
  Notification, createNotification, createNotificationFilter
}