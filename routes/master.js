const express = require('express');

const masterRouter = express.Router();
const userRouter = require('./master/user');
const carsRouter = require('./master/cars');
const salesRouter = express.Router({ mergeParams: true });

let rendObj;

masterRouter
  .use((req, res, next) => {
    if (!req.session.isAdmin) {
      res.redirect('../login');
    }
    next();
  })

// 会員管理
  .use('/user', userRouter)
// 車両管理
  .use('/cars', carsRouter)

// 社員メニューレンダリング
  .get('/top', function (req, res, next) {
    res.render(`master/top.ejs`);
  })

// 車両管理レンダリング
  .get('/cars/*', function (req, res, next) {
    res.render(`master${req.path}.ejs`);
  })

// 売上管理レンダリング
  // .get('/sales/*', function (req, res, next) {
  //   res.render(`master${req.path}.ejs`);
  // })

// デフォルトレンダリング
  .get('/*', function (req, res, next) {
    console.log(`該当なし : ${req.path}`);
    res.render(`master${req.path}.ejs`);
  })
;

module.exports = masterRouter;