var express = require('express');
var router = express.Router();
var MainService = require('../service/main')

var responseIndexData = {
  title: "Expressive"
}

// GET home page
router.get('/', function(req, res, next) {
  res.render('index', responseIndexData);
});

// GET TX by Id
router.get('/txstatebyid/:txid', function(req, res, next) {
  try{
    MainService.GetTxStateById(req.params.txid, res, 
      (res, wResp) => res.send(wResp))
  } catch (err) {
    console.log(err);
  }
});

// GET event details
router.get(['/eventId/:eventId'], function(req, res) {
  try{
    MainService.GetEventDataService(req.params.eventId, res, 
      (res, wResp) => res.send(wResp))
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;