var express = require('express');
var router = express.Router();

router
  .get('/', function (req, res, next) {
    // 社員メニューレンダリング
  })
  .get('/cars/*', function (req, res, next) {
    // 車両管理レンダリング
    res.render(`master${req.path}.ejs`);
  })
  .get('/user/*', function (req, res, next) {
    // 会員管理レンダリング
    res.render(`master${req.path}.ejs`);
  })
  .get('/sales/*', function (req, res, next) {
    // 売上管理レンダリング
    res.render(`master${req.path}.ejs`);
  })

module.exports = router;