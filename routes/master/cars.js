const express = require('express');
const multer = require('multer');
const path = require('path');
const AuctionDao = require('../../class/Dao/AuctionDao');
const MakerDao = require('../../class/Dao/MakerDao');
const VehicleDao = require('../../class/Dao/VehicleDao');
const ViewManageVehicleDao = require('../../class/Dao/ViewManageVehicleDao');
const ColorSystemDao = require('../../class/Dao/ColorSystemDao');
const BodyTypeDao = require('../../class/Dao/BodyTypeDao');

const carsRouter = express.Router({ mergeParams: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/car_img');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  }
});

const uploads = multer({
  storage: storage
});

let rendObj;

carsRouter
// 車両一覧画面
  .get('/car_list', async (req, res, next) => {
    rendObj = await ViewManageVehicleDao.findAll();
    res.render('master/cars/car_list.ejs', rendObj);
  })


// 登録画面
  .get('/register_input', async (req, res, next) => {
    // メーカー一覧
    const maker = await MakerDao.findAll();
    // カラー一覧
    const color = await ColorSystemDao.findAll();
    // 車両タイプ一覧
    const bodyType = await BodyTypeDao.findAll();

    // 車両登録画面
    rendObj = {
      carName: req.session.carRegister ? req.session.carRegister.carName : "",
      makerArr: maker,
      makerSelected: req.session.carRegister ? req.session.carRegister.makerId : "0",
      bodyTypeArr: bodyType,
      bodyTypeSelected: req.session.carRegister ? req.session.carRegister.bodyTypeId : "0",
      passengerSelected: req.session.carRegister ? req.session.carRegister.passenger : "0",
      mileage: req.session.carRegister ? req.session.carRegister.mileage : "",
      colorArr: color,
      colorSelected: req.session.carRegister ? req.session.carRegister.colorId : "",
      startPrice: req.session.carRegister ? req.session.carRegister.startPrice : ""
    };
    res.render(`master/cars/register_input.ejs`, rendObj);
  })
  .post('/register_input', uploads.single('carImg'), async (req, res, next) => {
    // 車両登録確認
    const inputCarInfo = {
      carImgFileName: req.file.filename,
      carName: req.body.carName,
      makerId: req.body.makerId,
      bodyTypeId: req.body.bodyTypeId,
      passenger: req.body.passenger,
      mileage: req.body.mileage,
      colorId: req.body.colorId,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      startPrice: req.body.startPrice
    };

    // セッションに保存
    req.session.carRegister = inputCarInfo;
    console.log(inputCarInfo);

    // res.render(`master/cars/register_confirm.ejs`, rendObj);
    res.redirect(`./register_confirm`);
  })
  .get('/register_confirm', async (req, res, next) => {
    const carInfo = req.session.carRegister;

    const maker = await MakerDao.findByPK(carInfo.makerId);
    const bodyType = await BodyTypeDao.findByPK(carInfo.bodyTypeId);
    const color = await ColorSystemDao.findByPK(carInfo.colorId);

    rendObj = {
      carImgPath: carInfo.carImgFileName,
      carName: carInfo.carName,
      makerName: maker.M_name,
      bodyTypeName: bodyType.B_name,
      passenger: carInfo.passenger,
      mileage: carInfo.mileage,
      colorName: color.C_name,
      startTime: carInfo.startTime,
      endTime: carInfo.endTime,
      startPrice: carInfo.startPrice
    }
    console.log(rendObj);
    res.render(`master/cars/register_confirm.ejs`, rendObj);
  })
  .post('/register_confirm', async (req, res, next) => {
    const carInfo = req.session.carRegister;

    // vehiclesテーブル登録
    const insertId = await VehicleDao.insert(
      carInfo.carName,
      carInfo.makerId,
      carInfo.mileage,
      carInfo.colorId,
      null,
      carInfo.bodyTypeId,
      carInfo.passenger,
      "未設定",
      carInfo.carImgFileName
    );

    // auctionsテーブル登録
    await AuctionDao.insert(
      insertId,
      carInfo.startTime,
      carInfo.startPrice,
      carInfo.endTime
    );

    // セッションから車両情報削除
    req.session.carRegister = null;
    res.redirect(`./car_list`);
  })
  .get('/delete', async (req, res, next) => {
    //車両Id
    const carId = req.query.carId;
    VehicleDao.delete(carId);
    res.redirect(`./car_list`);
  })


// 更新画面


// 削除画面


// DEFAULT
  .get('/*', (req, res, next) => {
    console.log(`該当なし${req.path}`);
    res.render(`master/cars${req.path}.ejs`);
  });

module.exports = carsRouter;