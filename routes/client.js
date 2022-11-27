var express = require('express');

const clientRouter = express.Router();
const userRouter = express.Router({ mergeParams: true });

const UserDao = require('../class/Dao/UserDao');
const AuctionDao = require('../class/Dao/AuctionDao');

userRouter
  // 会員情報変更画面レンダリング
  .get('/edit', (req, res, next) => {
    res.render('../../edit.ejs');
  })
  // 会員情報編集
  .post('/edit/update', async (req, res, next) => {
    await UserDao.update(req.body.userId, req.body.name, req.body.loginId, req.body.password, req.body.gender, req.body.birthday, req.body.address, req.body.mail, req.body.tel);
    res.redirect('../../mypage_top');
  })

  // 退会画面レンダリング
  .get('/unsubscribe', (req, res, next) => {
    res.render('../../unsubscribe.ejs');
  })
  // 退会処理
  .get('/unsubscribe/withdrawal', async (req, res, next) => {
    await UserDao.withdrawal(req.query.userId);
    res.redirect('../../login');
  })

  // 競り落とし車両画面レンダリング
  .get('/history', async (req, res, next) => {
    // 競り落とし履歴
    await AuctionDao.findByUserID(req.query.userId);
    // レンダリング
    res.render('../../history.ejs');
  })
;

clientRouter
  // ユーザー側
  .use('/user', userRouter)

  // cliant/以下全て
  .get('/*', (req, res, next) => {
    console.log('client.js => 該当なし');
    res.render(`client${req.path}.ejs`);
  })
;

module.exports = clientRouter;