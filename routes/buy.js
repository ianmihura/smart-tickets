var express = require('express');
var router = express.Router();

var responseIndexData = {
  title: "Expressive"
}

// GET home page
router.get('/', function(req, res) {
  res.render('buy', responseIndexData);
});

module.exports = router;