var express = require('express');
var router = express.Router();

var responseIndexData = {
  title: "Expressive"
}

// GET home page
router.get('/', function(req, res, next) {
  res.render('index', responseIndexData);
});

module.exports = router;