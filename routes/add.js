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
    const param = req.body;
    console.log(param);
    await UserDao.insert(param.usName, param.usLoginId, param.usPassword, param.usGender, param.usBirthday, param.usAddress, param.usMail, param.usTel);
    res.redirect('./login');
  })
;

module.exports = addRouter;
