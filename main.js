// Choose database.
const USE_SQL = true

// // Dependecies and imports.
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const api = require('./server/rest-api.js')(USE_SQL)
const routes = require('./server/client-routes.js')
const app = express()

// Set up view engine, static files and middlewares.
app.use(express.static(__dirname + '/static'))
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', '.hbs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes and API.
app.use('/api', api)
app.use('/', routes)

// Launch server.
app.listen(8000, () => {
    console.log('Server running on \'http://localhost:8000\'...')
})
