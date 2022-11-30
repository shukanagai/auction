const express = require('express');

const clientRouter = express.Router();
const userRouter = require('./client/user');
const shopRouter = require('./client/shop');

clientRouter
// マイページ
  .use('/user', userRouter)
// オークション
  .use('/shop', shopRouter)

// デフォルトレンダリング
  .get('/*', function (req, res, next) {
    console.log(`該当なし : ${req.path}`);
    res.render(`master${req.path}.ejs`);
  })
;

module.exports = clientRouter;