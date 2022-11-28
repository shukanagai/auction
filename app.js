'use strict';

var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var http = require("http");

const config = require('./config');

var app = express();

const rtIndex = require('./routes/index');
const rtLogin = require('./routes/login');
const rtAdd = require('./routes/add');
const rtMaster = require('./routes/master');
const uiTest = require('./routes/ui_test');
const clientRouter = require('./routes/client');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', config.port);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: false
}));

app.use('/login', rtLogin);

app.use('/add', rtAdd);

app
  .use((req, res, next) => {
    if (!req.session.loginId || req.path != '/favicon.ico') {
      res.redirect('/login');
    } else if(req.path == `add` || req.path == `edit`){
      res.render(`${req.path}.ejs`);
    } else {
      next();
    }
  });
app.use('/master', rtMaster);
app.use('/ui_test', uiTest);
app.use('/client', clientRouter);
app.use('/', rtIndex);

// 以下、未整理

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {

  // Set locals, only providing error
  // in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env')
    === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;