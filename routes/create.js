var express = require('express');
var router = express.Router();

var responseIndexData = {
  title: "Expressive"
}

// GET home page
router.get('/', function(req, res, next) {
  res.render('create', responseIndexData);
});

// POST new event
// router.post('/', function(req, res, next) {
//   CreateService.CreateEventService(req, res, (res) => {
//     res.render('index', responseIndexData);
//   });
// });

module.exports = router;