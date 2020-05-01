// Required External Modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

// App Variables
var app = express();
var router = express.Router();

// App Configuration
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Routes
app.use('/', router.get('/', (req, res) => res.render('index')));
app.use('/create', router.get('/create', (req, res) => res.render('create')));
app.use('/edit', router.get('/edit', (req, res) => res.render('edit')));
app.use('/checkin', router.get('/checkin', (req, res) => res.render('checkin')));
app.use('/buy', router.get('/buy', (req, res) => res.render('buy')));
app.use('/tickets', router.get('/tickets', (req, res) => res.render('tickets')));
app.use('/txid', router.get('/txid', (req, res) => res.render('txid')));
app.use('/help', router.get('/help', (req, res) => res.render('help')));

// Server
var mainService = require('./service/main');
var eventService = require('./service/event');
var attendeeService = require('./service/attendee');
var checkinService = require('./service/checkin');
// API
app.get('/api/txstatebyid/:txid', mainService.GetTxStateById);
app.get('/api/txbyid/:txid', mainService.GetTxById);
app.get('/api/wallet/:address', mainService.GetBalance);

app.post('/api/verify/', checkinService.Verify);

app.get('/api/event/', eventService.GetEvents);
app.get('/api/event/:eventId', eventService.GetEvent);
app.get('/api/event/data/:eventId', eventService.GetEventData);
app.get('/api/event/canceled/:eventId', eventService.GetCanceled);
app.get('/api/event/tickets/:eventId', eventService.GetEventTickets);
app.get('/api/event/trustee/:eventId', eventService.GetEventTrustee);
app.get('/api/event/owner/:address', eventService.GetOwnerEvents);
app.get('/api/event/ticket/:eventId/:ticketId', eventService.GetEventTicket);
app.get('/api/event/balance/:eventId/:producerAddress', eventService.GetBalance);
app.get('/api/event/ticket/description/:eventId/:ticketId', eventService.GetTicketDescription);

app.get('/api/attendee/:attendee/', attendeeService.GetAttendee);
app.get('/api/attendee/:attendee/:personalId', attendeeService.GetAttendee);
app.get('/api/attendee/:eventId/:attendee/:personalId', attendeeService.GetAttendee);

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
