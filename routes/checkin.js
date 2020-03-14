var express = require('express');
var router = express.Router();
var CheckinService = require('../service/checkin.js');

var responseIndexData = {
  title: "Expressive"
}

// GET home page
router.get('/', function(req, res, next) {
  res.render('checkin', responseIndexData);
});

// GET attendee
router.get(['/eventId/:eventId/:attendee/:personalId'], function(req, res) {
  try{
    CheckinService.GetEventAttendeeService(req.params.eventId, req.params.attendee, req.params.personalId, res, 
      (res, wResp) => res.send(wResp))
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;