'use strict';

let express = require('express');
let path = require('path');
let http = require('http');
let bodyParser = require('body-parser');

let socialServer = require('./socialAuth/server');
let gridgenerator = require('./GridGenerator/server');
let mailRoute = require('./contactForm');

let app = express();
const port = process.env.PORT || 3000;

app.set('trust proxy', true);
app.set('x-powered-by', false);
app.set('view cache', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/socialAuth/', socialServer.app);
app.use('/api/gridgenerator/', gridgenerator.app);

app.post('/api/contactform', mailRoute);

app.get('/api', function(req, res ,next) {
  res.send(req.ip);
});

// if nothing found then 404 redirect to index page
app.all('*', function (err, req, res, next) {
  res.redirect(404, 'https://lmerza.com');
});

// create server object
let server = http.createServer(app);
// booting up server function
let boot = function() {
  server.listen(port, function() {
    console.log('Express server listening on port', port);
  })
}
// shutdown server function
let shutdown = function() {
  server.close();
}

// if main module then start server else pass to exports
if(require.main === module){
  boot();
} else {
  console.log('Running app as module')
  module.exports = {
    boot: boot,
    shutdown: shutdown,
    port: port,
    server: server,
    app: app
  }
}
