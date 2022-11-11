var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //以下のファイル名を書き換えて利用してください。
  //pushする際にこのファイルが下記変わらないようにご注意ください。
  res.render('master/user/user_list');
});

module.exports = router;
