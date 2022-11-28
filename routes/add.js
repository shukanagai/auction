const express = require('express'); // expressパッケージの呼び出し

const addRouter = express.Router({ mergeParams: true });

const UserDao = require('../class/Dao/UserDao');

addRouter
  // 会員新規登録画面のejsファイルをレンダリング（HTMLに変換してレスポンスを返す）
  .get('/', (req, res, next) => {
    res.render("./add.ejs");
  })

  // 会員新規登録の処理
  .post('/clientInsert', async (req, res, next) => {
    await UserDao.insert(req.body.name, req.body.loginId, req.body.password, req.body.gender, req.body.birthday, req.body.address, req.body.mail, req.body.tel);
    res.redirect('../../login');
  })
;

module.exports = addRouter;
