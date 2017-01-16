module.exports = (function() {
  const MongoClient = require('mongodb').MongoClient
  const ObjectId = require('mongodb').ObjectId
  const dbHost = 'mongodb://localhost:27017/pmi-data'

  return {
    getAllMovies: function(res) {
      MongoClient.connect(dbHost, (err, db) => {
        if(err) { return console.log(err); }

        let movies = db.collection('Movie')
        let dataResult = []

        movies.find().toArray(function(err, movieItems) {
          movieItems.forEach(function(obj) {
            let row = {
              movie_id: obj._id,
              title: obj.title,
              year: obj.year,
              actors: obj.actors,
              date_added: obj.date_added,
              loan_date: obj.loan_date,
              name: obj.name
            }

            dataResult.push(row)
          })

          res.send(dataResult)
        })
      })
    },

    searchDB: function(res, query) {
      MongoClient.connect(dbHost, (err, db) => {
        if(err) { return console.log(err); }

        let movies = db.collection('Movie')
        let dataResult = []

        movies.find({'$text': {'$search': query}})
        .toArray(function(err, movieItems) {
          movieItems.forEach(function(obj) {
            let row = {
              movie_id: obj._id,
              title: obj.title,
              year: obj.year,
              actors: obj.actors,
              date_added: obj.date_added,
              loan_date: obj.loan_date,
              name: obj.name
            }

            dataResult.push(row)
          })

          res.send(dataResult)
        })
      })
    },

    addMovie: function(data) {
      MongoClient.connect(dbHost, (err, db) => {
        if(err) { return console.log(err); }

        let movies = db.collection('Movie')
        let dataResult = []

        let doc = {
          title: data.title,
          year: data.year,
          actors: data.actors,
          date_added: new Date(),
          loan_date: null,
          name: null
        }

        movies.insertMany([doc], function(err, result) {
          if(err) { return console.log(err); }
        })

      })
    },

    deleteMovie: function(id) {
      MongoClient.connect(dbHost, (err, db) => {
        if(err) { return console.log(err); }

        let movies = db.collection('Movie')

        movies.remove({_id: new ObjectId(id)}, function(err, result) {
          if(err) { return console.log(err); }
        })

      })
    },

    getMovie: function(res, id) {
      MongoClient.connect(dbHost, (err, db) => {
        if(err) { return console.log(err); }

        let movies = db.collection('Movie')

        movies.findOne({'_id': new ObjectId(id)}, function(err, result) {
          if(err) { return console.log(err); }

          res.send(result)
        })

      })
    },

    updateMovie: function(data) {
      MongoClient.connect(dbHost, (err, db) => {
        if(err) { return console.log(err); }

        let movies = db.collection('Movie')
        movies.update(
          {'_id': new ObjectId(data.movie_id)},
          {'$set': {
            'title': data.title,
            'year': data.year,
            'actors': data.actors
          }}, function(err, result) {
          if(err) { return console.log(err); }
        })

      })
    },

    getPersons: function(res) {
      MongoClient.connect(dbHost, (err, db) => {
        if(err) { return console.log(err); }

        let persons = db.collection('Person')

        persons.find().toArray(function(err, personItems) {
          if(err) { return console.log(err); }

          let result = []
          personItems.forEach(function(person) {
            result.push(person)
          })

          res.send(result)
        })

      })
    },

    loanOutMovie: function(data) {
      MongoClient.connect(dbHost, (err, db) => {
        if(err) { return console.log(err); }

        let movies = db.collection('Movie')
        movies.update(
          {'_id': new ObjectId(data.movie_id)},
          {'$set': {
            'loan_date': new Date(),
            'name': data.name
          }}, function(err, result) {
          if(err) { return console.log(err); }
        })

      })
    },

    returnMovie: function(id) {
      MongoClient.connect(dbHost, (err, db) => {
        if(err) { return console.log(err); }

        let movies = db.collection('Movie')
        movies.update(
          {'_id': new ObjectId(id)},
          {'$set': {
            'loan_date': null,
            'name': null
          }}, function(err, result) {
          if(err) { return console.log(err); }
        })

      })
    },

    getActiveLoans: function(res) {
      MongoClient.connect(dbHost, (err, db) => {
        if(err) { return console.log(err); }

        let movies = db.collection('Movie')
        let dataResult = []

        movies.find({'loan_date': {'$ne': null}})
        .toArray(function(err, movieItems) {
          movieItems.forEach(function(obj) {
            let row = {
              movie_id: obj._id,
              title: obj.title,
              year: obj.year,
              actors: obj.actors,
              date_added: obj.date_added,
              loan_date: obj.loan_date,
              name: obj.name
            }

            console.log(row);
            dataResult.push(row)
          })

          res.send(dataResult)
        })
      })
    }

  }
})()
