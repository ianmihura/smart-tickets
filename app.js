// Required External Modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// App Variables
var app = express();
var router = express.Router();

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

// Routes
app.use('/', router.get('/', (req, res) => res.render('index')));
app.use('/create', router.get('/', (req, res) => res.render('create')));
app.use('/edit', router.get('/', (req, res) => res.render('edit')));
app.use('/checkin', router.get('/', (req, res) => res.render('checkin')));
app.use('/buy', router.get('/', (req, res) => res.render('buy')));
app.use('/refund', router.get('/', (req, res) => res.render('refund')));

// Server
var mainService = require('./service/main');
var eventService = require('./service/event');
var attendeeService = require('./service/attendee');

app.get('/api/txstatebyid/:txid', mainService.GetTxStateById);
app.get('/api/event/', eventService.GetEvents);
app.get('/api/event/:eventId', eventService.GetEvent);
app.get('/api/event/data/:eventId', eventService.GetEventData);
app.get('/api/event/tickets/:eventId', eventService.GetEventTickets);
app.get('/api/event/canceled/:eventId', eventService.GetCanceled);
app.get('/api/attendee/:attendee/:personalId', attendeeService.GetAttendee);
app.get('/api/attendee/:eventId/:attendee/:personalId', attendeeService.GetEventAttendee);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
