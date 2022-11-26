var express = require('express');
const UserDao = require('../class/Dao/UserDao');

const clientRouter = express.Router();
const userRouter = express.Router({ mergeParams: true });

userRouter
  // 会員新規登録



  // 会員情報編集


  // 退会処理
  .get('/withdrawal', async (req, res, next) => {
    await UserDao.withdrawal(req.query.userId);
    res.redirect('../../login');
  })


  // 競り落とし履歴




clientRouter
  // ユーザー側
  .use('/user', userRouter)

  // cliant/以下全て
  .get('/*', (req, res, next) => {
    console.log('client.js => 該当なし');
    res.render(`client${req.path}.ejs`);
  });

module.exports = clientRouter;