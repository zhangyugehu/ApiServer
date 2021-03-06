// routes/index.js
const noteRoutes = require('./note_routes')
const accountingRoutes = require('./accounting_routes')
const userRoutes = require('./user_routes')
module.exports = function(app, db) {
  noteRoutes(app, db)
  accountingRoutes(app, db)
  userRoutes(app, db)
  // Other route groups could go here, in the future
};