module.exports = (function() {
  const sqlite3 = require('sqlite3')
  const db = new sqlite3.Database('./data/pmi-data.sqlite')

  return {
    getAllMovies: function(res) {
      let result = []

      db.serialize(function () {
        db.all(`
          SELECT DISTINCT
          	Movie.movie_id,
          	Movie.title,
          	Movie.year,
          	Movie.actors,
          	Movie.date_added,
          	Loan.loan_date
          FROM Movie
          LEFT OUTER JOIN Loan
          ON Movie.movie_id = Loan.movie_id;
          `, (err, rows) => {
          result = rows
          res.send(result)
        })
      })
    },

    searchDB: function(res, query) {
      let result = []

      db.serialize(function () {
        db.all(`
          SELECT
          	Movie.movie_id,
          	Movie.title,
          	Movie.year,
          	Movie.actors,
          	Movie.date_added,
          	Loan.loan_date
          FROM Movie
          LEFT OUTER JOIN Loan
          ON Movie.movie_id = Loan.movie_id
          WHERE
            Movie.title LIKE '%${query}%' OR
            Movie.year LIKE '%${query}%' OR
            Movie.actors LIKE '%${query}%';
          `, (err, rows) => {
          result = rows
          res.send(result)
        })
      })
    },

    addMovie: function(data) {
      db.serialize(function () {
        db.run(`
          INSERT INTO "Movie"("title","year","actors","date_added")
          VALUES ("${data.title}","${data.year}","${data.actors}",datetime());
        `)
      })
    },

    deleteMovie: function(id) {
      db.serialize(function () {
        db.run('BEGIN')
        db.run(`
          DELETE FROM Movie
          WHERE movie_id = "${id}";
        `)
        db.run(`
          DELETE FROM Loan
          WHERE movie_id = "${id}";
        `)
        db.run('COMMIT')
      })
    },

    getMovie: function(res, id) {
      db.serialize(function () {
        db.get(`
          SELECT * FROM Movie
          WHERE movie_id = "${id}";
        `, (err, row) => {
          res.send(row)
        })
      })
    },

    updateMovie: function(data) {
      db.serialize(function () {
        db.run(`
          UPDATE Movie
          SET
            title = "${data.title}",
            year = "${data.year}",
            actors = "${data.actors}"
          WHERE movie_id = "${data.movie_id}";
        `)
      })
    },

    getPersons: function(res) {
      db.serialize(function () {
        db.all(`
          SELECT * FROM Person;
        `, (err, rows) => {
          res.send(rows)
        })
      })
    },

    loanOutMovie: function(data) {
      db.serialize(function () {
        db.run(`
          INSERT INTO Loan("movie_id","person_id","loan_date")
          VALUES ("${data.movie_id}","${data.person_id}",date());
        `)
      })
    },

    returnMovie: function(id) {
      db.serialize(function () {
        db.run(`
          DELETE FROM Loan
          WHERE movie_id = "${id}"
        `)
      })
    },

    getActiveLoans: function(res) {
      db.serialize(function () {
        db.all(`
          SELECT
          	Movie.title,
          	Person.name
          FROM Loan
          INNER JOIN Movie ON Movie.movie_id = Loan.movie_id
          INNER JOIN Person ON Person.person_id = Loan.person_id;
        `, (err, rows) => {
          res.send(rows)
        })
      })
    }

  }
})()
