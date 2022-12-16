var express = require('express');

const shopRouter = express.Router({ mergeParams: true });

const UserDao = require('../../class/Dao/UserDao');
const AuctionDao = require('../../class/Dao/AuctionDao');
const ViewShowVehicleDao = require('../../class/Dao/ViewShowVehicleDao');

let rendObj;

shopRouter
  // TOP画面レンダリング
  .get('/top', async (req, res, next) => {
    // 現在オークション車両情報
    let result1 = await ViewShowVehicleDao.findNowAuction();
    //　存在チェック
    let result2 = null;
    if (result1) {
      // 現在オークション終了までの時間を計算
      let nowAuction = await AuctionDao.findByPK(result1.car_id);
      let ms = new Date(nowAuction.AU_end_datetime) - new Date(); //ミリ秒
      let hour = Math.floor(ms / (60 * 60 * 1000)); //時
      let min = Math.floor(ms / (60 * 1000) % 60); //分
      // let sec = Math.floor(ms / 1000 % 60); //秒
      result2 = hour + "時間" + min + "分";
    }
    // 今後のオークション車両リスト
    let list = await ViewShowVehicleDao.findAll();

    rendObj = {
      nowAuctionCar: result1,
      nowAuctionEndTime: result2,
      auctionCarList: list
    }

    res.render('client/shop/top.ejs', rendObj);
  })

  // 車両販売トップ
  .get('/input', async (req, res, next) => {
    const au = await ViewShowVehicleDao.findNowAuction();

    // 現在オークション終了までの時間を計算
    let nowAuction = await AuctionDao.findByPK(au.car_id);
    let ms = new Date(nowAuction.AU_end_datetime) - new Date(); //ミリ秒
    let hour = Math.floor(ms / (60 * 60 * 1000)); //時
    let min = Math.floor(ms / (60 * 1000) % 60); //分
    // let sec = Math.floor(ms / 1000 % 60); //秒
    result2 = hour + "時間" + min + "分";

    const [user] = await UserDao.findByLoginId(req.session.loginId);

    rendObj = {
      carName: au.car_name,
      carImgPath: au.car_img_path,
      startPrice: au.auction_start_price,
      nowPrice: au.auction_end_price,
      nowAuctionEndTime: result2,
      endTime: au.auction_end_datetime,
      intUserId: user.US_id
    }

    res.render('client/shop/input.ejs', rendObj);
  })
  .get('/*', (req, res, next) => {
    console.log(`該当なし : ${req.path}`);
    res.render(`client/shop/${req.path}.ejs`);
  })


  ;

module.exports = shopRouter;