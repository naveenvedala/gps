var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var gpsServer = require('gps-server');

var index = require('./routes/index');
var users = require('./routes/users');
var server = require ('tk102');

server.createServer ({
  port: 8081
});

var app = express();
// gpsServer();

//  handle data processed and returned by gps-server
// eventEmitter.on('gps_data', function(data) {
//   //  preferably, handle data asynchronously, to not affect on gps-server
//   setImmediate(function(data) {
//       console.log('EVENT async "gps_data" : ' + data.length);
//       //  save into DB logic goes here
//       console.log(data);
//       console.log(data.toString());
//   }, data);
// });

server.on ('track', function (gps) {
  console.log(gps)
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(8080, ()=>{
  console.log("Server running")
})
module.exports = app;
