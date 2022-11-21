var express = require('express');
const UserDao = require('../class/Dao/UserDao');
const loginRouter = express.Router();

let rendObj = {
  errClass: 'd-none'
};

let viewPath;
let redPath;

loginRouter
  .get('/', function (req, res, next) {
    if (!req.session.loginId) {
      res.render('login.ejs', rendObj);
    } else {
      res.redirect('/client/shop/top');
    }
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
        if (user.US_ban == 0) {
          // BANされてない
          // 仕様書上「オークションTOP」
          redPath = 'client/shop/top';
        } else {
          redPath = 'client/user/fail';
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