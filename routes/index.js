const express = require('express');
const indexRouter = express.Router();

indexRouter
  .get('/', (req, res, next) => {
    res.redirect('/login');
  })
  .get('/*', function (req, res, next) {
    // デフォルトレンダリング
    console.log(`該当なし : ${req.path}`);
    res.render(`.${req.path}.ejs`);
  });

module.exports = indexRouter;