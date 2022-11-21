const express = require('express');
const UserDao = require('../class/Dao/UserDao');

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

masterRouter
  .use('/user', userRouter)
  .get('/', function (req, res, next) {
    // 社員メニューレンダリング
  })
  // .get('/cars/*', function (req, res, next) {
  //   // 車両管理レンダリング
  //   res.render(`master${req.path}.ejs`);
  // })
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