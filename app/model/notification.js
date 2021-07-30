function Notification(title, message, timestamp, username) {
  this.title = title
  this.message = message
  this.timestamp = timestamp
  this.username = username

}

function createNotification(body, username) {
  if (!body) {
    return 'body null'
  }
  const { title, message, timestamp } = body
  if (!title) {
    return 'title null'
  } else if (!message) {
    return 'message null'
  } else {
    return new Notification(title, message, timestamp, username)
  }
}

module.exports = {
  Notification, createNotification
}