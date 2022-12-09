const express = require('express');

const multer = require('multer');
const path = require('path');
const ViewManageSaleDao = require('../class/Dao/ViewManageSaleDao');

const masterRouter = express.Router();
const userRouter = require('./master/user');
const carsRouter = require('./master/cars');
const salesRouter = express.Router({ mergeParams: true });

let rendObj;

salesRouter.get('/sales', async (req, res, next) => {
  const salesInfos = await ViewManageSaleDao.findAll();

  let sum = 0;
  salesInfos.forEach((salesInfo) => {
    sum = sum + salesInfo.end_price;
  });
  
  // ページネーション
  const page = Number(req.query.page) || 1;
  const pager = {
    start: page * 10 - 10,
    end: page * 10
  };

  rendObj = {
    salesInfos: salesInfos.slice(pager.start, pager.end),
    pageLength: Math.ceil(salesInfos.length / 10),
    currentPage: page,
    sum: sum,
  };
  
  res.render(`master/sales/sales.ejs`, rendObj);
})


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
  .use('/sales', salesRouter)

// デフォルトレンダリング
  .get('/*', function (req, res, next) {
    console.log(`該当なし : ${req.path}`);
    res.render(`master${req.path}.ejs`);
  })
;

module.exports = masterRouter;