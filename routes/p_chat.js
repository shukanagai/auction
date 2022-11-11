var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/p_chat', function(req, res, next) {
  res.render('p_chat');
});

module.exports = router;
