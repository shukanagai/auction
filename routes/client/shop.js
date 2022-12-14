var express = require('express');

const shopRouter = express.Router({ mergeParams: true });

const UserDao = require('../../class/Dao/UserDao');
const AuctionDao = require('../../class/Dao/AuctionDao');

let rendObj;

shopRouter
// TOP画面レンダリング
  .get('/top', async (req, res, next) => {
    rendObj = await AuctionDao.findAll();
    res.render('client/shop/top.ejs', rendObj);
  })
  .get('/*', (req, res, next)=>{
    console.log(`該当なし : ${req.path}`);
    res.render(`client/shop/${req.path}.ejs`);
  })


;

module.exports = shopRouter;