'use strict'

let express = require('express')
let path = require('path')
let bodyParser = require("body-parser")
let mailRoute = require('./contactForm')
let config = require('./config')

let app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(config.nodeServer.staticDir))

app.post('/contactform', mailRoute)

app.listen(config.nodeServer.port)
console.log(`node server listening on port ${config.nodeServer.port}`)