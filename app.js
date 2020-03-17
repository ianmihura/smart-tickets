// Required External Modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// App Variables
var app = express();

// App Configuration
// View engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes Definitions
var indexRouter = require('./routes/index');
// Producer
var createRouter = require('./routes/create');
var editRouter = require('./routes/edit');
var checkinRouter = require('./routes/checkin');
// Attendee
var buyRouter = require('./routes/buy');
var refundRouter = require('./routes/refund');

// Server Activation
app.use('/', indexRouter);
app.use('/create', createRouter);
app.use('/edit', editRouter);
app.use('/buy', buyRouter);
app.use('/checkin', checkinRouter);
app.use('/refund', refundRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
