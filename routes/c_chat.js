var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/c_chat', function(req, res, next) {
  res.render('c_chat');
});

module.exports = router;
