var express = require('express');

const userRouter = express.Router({ mergeParams: true });

const UserDao = require('../../class/Dao/UserDao');
const AuctionDao = require('../../class/Dao/AuctionDao');
const ViewManageSaleDao = require('../../class/Dao/ViewManageSaleDao');

let rendObj;

userRouter
  // 会員情報変更画面レンダリング
  .get('/edit', (req, res, next) => {
    res.render('client/user/edit.ejs');
  })
  // 会員情報編集
  .post('/update', async (req, res, next) => {
    const param = req.body;
    await UserDao.update(req.session.loginId, param.usName, param.usLoginId, param.usPassword, param.usGender, param.usBirthday, param.usAddress, param.usMail, param.usTel);
    res.redirect('./mypage_top');
  })

  // 退会画面レンダリング
  .get('/unsubscribe', async (req, res, next) => {
    const [user] = await UserDao.findByLoginId(req.session.loginId);
    rendObj = {
      userId: user.US_id,
      address: user.US_address,
      userName: req.session.loginId,
      mail: user.US_mail
    }
    res.render('client/user/unsubscribe.ejs', rendObj);
  })
  // 退会処理
  .get('/unsubscribe/withdrawal', async (req, res, next) => {
    await UserDao.withdrawal(req.query.userId);
    res.redirect('/');
  })

  // 競り落とし車両画面レンダリング
  .get('/history', async (req, res, next) => {
    // 競り落とし履歴
    const [user] = await UserDao.findByLoginId(req.session.loginId);
    rendObj = await ViewManageSaleDao.findHistoryByUserID(user.US_name);
    // レンダリング
    res.render('client/user/history.ejs', { history: rendObj });
  })
  // マイページ
  .get('/mypage_top', async (req, res, next) => {
    const [user] = await UserDao.findByLoginId(req.session.loginId);
    res.render('client/user/mypage_top.ejs', { userName: user.US_name });
  })
  .get('/*', (req, res, next) => {
    console.log(`該当なし : ${req.path}`);
    res.render(`client/user/${req.path}.ejs`);
  })
  ;

module.exports = userRouter;