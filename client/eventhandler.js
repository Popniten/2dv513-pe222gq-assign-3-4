module.exports = (function() {
  const api = require('./api-calls.js')

  // Fill table page loaded.
  api.getMovies()

  // Table pagination.
  // const prevPage = document.querySelector('#prevPage')
  // const nextPage = document.querySelector('#nextPage')
  // prevPage.addEventListener('click', function() {console.log('prev')}, false)
  // nextPage.addEventListener('click', function() {console.log('next')}, false)

  // Movie search.
  const searchInput = document.querySelector('#searchInput')
  searchInput.addEventListener('keypress', function(e) {
    let key = e.which || e.keyCode

    console.log(key)

    if (key === 13) {
      api.searchMovies(searchInput.value)
    }
  })
  const searchButton = document.querySelector('#searchButton')
  searchButton.addEventListener('click', function() {
    api.searchMovies(searchInput.value)
  })

  // Clear search
  const btnClearSearch = document.querySelector('#btnClearSearch')
  btnClearSearch.addEventListener('click', function() {
    searchInput.value = ""
    api.getMovies()
  })

  // View loans
  const viewLoans = document.querySelector('#viewLoans')
  viewLoans.addEventListener('click', function() {
    const loanListContainer = document.querySelector('#loanListContainer')
    let loans = ""
    api.getActiveLoans(function(data) {
      console.log(data);
      data.forEach(function(obj) {
        loans += `<div>${obj.title} => ${obj.name}</div>`
      })

      loanListContainer.innerHTML = loans
    })
  })

  // Add movies
  const btnAddMovie = document.querySelector('#btnAddMovie')
  btnAddMovie.addEventListener('click', function() {
    let mtitle = document.querySelector('#inputMovieTitle')
    let myear = document.querySelector('#inputMovieYear')
    let mactors = document.querySelector('#inputMovieActors')
    let data = {
      title: mtitle.value,
      year: myear.value,
      actors: mactors.value
    }
    api.addMovie(data)

    mtitle.value = ""
    myear.value = ""
    mactors.value = ""

    api.getMovies()
  })

  // Update movie
  let tempMovieID = undefined
  const btnUpdateMovie = document.querySelector('#btnUpdateMovie')
  btnUpdateMovie.addEventListener('click', function() {
    if (tempMovieID !== undefined) {
      let data = {
        movie_id: tempMovieID,
        title: document.querySelector('#inputEditMovieTitle').value,
        year: document.querySelector('#inputEditMovieYear').value,
        actors: document.querySelector('#inputEditMovieActors').value
      }
      api.updateMovie(data)
      api.getMovies()
      tempMovieID = undefined
    }
  })

  let personsDropdown = document.querySelector('#personsDropdown')
  personsDropdown.addEventListener('click', function(e) {
    // console.log(e.target.getAttribute("person-id"))
    // console.log(e.target.getAttribute("movie-id"))
    api.loanOutMovie({
      movie_id: tempMovieID,
      person_id: e.target.getAttribute("person-id"),
      name: e.target.getAttribute("person-name")
    })

    api.getMovies()
  })

  // Table events
  // Delete movie
  const table = document.querySelector('#movieTable')
  movieTable.addEventListener('click', function(e) {
    let id = e.target.getAttribute("data-id")
    let btnType = e.target.getAttribute("btn-type")
    if (btnType === "btnDeleteMovie") {
      if (id !== undefined) {
        api.deleteMovie(id)
        api.getMovies()
      }
    } else if (btnType === "btnEditMovie") {
      if (id !== undefined) {
        tempMovieID = id
        api.getMovie(id, function(data) {
          let title = document.querySelector('#inputEditMovieTitle')
          let year = document.querySelector('#inputEditMovieYear')
          let actors = document.querySelector('#inputEditMovieActors')

          title.value = data.title
          year.value = data.year
          actors.value = data.actors
        })
      }
    } else if (btnType === "btnReturnMovie") {
      if (id !== undefined) {
        api.returnMovie(id)
        api.getMovies()
      }
    } else if (btnType === "btnLoanMovie") {
      if (id !== undefined) {
        // <li><a href="#">Action</a></li>
        tempMovieID = id


        api.getPersons(function(data) {
          let listItems = ""
          data.forEach(function(element) {
            listItems += `<li><a href="#" data-dismiss="modal" person-id="${element.person_id}"
            person-name="${element.name}" movie-id="${tempMovieID}">${element.name}</a></li>`
          })

          personsDropdown.innerHTML = listItems
        })

        api.loanMovie(id)

        api.getMovies()
      }
    }
  })

  // Loan out movie

  // Return movie

})()
