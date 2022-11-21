var express = require('express');
const UserDao = require('../class/Dao/UserDao');
const clientRouter = express.Router();

clientRouter
  .get('/*', (req, res, next) => {
    console.log('client.js => 該当なし');
    res.render(`client${req.path}.ejs`);
  });

module.exports = clientRouter;