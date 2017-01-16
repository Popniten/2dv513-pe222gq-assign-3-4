module.exports = (function() {

  /*
   * Function to build and render table with result from data.
   */
  function buildTable(data) {
    let tBody = document.querySelector('tbody')
    tBody.innerHTML = ""
    let tableContent = ""

    // Show availability.
    data.forEach(function(element) {
      // If there is a loan date, movie is unavailable.
      let availabliltyString = ""
      if(element.loan_date) {
        availabliltyString = `<span class="glyphicon glyphicon-share text-danger" aria-hidden="true" title="Available"></span>`
      } else (
        availabliltyString = `<span class="glyphicon glyphicon-check text-success" aria-hidden="true" title="Available"></span>`
      )

      // Remove time from date.
      let date = element.date_added.substring(0, 10)

      let tableRow = `
      <tr id="${element.movie_id}">
        <td>
          ${availabliltyString}
        </td>
        <td>${element.title}</td>
        <td>${element.year}</td>
        <td>${date}</td>
        <td>${element.actors}</td>
        <td>
          <div class="btn-group" role="group" aria-label="...">
            <button type="button" class="btn btn-default" aria-label="Left Align" title="Return Movie" btn-type="btnReturnMovie" data-id="${element.movie_id}">
              <span class="glyphicon glyphicon-repeat" aria-hidden="true"></span>
            </button>
            <button type="button" class="btn btn-default" aria-label="Left Align" title="Loan out" data-toggle="modal"  data-target="#modalAddLoan" btn-type="btnLoanMovie" data-id="${element.movie_id}">
              <span class="glyphicon glyphicon-share" aria-hidden="true"></span>
            </button>
            <button type="button" class="btn btn-default" aria-label="Left Align" title="Edit Information" data-toggle="modal"  data-target="#modalEditMovie" btn-type="btnEditMovie" data-id="${element.movie_id}">
              <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
            </button>
            <button type="button" class="btn btn-default" aria-label="Left Align" title="Delete movie" btn-type="btnDeleteMovie" data-id="${element.movie_id}">
              <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
            </button>
          </div>
        </td>
      </tr>`

      tableContent += tableRow
      tBody.innerHTML += tableRow
    })

    tBody.innerHTML = tableContent
  }

  function getMovies() {
    fetch('/api/movies', {
      method: 'get'
    }).then(function(res) {
      res.json().then(function(data) {
        buildTable(data)
      })
    }).catch(function(err) {
      console.log('An error occurred!')
    })
  }

  function searchMovies(query) {
    fetch(`/api/movies/search?q=${query}`, {
      method: 'get'
    }).then(function(res) {
      res.json().then(function(data) {
        buildTable(data)
      })
    }).catch(function(err) {
      console.log('An error occurred!')
    })
  }

  function addMovie(data) {
    fetch(`/api/movies/add`, {
      method: "post",
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json"}
    }).then(function() {
      // getMovies()
    }).catch(function(err) {
      console.log('An error occurred!')
    })
  }

  function deleteMovie(id) {
    fetch(`/api/movies/delete`, {
      method: "delete",
      body: JSON.stringify({id: id}),
      headers: {"Content-Type": "application/json"}
    }).then(function() {
      // console.log('deteled movie')
    }).catch(function(err) {
      console.log('An error occurred!')
    })
  }

  function getMovie(id, callback) {
    fetch(`/api/movie?q=${id}`, {
      method: 'get'
    }).then(function(res) {
      res.json().then(function(data) {
        callback(data)
      })
    }).catch(function(err) {
      console.log('An error occurred!')
    })
  }

  function updateMovie(data) {
    fetch(`/api/movie/update`, {
      method: "post",
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json"}
    }).then(function() {
      // getMovies()
    }).catch(function(err) {
      console.log('An error occurred!')
    })
  }

  function getPersons(callback) {
    fetch(`/api/persons`, {
      method: 'get'
    }).then(function(res) {
      res.json().then(function(data) {
        callback(data)
      })
    }).catch(function(err) {
      console.log('An error occurred!')
    })
  }

  function loanOutMovie(data) {
    fetch(`/api/movie/loan`, {
      method: "post",
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json"}
    }).then(function() {
      // getMovies()
    }).catch(function(err) {
      console.log('An error occurred!')
    })
  }

  function returnMovie(id) {
    fetch(`/api/movie/return?q=${id}`, {
      method: 'get'
    }).then(function(res) {
      //
    }).catch(function(err) {
      console.log('An error occurred!')
    })
  }

  function getActiveLoans(callback) {
    fetch(`/api/movies/onloan`, {
      method: 'get'
    }).then(function(res) {
      console.log('test');
      res.json().then(function(data) {
        callback(data)
      })
    }).catch(function(err) {
      console.log('An error occurred!')
    })
  }

  return {
    getMovies,
    searchMovies,
    addMovie,
    deleteMovie,
    getMovie,
    updateMovie,
    getPersons,
    loanOutMovie,
    returnMovie,
    getActiveLoans
  }

})()
