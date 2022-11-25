var express = require('express');
const UserDao = require('../class/Dao/UserDao');
const loginRouter = express.Router();

let rendObj = {
  errClass: 'd-none'
};

let viewPath;
let redPath;

loginRouter
  .get('/', async function (req, res, next) {
    req.session.destroy();
    res.render('login.ejs', rendObj);
  })
  .post('/', async (req, res, next) => {
    const form = {
      loginId: req.body.userId,
      pass: req.body.password
    };

    if (!form.loginId || !form.pass) {
      viewPath = 'login.ejs';
    } else {
      const [user] = await UserDao.findByLoginId(form.loginId);
      if (user && form.pass == user.US_password) {
        // 認証成功
        req.session.loginId = form.loginId;
        switch (user.US_state) {
          case 0:
            // BANされてない
            // 仕様書上「オークションTOP」
            req.session.isBan = false;
            redPath = 'client/shop/top';
            break;
          case 1:
            req.session.isBan = true;
            redPath = 'client/user/fail';
            break;
          case 2:
            // 管理者
            req.session.isBan = false;
            req.session.isAdmin = true;
            redPath = 'master/top';
            break;
          default:
            break;
        }
      } else {
        // 認証失敗
        rendObj.errClass = '';
        viewPath = 'login.ejs';
      }
    }

    if (redPath) {
      res.redirect(redPath);
    } else {
      res.render(viewPath, rendObj);
    }
    return;
  });

module.exports = loginRouter;