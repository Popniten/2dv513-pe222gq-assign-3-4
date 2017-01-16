module.exports = (function() {
  const sqlite3 = require('sqlite3')
  const q = {
    createTable: {
      movie: `CREATE TABLE IF NOT EXISTS Movie (
        movie_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
        title VARCHAR(255),
        year INTEGER,
        actors VARCHAR(255),
        date_added DATETIME
      );`,
      person: `CREATE TABLE IF NOT EXISTS Person (
        person_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
        name VARCHAR(70)
      );`,
      loan: `CREATE TABLE IF NOT EXISTS Loan (
        movie_id INTEGER,
        person_id INTEGER,
        loan_date DATE,
        PRIMARY KEY (movie_id, person_id)
      );`
    }
  }

  const db = new sqlite3.Database('./data/pmi-data.sqlite')

  db.serialize(function () {
    db.run('BEGIN TRANSACTION;')
    db.run(q.createTable.movie)
    db.run(q.createTable.person)
    db.run(q.createTable.loan)
    db.run('COMMIT')
    db.close();
  })
})();
