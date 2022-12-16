const express = require('express');
const UserDao = require('../../class/Dao/UserDao');
const userRouter = express.Router({ mergeParams: true });

let rendObj;

userRouter
  .get('/user_list', async function (req, res, next) {
    let userList;
    let nameValue = "";

    // 検索の有無
    if (req.query.userName != undefined) {
      userList = await UserDao.findByName(req.query.userName);
      nameValue = req.query.userName;
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

  // ban画面
  .get('/user_ban', async function (req, res, next) {
    let user = await UserDao.findByPK(req.query.userId);

    rendObj = {
      user
    }
    res.render(`master/user${req.path}.ejs`, rendObj);
  })

  // ban処理実行
  .get('/exeBan', async function (req, res, next) {
    await UserDao.ban(req.query.userId);

    res.redirect('user_list');
  });

module.exports = userRouter;