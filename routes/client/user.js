var express = require('express');

const userRouter = express.Router({ mergeParams: true });

const UserDao = require('../../class/Dao/UserDao');
const AuctionDao = require('../../class/Dao/AuctionDao');

let rendObj;

userRouter
  // 会員情報変更画面レンダリング
  .get('/edit', (req, res, next) => {
    res.render('../../edit.ejs');
  })
  // 会員情報編集
  .post('/edit/update', async (req, res, next) => {
    const param = req.body;
    await UserDao.update(req.session.loginId, param.usName, param.usLoginId, param.usPassword, param.usGender, param.usBirthday, param.usAddress, param.usMail, param.usTel);
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
    rendObj = await AuctionDao.findByUserID(req.query.userId);
    // レンダリング
    res.render('../../history.ejs', rendObj);
  })
  .get('/*', (req, res, next)=>{
    console.log(`該当なし : ${req.path}`);
    res.render(`client/user/${req.path}.ejs`);
  })
;

module.exports = userRouter;