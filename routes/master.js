const express = require('express');
const multer = require('multer');
const path = require('path');
const UserDao = require('../class/Dao/UserDao');
const MakerDao = require('../class/Dao/MakerDao');
const VehicleDao = require('../class/Dao/VehicleDao');
const ColorSystemDao = require('../class/Dao/ColorSystemDao');
const BodyTypeDao = require('../class/Dao/BodyTypeDao');

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
const masterRouter = express.Router();
const userRouter = express.Router({ mergeParams: true });
const carsRouter = express.Router({ mergeParams: true });
const salesRouter = express.Router({ mergeParams: true });

let rendObj;

userRouter
  .get('/user_list', async function (req, res, next) {
    let userList;

    if (req.query.userName != undefined) {
      userList = await UserDao.findByName(req.query.userName);
    } else {
      userList = await UserDao.findAll();
    }

    // ページネーション
    const page = Number(req.query.page) || 1;
    const pager = {
      start: page * 10 - 10,
      end: page * 10
    };

    rendObj = {
      userList: userList.slice(pager.start, pager.end),
      pageLength: Math.ceil(userList.length / 10),
      currentPage: page
    };
    res.render(`master/user${req.path}.ejs`, rendObj);
  })
  .get('/user_ban', async function (req, res, next) {
    // const userList = await UserDao.findAll();

    /**
     * req.query.userId => ユーザーID
     */

    /**
     * テンプレート
     */
    const user = {
      US_id: 1,
      US_name: 'hal',
      US_login_id: 'hal',
      US_password: 'hal',
      US_gender: 'M',
      US_birthday: '1999-12-11T15:00:00.000Z',
      US_address: '大阪市',
      US_mail: 'hal@hal.ac.jp',
      US_tel: '9099998888',
      US_ban: 0
    };

    rendObj = {
      user
    }
    res.render(`master/user${req.path}.ejs`, rendObj);
  })
  .get('/exeBan', async function (req, res, next) {
    await UserDao.ban(req.query.userId);

    res.redirect('user_list');
  });

carsRouter
  .get('/register_input', async (req, res, next) => {
    // メーカー一覧
    const maker = await MakerDao.findAll();
    // カラー一覧
    const color = await ColorSystemDao.findAll();
    // 車両タイプ一覧
    const bodyType = await BodyTypeDao.findAll();

    // 車両登録画面
    rendObj = {
      // register_inputにアクセスした際の選択肢(色、メーカーなど)を指定
      makerArr: maker,
      colorArr: color,
      bodyTypeArr: bodyType
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

    // res.render(`master/cars/register_confirm.ejs`, rendObj);
    res.redirect(`./register_confirm`);
  })
  .get('/register_confirm', async (req, res, next)=>{
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
    // インサート
    // 11/27 仕様調整
    await VehicleDao.insert(
      carInfo.carName,
      carInfo.makerId,
      carInfo.mileage,
      carInfo.colorId,
      null,
      carInfo.bodyTypeId,
      carInfo.passenger,
      null
    );
    // セッションから車両情報削除
    req.session.carRegister = null;
    res.redirect(`./car_list`);
  })
  .get('/*', (req, res, next) => {
    console.log(`該当なし${req.path}`);
    res.render(`master/cars${req.path}.ejs`);
  });

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