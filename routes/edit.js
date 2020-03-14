var express = require('express');
var router = express.Router();
var EditService = require('../service/edit');

var responseIndexData = {
  title: "Expressive"
}

// GET home page
router.get('/', function(req, res, next) {
  res.render('edit', responseIndexData);
});

// GET amount of tickets available
router.get(['/amountOfTickets/:eventId'], function(req, res) {
  try{
    EditService.GetAmountOfTickets(req.params.eventId, res, 
      (res, wResp) => res.send(wResp))
  } catch (err) {
    console.log(err);
  }
});

// GET event is cancelled
router.get(['/canceled/:eventId'], function(req, res) {
  try{
    EditService.GetCanceled(req.params.eventId, res, 
      (res, wResp) => res.send(wResp))
  } catch (err) {
    console.log(err);
  }
});

// GET event has finished
router.get(['/finished/:eventId'], function(req, res) {
  try{
    EditService.GetFinished(req.params.eventId, res, 
      (res, wResp) => res.send(wResp))
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;