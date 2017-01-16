(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

module.exports = function () {

  /*
   * Function to build and render table with result from data.
   */
  function buildTable(data) {
    var tBody = document.querySelector('tbody');
    tBody.innerHTML = "";
    var tableContent = "";

    // Show availability.
    data.forEach(function (element) {
      // If there is a loan date, movie is unavailable.
      var availabliltyString = "";
      if (element.loan_date) {
        availabliltyString = "<span class=\"glyphicon glyphicon-share text-danger\" aria-hidden=\"true\" title=\"Available\"></span>";
      } else availabliltyString = "<span class=\"glyphicon glyphicon-check text-success\" aria-hidden=\"true\" title=\"Available\"></span>";

      // Remove time from date.
      var date = element.date_added.substring(0, 10);

      var tableRow = "\n      <tr id=\"" + element.movie_id + "\">\n        <td>\n          " + availabliltyString + "\n        </td>\n        <td>" + element.title + "</td>\n        <td>" + element.year + "</td>\n        <td>" + date + "</td>\n        <td>" + element.actors + "</td>\n        <td>\n          <div class=\"btn-group\" role=\"group\" aria-label=\"...\">\n            <button type=\"button\" class=\"btn btn-default\" aria-label=\"Left Align\" title=\"Return Movie\" btn-type=\"btnReturnMovie\" data-id=\"" + element.movie_id + "\">\n              <span class=\"glyphicon glyphicon-repeat\" aria-hidden=\"true\"></span>\n            </button>\n            <button type=\"button\" class=\"btn btn-default\" aria-label=\"Left Align\" title=\"Loan out\" data-toggle=\"modal\"  data-target=\"#modalAddLoan\" btn-type=\"btnLoanMovie\" data-id=\"" + element.movie_id + "\">\n              <span class=\"glyphicon glyphicon-share\" aria-hidden=\"true\"></span>\n            </button>\n            <button type=\"button\" class=\"btn btn-default\" aria-label=\"Left Align\" title=\"Edit Information\" data-toggle=\"modal\"  data-target=\"#modalEditMovie\" btn-type=\"btnEditMovie\" data-id=\"" + element.movie_id + "\">\n              <span class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\"></span>\n            </button>\n            <button type=\"button\" class=\"btn btn-default\" aria-label=\"Left Align\" title=\"Delete movie\" btn-type=\"btnDeleteMovie\" data-id=\"" + element.movie_id + "\">\n              <span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span>\n            </button>\n          </div>\n        </td>\n      </tr>";

      tableContent += tableRow;
      tBody.innerHTML += tableRow;
    });

    tBody.innerHTML = tableContent;
  }

  function getMovies() {
    fetch('/api/movies', {
      method: 'get'
    }).then(function (res) {
      res.json().then(function (data) {
        buildTable(data);
      });
    }).catch(function (err) {
      console.log('An error occurred!');
    });
  }

  function searchMovies(query) {
    fetch("/api/movies/search?q=" + query, {
      method: 'get'
    }).then(function (res) {
      res.json().then(function (data) {
        buildTable(data);
      });
    }).catch(function (err) {
      console.log('An error occurred!');
    });
  }

  function addMovie(data) {
    fetch("/api/movies/add", {
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    }).then(function () {
      // getMovies()
    }).catch(function (err) {
      console.log('An error occurred!');
    });
  }

  function deleteMovie(id) {
    fetch("/api/movies/delete", {
      method: "delete",
      body: JSON.stringify({ id: id }),
      headers: { "Content-Type": "application/json" }
    }).then(function () {
      // console.log('deteled movie')
    }).catch(function (err) {
      console.log('An error occurred!');
    });
  }

  function getMovie(id, callback) {
    fetch("/api/movie?q=" + id, {
      method: 'get'
    }).then(function (res) {
      res.json().then(function (data) {
        callback(data);
      });
    }).catch(function (err) {
      console.log('An error occurred!');
    });
  }

  function updateMovie(data) {
    fetch("/api/movie/update", {
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    }).then(function () {
      // getMovies()
    }).catch(function (err) {
      console.log('An error occurred!');
    });
  }

  function getPersons(callback) {
    fetch("/api/persons", {
      method: 'get'
    }).then(function (res) {
      res.json().then(function (data) {
        callback(data);
      });
    }).catch(function (err) {
      console.log('An error occurred!');
    });
  }

  function loanOutMovie(data) {
    fetch("/api/movie/loan", {
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    }).then(function () {
      // getMovies()
    }).catch(function (err) {
      console.log('An error occurred!');
    });
  }

  function returnMovie(id) {
    fetch("/api/movie/return?q=" + id, {
      method: 'get'
    }).then(function (res) {
      //
    }).catch(function (err) {
      console.log('An error occurred!');
    });
  }

  function getActiveLoans(callback) {
    fetch("/api/movies/onloan", {
      method: 'get'
    }).then(function (res) {
      console.log('test');
      res.json().then(function (data) {
        callback(data);
      });
    }).catch(function (err) {
      console.log('An error occurred!');
    });
  }

  return {
    getMovies: getMovies,
    searchMovies: searchMovies,
    addMovie: addMovie,
    deleteMovie: deleteMovie,
    getMovie: getMovie,
    updateMovie: updateMovie,
    getPersons: getPersons,
    loanOutMovie: loanOutMovie,
    returnMovie: returnMovie,
    getActiveLoans: getActiveLoans
  };
}();

},{}],2:[function(require,module,exports){
'use strict';

var eventHandler = require('./eventhandler.js');

},{"./eventhandler.js":3}],3:[function(require,module,exports){
'use strict';

module.exports = function () {
  var api = require('./api-calls.js');

  // Fill table page loaded.
  api.getMovies();

  // Table pagination.
  // const prevPage = document.querySelector('#prevPage')
  // const nextPage = document.querySelector('#nextPage')
  // prevPage.addEventListener('click', function() {console.log('prev')}, false)
  // nextPage.addEventListener('click', function() {console.log('next')}, false)

  // Movie search.
  var searchInput = document.querySelector('#searchInput');
  searchInput.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;

    console.log(key);

    if (key === 13) {
      api.searchMovies(searchInput.value);
    }
  });
  var searchButton = document.querySelector('#searchButton');
  searchButton.addEventListener('click', function () {
    api.searchMovies(searchInput.value);
  });

  // Clear search
  var btnClearSearch = document.querySelector('#btnClearSearch');
  btnClearSearch.addEventListener('click', function () {
    searchInput.value = "";
    api.getMovies();
  });

  // View loans
  var viewLoans = document.querySelector('#viewLoans');
  viewLoans.addEventListener('click', function () {
    var loanListContainer = document.querySelector('#loanListContainer');
    var loans = "";
    api.getActiveLoans(function (data) {
      console.log(data);
      data.forEach(function (obj) {
        loans += '<div>' + obj.title + ' => ' + obj.name + '</div>';
      });

      loanListContainer.innerHTML = loans;
    });
  });

  // Add movies
  var btnAddMovie = document.querySelector('#btnAddMovie');
  btnAddMovie.addEventListener('click', function () {
    var mtitle = document.querySelector('#inputMovieTitle');
    var myear = document.querySelector('#inputMovieYear');
    var mactors = document.querySelector('#inputMovieActors');
    var data = {
      title: mtitle.value,
      year: myear.value,
      actors: mactors.value
    };
    api.addMovie(data);

    mtitle.value = "";
    myear.value = "";
    mactors.value = "";

    api.getMovies();
  });

  // Update movie
  var tempMovieID = undefined;
  var btnUpdateMovie = document.querySelector('#btnUpdateMovie');
  btnUpdateMovie.addEventListener('click', function () {
    if (tempMovieID !== undefined) {
      var data = {
        movie_id: tempMovieID,
        title: document.querySelector('#inputEditMovieTitle').value,
        year: document.querySelector('#inputEditMovieYear').value,
        actors: document.querySelector('#inputEditMovieActors').value
      };
      api.updateMovie(data);
      api.getMovies();
      tempMovieID = undefined;
    }
  });

  var personsDropdown = document.querySelector('#personsDropdown');
  personsDropdown.addEventListener('click', function (e) {
    // console.log(e.target.getAttribute("person-id"))
    // console.log(e.target.getAttribute("movie-id"))
    api.loanOutMovie({
      movie_id: tempMovieID,
      person_id: e.target.getAttribute("person-id"),
      name: e.target.getAttribute("person-name")
    });

    api.getMovies();
  });

  // Table events
  // Delete movie
  var table = document.querySelector('#movieTable');
  movieTable.addEventListener('click', function (e) {
    var id = e.target.getAttribute("data-id");
    var btnType = e.target.getAttribute("btn-type");
    if (btnType === "btnDeleteMovie") {
      if (id !== undefined) {
        api.deleteMovie(id);
        api.getMovies();
      }
    } else if (btnType === "btnEditMovie") {
      if (id !== undefined) {
        tempMovieID = id;
        api.getMovie(id, function (data) {
          var title = document.querySelector('#inputEditMovieTitle');
          var year = document.querySelector('#inputEditMovieYear');
          var actors = document.querySelector('#inputEditMovieActors');

          title.value = data.title;
          year.value = data.year;
          actors.value = data.actors;
        });
      }
    } else if (btnType === "btnReturnMovie") {
      if (id !== undefined) {
        api.returnMovie(id);
        api.getMovies();
      }
    } else if (btnType === "btnLoanMovie") {
      if (id !== undefined) {
        // <li><a href="#">Action</a></li>
        tempMovieID = id;

        api.getPersons(function (data) {
          var listItems = "";
          data.forEach(function (element) {
            listItems += '<li><a href="#" data-dismiss="modal" person-id="' + element.person_id + '"\n            person-name="' + element.name + '" movie-id="' + tempMovieID + '">' + element.name + '</a></li>';
          });

          personsDropdown.innerHTML = listItems;
        });

        api.loanMovie(id);

        api.getMovies();
      }
    }
  });

  // Loan out movie

  // Return movie
}();

},{"./api-calls.js":1}]},{},[2]);
