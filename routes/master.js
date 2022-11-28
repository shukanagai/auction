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
  .use('/user', userRouter)
  .use('/cars', carsRouter)
  .get('/top', function (req, res, next) {
    // 社員メニューレンダリング
    res.render(`master/top.ejs`);
  })
  .get('/cars/*', function (req, res, next) {
    // 車両管理レンダリング
    res.render(`master${req.path}.ejs`);
  })
  // .get('/sales/*', function (req, res, next) {
  //   // 売上管理レンダリング
  //   res.render(`master${req.path}.ejs`);
  // })
  .get('/*', function (req, res, next) {
    // デフォルトレンダリング
    console.log(`該当なし : ${req.path}`);
    res.render(`master${req.path}.ejs`);
  });

module.exports = masterRouter;