module.exports = function(USE_SQL) {
    var express = require("express");
    var router = express.Router();
    const db = require('../data/database.js')(USE_SQL)

    router.route('/movies')
    .get((req, res) => {
      db.getAllMovies(res)
    })

    router.route('/movies/search')
    .get((req, res) => {
      db.searchDB(res, req.query.q)
    })

    router.route('/movies/add')
    .post((req, res) => {
      db.addMovie(req.body)
    })

    router.route('/movies/delete')
    .delete((req, res) => {
      // console.log(req.body)
      db.deleteMovie(req.body.id)
    })

    router.route('/movie')
    .get((req, res) => {
      // console.log(req.query.q)
      db.getMovie(res, req.query.q)
    })

    router.route('/movie/update')
    .post((req, res) => {
      db.updateMovie(req.body)
    })

    router.route('/persons')
    .get((req, res) => {
      db.getPersons(res)
    })

    router.route('/movie/loan')
    .post((req, res) => {
      db.loanOutMovie(req.body)
    })

    router.route('/movie/return')
    .get((req, res) => {
      db.returnMovie(req.query.q)
    })

    router.route('/movies/onloan')
    .get((req, res) => {
      console.log('test');
      db.getActiveLoans(res)
    })

    return router
}
