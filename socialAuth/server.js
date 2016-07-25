'use strict'

let express  = require('express')
let	mongoose = require('mongoose')
let	passport = require('passport')
let	flash = require('connect-flash')
let	http = require('http')
let	cookieParser = require('cookie-parser')
let	bodyParser = require('body-parser')
let	path = require('path')
let	session = require('express-session')

let app = express()

const port = process.env.PORT || 3000
const configDB = 'mongodb://localhost/socialdb'

mongoose.connect(configDB)

require('./config/passport')(passport) // pass passport object to auth functions

app.use(cookieParser()) // cookies for auth
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({ 
  name: 'socialAuthSessions',
	secret: 'fghwj3454wegghndf435gtr5h',
	resave: true,
	saveUninitialized: true,
	cookie: {
		expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
	}
}))

app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions
app.use(flash()) // use for flash messages stored in session

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// load routes and pass in app and configured passport
require('./app/routes.js')(app, passport)

// create server object
let server = http.createServer(app)
// booting up server function
let boot = function() {
	server.listen(port, function() {
		console.log('Express server listening on port ', port)
	})
}
// shutdown server function
let shutdown = function() {
	server.close()
}

// if main module then start server else pass to exports
if(require.main === module){
	boot()
} else {
	console.log('Running socialAuth app as module')
	module.exports = {
		boot: boot,
		shutdown: shutdown,
		port: port,
		server: server,
		app: app
	}
}
