var express = require('express');
var router = express.Router();
var BuyService = require('../service/buy.js');

var responseIndexData = {
  title: "Expressive"
}

// GET home page
router.get('/', function(req, res) {
  res.render('buy', responseIndexData);
});

// GET event details
router.get(['/eventId/:eventId'], function(req, res) {
  try{
    BuyService.GetEventDataService(req.params.eventId, res, 
      (res, wResp) => res.send(wResp))
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;