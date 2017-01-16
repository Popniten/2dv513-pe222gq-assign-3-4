module.exports = function(USE_SQL) {
  let database = null

  if (USE_SQL) {
    database = require('./sqlite.js')
  } else {
    database = require('./mongodb.js')
  }

  return database
};
