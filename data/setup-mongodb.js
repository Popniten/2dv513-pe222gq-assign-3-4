const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/pmi-data', (err, db) => {
  if(err) { return console.dir(err); }

  let collectionMovies = db.collection('Movie')
  collectionMovies.createIndex({'title': 'text', 'year': 'text', 'actors': 'text'})

  collectionMovies.insert({
    title: 'Iron Man',
    year: '2008',
    actors: "Robert Downey Jr., Jon Favreau, Gwyneth Paltrow",
    date_added: "2017-01-15 19:32:55",
    loan_date: null,
    name: null
  })

  collectionMovies.insert({
    title: 'Thor',
    year: '2011',
    actors: "Chris Hemsworth, Tom Hiddleston, Anthony Hopkins",
    date_added: "2017-01-15 19:36:33",
    loan_date: null,
    name: null
  })

  collectionMovies.insert({
    title: 'The Avengers',
    year: '2012',
    actors: "Robert Downey Jr., Chris Evans, Mark Ruffalo",
    date_added: "2017-01-15 19:32:23",
    loan_date: null,
    name: null
  })

  collectionMovies.insert({
    title: 'The Amazing Spider-Man',
    year: '2012',
    actors: "Andrew Garfield, Emma Stone, Rhys Ifans",
    date_added: "2017-01-15 19:33:42",
    loan_date: null,
    name: null
  })

  collectionMovies.insert({
    title: 'The Incredible Hulk',
    year: '2008',
    actors: "Edward Norton, Liv Tyler, Tim Roth",
    date_added: "2017-01-15 19:34:28",
    loan_date: '2017-01-15',
    name: 'Simon'
  })

  collectionMovies.insert({
    title: 'Captain America: The Winter Soldier',
    year: '2014',
    actors: "Chris Evans, Sebastian Stan, Scarlett Johansson",
    date_added: "2017-01-15 19:38:10",
    loan_date: null,
    name: null
  })

  let collectionPersons = db.collection('Person')

  collectionPersons.insert({
    name: 'Simon'
  })

  collectionPersons.insert({
    name: 'Emma'
  })

  collectionPersons.insert({
    name: 'Oscar'
  })

  collectionPersons.insert({
    name: 'Jacob'
  })

})
