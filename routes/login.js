'use strict';

// ルータオブジェクト宣言
var express = require('express');
var router = express.Router();

const func = require('../func');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login', { alert: "" });
});

// ログイン処理
router.post('/', (req, res, next) => {
  const form = req.body;
  const loginId = form.id;
  const password = form.password;

  // 空白チェック
  if (loginId == '' || password == '') {
    // console.log(`login.js -> router.post : 空白で入力がありました。`);
    res.render('login', { alert: "ログインID又はパスワードが違います。" });
    return;
  }

  (async () => {
    // ユーザ問い合わせ
    const user = await func.getUserOnDB(loginId);

    // ユーザ存在確認
    if (user == undefined) {
      // console.log(`login.js -> router.post : ユーザが見つかりませんでした。`);
      res.render('login', { alert: "ログインID又はパスワードが違います。" });
      return;
    }

    // パスワード比較
    if (user.pass_hash != func.hashEncode(password)) {
      // ログイン失敗
      // console.log(`login.js -> router.post : パスワードが違います  -> ${user.login}`);
      res.render('login', { alert: "ログインID又はパスワードが違います。" });
      return;
    }

    // ログイン重複確認処理
    const cr = require('../app_modules').cr;
    if (cr.getUserByUserId(user.login) != null) {
      // 既にログイン状態
      console.log(`login.js -> router.post : 重複ログイン  -> ${user.login}`);
      res.render('login', { alert: "ログインID又はパスワードが違います。" });
      return;
    }

    // 以下、ログイン成功処理
    const token = require('../func').hashEncode(new Date().toLocaleString({ timeZone: 'Asia/Tokyo' }));
    const rendObj = { id: user.login, userName: user.user_name, token: token };

    const userType = require('../config').userType;
    const User = require('../class/User');
    cr.addUser(new User(user.login, user.user_name, token, user.user_type));

    // 教員・生徒分岐
    if (user.user_type == userType.student) {
      res.render('c_chat', rendObj);
      // console.log(`login.js -> router.post : ログイン成功(生徒)  -> ${user.login}`);
    } else if (user.user_type == userType.teacher) {
      res.render('p_chat', rendObj);
      // console.log(`login.js -> router.post : ログイン成功(教員)  -> ${user.login}`);
    }
  })();
});

module.exports = router;